# FlyffGame Python SDK



The Python SDK for the FlyffGame API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Achievement()` — each
carrying a small, uniform set of operations (`list`, `load`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

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
    achievements = client.Achievement().list()
    for achievement in achievements:
        print(achievement)
except Exception as err:
    print(f"list failed: {err}")
```

### 3. Load a core

Core is nested under parameter, so provide the `parameter_id`.
`load()` returns the ENTITY — call data_get() for the record — and raises on error.

```python
try:
    core = client.Core().load({"parameter_id": "example_parameter_id"})
    print(core)
except Exception as err:
    print(f"load failed: {err}")
```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    dungeon = client.Dungeon().load()
    print(dungeon)
except Exception as err:
    print(f"load failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
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
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
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

# Entity ops return the ENTITY and raises on error;
# call data_get() for the record.
dungeon = client.Dungeon().load()
# dungeon contains the mock response record
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
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (a `dict` for single-entity
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
| `attackSpeed` |  |
| `autoAttackFactors` |  |
| `block` |  |
| `critical` |  |
| `defense` |  |
| `fp` |  |
| `hp` |  |
| `icon` |  |
| `id` |  |
| `magicDefenseIntFactor` |  |
| `magicDefenseStaFactor` |  |
| `maxFP` |  |
| `maxHP` |  |
| `maxLevel` |  |
| `maxMP` |  |
| `minLevel` |  |
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
| `continents` |  |
| `flying` |  |
| `height` |  |
| `id` |  |
| `inDoor` |  |
| `lodestars` |  |
| `name` |  |
| `pk` |  |
| `places` |  |
| `revivalKey` |  |
| `revivalWorld` |  |
| `tileName` |  |
| `tileSize` |  |
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
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
achievement = client.Achievement().load({"id": "achievement_id"})
```

#### Example: List

```python
achievements = client.Achievement().list()
```


### Awake

Create an instance: `awake = client.Awake()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
awake = client.Awake().load()
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

Create an instance: `class_ = client.Class()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attackSpeed` | `float` |  |
| `autoAttackFactors` | `dict` |  |
| `block` | `float` |  |
| `critical` | `float` |  |
| `defense` | `float` |  |
| `fp` | `float` |  |
| `hp` | `float` |  |
| `icon` | `str` |  |
| `id` | `int` |  |
| `magicDefenseIntFactor` | `float` |  |
| `magicDefenseStaFactor` | `float` |  |
| `maxFP` | `str` |  |
| `maxHP` | `str` |  |
| `maxLevel` | `int` |  |
| `maxMP` | `str` |  |
| `minLevel` | `int` |  |
| `mp` | `float` |  |
| `name` | `dict` |  |
| `parent` | `int` |  |
| `tree` | `str` |  |
| `type` | `str` |  |

#### Example: Load

```python
class_ = client.Class().load({"id": "class_id"})
```

#### Example: List

```python
class_s = client.Class().list()
```


### Core

Create an instance: `core = client.Core()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
core = client.Core().load({"parameter_id": "parameter_id"})
```


### Couple

Create an instance: `couple = client.Couple()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
couple = client.Couple().load()
```


### Dungeon

Create an instance: `dungeon = client.Dungeon()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
dungeon = client.Dungeon().load()
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
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
equipment_set = client.EquipmentSet().load({"equipment_set_id": "equipment_set_id"})
```

#### Example: List

```python
equipment_sets = client.EquipmentSet().list()
```


### ExchangeMenus

Create an instance: `exchange_menus = client.ExchangeMenus()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
exchange_menus = client.ExchangeMenus().load()
```


### HousingPack

Create an instance: `housing_pack = client.HousingPack()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
housing_pack = client.HousingPack().load({"housing_pack_id": "housing_pack_id"})
```

#### Example: List

```python
housing_packs = client.HousingPack().list()
```


### HousingTemplate

Create an instance: `housing_template = client.HousingTemplate()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
housing_template = client.HousingTemplate().load({"housing_template_id": "housing_template_id"})
```

#### Example: List

```python
housing_templates = client.HousingTemplate().list()
```


### Item

Create an instance: `item = client.Item()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
item = client.Item().load({"id": "item_id"})
```

#### Example: List

```python
items = client.Item().list()
```


### Language

Create an instance: `language = client.Language()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
language = client.Language().load({"language_code": "language_code"})
```

#### Example: List

```python
languages = client.Language().list()
```


### Lifestyle

Create an instance: `lifestyle = client.Lifestyle()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
lifestyle = client.Lifestyle().load()
```


### Monster

Create an instance: `monster = client.Monster()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
monster = client.Monster().load({"id": "monster_id"})
```

#### Example: List

```python
monsters = client.Monster().list()
```


### Npc

Create an instance: `npc = client.Npc()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
npc = client.Npc().load({"id": "npc_id"})
```

#### Example: List

```python
npcs = client.Npc().list()
```


### PartySkill

Create an instance: `party_skill = client.PartySkill()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
party_skill = client.PartySkill().load({"party_skill_id": "party_skill_id"})
```

#### Example: List

```python
party_skills = client.PartySkill().list()
```


### Pkn

Create an instance: `pkn = client.Pkn()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
pkn = client.Pkn().load()
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
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
quest = client.Quest().load({"id": "quest_id"})
```

#### Example: List

```python
quests = client.Quest().list()
```


### RaisedPet

Create an instance: `raised_pet = client.RaisedPet()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
raised_pet = client.RaisedPet().load()
```


### Recipe

Create an instance: `recipe = client.Recipe()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
recipe = client.Recipe().load({"id": "recipe_id"})
```

#### Example: List

```python
recipes = client.Recipe().list()
```


### Skill

Create an instance: `skill = client.Skill()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
skill = client.Skill().load({"id": "skill_id"})
```

#### Example: List

```python
skills = client.Skill().list()
```


### UpgradeLevelBonus

Create an instance: `upgrade_level_bonus = client.UpgradeLevelBonus()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
upgrade_level_bonus = client.UpgradeLevelBonus().load()
```


### Version

Create an instance: `version = client.Version()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
version = client.Version().load()
```


### World

Create an instance: `world = client.World()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `continents` | `list` |  |
| `flying` | `bool` |  |
| `height` | `int` |  |
| `id` | `int` |  |
| `inDoor` | `bool` |  |
| `lodestars` | `list` |  |
| `name` | `dict` |  |
| `pk` | `bool` |  |
| `places` | `list` |  |
| `revivalKey` | `str` |  |
| `revivalWorld` | `int` |  |
| `tileName` | `str` |  |
| `tileSize` | `int` |  |
| `type` | `str` |  |
| `width` | `int` |  |

#### Example: Load

```python
world = client.World().load({"id": "world_id"})
```

#### Example: List

```python
worlds = client.World().list()
```


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

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

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

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
dungeon = client.Dungeon()
dungeon.load()

# dungeon.data_get() now returns the dungeon data from the last load
# dungeon.match_get() returns the last match criteria
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
