# FlyffGame Lua SDK Reference

Complete API reference for the FlyffGame Lua SDK.


## FlyffGameSDK

### Constructor

```lua
local sdk = require("flyff-game_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `Achievement(data)`

Create a new `Achievement` entity instance. Pass `nil` for no initial data.

#### `Awake(data)`

Create a new `Awake` entity instance. Pass `nil` for no initial data.

#### `Badge(data)`

Create a new `Badge` entity instance. Pass `nil` for no initial data.

#### `Class(data)`

Create a new `Class` entity instance. Pass `nil` for no initial data.

#### `Core(data)`

Create a new `Core` entity instance. Pass `nil` for no initial data.

#### `Couple(data)`

Create a new `Couple` entity instance. Pass `nil` for no initial data.

#### `Dungeon(data)`

Create a new `Dungeon` entity instance. Pass `nil` for no initial data.

#### `Element(data)`

Create a new `Element` entity instance. Pass `nil` for no initial data.

#### `EquipmentSet(data)`

Create a new `EquipmentSet` entity instance. Pass `nil` for no initial data.

#### `ExchangeMenus(data)`

Create a new `ExchangeMenus` entity instance. Pass `nil` for no initial data.

#### `HousingPack(data)`

Create a new `HousingPack` entity instance. Pass `nil` for no initial data.

#### `HousingTemplate(data)`

Create a new `HousingTemplate` entity instance. Pass `nil` for no initial data.

#### `Item(data)`

Create a new `Item` entity instance. Pass `nil` for no initial data.

#### `Language(data)`

Create a new `Language` entity instance. Pass `nil` for no initial data.

#### `Lifestyle(data)`

Create a new `Lifestyle` entity instance. Pass `nil` for no initial data.

#### `Monster(data)`

Create a new `Monster` entity instance. Pass `nil` for no initial data.

#### `Npc(data)`

Create a new `Npc` entity instance. Pass `nil` for no initial data.

#### `PartySkill(data)`

Create a new `PartySkill` entity instance. Pass `nil` for no initial data.

#### `Pkn(data)`

Create a new `Pkn` entity instance. Pass `nil` for no initial data.

#### `Place(data)`

Create a new `Place` entity instance. Pass `nil` for no initial data.

#### `Quest(data)`

Create a new `Quest` entity instance. Pass `nil` for no initial data.

#### `RaisedPet(data)`

Create a new `RaisedPet` entity instance. Pass `nil` for no initial data.

#### `Recipe(data)`

Create a new `Recipe` entity instance. Pass `nil` for no initial data.

#### `Skill(data)`

Create a new `Skill` entity instance. Pass `nil` for no initial data.

#### `UpgradeLevelBonus(data)`

Create a new `UpgradeLevelBonus` entity instance. Pass `nil` for no initial data.

#### `Version(data)`

Create a new `Version` entity instance. Pass `nil` for no initial data.

#### `World(data)`

Create a new `World` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## AchievementEntity

```lua
local achievement = client:Achievement(nil)
```

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Achievement():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Achievement():load({ id = "achievement_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AchievementEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AwakeEntity

```lua
local awake = client:Awake(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Awake():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AwakeEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## BadgeEntity

```lua
local badge = client:Badge(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Badge():load({ id = "badge_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BadgeEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ClassEntity

```lua
local class = client:Class(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attackSpeed` | `number` | Yes |  |
| `autoAttackFactors` | `table` | Yes |  |
| `block` | `number` | Yes |  |
| `critical` | `number` | Yes |  |
| `defense` | `number` | Yes |  |
| `fp` | `number` | Yes |  |
| `hp` | `number` | Yes |  |
| `icon` | `string` | Yes |  |
| `id` | `number` | Yes |  |
| `magicDefenseIntFactor` | `number` | Yes |  |
| `magicDefenseStaFactor` | `number` | Yes |  |
| `maxFP` | `string` | Yes |  |
| `maxHP` | `string` | Yes |  |
| `maxLevel` | `number` | Yes |  |
| `maxMP` | `string` | Yes |  |
| `minLevel` | `number` | Yes |  |
| `mp` | `number` | Yes |  |
| `name` | `table` | Yes |  |
| `parent` | `number` | No |  |
| `tree` | `string` | Yes |  |
| `type` | `string` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Class():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Class():load({ id = "class_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ClassEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CoreEntity

```lua
local core = client:Core(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Core():load({ parameter_id = "parameter_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CoreEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CoupleEntity

```lua
local couple = client:Couple(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Couple():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CoupleEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## DungeonEntity

```lua
local dungeon = client:Dungeon(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Dungeon():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DungeonEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ElementEntity

```lua
local element = client:Element(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Element():load({ id = "element_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ElementEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## EquipmentSetEntity

```lua
local equipment_set = client:EquipmentSet(nil)
```

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:EquipmentSet():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:EquipmentSet():load({ equipment_set_id = "equipment_set_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EquipmentSetEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ExchangeMenusEntity

```lua
local exchange_menus = client:ExchangeMenus(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:ExchangeMenus():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ExchangeMenusEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## HousingPackEntity

```lua
local housing_pack = client:HousingPack(nil)
```

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:HousingPack():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:HousingPack():load({ housing_pack_id = "housing_pack_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `HousingPackEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## HousingTemplateEntity

```lua
local housing_template = client:HousingTemplate(nil)
```

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:HousingTemplate():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:HousingTemplate():load({ housing_template_id = "housing_template_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `HousingTemplateEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ItemEntity

```lua
local item = client:Item(nil)
```

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Item():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Item():load({ id = "item_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ItemEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## LanguageEntity

```lua
local language = client:Language(nil)
```

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Language():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Language():load({ language_code = "language_code" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LanguageEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## LifestyleEntity

```lua
local lifestyle = client:Lifestyle(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Lifestyle():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LifestyleEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## MonsterEntity

```lua
local monster = client:Monster(nil)
```

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Monster():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Monster():load({ id = "monster_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MonsterEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## NpcEntity

```lua
local npc = client:Npc(nil)
```

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Npc():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Npc():load({ id = "npc_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `NpcEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PartySkillEntity

```lua
local party_skill = client:PartySkill(nil)
```

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:PartySkill():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:PartySkill():load({ party_skill_id = "party_skill_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PartySkillEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PknEntity

```lua
local pkn = client:Pkn(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Pkn():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PknEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PlaceEntity

```lua
local place = client:Place(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Place():load({ id = "place_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PlaceEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## QuestEntity

```lua
local quest = client:Quest(nil)
```

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Quest():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Quest():load({ id = "quest_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `QuestEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## RaisedPetEntity

```lua
local raised_pet = client:RaisedPet(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:RaisedPet():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RaisedPetEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## RecipeEntity

```lua
local recipe = client:Recipe(nil)
```

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Recipe():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Recipe():load({ id = "recipe_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RecipeEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## SkillEntity

```lua
local skill = client:Skill(nil)
```

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Skill():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Skill():load({ id = "skill_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SkillEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## UpgradeLevelBonusEntity

```lua
local upgrade_level_bonus = client:UpgradeLevelBonus(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:UpgradeLevelBonus():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `UpgradeLevelBonusEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## VersionEntity

```lua
local version = client:Version(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Version():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VersionEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## WorldEntity

```lua
local world = client:World(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `continents` | `table` | Yes |  |
| `flying` | `boolean` | Yes |  |
| `height` | `number` | Yes |  |
| `id` | `number` | Yes |  |
| `inDoor` | `boolean` | Yes |  |
| `lodestars` | `table` | Yes |  |
| `name` | `table` | Yes |  |
| `pk` | `boolean` | Yes |  |
| `places` | `table` | Yes |  |
| `revivalKey` | `string` | No |  |
| `revivalWorld` | `number` | No |  |
| `tileName` | `string` | Yes |  |
| `tileSize` | `number` | Yes |  |
| `type` | `string` | Yes |  |
| `width` | `number` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:World():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:World():load({ id = "world_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `WorldEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
  },
})
```

