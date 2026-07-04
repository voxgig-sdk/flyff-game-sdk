# FlyffGame Python SDK



The Python SDK for the FlyffGame API — an entity-oriented client following Pythonic conventions.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/flyff-game-sdk/releases)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
from flyffgame_sdk import FlyffGameSDK

client = FlyffGameSDK()
```

### 2. List achievement records

`list()` returns a `list` of records (each a `dict`) and raises on
error — iterate it directly.

```python
try:
    achievements = client.Achievement().list({})
    for achievement in achievements:
        print(achievement)
except Exception as err:
    print(f"list failed: {err}")
```

### 3. Load an achievement

`load()` returns the bare record (a `dict`) and raises on error.

```python
try:
    achievement = client.Achievement().load({"id": "example_id"})
    print(achievement)
except Exception as err:
    print(f"load failed: {err}")
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    print(result["err"])     # error value
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = FlyffGameSDK.test()

# Entity ops return the bare record and raise on error.
achievement = client.Achievement().load({"id": "test01"})
# achievement contains the mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = FlyffGameSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
    },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
FLYFF_GAME_TEST_LIVE=TRUE
```

Then run:

```bash
cd py && pytest test/
```


## Reference

### FlyffGameSDK

```python
from flyffgame_sdk import FlyffGameSDK

client = FlyffGameSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = FlyffGameSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### FlyffGameSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
| `Achievement` | `(data) -> AchievementEntity` | Create an Achievement entity instance. |
| `Awake` | `(data) -> AwakeEntity` | Create an Awake entity instance. |
| `Badge` | `(data) -> BadgeEntity` | Create a Badge entity instance. |
| `Class` | `(data) -> ClassEntity` | Create a Class entity instance. |
| `Core` | `(data) -> CoreEntity` | Create a Core entity instance. |
| `Couple` | `(data) -> CoupleEntity` | Create a Couple entity instance. |
| `Dungeon` | `(data) -> DungeonEntity` | Create a Dungeon entity instance. |
| `Element` | `(data) -> ElementEntity` | Create an Element entity instance. |
| `EquipmentSet` | `(data) -> EquipmentSetEntity` | Create an EquipmentSet entity instance. |
| `ExchangeMenus` | `(data) -> ExchangeMenusEntity` | Create an ExchangeMenus entity instance. |
| `HousingPack` | `(data) -> HousingPackEntity` | Create a HousingPack entity instance. |
| `HousingTemplate` | `(data) -> HousingTemplateEntity` | Create a HousingTemplate entity instance. |
| `Item` | `(data) -> ItemEntity` | Create an Item entity instance. |
| `Language` | `(data) -> LanguageEntity` | Create a Language entity instance. |
| `Lifestyle` | `(data) -> LifestyleEntity` | Create a Lifestyle entity instance. |
| `Monster` | `(data) -> MonsterEntity` | Create a Monster entity instance. |
| `Npc` | `(data) -> NpcEntity` | Create a Npc entity instance. |
| `PartySkill` | `(data) -> PartySkillEntity` | Create a PartySkill entity instance. |
| `Pkn` | `(data) -> PknEntity` | Create a Pkn entity instance. |
| `Place` | `(data) -> PlaceEntity` | Create a Place entity instance. |
| `Quest` | `(data) -> QuestEntity` | Create a Quest entity instance. |
| `RaisedPet` | `(data) -> RaisedPetEntity` | Create a RaisedPet entity instance. |
| `Recipe` | `(data) -> RecipeEntity` | Create a Recipe entity instance. |
| `Skill` | `(data) -> SkillEntity` | Create a Skill entity instance. |
| `UpgradeLevelBonus` | `(data) -> UpgradeLevelBonusEntity` | Create an UpgradeLevelBonus entity instance. |
| `Version` | `(data) -> VersionEntity` | Create a Version entity instance. |
| `World` | `(data) -> WorldEntity` | Create a World entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `update` | `(reqdata, ctrl) -> any` | Update an existing entity. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the bare result data (a `dict` for single-entity
ops, a `list` for `list`) and raise on error. Wrap calls in
`try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

### Entities

#### Achievement

| Field | Description |
| --- | --- |

Operations: List, Load.

API path: `/achievement`

#### Awake

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/awake/skill`

#### Badge

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/image/badge/{fileName}`

#### Class

| Field | Description |
| --- | --- |
| `attack_speed` |  |
| `auto_attack_factor` |  |
| `block` |  |
| `critical` |  |
| `defense` |  |
| `fp` |  |
| `hp` |  |
| `icon` |  |
| `id` |  |
| `magic_defense_int_factor` |  |
| `magic_defense_sta_factor` |  |
| `max_fp` |  |
| `max_hp` |  |
| `max_level` |  |
| `max_mp` |  |
| `min_level` |  |
| `mp` |  |
| `name` |  |
| `parent` |  |
| `tree` |  |
| `type` |  |

Operations: List, Load.

API path: `/class`

#### Core

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/parameter/{parameterIds}`

