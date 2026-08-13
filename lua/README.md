# FlyffGame Lua SDK



The Lua SDK for the FlyffGame API — an entity-oriented client using Lua conventions.

It exposes the API as capitalised, semantic **Entities** — e.g. `client:Achievement()` — each with the same small set of operations (`list`, `load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to LuaRocks. Install it from the
GitHub release tag (`lua/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/flyff-game-sdk/releases)),
or add the source directory to your `LUA_PATH`:

```bash
export LUA_PATH="path/to/lua/?.lua;path/to/lua/?/init.lua;;"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```lua
local sdk = require("flyff-game_sdk")

local client = sdk.new()
```

### 2. List achievement records

Entity operations return `(value, err)`. For `list`, `value` is the
array of records itself — iterate it directly (there is no wrapper).

```lua
local achievements, err = client:Achievement():list()
if err then error(err) end

for _, item in ipairs(achievements) do
  print(item)
end
```

### 3. Load a core

Core is nested under parameter, so provide the `parameter_id`.

```lua
local core, err = client:Core():load({ parameter_id = "example_parameter_id" })
if err then error(err) end
print(core)
```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local dungeon, err = client:Dungeon():load()
if err then error(err) end
```

`direct` follows the same `(value, err)` convention:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example_id" },
})
if err then error(err) end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
if err then error(err) end

if result["ok"] then
  print(result["status"])  -- 200
  print(result["data"])    -- response body
end
```

### Prepare a request without sending it

```lua
local fetchdef, err = client:prepare({
  path = "/api/resource/{id}",
  method = "DELETE",
  params = { id = "example" },
})
if err then error(err) end

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```lua
local client = sdk.test()

local result, err = client:Dungeon():load()
-- result is the returned data; err is set on failure
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```lua
local function mock_fetch(url, init)
  return {
    status = 200,
    statusText = "OK",
    headers = {},
    json = function()
      return { id = "mock01" }
    end,
  }, nil
end

