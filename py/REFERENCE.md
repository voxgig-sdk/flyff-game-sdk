# FlyffGame Python SDK Reference

Complete API reference for the FlyffGame Python SDK.


## FlyffGameSDK

### Constructor

```python
from flyffgame_sdk import FlyffGameSDK

client = FlyffGameSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `FlyffGameSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = FlyffGameSDK.test()
```


### Instance Methods

#### `Achievement(data=None)`

Create a new `AchievementEntity` instance. Pass `None` for no initial data.

#### `Awake(data=None)`

Create a new `AwakeEntity` instance. Pass `None` for no initial data.

#### `Badge(data=None)`

Create a new `BadgeEntity` instance. Pass `None` for no initial data.

#### `Class(data=None)`

Create a new `ClassEntity` instance. Pass `None` for no initial data.

#### `Core(data=None)`

Create a new `CoreEntity` instance. Pass `None` for no initial data.

#### `Couple(data=None)`

Create a new `CoupleEntity` instance. Pass `None` for no initial data.

#### `Dungeon(data=None)`

Create a new `DungeonEntity` instance. Pass `None` for no initial data.

#### `Element(data=None)`

Create a new `ElementEntity` instance. Pass `None` for no initial data.

#### `EquipmentSet(data=None)`

Create a new `EquipmentSetEntity` instance. Pass `None` for no initial data.

#### `ExchangeMenus(data=None)`

Create a new `ExchangeMenusEntity` instance. Pass `None` for no initial data.

#### `HousingPack(data=None)`

Create a new `HousingPackEntity` instance. Pass `None` for no initial data.

#### `HousingTemplate(data=None)`

Create a new `HousingTemplateEntity` instance. Pass `None` for no initial data.

#### `Item(data=None)`

Create a new `ItemEntity` instance. Pass `None` for no initial data.

#### `Language(data=None)`

Create a new `LanguageEntity` instance. Pass `None` for no initial data.

#### `Lifestyle(data=None)`

Create a new `LifestyleEntity` instance. Pass `None` for no initial data.

#### `Monster(data=None)`

Create a new `MonsterEntity` instance. Pass `None` for no initial data.

#### `Npc(data=None)`

Create a new `NpcEntity` instance. Pass `None` for no initial data.

#### `PartySkill(data=None)`

Create a new `PartySkillEntity` instance. Pass `None` for no initial data.

#### `Pkn(data=None)`

Create a new `PknEntity` instance. Pass `None` for no initial data.

#### `Place(data=None)`

Create a new `PlaceEntity` instance. Pass `None` for no initial data.

#### `Quest(data=None)`

Create a new `QuestEntity` instance. Pass `None` for no initial data.

#### `RaisedPet(data=None)`

Create a new `RaisedPetEntity` instance. Pass `None` for no initial data.

#### `Recipe(data=None)`

Create a new `RecipeEntity` instance. Pass `None` for no initial data.

#### `Skill(data=None)`

Create a new `SkillEntity` instance. Pass `None` for no initial data.

#### `UpgradeLevelBonus(data=None)`

Create a new `UpgradeLevelBonusEntity` instance. Pass `None` for no initial data.

#### `Version(data=None)`

Create a new `VersionEntity` instance. Pass `None` for no initial data.

#### `World(data=None)`

Create a new `WorldEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## AchievementEntity

