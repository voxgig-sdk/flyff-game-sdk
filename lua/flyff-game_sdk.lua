-- FlyffGame SDK

local vs = require("utility.struct.struct")
local Utility = require("core.utility_type")
local Spec = require("core.spec")
local helpers = require("core.helpers")

-- Load utility registration (populates Utility._registrar)
require("utility.register")

-- Load features
local BaseFeature = require("feature.base_feature")
local features_factory = require("features")


local FlyffGameSDK = {}
FlyffGameSDK.__index = FlyffGameSDK


local function _make_feature(name)
  local factory = features_factory[name]
  if factory ~= nil then
    return factory()
  end
  return features_factory.base()
end

FlyffGameSDK._make_feature = _make_feature


function FlyffGameSDK.new(options)
  local self = setmetatable({}, FlyffGameSDK)
  self.mode = "live"
  self.features = {}
  self.options = nil

  local utility = Utility.new()
  self._utility = utility

  local config = require("config")()

  self._rootctx = utility.make_context({
    client = self,
    utility = utility,
    config = config,
    options = options or {},
    shared = {},
  }, nil)

  self.options = utility.make_options(self._rootctx)

  if vs.getpath(self.options, "feature.test.active") == true then
    self.mode = "test"
  end

  self._rootctx.options = self.options

  -- Add features from config.
  local feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
  if feature_opts ~= nil then
    local feature_items = vs.items(feature_opts)
    if feature_items ~= nil then
      for _, item in ipairs(feature_items) do
        local fname = item[1]
        local fopts = helpers.to_map(item[2])
        if fopts ~= nil and fopts["active"] == true then
          utility.feature_add(self._rootctx, _make_feature(fname))
        end
      end
    end
  end

  -- Add extension features.
  local extend = vs.getprop(self.options, "extend")
  if type(extend) == "table" then
    for _, f in ipairs(extend) do
      if type(f) == "table" and type(f.get_name) == "function" then
        utility.feature_add(self._rootctx, f)
      end
    end
  end

  -- Initialize features.
  for _, f in ipairs(self.features) do
    utility.feature_init(self._rootctx, f)
  end

  utility.feature_hook(self._rootctx, "PostConstruct")

  -- #BuildFeatures

  return self
end


function FlyffGameSDK:options_map()
  local out = vs.clone(self.options)
  if type(out) == "table" then
    return out
  end
  return {}
end


function FlyffGameSDK:get_utility()
  return Utility.copy(self._utility)
end


function FlyffGameSDK:get_root_ctx()
  return self._rootctx
end


function FlyffGameSDK:prepare(fetchargs)
  local utility = self._utility

  fetchargs = fetchargs or {}

  local ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl")) or {}

  local ctx = utility.make_context({
    opname = "prepare",
    ctrl = ctrl,
  }, self._rootctx)

  local options = self.options

  local path = vs.getprop(fetchargs, "path") or ""
  if type(path) ~= "string" then path = "" end

  local method = vs.getprop(fetchargs, "method") or "GET"
  if type(method) ~= "string" then method = "GET" end

  local params = helpers.to_map(vs.getprop(fetchargs, "params")) or {}
  local query = helpers.to_map(vs.getprop(fetchargs, "query")) or {}

  local headers = utility.prepare_headers(ctx)

  local base = vs.getprop(options, "base") or ""
  if type(base) ~= "string" then base = "" end
  local prefix = vs.getprop(options, "prefix") or ""
  if type(prefix) ~= "string" then prefix = "" end
  local suffix = vs.getprop(options, "suffix") or ""
  if type(suffix) ~= "string" then suffix = "" end

  ctx.spec = Spec.new({
    base = base,
    prefix = prefix,
    suffix = suffix,
    path = path,
    method = method,
    params = params,
    query = query,
    headers = headers,
    body = vs.getprop(fetchargs, "body"),
    step = "start",
  })

  -- Merge user-provided headers.
  local uh = vs.getprop(fetchargs, "headers")
  if type(uh) == "table" then
    for k, v in pairs(uh) do
      ctx.spec.headers[k] = v
    end
  end

  local _, err = utility.prepare_auth(ctx)
  if err ~= nil then
    return nil, err
  end

  return utility.make_fetch_def(ctx)
end