#### Couple

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/couple`

#### Dungeon

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/dungeon`

#### Element

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/image/element/{fileName}`

#### EquipmentSet

| Field | Description |
| --- | --- |

Operations: List, Load.

API path: `/equipmentset`

#### ExchangeMenus

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/exchangemenu`

#### HousingPack

| Field | Description |
| --- | --- |

Operations: List, Load.

API path: `/housingpack`

#### HousingTemplate

| Field | Description |
| --- | --- |

Operations: List, Load.

API path: `/housingtemplate`

#### Item

| Field | Description |
| --- | --- |

Operations: List, Load.

API path: `/item`

#### Language

| Field | Description |
| --- | --- |

Operations: List, Load.

API path: `/language`

#### Lifestyle

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/lifestyle`

#### Monster

| Field | Description |
| --- | --- |

Operations: List, Load.

API path: `/monster`

#### Npc

| Field | Description |
| --- | --- |

Operations: List, Load.

API path: `/npc`

#### PartySkill

| Field | Description |
| --- | --- |

Operations: List, Load.

API path: `/partyskill`

#### Pkn

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/pk`

#### Place

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/image/place/{fileName}`

#### Quest

| Field | Description |
| --- | --- |

Operations: List, Load.

API path: `/quest`

#### RaisedPet

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/raisedpet`

#### Recipe

| Field | Description |
| --- | --- |

Operations: List, Load.

API path: `/recipe`

#### Skill

| Field | Description |
| --- | --- |

Operations: List, Load.

API path: `/skill`

#### UpgradeLevelBonus

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/upgradelevelbonus`

#### Version

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/version/api`

#### World

| Field | Description |
| --- | --- |
| `continent` |  |
| `flying` |  |
| `height` |  |
| `id` |  |
| `in_door` |  |
| `lodestar` |  |
| `name` |  |
| `pk` |  |
| `place` |  |
| `revival_key` |  |
| `revival_world` |  |
| `tile_name` |  |
| `tile_size` |  |
| `type` |  |
| `width` |  |

Operations: List, Load.

API path: `/world`



## Entities


### Achievement

Create an instance: `achievement = client.Achievement()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
achievement = client.Achievement().load({"id": "achievement_id"})
```

#### Example: List

```python
achievements = client.Achievement().list({})
```


### Awake

Create an instance: `awake = client.Awake()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
awake = client.Awake().load({"id": "awake_id"})
```


### Badge

Create an instance: `badge = client.Badge()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
badge = client.Badge().load({"id": "badge_id"})
```


### Class

Create an instance: `class = client.Class()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attack_speed` | ``$NUMBER`` |  |
| `auto_attack_factor` | ``$OBJECT`` |  |
| `block` | ``$NUMBER`` |  |
| `critical` | ``$NUMBER`` |  |
| `defense` | ``$NUMBER`` |  |
| `fp` | ``$NUMBER`` |  |
| `hp` | ``$NUMBER`` |  |
| `icon` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `magic_defense_int_factor` | ``$NUMBER`` |  |
| `magic_defense_sta_factor` | ``$NUMBER`` |  |
| `max_fp` | ``$STRING`` |  |
| `max_hp` | ``$STRING`` |  |
| `max_level` | ``$INTEGER`` |  |
| `max_mp` | ``$STRING`` |  |
| `min_level` | ``$INTEGER`` |  |
| `mp` | ``$NUMBER`` |  |
| `name` | ``$OBJECT`` |  |
| `parent` | ``$INTEGER`` |  |
| `tree` | ``$STRING`` |  |
| `type` | ``$STRING`` |  |

#### Example: Load

```python
class = client.Class().load({"id": "class_id"})
```

#### Example: List

```python
classs = client.Class().list({})
```


### Core

Create an instance: `core = client.Core()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
core = client.Core().load({"id": "core_id"})
```


### Couple

Create an instance: `couple = client.Couple()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
couple = client.Couple().load({"id": "couple_id"})
```


### Dungeon

Create an instance: `dungeon = client.Dungeon()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
dungeon = client.Dungeon().load({"id": "dungeon_id"})
```


### Element

Create an instance: `element = client.Element()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
element = client.Element().load({"id": "element_id"})
```


### EquipmentSet

