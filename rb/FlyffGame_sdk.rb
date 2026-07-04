# FlyffGame SDK

require_relative 'utility/struct/voxgig_struct'
require_relative 'core/utility_type'
require_relative 'core/spec'
require_relative 'core/helpers'

# Load utility registration
require_relative 'utility/register'

# Load config and features
require_relative 'config'
require_relative 'feature/base_feature'
require_relative 'features'

# Load typed models (Struct value objects).
require_relative 'FlyffGame_types'


class FlyffGameSDK
  attr_accessor :mode, :features, :options

  def initialize(options = {})
    @mode = "live"
    @features = []
    @options = nil

    utility = FlyffGameUtility.new
    @_utility = utility

    config = FlyffGameConfig.make_config

    @_rootctx = utility.make_context.call({
      "client" => self,
      "utility" => utility,
      "config" => config,
      "options" => options || {},
      "shared" => {},
    }, nil)

    @options = utility.make_options.call(@_rootctx)

    if VoxgigStruct.getpath(@options, "feature.test.active") == true
      @mode = "test"
    end

    @_rootctx.options = @options

    # Add features from config.
    feature_opts = FlyffGameHelpers.to_map(VoxgigStruct.getprop(@options, "feature"))
    if feature_opts
      items = VoxgigStruct.items(feature_opts)
      if items
        items.each do |item|
          fname = item[0]
          fopts = FlyffGameHelpers.to_map(item[1])
          if fopts && fopts["active"] == true
            utility.feature_add.call(@_rootctx, FlyffGameFeatures.make_feature(fname))
          end
        end
      end
    end

    # Add extension features.
    extend_val = VoxgigStruct.getprop(@options, "extend")
    if extend_val.is_a?(Array)
      extend_val.each do |f|
        if f.respond_to?(:get_name)
          utility.feature_add.call(@_rootctx, f)
        end
      end
    end

    # Initialize features.
    @features.each do |f|
      utility.feature_init.call(@_rootctx, f)
    end

    utility.feature_hook.call(@_rootctx, "PostConstruct")
  end

  def options_map
    out = VoxgigStruct.clone(@options)
    out.is_a?(Hash) ? out : {}
  end

  def get_utility
    FlyffGameUtility.copy(@_utility)
  end

  def get_root_ctx
    @_rootctx
  end

  def prepare(fetchargs = {})
    utility = @_utility
    fetchargs ||= {}

    ctrl = FlyffGameHelpers.to_map(VoxgigStruct.getprop(fetchargs, "ctrl")) || {}

    ctx = utility.make_context.call({
      "opname" => "prepare",
      "ctrl" => ctrl,
    }, @_rootctx)

    opts = @options
    path = VoxgigStruct.getprop(fetchargs, "path") || ""
    path = "" unless path.is_a?(String)
    method_val = VoxgigStruct.getprop(fetchargs, "method") || "GET"
    method_val = "GET" unless method_val.is_a?(String)
    params = FlyffGameHelpers.to_map(VoxgigStruct.getprop(fetchargs, "params")) || {}
    query = FlyffGameHelpers.to_map(VoxgigStruct.getprop(fetchargs, "query")) || {}
    headers = utility.prepare_headers.call(ctx)

    base = VoxgigStruct.getprop(opts, "base") || ""
    base = "" unless base.is_a?(String)
    prefix = VoxgigStruct.getprop(opts, "prefix") || ""
    prefix = "" unless prefix.is_a?(String)
    suffix = VoxgigStruct.getprop(opts, "suffix") || ""
    suffix = "" unless suffix.is_a?(String)

    ctx.spec = FlyffGameSpec.new({
      "base" => base, "prefix" => prefix, "suffix" => suffix,
      "path" => path, "method" => method_val,
      "params" => params, "query" => query, "headers" => headers,
      "body" => VoxgigStruct.getprop(fetchargs, "body"),
      "step" => "start",
    })

    # Merge user-provided headers.
    uh = VoxgigStruct.getprop(fetchargs, "headers")
    if uh.is_a?(Hash)
      uh.each { |k, v| ctx.spec.headers[k] = v }
    end

    _, err = utility.prepare_auth.call(ctx)
    raise err if err

    utility.make_fetch_def.call(ctx)
  end

  def direct(fetchargs = {})
    utility = @_utility

    # direct() is the raw-HTTP escape hatch: it always returns a result hash
    # ({ "ok" => ..., ... }) and never raises. prepare() raises on error, so
    # trap that and surface it in the hash.
    begin
      fetchdef = prepare(fetchargs)
    rescue FlyffGameError => err
      return { "ok" => false, "err" => err }
    end

    fetchargs ||= {}
    ctrl = FlyffGameHelpers.to_map(VoxgigStruct.getprop(fetchargs, "ctrl")) || {}

    ctx = utility.make_context.call({
      "opname" => "direct",
      "ctrl" => ctrl,
    }, @_rootctx)

    url = fetchdef["url"] || ""
    fetched, fetch_err = utility.fetcher.call(ctx, url, fetchdef)

    return { "ok" => false, "err" => fetch_err } if fetch_err

    if fetched.nil?
      return {
        "ok" => false,
        "err" => ctx.make_error("direct_no_response", "response: undefined"),
      }
    end

    if fetched.is_a?(Hash)
      status = FlyffGameHelpers.to_int(VoxgigStruct.getprop(fetched, "status"))
      headers = VoxgigStruct.getprop(fetched, "headers") || {}

      # No-body responses (204, 304) and explicit zero content-length must
      # skip JSON parsing — calling json() on an empty body errors.
      content_length = headers.is_a?(Hash) ? headers["content-length"] : nil
      no_body = status == 204 || status == 304 || content_length.to_s == "0"

      json_data = nil
      unless no_body
        jf = VoxgigStruct.getprop(fetched, "json")
        if jf.is_a?(Proc)
          begin
            json_data = jf.call
          rescue StandardError
            # Non-JSON body — leave data nil, keep status/headers.
            json_data = nil
          end
        end
      end

      return {
        "ok" => status >= 200 && status < 300,
        "status" => status,
        "headers" => headers,
        "data" => json_data,
      }
    end

    return {
      "ok" => false,
      "err" => ctx.make_error("direct_invalid", "invalid response type"),
    }
  end


  # Idiomatic facade: client.achievement.list / client.achievement.load({ "id" => ... })
  def achievement
    require_relative 'entity/achievement_entity'
    @achievement ||= AchievementEntity.new(self, nil)
  end

  # Deprecated: use client.achievement instead.
  def Achievement(data = nil)
    require_relative 'entity/achievement_entity'
    AchievementEntity.new(self, data)
  end


  # Idiomatic facade: client.awake.list / client.awake.load({ "id" => ... })
  def awake
    require_relative 'entity/awake_entity'
    @awake ||= AwakeEntity.new(self, nil)
  end

  # Deprecated: use client.awake instead.
  def Awake(data = nil)
    require_relative 'entity/awake_entity'
    AwakeEntity.new(self, data)
  end


  # Idiomatic facade: client.badge.list / client.badge.load({ "id" => ... })
  def badge
    require_relative 'entity/badge_entity'
    @badge ||= BadgeEntity.new(self, nil)
  end

  # Deprecated: use client.badge instead.
  def Badge(data = nil)
    require_relative 'entity/badge_entity'
    BadgeEntity.new(self, data)
  end


  # Idiomatic facade: client.class.list / client.class.load({ "id" => ... })
  def class
    require_relative 'entity/class_entity'
    @class ||= ClassEntity.new(self, nil)
  end

  # Deprecated: use client.class instead.
  def Class(data = nil)
    require_relative 'entity/class_entity'
    ClassEntity.new(self, data)
  end


  # Idiomatic facade: client.core.list / client.core.load({ "id" => ... })
  def core
    require_relative 'entity/core_entity'
    @core ||= CoreEntity.new(self, nil)
  end

  # Deprecated: use client.core instead.
  def Core(data = nil)
    require_relative 'entity/core_entity'
    CoreEntity.new(self, data)
  end


  # Idiomatic facade: client.couple.list / client.couple.load({ "id" => ... })
  def couple
    require_relative 'entity/couple_entity'
    @couple ||= CoupleEntity.new(self, nil)
  end

  # Deprecated: use client.couple instead.
  def Couple(data = nil)
    require_relative 'entity/couple_entity'
    CoupleEntity.new(self, data)
  end


  # Idiomatic facade: client.dungeon.list / client.dungeon.load({ "id" => ... })
  def dungeon
    require_relative 'entity/dungeon_entity'
    @dungeon ||= DungeonEntity.new(self, nil)
  end

  # Deprecated: use client.dungeon instead.
  def Dungeon(data = nil)
    require_relative 'entity/dungeon_entity'
    DungeonEntity.new(self, data)
  end


  # Idiomatic facade: client.element.list / client.element.load({ "id" => ... })
  def element
    require_relative 'entity/element_entity'
    @element ||= ElementEntity.new(self, nil)
  end

  # Deprecated: use client.element instead.
  def Element(data = nil)
    require_relative 'entity/element_entity'
    ElementEntity.new(self, data)
  end


  # Idiomatic facade: client.equipment_set.list / client.equipment_set.load({ "id" => ... })
  def equipment_set
    require_relative 'entity/equipment_set_entity'
    @equipment_set ||= EquipmentSetEntity.new(self, nil)
  end

  # Deprecated: use client.equipment_set instead.
  def EquipmentSet(data = nil)
    require_relative 'entity/equipment_set_entity'
    EquipmentSetEntity.new(self, data)
  end


  # Idiomatic facade: client.exchange_menus.list / client.exchange_menus.load({ "id" => ... })
  def exchange_menus
    require_relative 'entity/exchange_menus_entity'
    @exchange_menus ||= ExchangeMenusEntity.new(self, nil)
  end

  # Deprecated: use client.exchange_menus instead.
  def ExchangeMenus(data = nil)
    require_relative 'entity/exchange_menus_entity'
    ExchangeMenusEntity.new(self, data)
  end


  # Idiomatic facade: client.housing_pack.list / client.housing_pack.load({ "id" => ... })
  def housing_pack
    require_relative 'entity/housing_pack_entity'
    @housing_pack ||= HousingPackEntity.new(self, nil)
  end

  # Deprecated: use client.housing_pack instead.
  def HousingPack(data = nil)
    require_relative 'entity/housing_pack_entity'
    HousingPackEntity.new(self, data)
  end


  # Idiomatic facade: client.housing_template.list / client.housing_template.load({ "id" => ... })
  def housing_template
    require_relative 'entity/housing_template_entity'
    @housing_template ||= HousingTemplateEntity.new(self, nil)
  end

  # Deprecated: use client.housing_template instead.
  def HousingTemplate(data = nil)
    require_relative 'entity/housing_template_entity'
    HousingTemplateEntity.new(self, data)
  end


  # Idiomatic facade: client.item.list / client.item.load({ "id" => ... })
  def item
    require_relative 'entity/item_entity'
    @item ||= ItemEntity.new(self, nil)
  end

  # Deprecated: use client.item instead.
  def Item(data = nil)
    require_relative 'entity/item_entity'
    ItemEntity.new(self, data)
  end


  # Idiomatic facade: client.language.list / client.language.load({ "id" => ... })
  def language
    require_relative 'entity/language_entity'
    @language ||= LanguageEntity.new(self, nil)
  end

  # Deprecated: use client.language instead.
  def Language(data = nil)
    require_relative 'entity/language_entity'
    LanguageEntity.new(self, data)
  end


  # Idiomatic facade: client.lifestyle.list / client.lifestyle.load({ "id" => ... })
  def lifestyle
    require_relative 'entity/lifestyle_entity'
    @lifestyle ||= LifestyleEntity.new(self, nil)
  end

  # Deprecated: use client.lifestyle instead.
  def Lifestyle(data = nil)
    require_relative 'entity/lifestyle_entity'
    LifestyleEntity.new(self, data)
  end


  # Idiomatic facade: client.monster.list / client.monster.load({ "id" => ... })
  def monster
    require_relative 'entity/monster_entity'
    @monster ||= MonsterEntity.new(self, nil)
  end

  # Deprecated: use client.monster instead.
  def Monster(data = nil)
    require_relative 'entity/monster_entity'
    MonsterEntity.new(self, data)
  end


  # Idiomatic facade: client.npc.list / client.npc.load({ "id" => ... })
  def npc
    require_relative 'entity/npc_entity'
    @npc ||= NpcEntity.new(self, nil)
  end

  # Deprecated: use client.npc instead.
  def Npc(data = nil)
    require_relative 'entity/npc_entity'
    NpcEntity.new(self, data)
  end


  # Idiomatic facade: client.party_skill.list / client.party_skill.load({ "id" => ... })
  def party_skill
    require_relative 'entity/party_skill_entity'
    @party_skill ||= PartySkillEntity.new(self, nil)
  end

  # Deprecated: use client.party_skill instead.
  def PartySkill(data = nil)
    require_relative 'entity/party_skill_entity'
    PartySkillEntity.new(self, data)
  end


  # Idiomatic facade: client.pkn.list / client.pkn.load({ "id" => ... })
  def pkn
    require_relative 'entity/pkn_entity'
    @pkn ||= PknEntity.new(self, nil)
  end

  # Deprecated: use client.pkn instead.
  def Pkn(data = nil)
    require_relative 'entity/pkn_entity'
    PknEntity.new(self, data)
  end


  # Idiomatic facade: client.place.list / client.place.load({ "id" => ... })
  def place
    require_relative 'entity/place_entity'
    @place ||= PlaceEntity.new(self, nil)
  end

  # Deprecated: use client.place instead.
  def Place(data = nil)
    require_relative 'entity/place_entity'
    PlaceEntity.new(self, data)
  end


  # Idiomatic facade: client.quest.list / client.quest.load({ "id" => ... })
  def quest
    require_relative 'entity/quest_entity'
    @quest ||= QuestEntity.new(self, nil)
  end

  # Deprecated: use client.quest instead.
  def Quest(data = nil)
    require_relative 'entity/quest_entity'
    QuestEntity.new(self, data)
  end


  # Idiomatic facade: client.raised_pet.list / client.raised_pet.load({ "id" => ... })
  def raised_pet
    require_relative 'entity/raised_pet_entity'
    @raised_pet ||= RaisedPetEntity.new(self, nil)
  end

  # Deprecated: use client.raised_pet instead.
  def RaisedPet(data = nil)
    require_relative 'entity/raised_pet_entity'
    RaisedPetEntity.new(self, data)
  end


  # Idiomatic facade: client.recipe.list / client.recipe.load({ "id" => ... })
  def recipe
    require_relative 'entity/recipe_entity'
    @recipe ||= RecipeEntity.new(self, nil)
  end

  # Deprecated: use client.recipe instead.
  def Recipe(data = nil)
    require_relative 'entity/recipe_entity'
    RecipeEntity.new(self, data)
  end


  # Idiomatic facade: client.skill.list / client.skill.load({ "id" => ... })
  def skill
    require_relative 'entity/skill_entity'
    @skill ||= SkillEntity.new(self, nil)
  end

  # Deprecated: use client.skill instead.
  def Skill(data = nil)
    require_relative 'entity/skill_entity'
    SkillEntity.new(self, data)
  end


  # Idiomatic facade: client.upgrade_level_bonus.list / client.upgrade_level_bonus.load({ "id" => ... })
  def upgrade_level_bonus
    require_relative 'entity/upgrade_level_bonus_entity'
    @upgrade_level_bonus ||= UpgradeLevelBonusEntity.new(self, nil)
  end

  # Deprecated: use client.upgrade_level_bonus instead.
  def UpgradeLevelBonus(data = nil)
    require_relative 'entity/upgrade_level_bonus_entity'
    UpgradeLevelBonusEntity.new(self, data)
  end


  # Idiomatic facade: client.version.list / client.version.load({ "id" => ... })
  def version
    require_relative 'entity/version_entity'
    @version ||= VersionEntity.new(self, nil)
  end

  # Deprecated: use client.version instead.
  def Version(data = nil)
    require_relative 'entity/version_entity'
    VersionEntity.new(self, data)
  end


  # Idiomatic facade: client.world.list / client.world.load({ "id" => ... })
  def world
    require_relative 'entity/world_entity'
    @world ||= WorldEntity.new(self, nil)
  end

  # Deprecated: use client.world instead.
  def World(data = nil)
    require_relative 'entity/world_entity'
    WorldEntity.new(self, data)
  end



  def self.test(testopts = nil, sdkopts = nil)
    sdkopts = sdkopts || {}
    sdkopts = VoxgigStruct.clone(sdkopts)
    sdkopts = {} unless sdkopts.is_a?(Hash)

    testopts = testopts || {}
    testopts = VoxgigStruct.clone(testopts)
    testopts = {} unless testopts.is_a?(Hash)
    testopts["active"] = true

    VoxgigStruct.setpath(sdkopts, "feature.test", testopts)

    sdk = FlyffGameSDK.new(sdkopts)
    sdk.mode = "test"
    sdk
  end
end
