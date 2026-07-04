# FlyffGame Golang SDK Reference

Complete API reference for the FlyffGame Golang SDK.


## FlyffGameSDK

### Constructor

```go
func NewFlyffGameSDK(options map[string]any) *FlyffGameSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *FlyffGameSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *FlyffGameSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `Achievement(data map[string]any) FlyffGameEntity`

Create a new `Achievement` entity instance. Pass `nil` for no initial data.

#### `Awake(data map[string]any) FlyffGameEntity`

Create a new `Awake` entity instance. Pass `nil` for no initial data.

#### `Badge(data map[string]any) FlyffGameEntity`

Create a new `Badge` entity instance. Pass `nil` for no initial data.

#### `Class(data map[string]any) FlyffGameEntity`

Create a new `Class` entity instance. Pass `nil` for no initial data.

#### `Core(data map[string]any) FlyffGameEntity`

Create a new `Core` entity instance. Pass `nil` for no initial data.

#### `Couple(data map[string]any) FlyffGameEntity`

Create a new `Couple` entity instance. Pass `nil` for no initial data.

#### `Dungeon(data map[string]any) FlyffGameEntity`

Create a new `Dungeon` entity instance. Pass `nil` for no initial data.

#### `Element(data map[string]any) FlyffGameEntity`

Create a new `Element` entity instance. Pass `nil` for no initial data.

#### `EquipmentSet(data map[string]any) FlyffGameEntity`

Create a new `EquipmentSet` entity instance. Pass `nil` for no initial data.

#### `ExchangeMenus(data map[string]any) FlyffGameEntity`

Create a new `ExchangeMenus` entity instance. Pass `nil` for no initial data.

#### `HousingPack(data map[string]any) FlyffGameEntity`

Create a new `HousingPack` entity instance. Pass `nil` for no initial data.

#### `HousingTemplate(data map[string]any) FlyffGameEntity`

Create a new `HousingTemplate` entity instance. Pass `nil` for no initial data.

#### `Item(data map[string]any) FlyffGameEntity`

Create a new `Item` entity instance. Pass `nil` for no initial data.

#### `Language(data map[string]any) FlyffGameEntity`

Create a new `Language` entity instance. Pass `nil` for no initial data.

#### `Lifestyle(data map[string]any) FlyffGameEntity`

Create a new `Lifestyle` entity instance. Pass `nil` for no initial data.

#### `Monster(data map[string]any) FlyffGameEntity`

Create a new `Monster` entity instance. Pass `nil` for no initial data.

#### `Npc(data map[string]any) FlyffGameEntity`

Create a new `Npc` entity instance. Pass `nil` for no initial data.

#### `PartySkill(data map[string]any) FlyffGameEntity`

Create a new `PartySkill` entity instance. Pass `nil` for no initial data.

#### `Pkn(data map[string]any) FlyffGameEntity`

Create a new `Pkn` entity instance. Pass `nil` for no initial data.

#### `Place(data map[string]any) FlyffGameEntity`

Create a new `Place` entity instance. Pass `nil` for no initial data.

#### `Quest(data map[string]any) FlyffGameEntity`

Create a new `Quest` entity instance. Pass `nil` for no initial data.

#### `RaisedPet(data map[string]any) FlyffGameEntity`

Create a new `RaisedPet` entity instance. Pass `nil` for no initial data.

#### `Recipe(data map[string]any) FlyffGameEntity`

Create a new `Recipe` entity instance. Pass `nil` for no initial data.

#### `Skill(data map[string]any) FlyffGameEntity`

Create a new `Skill` entity instance. Pass `nil` for no initial data.

#### `UpgradeLevelBonus(data map[string]any) FlyffGameEntity`

Create a new `UpgradeLevelBonus` entity instance. Pass `nil` for no initial data.

#### `Version(data map[string]any) FlyffGameEntity`

Create a new `Version` entity instance. Pass `nil` for no initial data.

#### `World(data map[string]any) FlyffGameEntity`

Create a new `World` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## AchievementEntity

```go
achievement := client.Achievement(nil)
```

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Achievement(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Achievement(nil).Load(map[string]any{"id": "achievement_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AchievementEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## AwakeEntity

```go
awake := client.Awake(nil)
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Awake(nil).Load(map[string]any{"id": "awake_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AwakeEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## BadgeEntity

```go
badge := client.Badge(nil)
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Badge(nil).Load(map[string]any{"id": "badge_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `BadgeEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ClassEntity

```go
class := client.Class(nil)
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Class(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Class(nil).Load(map[string]any{"id": "class_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ClassEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## CoreEntity

```go
core := client.Core(nil)
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Core(nil).Load(map[string]any{"id": "core_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CoreEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## CoupleEntity

```go
couple := client.Couple(nil)
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Couple(nil).Load(map[string]any{"id": "couple_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CoupleEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## DungeonEntity

```go
dungeon := client.Dungeon(nil)
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Dungeon(nil).Load(map[string]any{"id": "dungeon_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DungeonEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ElementEntity

```go
element := client.Element(nil)
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Element(nil).Load(map[string]any{"id": "element_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ElementEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## EquipmentSetEntity

```go
equipment_set := client.EquipmentSet(nil)
```

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.EquipmentSet(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.EquipmentSet(nil).Load(map[string]any{"id": "equipment_set_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `EquipmentSetEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ExchangeMenusEntity

```go
exchange_menus := client.ExchangeMenus(nil)
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.ExchangeMenus(nil).Load(map[string]any{"id": "exchange_menus_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ExchangeMenusEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## HousingPackEntity

```go
housing_pack := client.HousingPack(nil)
```

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.HousingPack(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.HousingPack(nil).Load(map[string]any{"id": "housing_pack_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `HousingPackEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## HousingTemplateEntity

```go
housing_template := client.HousingTemplate(nil)
```

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.HousingTemplate(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.HousingTemplate(nil).Load(map[string]any{"id": "housing_template_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `HousingTemplateEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ItemEntity

```go
item := client.Item(nil)
```

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Item(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Item(nil).Load(map[string]any{"id": "item_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ItemEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## LanguageEntity

```go
language := client.Language(nil)
```

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Language(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Language(nil).Load(map[string]any{"id": "language_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `LanguageEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## LifestyleEntity

```go
lifestyle := client.Lifestyle(nil)
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Lifestyle(nil).Load(map[string]any{"id": "lifestyle_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `LifestyleEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## MonsterEntity

```go
monster := client.Monster(nil)
```

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Monster(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Monster(nil).Load(map[string]any{"id": "monster_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `MonsterEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## NpcEntity

```go
npc := client.Npc(nil)
```

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Npc(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Npc(nil).Load(map[string]any{"id": "npc_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `NpcEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## PartySkillEntity

```go
party_skill := client.PartySkill(nil)
```

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.PartySkill(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.PartySkill(nil).Load(map[string]any{"id": "party_skill_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PartySkillEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## PknEntity

```go
pkn := client.Pkn(nil)
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Pkn(nil).Load(map[string]any{"id": "pkn_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PknEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## PlaceEntity

```go
place := client.Place(nil)
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Place(nil).Load(map[string]any{"id": "place_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PlaceEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## QuestEntity

```go
quest := client.Quest(nil)
```

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Quest(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Quest(nil).Load(map[string]any{"id": "quest_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `QuestEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## RaisedPetEntity

```go
raised_pet := client.RaisedPet(nil)
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.RaisedPet(nil).Load(map[string]any{"id": "raised_pet_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `RaisedPetEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## RecipeEntity

```go
recipe := client.Recipe(nil)
```

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Recipe(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Recipe(nil).Load(map[string]any{"id": "recipe_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `RecipeEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## SkillEntity

```go
skill := client.Skill(nil)
```

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Skill(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Skill(nil).Load(map[string]any{"id": "skill_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `SkillEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## UpgradeLevelBonusEntity

```go
upgrade_level_bonus := client.UpgradeLevelBonus(nil)
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.UpgradeLevelBonus(nil).Load(map[string]any{"id": "upgrade_level_bonus_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `UpgradeLevelBonusEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## VersionEntity

```go
version := client.Version(nil)
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Version(nil).Load(map[string]any{"id": "version_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `VersionEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## WorldEntity

```go
world := client.World(nil)
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.World(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.World(nil).Load(map[string]any{"id": "world_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `WorldEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewFlyffGameSDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```