local client = sdk.new({
  base = "http://localhost:8080",
  system = {
    fetch = mock_fetch,
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
cd lua && busted test/
```


## Reference

### FlyffGameSDK

```lua
local sdk = require("flyff-game_sdk")
local client = sdk.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `table` | Feature activation flags. |
| `extend` | `table` | Additional Feature instances to load. |
| `system` | `table` | System overrides (e.g. custom `fetch` function). |

### test

```lua
local client = sdk.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### FlyffGameSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> table` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> table, err` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> table, err` | Build and send an HTTP request. |
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
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria. |
| `list` | `(reqmatch, ctrl) -> any, err` | List entities matching the criteria. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(value, err)`. The `value` is the operation's
data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `load` | the entity record (a `table`) |
| `list` | an array (`table`) of entity records |

Check `err` first (it is non-`nil` on failure), then use `value`:

    local achievement, err = client:Achievement():load({ id = "example_id" })
    if err then error(err) end
    -- achievement is the loaded record

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

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

Create an instance: `local achievement = client:Achievement(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local achievement, err = client:Achievement():load({ id = "achievement_id" })
```

#### Example: List

```lua
local achievements, err = client:Achievement():list()
```


### Awake

Create an instance: `local awake = client:Awake(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local awake, err = client:Awake():load()
```


### Badge

Create an instance: `local badge = client:Badge(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local badge, err = client:Badge():load({ id = "badge_id" })
```


### Class

Create an instance: `local class = client:Class(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attackSpeed` | `number` |  |
| `autoAttackFactors` | `table` |  |
| `block` | `number` |  |
| `critical` | `number` |  |
| `defense` | `number` |  |
| `fp` | `number` |  |
| `hp` | `number` |  |
| `icon` | `string` |  |
| `id` | `number` |  |
| `magicDefenseIntFactor` | `number` |  |
| `magicDefenseStaFactor` | `number` |  |
| `maxFP` | `string` |  |
| `maxHP` | `string` |  |
| `maxLevel` | `number` |  |
| `maxMP` | `string` |  |
| `minLevel` | `number` |  |
| `mp` | `number` |  |
| `name` | `table` |  |
| `parent` | `number` |  |
| `tree` | `string` |  |
| `type` | `string` |  |

#### Example: Load

```lua
local class, err = client:Class():load({ id = "class_id" })
```

#### Example: List

```lua
local classs, err = client:Class():list()
```


### Core

Create an instance: `local core = client:Core(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local core, err = client:Core():load({ parameter_id = "parameter_id" })
```


### Couple

Create an instance: `local couple = client:Couple(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local couple, err = client:Couple():load()
```


### Dungeon

Create an instance: `local dungeon = client:Dungeon(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local dungeon, err = client:Dungeon():load()
```


### Element

Create an instance: `local element = client:Element(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local element, err = client:Element():load({ id = "element_id" })
```


### EquipmentSet

Create an instance: `local equipment_set = client:EquipmentSet(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local equipment_set, err = client:EquipmentSet():load({ equipment_set_id = "equipment_set_id" })
```

#### Example: List

```lua
local equipment_sets, err = client:EquipmentSet():list()
```


### ExchangeMenus

Create an instance: `local exchange_menus = client:ExchangeMenus(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local exchange_menus, err = client:ExchangeMenus():load()
```


### HousingPack

Create an instance: `local housing_pack = client:HousingPack(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local housing_pack, err = client:HousingPack():load({ housing_pack_id = "housing_pack_id" })
```

#### Example: List

```lua
local housing_packs, err = client:HousingPack():list()
```


### HousingTemplate

Create an instance: `local housing_template = client:HousingTemplate(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local housing_template, err = client:HousingTemplate():load()
```

#### Example: List

```lua
local housing_templates, err = client:HousingTemplate():list()
```


### Item

Create an instance: `local item = client:Item(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local item, err = client:Item():load({ id = "item_id" })
```

#### Example: List

```lua
local items, err = client:Item():list()
```


### Language

Create an instance: `local language = client:Language(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local language, err = client:Language():load({ language_code = "language_code" })
```

#### Example: List

```lua
local languages, err = client:Language():list()
```


### Lifestyle

Create an instance: `local lifestyle = client:Lifestyle(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local lifestyle, err = client:Lifestyle():load()
```


### Monster

Create an instance: `local monster = client:Monster(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local monster, err = client:Monster():load({ id = "monster_id" })
```

#### Example: List

```lua
local monsters, err = client:Monster():list()
```


### Npc

Create an instance: `local npc = client:Npc(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local npc, err = client:Npc():load({ id = "npc_id" })
```

#### Example: List

```lua
local npcs, err = client:Npc():list()
```


### PartySkill

Create an instance: `local party_skill = client:PartySkill(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local party_skill, err = client:PartySkill():load({ party_skill_id = "party_skill_id" })
```

#### Example: List

```lua
local party_skills, err = client:PartySkill():list()
```


### Pkn

Create an instance: `local pkn = client:Pkn(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local pkn, err = client:Pkn():load()
```


### Place

Create an instance: `local place = client:Place(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local place, err = client:Place():load({ id = "place_id" })
```


### Quest

Create an instance: `local quest = client:Quest(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local quest, err = client:Quest():load({ id = "quest_id" })
```

#### Example: List

```lua
local quests, err = client:Quest():list()
```


### RaisedPet

Create an instance: `local raised_pet = client:RaisedPet(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local raised_pet, err = client:RaisedPet():load()
```


### Recipe

Create an instance: `local recipe = client:Recipe(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local recipe, err = client:Recipe():load({ id = "recipe_id" })
```

#### Example: List

```lua
local recipes, err = client:Recipe():list()
```


### Skill

Create an instance: `local skill = client:Skill(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local skill, err = client:Skill():load({ id = "skill_id" })
```

#### Example: List

```lua
local skills, err = client:Skill():list()
```


### UpgradeLevelBonus

Create an instance: `local upgrade_level_bonus = client:UpgradeLevelBonus(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local upgrade_level_bonus, err = client:UpgradeLevelBonus():load()
```


### Version

Create an instance: `local version = client:Version(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local version, err = client:Version():load()
```


### World

Create an instance: `local world = client:World(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `continents` | `table` |  |
| `flying` | `boolean` |  |
| `height` | `number` |  |
| `id` | `number` |  |
| `inDoor` | `boolean` |  |
| `lodestars` | `table` |  |
| `name` | `table` |  |
| `pk` | `boolean` |  |
| `places` | `table` |  |
| `revivalKey` | `string` |  |
| `revivalWorld` | `number` |  |
| `tileName` | `string` |  |
| `tileSize` | `number` |  |
| `type` | `string` |  |
| `width` | `number` |  |

#### Example: Load

```lua
local world, err = client:World():load({ id = "world_id" })
```

#### Example: List

```lua
local worlds, err = client:World():list()
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

Features are the extension mechanism. A feature is a Lua table
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as tables

The Lua SDK uses plain Lua tables throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a table.

### Module structure

```
lua/
├── flyff-game_sdk.lua    -- Main SDK module
├── config.lua               -- Configuration
├── features.lua             -- Feature factory
├── core/                    -- Core types and context
├── entity/                  -- Entity implementations
├── feature/                 -- Built-in features (Base, Test, Log)
├── utility/                 -- Utility functions and struct library
└── test/                    -- Test suites
```

The main module (`flyff-game_sdk`) exports the SDK constructor
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```lua
local dungeon = client:Dungeon()
dungeon:load()

-- dungeon:data_get() now returns the dungeon data from the last load
-- dungeon:match_get() returns the last match criteria
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