```python
achievement = client.Achievement()
```

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Achievement().list()
for achievement in results:
    print(achievement)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Achievement().load({"id": "achievement_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AchievementEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AwakeEntity

```python
awake = client.Awake()
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Awake().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AwakeEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## BadgeEntity

```python
badge = client.Badge()
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Badge().load({"id": "badge_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BadgeEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ClassEntity

```python
class_ = client.Class()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attack_speed` | `float` | Yes |  |
| `auto_attack_factor` | `dict` | Yes |  |
| `block` | `float` | Yes |  |
| `critical` | `float` | Yes |  |
| `defense` | `float` | Yes |  |
| `fp` | `float` | Yes |  |
| `hp` | `float` | Yes |  |
| `icon` | `str` | Yes |  |
| `id` | `int` | Yes |  |
| `magic_defense_int_factor` | `float` | Yes |  |
| `magic_defense_sta_factor` | `float` | Yes |  |
| `max_fp` | `str` | Yes |  |
| `max_hp` | `str` | Yes |  |
| `max_level` | `int` | Yes |  |
| `max_mp` | `str` | Yes |  |
| `min_level` | `int` | Yes |  |
| `mp` | `float` | Yes |  |
| `name` | `dict` | Yes |  |
| `parent` | `int` | No |  |
| `tree` | `str` | Yes |  |
| `type` | `str` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Class().list()
for class_ in results:
    print(class_)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Class().load({"id": "class_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ClassEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CoreEntity

```python
core = client.Core()
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Core().load({"parameter_id": "parameter_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CoreEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CoupleEntity

```python
couple = client.Couple()
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Couple().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CoupleEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DungeonEntity

```python
dungeon = client.Dungeon()
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Dungeon().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DungeonEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ElementEntity

```python
element = client.Element()
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Element().load({"id": "element_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ElementEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## EquipmentSetEntity

```python
equipment_set = client.EquipmentSet()
```

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.EquipmentSet().list()
for equipment_set in results:
    print(equipment_set)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.EquipmentSet().load({"equipment_set_id": "equipment_set_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EquipmentSetEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ExchangeMenusEntity

```python
exchange_menus = client.ExchangeMenus()
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.ExchangeMenus().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ExchangeMenusEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## HousingPackEntity

```python
housing_pack = client.HousingPack()
```

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.HousingPack().list()
for housing_pack in results:
    print(housing_pack)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.HousingPack().load({"housing_pack_id": "housing_pack_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `HousingPackEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## HousingTemplateEntity

```python
housing_template = client.HousingTemplate()
```

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.HousingTemplate().list()
for housing_template in results:
    print(housing_template)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.HousingTemplate().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `HousingTemplateEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ItemEntity

```python
item = client.Item()
```

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Item().list()
for item in results:
    print(item)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Item().load({"id": "item_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ItemEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## LanguageEntity

```python
language = client.Language()
```

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Language().list()
for language in results:
    print(language)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Language().load({"language_code": "language_code"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LanguageEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## LifestyleEntity

```python
lifestyle = client.Lifestyle()
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Lifestyle().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LifestyleEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## MonsterEntity

```python
monster = client.Monster()
```

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Monster().list()
for monster in results:
    print(monster)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Monster().load({"id": "monster_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MonsterEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## NpcEntity

```python
npc = client.Npc()
```

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Npc().list()
for npc in results:
    print(npc)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Npc().load({"id": "npc_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `NpcEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PartySkillEntity

```python
party_skill = client.PartySkill()
```

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.PartySkill().list()
for party_skill in results:
    print(party_skill)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.PartySkill().load({"party_skill_id": "party_skill_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PartySkillEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PknEntity

```python
pkn = client.Pkn()
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Pkn().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PknEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PlaceEntity

```python
place = client.Place()
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Place().load({"id": "place_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PlaceEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## QuestEntity

```python
quest = client.Quest()
```

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Quest().list()
for quest in results:
    print(quest)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Quest().load({"id": "quest_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `QuestEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## RaisedPetEntity

```python
raised_pet = client.RaisedPet()
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.RaisedPet().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RaisedPetEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## RecipeEntity

```python
recipe = client.Recipe()
```

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Recipe().list()
for recipe in results:
    print(recipe)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Recipe().load({"id": "recipe_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RecipeEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SkillEntity

```python
skill = client.Skill()
```

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Skill().list()
for skill in results:
    print(skill)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Skill().load({"id": "skill_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SkillEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## UpgradeLevelBonusEntity

```python
upgrade_level_bonus = client.UpgradeLevelBonus()
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.UpgradeLevelBonus().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `UpgradeLevelBonusEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## VersionEntity

```python
version = client.Version()
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Version().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VersionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## WorldEntity

```python
world = client.World()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `continent` | `list` | Yes |  |
| `flying` | `bool` | Yes |  |
| `height` | `int` | Yes |  |
| `id` | `int` | Yes |  |
| `in_door` | `bool` | Yes |  |
| `lodestar` | `list` | Yes |  |
| `name` | `dict` | Yes |  |
| `pk` | `bool` | Yes |  |
| `place` | `list` | Yes |  |
| `revival_key` | `str` | No |  |
| `revival_world` | `int` | No |  |
| `tile_name` | `str` | Yes |  |
| `tile_size` | `int` | Yes |  |
| `type` | `str` | Yes |  |
| `width` | `int` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.World().list()
for world in results:
    print(world)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.World().load({"id": "world_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `WorldEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = FlyffGameSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