function FlyffGameSDK:direct(fetchargs)
  local utility = self._utility

  local fetchdef, err = self:prepare(fetchargs)
  if err ~= nil then
    return { ok = false, err = err }, nil
  end

  fetchargs = fetchargs or {}
  local ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl")) or {}

  local ctx = utility.make_context({
    opname = "direct",
    ctrl = ctrl,
  }, self._rootctx)

  local url = fetchdef["url"] or ""
  local fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

  if fetch_err ~= nil then
    return { ok = false, err = fetch_err }, nil
  end

  if fetched == nil then
    return {
      ok = false,
      err = ctx:make_error("direct_no_response", "response: undefined"),
    }, nil
  end

  if type(fetched) == "table" then
    local status = helpers.to_int(vs.getprop(fetched, "status"))
    local headers = vs.getprop(fetched, "headers") or {}

    -- No-body responses (204, 304) and explicit zero content-length
    -- must skip JSON parsing — calling json() on an empty body errors.
    local content_length = nil
    if type(headers) == "table" then
      content_length = headers["content-length"]
    end
    local no_body = status == 204 or status == 304 or tostring(content_length) == "0"

    local json_data = nil
    if not no_body then
      local jf = vs.getprop(fetched, "json")
      if type(jf) == "function" then
        local ok, result = pcall(jf)
        if ok then
          json_data = result
        end
        -- Non-JSON body: json_data stays nil, status/headers preserved.
      end
    end

    return {
      ok = status >= 200 and status < 300,
      status = status,
      headers = headers,
      data = json_data,
    }, nil
  end

  return {
    ok = false,
    err = ctx:make_error("direct_invalid", "invalid response type"),
  }, nil
end



