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
    return nil, err if err

    utility.make_fetch_def.call(ctx)
  end

  def direct(fetchargs = {})
    utility = @_utility

    fetchdef, err = prepare(fetchargs)
    return { "ok" => false, "err" => err }, nil if err

    fetchargs ||= {}
    ctrl = FlyffGameHelpers.to_map(VoxgigStruct.getprop(fetchargs, "ctrl")) || {}

    ctx = utility.make_context.call({
      "opname" => "direct",
      "ctrl" => ctrl,
    }, @_rootctx)

    url = fetchdef["url"] || ""
    fetched, fetch_err = utility.fetcher.call(ctx, url, fetchdef)

    return { "ok" => false, "err" => fetch_err }, nil if fetch_err

    if fetched.nil?
      return {
        "ok" => false,
        "err" => ctx.make_error("direct_no_response", "response: undefined"),
      }, nil
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
      }, nil
    end

    return {
      "ok" => false,
      "err" => ctx.make_error("direct_invalid", "invalid response type"),
    }, nil
  end


  def Achievement(data = nil)
    require_relative 'entity/achievement_entity'
    AchievementEntity.new(self, data)
  end


  def Awake(data = nil)
    require_relative 'entity/awake_entity'
    AwakeEntity.new(self, data)
  end


  def Badge(data = nil)
    require_relative 'entity/badge_entity'
    BadgeEntity.new(self, data)
  end


  def Class(data = nil)
    require_relative 'entity/class_entity'
    ClassEntity.new(self, data)
  end


  def Core(data = nil)
    require_relative 'entity/core_entity'
    CoreEntity.new(self, data)
  end


  def Couple(data = nil)
    require_relative 'entity/couple_entity'
    CoupleEntity.new(self, data)
  end


  def Dungeon(data = nil)
    require_relative 'entity/dungeon_entity'
    DungeonEntity.new(self, data)
  end


  def Element(data = nil)
    require_relative 'entity/element_entity'
    ElementEntity.new(self, data)
  end


  def EquipmentSet(data = nil)
    require_relative 'entity/equipment_set_entity'
    EquipmentSetEntity.new(self, data)
  end


  def ExchangeMenus(data = nil)
    require_relative 'entity/exchange_menus_entity'
    ExchangeMenusEntity.new(self, data)
  end


  def HousingPack(data = nil)
    require_relative 'entity/housing_pack_entity'
    HousingPackEntity.new(self, data)
  end


  def HousingTemplate(data = nil)
    require_relative 'entity/housing_template_entity'
    HousingTemplateEntity.new(self, data)
  end


  def Item(data = nil)
    require_relative 'entity/item_entity'
    ItemEntity.new(self, data)
  end


  def Language(data = nil)
    require_relative 'entity/language_entity'
    LanguageEntity.new(self, data)
  end


  def Lifestyle(data = nil)
    require_relative 'entity/lifestyle_entity'
    LifestyleEntity.new(self, data)
  end


  def Monster(data = nil)
    require_relative 'entity/monster_entity'
    MonsterEntity.new(self, data)
  end


  def Npc(data = nil)
    require_relative 'entity/npc_entity'
    NpcEntity.new(self, data)
  end


  def PartySkill(data = nil)
    require_relative 'entity/party_skill_entity'
    PartySkillEntity.new(self, data)
  end


  def Pkn(data = nil)
    require_relative 'entity/pkn_entity'
    PknEntity.new(self, data)
  end


  def Place(data = nil)
    require_relative 'entity/place_entity'
    PlaceEntity.new(self, data)
  end


  def Quest(data = nil)
    require_relative 'entity/quest_entity'
    QuestEntity.new(self, data)
  end


  def RaisedPet(data = nil)
    require_relative 'entity/raised_pet_entity'
    RaisedPetEntity.new(self, data)
  end


  def Recipe(data = nil)
    require_relative 'entity/recipe_entity'
    RecipeEntity.new(self, data)
  end


  def Skill(data = nil)
    require_relative 'entity/skill_entity'
    SkillEntity.new(self, data)
  end


  def UpgradeLevelBonus(data = nil)
    require_relative 'entity/upgrade_level_bonus_entity'
    UpgradeLevelBonusEntity.new(self, data)
  end


  def Version(data = nil)
    require_relative 'entity/version_entity'
    VersionEntity.new(self, data)
  end


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
