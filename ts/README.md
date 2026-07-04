# FlyffGame TypeScript SDK



The TypeScript SDK for the FlyffGame API — a type-safe, entity-oriented client with full async/await support.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/flyff-game-sdk/releases](https://github.com/voxgig-sdk/flyff-game-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { FlyffGameSDK } from '@voxgig-sdk/flyff-game'

const client = new FlyffGameSDK()
```

### 2. List achievement records

`list()` resolves to an array of Achievement objects — iterate it directly:

```ts
const achievements = await client.Achievement().list()

for (const achievement of achievements) {
  console.log(achievement)
}
```

### 3. Load an achievement

`load()` returns the entity directly and throws on failure:

```ts
try {
  const achievement = await client.Achievement().load({ id: 'example_id' })
  console.log(achievement)
} catch (err) {
  console.error('load failed:', err)
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result instanceof Error) {
  throw result
}
if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = FlyffGameSDK.test()

const achievement = await client.Achievement().load({ id: 'test01' })
// achievement is a bare entity populated with mock response data
console.log(achievement)
```

You can also use the instance method:

```ts
const client = new FlyffGameSDK()
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Achievement()

// First call sets internal match
await entity.load({ id: 'example' })

// Subsequent calls reuse the stored match
const data = entity.data()
console.log(data.id) // 'example'
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new FlyffGameSDK({
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
FLYFF_GAME_TEST_LIVE=TRUE
```

Then run:

```bash
cd ts && npm test
```


## Reference

### FlyffGameSDK

#### Constructor

```ts
new FlyffGameSDK(options?: {
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Achievement(data?)` | `AchievementEntity` | Create an Achievement entity instance. |
| `Awake(data?)` | `AwakeEntity` | Create an Awake entity instance. |
| `Badge(data?)` | `BadgeEntity` | Create a Badge entity instance. |
| `Class(data?)` | `ClassEntity` | Create a Class entity instance. |
| `Core(data?)` | `CoreEntity` | Create a Core entity instance. |
| `Couple(data?)` | `CoupleEntity` | Create a Couple entity instance. |
| `Dungeon(data?)` | `DungeonEntity` | Create a Dungeon entity instance. |
| `Element(data?)` | `ElementEntity` | Create an Element entity instance. |
| `EquipmentSet(data?)` | `EquipmentSetEntity` | Create an EquipmentSet entity instance. |
| `ExchangeMenus(data?)` | `ExchangeMenusEntity` | Create an ExchangeMenus entity instance. |
| `HousingPack(data?)` | `HousingPackEntity` | Create a HousingPack entity instance. |
| `HousingTemplate(data?)` | `HousingTemplateEntity` | Create a HousingTemplate entity instance. |
| `Item(data?)` | `ItemEntity` | Create an Item entity instance. |
| `Language(data?)` | `LanguageEntity` | Create a Language entity instance. |
| `Lifestyle(data?)` | `LifestyleEntity` | Create a Lifestyle entity instance. |
| `Monster(data?)` | `MonsterEntity` | Create a Monster entity instance. |
| `Npc(data?)` | `NpcEntity` | Create a Npc entity instance. |
| `PartySkill(data?)` | `PartySkillEntity` | Create a PartySkill entity instance. |
| `Pkn(data?)` | `PknEntity` | Create a Pkn entity instance. |
| `Place(data?)` | `PlaceEntity` | Create a Place entity instance. |
| `Quest(data?)` | `QuestEntity` | Create a Quest entity instance. |
| `RaisedPet(data?)` | `RaisedPetEntity` | Create a RaisedPet entity instance. |
| `Recipe(data?)` | `RecipeEntity` | Create a Recipe entity instance. |
| `Skill(data?)` | `SkillEntity` | Create a Skill entity instance. |
| `UpgradeLevelBonus(data?)` | `UpgradeLevelBonusEntity` | Create an UpgradeLevelBonus entity instance. |
| `Version(data?)` | `VersionEntity` | Create a Version entity instance. |
| `World(data?)` | `WorldEntity` | Create a World entity instance. |
| `tester(testopts?, sdkopts?)` | `FlyffGameSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `FlyffGameSDK.test(testopts?, sdkopts?)` | `FlyffGameSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria. |
| `create` | `create(reqdata?, ctrl?): Promise<Entity>` | Create a new entity. |
| `update` | `update(reqdata?, ctrl?): Promise<Entity>` | Update an existing entity. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<void>` | Remove an entity. |
| `data` | `data(data?): any` | Get or set entity data. |
| `match` | `match(match?): any` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): FlyffGameSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load`, `create` and `update` resolve to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).
- `remove` resolves to `void`.

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### Achievement

| Field | Description |
| --- | --- |

Operations: list, load.

API path: `/achievement`

#### Awake

| Field | Description |
| --- | --- |

Operations: load.

API path: `/awake/skill`

#### Badge

| Field | Description |
| --- | --- |

Operations: load.

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

Operations: list, load.

API path: `/class`

#### Core

| Field | Description |
| --- | --- |

Operations: load.

API path: `/parameter/{parameterIds}`

#### Couple

| Field | Description |
| --- | --- |

Operations: load.

API path: `/couple`

#### Dungeon

| Field | Description |
| --- | --- |

Operations: load.

API path: `/dungeon`

#### Element

| Field | Description |
| --- | --- |

Operations: load.

API path: `/image/element/{fileName}`

#### EquipmentSet

| Field | Description |
| --- | --- |

Operations: list, load.

API path: `/equipmentset`

#### ExchangeMenus

| Field | Description |
| --- | --- |

Operations: load.

API path: `/exchangemenu`

#### HousingPack

| Field | Description |
| --- | --- |

Operations: list, load.

API path: `/housingpack`

#### HousingTemplate

| Field | Description |
| --- | --- |

Operations: list, load.

API path: `/housingtemplate`

#### Item

| Field | Description |
| --- | --- |

Operations: list, load.

API path: `/item`

#### Language

| Field | Description |
| --- | --- |

Operations: list, load.

API path: `/language`

#### Lifestyle

| Field | Description |
| --- | --- |

Operations: load.

API path: `/lifestyle`

#### Monster

| Field | Description |
| --- | --- |

Operations: list, load.

API path: `/monster`

#### Npc

| Field | Description |
| --- | --- |

Operations: list, load.

API path: `/npc`

#### PartySkill

| Field | Description |
| --- | --- |

Operations: list, load.

API path: `/partyskill`

#### Pkn

| Field | Description |
| --- | --- |

Operations: load.

API path: `/pk`

#### Place

| Field | Description |
| --- | --- |

Operations: load.

API path: `/image/place/{fileName}`

#### Quest

| Field | Description |
| --- | --- |

Operations: list, load.

API path: `/quest`

#### RaisedPet

| Field | Description |
| --- | --- |

Operations: load.

API path: `/raisedpet`

#### Recipe

| Field | Description |
| --- | --- |

Operations: list, load.

API path: `/recipe`

#### Skill

| Field | Description |
| --- | --- |

Operations: list, load.

API path: `/skill`

#### UpgradeLevelBonus

| Field | Description |
| --- | --- |

Operations: load.

API path: `/upgradelevelbonus`

#### Version

| Field | Description |
| --- | --- |

Operations: load.

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

Operations: list, load.

API path: `/world`



## Entities


### Achievement

Create an instance: `const achievement = client.Achievement()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const achievement = await client.Achievement().load({ id: 'achievement_id' })
```

#### Example: List

```ts
const achievements = await client.Achievement().list()
```


### Awake

Create an instance: `const awake = client.Awake()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const awake = await client.Awake().load({ id: 'awake_id' })
```


### Badge

Create an instance: `const badge = client.Badge()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const badge = await client.Badge().load({ id: 'badge_id' })
```


### Class

Create an instance: `const class = client.Class()`

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

```ts
const class = await client.Class().load({ id: 'class_id' })
```

#### Example: List

```ts
const classs = await client.Class().list()
```


### Core

Create an instance: `const core = client.Core()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const core = await client.Core().load({ id: 'core_id' })
```


### Couple

Create an instance: `const couple = client.Couple()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const couple = await client.Couple().load({ id: 'couple_id' })
```


### Dungeon

Create an instance: `const dungeon = client.Dungeon()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const dungeon = await client.Dungeon().load({ id: 'dungeon_id' })
```


### Element

Create an instance: `const element = client.Element()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const element = await client.Element().load({ id: 'element_id' })
```


### EquipmentSet

Create an instance: `const equipment_set = client.EquipmentSet()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const equipment_set = await client.EquipmentSet().load({ id: 'equipment_set_id' })
```

#### Example: List

```ts
const equipment_sets = await client.EquipmentSet().list()
```


### ExchangeMenus

Create an instance: `const exchange_menus = client.ExchangeMenus()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const exchange_menus = await client.ExchangeMenus().load({ id: 'exchange_menus_id' })
```


### HousingPack

Create an instance: `const housing_pack = client.HousingPack()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const housing_pack = await client.HousingPack().load({ id: 'housing_pack_id' })
```

#### Example: List

```ts
const housing_packs = await client.HousingPack().list()
```


### HousingTemplate

Create an instance: `const housing_template = client.HousingTemplate()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const housing_template = await client.HousingTemplate().load({ id: 'housing_template_id' })
```

#### Example: List

```ts
const housing_templates = await client.HousingTemplate().list()
```


### Item

Create an instance: `const item = client.Item()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const item = await client.Item().load({ id: 'item_id' })
```

#### Example: List

```ts
const items = await client.Item().list()
```


### Language

Create an instance: `const language = client.Language()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const language = await client.Language().load({ id: 'language_id' })
```

#### Example: List

```ts
const languages = await client.Language().list()
```


### Lifestyle

Create an instance: `const lifestyle = client.Lifestyle()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const lifestyle = await client.Lifestyle().load({ id: 'lifestyle_id' })
```


### Monster

Create an instance: `const monster = client.Monster()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const monster = await client.Monster().load({ id: 'monster_id' })
```

#### Example: List

```ts
const monsters = await client.Monster().list()
```


### Npc

Create an instance: `const npc = client.Npc()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const npc = await client.Npc().load({ id: 'npc_id' })
```

#### Example: List

```ts
const npcs = await client.Npc().list()
```


### PartySkill

Create an instance: `const party_skill = client.PartySkill()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const party_skill = await client.PartySkill().load({ id: 'party_skill_id' })
```

#### Example: List

```ts
const party_skills = await client.PartySkill().list()
```


### Pkn

Create an instance: `const pkn = client.Pkn()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const pkn = await client.Pkn().load({ id: 'pkn_id' })
```


### Place

Create an instance: `const place = client.Place()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const place = await client.Place().load({ id: 'place_id' })
```


### Quest

Create an instance: `const quest = client.Quest()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const quest = await client.Quest().load({ id: 'quest_id' })
```

#### Example: List

```ts
const quests = await client.Quest().list()
```


### RaisedPet

Create an instance: `const raised_pet = client.RaisedPet()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const raised_pet = await client.RaisedPet().load({ id: 'raised_pet_id' })
```


### Recipe

Create an instance: `const recipe = client.Recipe()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const recipe = await client.Recipe().load({ id: 'recipe_id' })
```

#### Example: List

```ts
const recipes = await client.Recipe().list()
```


### Skill

Create an instance: `const skill = client.Skill()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const skill = await client.Skill().load({ id: 'skill_id' })
```

#### Example: List

```ts
const skills = await client.Skill().list()
```


### UpgradeLevelBonus

Create an instance: `const upgrade_level_bonus = client.UpgradeLevelBonus()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const upgrade_level_bonus = await client.UpgradeLevelBonus().load({ id: 'upgrade_level_bonus_id' })
```


### Version

Create an instance: `const version = client.Version()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const version = await client.Version().load({ id: 'version_id' })
```


### World

Create an instance: `const world = client.World()`

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

```ts
const world = await client.World().load({ id: 'world_id' })
```

#### Example: List

```ts
const worlds = await client.World().list()
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
error is returned to the caller.

An unexpected exception triggers the `PreUnexpected` hook before
propagating.

### Features and hooks

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
flyff-game/
├── src/
│   ├── FlyffGameSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { FlyffGameSDK } from '@voxgig-sdk/flyff-game'
```

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const achievement = client.Achievement()
await achievement.load({ id: "example_id" })

// achievement.data() now returns the loaded achievement data
// achievement.match() returns { id: "example_id" }
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