-- Idiomatic facade: client:achievement():list() / client:achievement():load({ id = ... })
function FlyffGameSDK:achievement(data)
  local EntityMod = require("entity.achievement_entity")
  if data == nil then
    if self._achievement == nil then
      self._achievement = EntityMod.new(self, nil)
    end
    return self._achievement
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:achievement() instead.
function FlyffGameSDK:Achievement(data)
  local EntityMod = require("entity.achievement_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:awake():list() / client:awake():load({ id = ... })
function FlyffGameSDK:awake(data)
  local EntityMod = require("entity.awake_entity")
  if data == nil then
    if self._awake == nil then
      self._awake = EntityMod.new(self, nil)
    end
    return self._awake
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:awake() instead.
function FlyffGameSDK:Awake(data)
  local EntityMod = require("entity.awake_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:badge():list() / client:badge():load({ id = ... })
function FlyffGameSDK:badge(data)
  local EntityMod = require("entity.badge_entity")
  if data == nil then
    if self._badge == nil then
      self._badge = EntityMod.new(self, nil)
    end
    return self._badge
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:badge() instead.
function FlyffGameSDK:Badge(data)
  local EntityMod = require("entity.badge_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:class():list() / client:class():load({ id = ... })
function FlyffGameSDK:class(data)
  local EntityMod = require("entity.class_entity")
  if data == nil then
    if self._class == nil then
      self._class = EntityMod.new(self, nil)
    end
    return self._class
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:class() instead.
function FlyffGameSDK:Class(data)
  local EntityMod = require("entity.class_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:core():list() / client:core():load({ id = ... })
function FlyffGameSDK:core(data)
  local EntityMod = require("entity.core_entity")
  if data == nil then
    if self._core == nil then
      self._core = EntityMod.new(self, nil)
    end
    return self._core
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:core() instead.
function FlyffGameSDK:Core(data)
  local EntityMod = require("entity.core_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:couple():list() / client:couple():load({ id = ... })
function FlyffGameSDK:couple(data)
  local EntityMod = require("entity.couple_entity")
  if data == nil then
    if self._couple == nil then
      self._couple = EntityMod.new(self, nil)
    end
    return self._couple
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:couple() instead.
function FlyffGameSDK:Couple(data)
  local EntityMod = require("entity.couple_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:dungeon():list() / client:dungeon():load({ id = ... })
function FlyffGameSDK:dungeon(data)
  local EntityMod = require("entity.dungeon_entity")
  if data == nil then
    if self._dungeon == nil then
      self._dungeon = EntityMod.new(self, nil)
    end
    return self._dungeon
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:dungeon() instead.
function FlyffGameSDK:Dungeon(data)
  local EntityMod = require("entity.dungeon_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:element():list() / client:element():load({ id = ... })
function FlyffGameSDK:element(data)
  local EntityMod = require("entity.element_entity")
  if data == nil then
    if self._element == nil then
      self._element = EntityMod.new(self, nil)
    end
    return self._element
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:element() instead.
function FlyffGameSDK:Element(data)
  local EntityMod = require("entity.element_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:equipment_set():list() / client:equipment_set():load({ id = ... })
function FlyffGameSDK:equipment_set(data)
  local EntityMod = require("entity.equipment_set_entity")
  if data == nil then
    if self._equipment_set == nil then
      self._equipment_set = EntityMod.new(self, nil)
    end
    return self._equipment_set
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:equipment_set() instead.
function FlyffGameSDK:EquipmentSet(data)
  local EntityMod = require("entity.equipment_set_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:exchange_menus():list() / client:exchange_menus():load({ id = ... })
function FlyffGameSDK:exchange_menus(data)
  local EntityMod = require("entity.exchange_menus_entity")
  if data == nil then
    if self._exchange_menus == nil then
      self._exchange_menus = EntityMod.new(self, nil)
    end
    return self._exchange_menus
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:exchange_menus() instead.
function FlyffGameSDK:ExchangeMenus(data)
  local EntityMod = require("entity.exchange_menus_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:housing_pack():list() / client:housing_pack():load({ id = ... })
function FlyffGameSDK:housing_pack(data)
  local EntityMod = require("entity.housing_pack_entity")
  if data == nil then
    if self._housing_pack == nil then
      self._housing_pack = EntityMod.new(self, nil)
    end
    return self._housing_pack
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:housing_pack() instead.
function FlyffGameSDK:HousingPack(data)
  local EntityMod = require("entity.housing_pack_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:housing_template():list() / client:housing_template():load({ id = ... })
function FlyffGameSDK:housing_template(data)
  local EntityMod = require("entity.housing_template_entity")
  if data == nil then
    if self._housing_template == nil then
      self._housing_template = EntityMod.new(self, nil)
    end
    return self._housing_template
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:housing_template() instead.
function FlyffGameSDK:HousingTemplate(data)
  local EntityMod = require("entity.housing_template_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:item():list() / client:item():load({ id = ... })
function FlyffGameSDK:item(data)
  local EntityMod = require("entity.item_entity")
  if data == nil then
    if self._item == nil then
      self._item = EntityMod.new(self, nil)
    end
    return self._item
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:item() instead.
function FlyffGameSDK:Item(data)
  local EntityMod = require("entity.item_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:language():list() / client:language():load({ id = ... })
function FlyffGameSDK:language(data)
  local EntityMod = require("entity.language_entity")
  if data == nil then
    if self._language == nil then
      self._language = EntityMod.new(self, nil)
    end
    return self._language
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:language() instead.
function FlyffGameSDK:Language(data)
  local EntityMod = require("entity.language_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:lifestyle():list() / client:lifestyle():load({ id = ... })
function FlyffGameSDK:lifestyle(data)
  local EntityMod = require("entity.lifestyle_entity")
  if data == nil then
    if self._lifestyle == nil then
      self._lifestyle = EntityMod.new(self, nil)
    end
    return self._lifestyle
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:lifestyle() instead.
function FlyffGameSDK:Lifestyle(data)
  local EntityMod = require("entity.lifestyle_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:monster():list() / client:monster():load({ id = ... })
function FlyffGameSDK:monster(data)
  local EntityMod = require("entity.monster_entity")
  if data == nil then
    if self._monster == nil then
      self._monster = EntityMod.new(self, nil)
    end
    return self._monster
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:monster() instead.
function FlyffGameSDK:Monster(data)
  local EntityMod = require("entity.monster_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:npc():list() / client:npc():load({ id = ... })
function FlyffGameSDK:npc(data)
  local EntityMod = require("entity.npc_entity")
  if data == nil then
    if self._npc == nil then
      self._npc = EntityMod.new(self, nil)
    end
    return self._npc
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:npc() instead.
function FlyffGameSDK:Npc(data)
  local EntityMod = require("entity.npc_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:party_skill():list() / client:party_skill():load({ id = ... })
function FlyffGameSDK:party_skill(data)
  local EntityMod = require("entity.party_skill_entity")
  if data == nil then
    if self._party_skill == nil then
      self._party_skill = EntityMod.new(self, nil)
    end
    return self._party_skill
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:party_skill() instead.
function FlyffGameSDK:PartySkill(data)
  local EntityMod = require("entity.party_skill_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:pkn():list() / client:pkn():load({ id = ... })
function FlyffGameSDK:pkn(data)
  local EntityMod = require("entity.pkn_entity")
  if data == nil then
    if self._pkn == nil then
      self._pkn = EntityMod.new(self, nil)
    end
    return self._pkn
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:pkn() instead.
function FlyffGameSDK:Pkn(data)
  local EntityMod = require("entity.pkn_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:place():list() / client:place():load({ id = ... })
function FlyffGameSDK:place(data)
  local EntityMod = require("entity.place_entity")
  if data == nil then
    if self._place == nil then
      self._place = EntityMod.new(self, nil)
    end
    return self._place
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:place() instead.
function FlyffGameSDK:Place(data)
  local EntityMod = require("entity.place_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:quest():list() / client:quest():load({ id = ... })
function FlyffGameSDK:quest(data)
  local EntityMod = require("entity.quest_entity")
  if data == nil then
    if self._quest == nil then
      self._quest = EntityMod.new(self, nil)
    end
    return self._quest
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:quest() instead.
function FlyffGameSDK:Quest(data)
  local EntityMod = require("entity.quest_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:raised_pet():list() / client:raised_pet():load({ id = ... })
function FlyffGameSDK:raised_pet(data)
  local EntityMod = require("entity.raised_pet_entity")
  if data == nil then
    if self._raised_pet == nil then
      self._raised_pet = EntityMod.new(self, nil)
    end
    return self._raised_pet
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:raised_pet() instead.
function FlyffGameSDK:RaisedPet(data)
  local EntityMod = require("entity.raised_pet_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:recipe():list() / client:recipe():load({ id = ... })
function FlyffGameSDK:recipe(data)
  local EntityMod = require("entity.recipe_entity")
  if data == nil then
    if self._recipe == nil then
      self._recipe = EntityMod.new(self, nil)
    end
    return self._recipe
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:recipe() instead.
function FlyffGameSDK:Recipe(data)
  local EntityMod = require("entity.recipe_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:skill():list() / client:skill():load({ id = ... })
function FlyffGameSDK:skill(data)
  local EntityMod = require("entity.skill_entity")
  if data == nil then
    if self._skill == nil then
      self._skill = EntityMod.new(self, nil)
    end
    return self._skill
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:skill() instead.
function FlyffGameSDK:Skill(data)
  local EntityMod = require("entity.skill_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:upgrade_level_bonus():list() / client:upgrade_level_bonus():load({ id = ... })
function FlyffGameSDK:upgrade_level_bonus(data)
  local EntityMod = require("entity.upgrade_level_bonus_entity")
  if data == nil then
    if self._upgrade_level_bonus == nil then
      self._upgrade_level_bonus = EntityMod.new(self, nil)
    end
    return self._upgrade_level_bonus
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:upgrade_level_bonus() instead.
function FlyffGameSDK:UpgradeLevelBonus(data)
  local EntityMod = require("entity.upgrade_level_bonus_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:version():list() / client:version():load({ id = ... })
function FlyffGameSDK:version(data)
  local EntityMod = require("entity.version_entity")
  if data == nil then
    if self._version == nil then
      self._version = EntityMod.new(self, nil)
    end
    return self._version
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:version() instead.
function FlyffGameSDK:Version(data)
  local EntityMod = require("entity.version_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:world():list() / client:world():load({ id = ... })
function FlyffGameSDK:world(data)
  local EntityMod = require("entity.world_entity")
  if data == nil then
    if self._world == nil then
      self._world = EntityMod.new(self, nil)
    end
    return self._world
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:world() instead.
function FlyffGameSDK:World(data)
  local EntityMod = require("entity.world_entity")
  return EntityMod.new(self, data)
end




function FlyffGameSDK.test(testopts, sdkopts)
  sdkopts = sdkopts or {}
  sdkopts = vs.clone(sdkopts)
  if type(sdkopts) ~= "table" then
    sdkopts = {}
  end

  testopts = testopts or {}
  testopts = vs.clone(testopts)
  if type(testopts) ~= "table" then
    testopts = {}
  end
  testopts["active"] = true

  vs.setpath(sdkopts, "feature.test", testopts)

  local sdk = FlyffGameSDK.new(sdkopts)
  sdk.mode = "test"

  return sdk
end


return FlyffGameSDK
