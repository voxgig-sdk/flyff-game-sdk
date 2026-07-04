# FlyffGame Ruby SDK Reference

Complete API reference for the FlyffGame Ruby SDK.


## FlyffGameSDK

### Constructor

```ruby
require_relative 'flyff-game_sdk'

client = FlyffGameSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `FlyffGameSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = FlyffGameSDK.test
```


### Instance Methods

#### `Achievement(data = nil)`

Create a new `Achievement` entity instance. Pass `nil` for no initial data.

#### `Awake(data = nil)`

Create a new `Awake` entity instance. Pass `nil` for no initial data.

#### `Badge(data = nil)`

Create a new `Badge` entity instance. Pass `nil` for no initial data.

#### `Class(data = nil)`

Create a new `Class` entity instance. Pass `nil` for no initial data.

#### `Core(data = nil)`

Create a new `Core` entity instance. Pass `nil` for no initial data.

#### `Couple(data = nil)`

Create a new `Couple` entity instance. Pass `nil` for no initial data.

#### `Dungeon(data = nil)`

Create a new `Dungeon` entity instance. Pass `nil` for no initial data.

#### `Element(data = nil)`

Create a new `Element` entity instance. Pass `nil` for no initial data.

#### `EquipmentSet(data = nil)`

Create a new `EquipmentSet` entity instance. Pass `nil` for no initial data.

#### `ExchangeMenus(data = nil)`

Create a new `ExchangeMenus` entity instance. Pass `nil` for no initial data.

#### `HousingPack(data = nil)`

Create a new `HousingPack` entity instance. Pass `nil` for no initial data.

#### `HousingTemplate(data = nil)`

Create a new `HousingTemplate` entity instance. Pass `nil` for no initial data.

#### `Item(data = nil)`

Create a new `Item` entity instance. Pass `nil` for no initial data.

#### `Language(data = nil)`

Create a new `Language` entity instance. Pass `nil` for no initial data.

#### `Lifestyle(data = nil)`

Create a new `Lifestyle` entity instance. Pass `nil` for no initial data.

#### `Monster(data = nil)`

Create a new `Monster` entity instance. Pass `nil` for no initial data.

#### `Npc(data = nil)`

Create a new `Npc` entity instance. Pass `nil` for no initial data.

#### `PartySkill(data = nil)`

Create a new `PartySkill` entity instance. Pass `nil` for no initial data.

#### `Pkn(data = nil)`

Create a new `Pkn` entity instance. Pass `nil` for no initial data.

#### `Place(data = nil)`

Create a new `Place` entity instance. Pass `nil` for no initial data.

#### `Quest(data = nil)`

Create a new `Quest` entity instance. Pass `nil` for no initial data.

#### `RaisedPet(data = nil)`

Create a new `RaisedPet` entity instance. Pass `nil` for no initial data.

#### `Recipe(data = nil)`

Create a new `Recipe` entity instance. Pass `nil` for no initial data.

#### `Skill(data = nil)`

Create a new `Skill` entity instance. Pass `nil` for no initial data.

#### `UpgradeLevelBonus(data = nil)`

Create a new `UpgradeLevelBonus` entity instance. Pass `nil` for no initial data.

#### `Version(data = nil)`

Create a new `Version` entity instance. Pass `nil` for no initial data.

#### `World(data = nil)`

Create a new `World` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## AchievementEntity

```ruby
achievement = client.achievement
```

### Operations

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.achievement.list(nil)
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.achievement.load({ "id" => "achievement_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AchievementEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AwakeEntity

```ruby
awake = client.awake
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.awake.load({ "id" => "awake_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AwakeEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## BadgeEntity

```ruby
badge = client.badge
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.badge.load({ "id" => "badge_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `BadgeEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ClassEntity

```ruby
class = client.class
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attack_speed` | ``$NUMBER`` | Yes |  |
| `auto_attack_factor` | ``$OBJECT`` | Yes |  |
| `block` | ``$NUMBER`` | Yes |  |
| `critical` | ``$NUMBER`` | Yes |  |
| `defense` | ``$NUMBER`` | Yes |  |
| `fp` | ``$NUMBER`` | Yes |  |
| `hp` | ``$NUMBER`` | Yes |  |
| `icon` | ``$STRING`` | Yes |  |
| `id` | ``$INTEGER`` | Yes |  |
| `magic_defense_int_factor` | ``$NUMBER`` | Yes |  |
| `magic_defense_sta_factor` | ``$NUMBER`` | Yes |  |
| `max_fp` | ``$STRING`` | Yes |  |
| `max_hp` | ``$STRING`` | Yes |  |
| `max_level` | ``$INTEGER`` | Yes |  |
| `max_mp` | ``$STRING`` | Yes |  |
| `min_level` | ``$INTEGER`` | Yes |  |
| `mp` | ``$NUMBER`` | Yes |  |
| `name` | ``$OBJECT`` | Yes |  |
| `parent` | ``$INTEGER`` | No |  |
| `tree` | ``$STRING`` | Yes |  |
| `type` | ``$STRING`` | Yes |  |

### Operations

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.class.list(nil)
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.class.load({ "id" => "class_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ClassEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CoreEntity

```ruby
core = client.core
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.core.load({ "id" => "core_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CoreEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CoupleEntity

```ruby
couple = client.couple
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.couple.load({ "id" => "couple_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CoupleEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## DungeonEntity

```ruby
dungeon = client.dungeon
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.dungeon.load({ "id" => "dungeon_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `DungeonEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ElementEntity

```ruby
element = client.element
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.element.load({ "id" => "element_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ElementEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## EquipmentSetEntity

```ruby
equipment_set = client.equipment_set
```

### Operations

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.equipment_set.list(nil)
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.equipment_set.load({ "id" => "equipment_set_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `EquipmentSetEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ExchangeMenusEntity

```ruby
exchange_menus = client.exchange_menus
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.exchange_menus.load({ "id" => "exchange_menus_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ExchangeMenusEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## HousingPackEntity

```ruby
housing_pack = client.housing_pack
```

### Operations

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.housing_pack.list(nil)
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.housing_pack.load({ "id" => "housing_pack_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `HousingPackEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## HousingTemplateEntity

```ruby
housing_template = client.housing_template
```

### Operations

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.housing_template.list(nil)
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.housing_template.load({ "id" => "housing_template_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `HousingTemplateEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ItemEntity

```ruby
item = client.item
```

### Operations

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.item.list(nil)
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.item.load({ "id" => "item_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ItemEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## LanguageEntity

```ruby
language = client.language
```

### Operations

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.language.list(nil)
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.language.load({ "id" => "language_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `LanguageEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## LifestyleEntity

```ruby
lifestyle = client.lifestyle
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.lifestyle.load({ "id" => "lifestyle_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `LifestyleEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## MonsterEntity

```ruby
monster = client.monster
```

### Operations

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.monster.list(nil)
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.monster.load({ "id" => "monster_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `MonsterEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## NpcEntity

```ruby
npc = client.npc
```

### Operations

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.npc.list(nil)
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.npc.load({ "id" => "npc_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `NpcEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PartySkillEntity

```ruby
party_skill = client.party_skill
```

### Operations

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.party_skill.list(nil)
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.party_skill.load({ "id" => "party_skill_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PartySkillEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PknEntity

```ruby
pkn = client.pkn
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.pkn.load({ "id" => "pkn_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PknEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PlaceEntity

```ruby
place = client.place
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.place.load({ "id" => "place_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PlaceEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## QuestEntity

```ruby
quest = client.quest
```

### Operations

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.quest.list(nil)
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.quest.load({ "id" => "quest_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `QuestEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## RaisedPetEntity

```ruby
raised_pet = client.raised_pet
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.raised_pet.load({ "id" => "raised_pet_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `RaisedPetEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## RecipeEntity

```ruby
recipe = client.recipe
```

### Operations

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.recipe.list(nil)
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.recipe.load({ "id" => "recipe_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `RecipeEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## SkillEntity

```ruby
skill = client.skill
```

### Operations

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.skill.list(nil)
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.skill.load({ "id" => "skill_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `SkillEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## UpgradeLevelBonusEntity

```ruby
upgrade_level_bonus = client.upgrade_level_bonus
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.upgrade_level_bonus.load({ "id" => "upgrade_level_bonus_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `UpgradeLevelBonusEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## VersionEntity

```ruby
version = client.version
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.version.load({ "id" => "version_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `VersionEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## WorldEntity

```ruby
world = client.world
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `continent` | ``$ARRAY`` | Yes |  |
| `flying` | ``$BOOLEAN`` | Yes |  |
| `height` | ``$INTEGER`` | Yes |  |
| `id` | ``$INTEGER`` | Yes |  |
| `in_door` | ``$BOOLEAN`` | Yes |  |
| `lodestar` | ``$ARRAY`` | Yes |  |
| `name` | ``$OBJECT`` | Yes |  |
| `pk` | ``$BOOLEAN`` | Yes |  |
| `place` | ``$ARRAY`` | Yes |  |
| `revival_key` | ``$STRING`` | No |  |
| `revival_world` | ``$INTEGER`` | No |  |
| `tile_name` | ``$STRING`` | Yes |  |
| `tile_size` | ``$INTEGER`` | Yes |  |
| `type` | ``$STRING`` | Yes |  |
| `width` | ``$INTEGER`` | Yes |  |

### Operations

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.world.list(nil)
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.world.load({ "id" => "world_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `WorldEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = FlyffGameSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