Create an instance: `equipment_set = client.EquipmentSet()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
equipment_set = client.EquipmentSet().load({"id": "equipment_set_id"})
```

#### Example: List

```python
equipment_sets = client.EquipmentSet().list({})
```


### ExchangeMenus

Create an instance: `exchange_menus = client.ExchangeMenus()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
exchange_menus = client.ExchangeMenus().load({"id": "exchange_menus_id"})
```


### HousingPack

Create an instance: `housing_pack = client.HousingPack()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
housing_pack = client.HousingPack().load({"id": "housing_pack_id"})
```

#### Example: List

```python
housing_packs = client.HousingPack().list({})
```


### HousingTemplate

Create an instance: `housing_template = client.HousingTemplate()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
housing_template = client.HousingTemplate().load({"id": "housing_template_id"})
```

#### Example: List

```python
housing_templates = client.HousingTemplate().list({})
```


### Item

Create an instance: `item = client.Item()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
item = client.Item().load({"id": "item_id"})
```

#### Example: List

```python
items = client.Item().list({})
```


### Language

Create an instance: `language = client.Language()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
language = client.Language().load({"id": "language_id"})
```

#### Example: List

```python
languages = client.Language().list({})
```


### Lifestyle

Create an instance: `lifestyle = client.Lifestyle()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
lifestyle = client.Lifestyle().load({"id": "lifestyle_id"})
```


### Monster

Create an instance: `monster = client.Monster()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
monster = client.Monster().load({"id": "monster_id"})
```

#### Example: List

```python
monsters = client.Monster().list({})
```


### Npc

Create an instance: `npc = client.Npc()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
npc = client.Npc().load({"id": "npc_id"})
```

#### Example: List

```python
npcs = client.Npc().list({})
```


### PartySkill

Create an instance: `party_skill = client.PartySkill()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
party_skill = client.PartySkill().load({"id": "party_skill_id"})
```

#### Example: List

```python
party_skills = client.PartySkill().list({})
```


### Pkn

Create an instance: `pkn = client.Pkn()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
pkn = client.Pkn().load({"id": "pkn_id"})
```


### Place

Create an instance: `place = client.Place()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
place = client.Place().load({"id": "place_id"})
```


### Quest

Create an instance: `quest = client.Quest()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
quest = client.Quest().load({"id": "quest_id"})
```

#### Example: List

```python
quests = client.Quest().list({})
```


### RaisedPet

Create an instance: `raised_pet = client.RaisedPet()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
raised_pet = client.RaisedPet().load({"id": "raised_pet_id"})
```


### Recipe

Create an instance: `recipe = client.Recipe()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
recipe = client.Recipe().load({"id": "recipe_id"})
```

#### Example: List

```python
recipes = client.Recipe().list({})
```


### Skill

Create an instance: `skill = client.Skill()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
skill = client.Skill().load({"id": "skill_id"})
```

#### Example: List

```python
skills = client.Skill().list({})
```


### UpgradeLevelBonus

Create an instance: `upgrade_level_bonus = client.UpgradeLevelBonus()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
upgrade_level_bonus = client.UpgradeLevelBonus().load({"id": "upgrade_level_bonus_id"})
```


### Version

Create an instance: `version = client.Version()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
version = client.Version().load({"id": "version_id"})
```


### World

Create an instance: `world = client.World()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `continent` | ``$ARRAY`` |  |
| `flying` | ``$BOOLEAN`` |  |
| `height` | ``$INTEGER`` |  |
| `id` | ``$INTEGER`` |  |
| `in_door` | ``$BOOLEAN`` |  |
| `lodestar` | ``$ARRAY`` |  |
| `name` | ``$OBJECT`` |  |
| `pk` | ``$BOOLEAN`` |  |
| `place` | ``$ARRAY`` |  |
| `revival_key` | ``$STRING`` |  |
| `revival_world` | ``$INTEGER`` |  |
| `tile_name` | ``$STRING`` |  |
| `tile_size` | ``$INTEGER`` |  |
| `type` | ``$STRING`` |  |
| `width` | ``$INTEGER`` |  |

#### Example: Load

```python
world = client.World().load({"id": "world_id"})
```

#### Example: List

```python
worlds = client.World().list({})
```


## Explanation

### The operation pipeline

Every entity operation (load, list, create, update, remove) follows a
six-stage pipeline. Each stage fires a feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage returns an error, the pipeline short-circuits and the
error is returned to the caller as the second element in the return tuple.

### Features and hooks

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── flyffgame_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`flyffgame_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```python
achievement = client.Achievement()
achievement.load({"id": "example_id"})

# achievement.data_get() now returns the loaded achievement data
# achievement.match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
