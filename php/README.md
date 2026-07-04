# FlyffGame PHP SDK



The PHP SDK for the FlyffGame API — an entity-oriented client using PHP conventions.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/flyff-game-sdk/releases](https://github.com/voxgig-sdk/flyff-game-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'flyffgame_sdk.php';

$client = new FlyffGameSDK();
```

### 2. List achievements

```php
try {
    $result = $client->achievement()->list();
    if (is_array($result)) {
        foreach ($result as $item) {
            $d = $item->data_get();
            echo $d["id"] . " " . $d["name"] . "\n";
        }
    }
} catch (\Exception $err) {
    echo "Error: " . $err->getMessage();
}
```

### 3. Load an achievement

```php
try {
    $result = $client->achievement()->load(["id" => "example_id"]);
    print_r($result);
} catch (\Exception $err) {
    echo "Error: " . $err->getMessage();
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    echo "Error: " . $result["err"]->getMessage();
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required:

```php
$client = FlyffGameSDK::test();

$result = $client->achievement()->load(["id" => "test01"]);
// $result contains mock response data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new FlyffGameSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
FLYFF_GAME_TEST_LIVE=TRUE
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### FlyffGameSDK

```php
require_once 'flyffgame_sdk.php';
$client = new FlyffGameSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = FlyffGameSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### FlyffGameSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `Achievement` | `($data): AchievementEntity` | Create a Achievement entity instance. |
| `Awake` | `($data): AwakeEntity` | Create a Awake entity instance. |
| `Badge` | `($data): BadgeEntity` | Create a Badge entity instance. |
| `Class` | `($data): ClassEntity` | Create a Class entity instance. |
| `Core` | `($data): CoreEntity` | Create a Core entity instance. |
| `Couple` | `($data): CoupleEntity` | Create a Couple entity instance. |
| `Dungeon` | `($data): DungeonEntity` | Create a Dungeon entity instance. |
| `Element` | `($data): ElementEntity` | Create a Element entity instance. |
| `EquipmentSet` | `($data): EquipmentSetEntity` | Create a EquipmentSet entity instance. |
| `ExchangeMenus` | `($data): ExchangeMenusEntity` | Create a ExchangeMenus entity instance. |
| `HousingPack` | `($data): HousingPackEntity` | Create a HousingPack entity instance. |
| `HousingTemplate` | `($data): HousingTemplateEntity` | Create a HousingTemplate entity instance. |
| `Item` | `($data): ItemEntity` | Create a Item entity instance. |
| `Language` | `($data): LanguageEntity` | Create a Language entity instance. |
| `Lifestyle` | `($data): LifestyleEntity` | Create a Lifestyle entity instance. |
| `Monster` | `($data): MonsterEntity` | Create a Monster entity instance. |
| `Npc` | `($data): NpcEntity` | Create a Npc entity instance. |
| `PartySkill` | `($data): PartySkillEntity` | Create a PartySkill entity instance. |
| `Pkn` | `($data): PknEntity` | Create a Pkn entity instance. |
| `Place` | `($data): PlaceEntity` | Create a Place entity instance. |
| `Quest` | `($data): QuestEntity` | Create a Quest entity instance. |
| `RaisedPet` | `($data): RaisedPetEntity` | Create a RaisedPet entity instance. |
| `Recipe` | `($data): RecipeEntity` | Create a Recipe entity instance. |
| `Skill` | `($data): SkillEntity` | Create a Skill entity instance. |
| `UpgradeLevelBonus` | `($data): UpgradeLevelBonusEntity` | Create a UpgradeLevelBonus entity instance. |
| `Version` | `($data): VersionEntity` | Create a Version entity instance. |
| `World` | `($data): WorldEntity` | Create a World entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `list` | `($reqmatch, $ctrl): array` | List entities matching the criteria. |
| `create` | `($reqdata, $ctrl): array` | Create a new entity. |
| `update` | `($reqdata, $ctrl): array` | Update an existing entity. |
| `remove` | `($reqmatch, $ctrl): array` | Remove an entity. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the bare result data (an `array` for single-entity
ops, a `list` for `list`) and throw on error. Wrap calls in
`try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

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

Create an instance: `const achievement = client.achievement`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const achievement = await client.achievement.load({ id: 'achievement_id' })
```

#### Example: List

```ts
const achievements = await client.achievement.list()
```


### Awake

Create an instance: `const awake = client.awake`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const awake = await client.awake.load({ id: 'awake_id' })
```


### Badge

Create an instance: `const badge = client.badge`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const badge = await client.badge.load({ id: 'badge_id' })
```


### Class

Create an instance: `const class = client.class`

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
const class = await client.class.load({ id: 'class_id' })
```

#### Example: List

```ts
const classs = await client.class.list()
```


### Core

Create an instance: `const core = client.core`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const core = await client.core.load({ id: 'core_id' })
```


### Couple

Create an instance: `const couple = client.couple`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const couple = await client.couple.load({ id: 'couple_id' })
```


### Dungeon

Create an instance: `const dungeon = client.dungeon`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const dungeon = await client.dungeon.load({ id: 'dungeon_id' })
```


### Element

Create an instance: `const element = client.element`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const element = await client.element.load({ id: 'element_id' })
```


### EquipmentSet

Create an instance: `const equipment_set = client.equipment_set`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const equipment_set = await client.equipment_set.load({ id: 'equipment_set_id' })
```

#### Example: List

```ts
const equipment_sets = await client.equipment_set.list()
```


### ExchangeMenus

Create an instance: `const exchange_menus = client.exchange_menus`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const exchange_menus = await client.exchange_menus.load({ id: 'exchange_menus_id' })
```


### HousingPack

Create an instance: `const housing_pack = client.housing_pack`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const housing_pack = await client.housing_pack.load({ id: 'housing_pack_id' })
```

#### Example: List

```ts
const housing_packs = await client.housing_pack.list()
```


### HousingTemplate

Create an instance: `const housing_template = client.housing_template`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const housing_template = await client.housing_template.load({ id: 'housing_template_id' })
```

#### Example: List

```ts
const housing_templates = await client.housing_template.list()
```


### Item

Create an instance: `const item = client.item`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const item = await client.item.load({ id: 'item_id' })
```

#### Example: List

```ts
const items = await client.item.list()
```


### Language

Create an instance: `const language = client.language`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const language = await client.language.load({ id: 'language_id' })
```

#### Example: List

```ts
const languages = await client.language.list()
```


### Lifestyle

Create an instance: `const lifestyle = client.lifestyle`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const lifestyle = await client.lifestyle.load({ id: 'lifestyle_id' })
```


### Monster

Create an instance: `const monster = client.monster`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const monster = await client.monster.load({ id: 'monster_id' })
```

#### Example: List

```ts
const monsters = await client.monster.list()
```


### Npc

Create an instance: `const npc = client.npc`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const npc = await client.npc.load({ id: 'npc_id' })
```

#### Example: List

```ts
const npcs = await client.npc.list()
```


### PartySkill

Create an instance: `const party_skill = client.party_skill`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const party_skill = await client.party_skill.load({ id: 'party_skill_id' })
```

#### Example: List

```ts
const party_skills = await client.party_skill.list()
```


### Pkn

Create an instance: `const pkn = client.pkn`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const pkn = await client.pkn.load({ id: 'pkn_id' })
```


### Place

Create an instance: `const place = client.place`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const place = await client.place.load({ id: 'place_id' })
```


### Quest

Create an instance: `const quest = client.quest`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const quest = await client.quest.load({ id: 'quest_id' })
```

#### Example: List

```ts
const quests = await client.quest.list()
```


### RaisedPet

Create an instance: `const raised_pet = client.raised_pet`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const raised_pet = await client.raised_pet.load({ id: 'raised_pet_id' })
```


### Recipe

Create an instance: `const recipe = client.recipe`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const recipe = await client.recipe.load({ id: 'recipe_id' })
```

#### Example: List

```ts
const recipes = await client.recipe.list()
```


### Skill

Create an instance: `const skill = client.skill`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const skill = await client.skill.load({ id: 'skill_id' })
```

#### Example: List

```ts
const skills = await client.skill.list()
```


### UpgradeLevelBonus

Create an instance: `const upgrade_level_bonus = client.upgrade_level_bonus`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const upgrade_level_bonus = await client.upgrade_level_bonus.load({ id: 'upgrade_level_bonus_id' })
```


### Version

Create an instance: `const version = client.version`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const version = await client.version.load({ id: 'version_id' })
```


### World

Create an instance: `const world = client.world`

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
const world = await client.world.load({ id: 'world_id' })
```

#### Example: List

```ts
const worlds = await client.world.list()
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
error is returned to the caller as the second element in the return array.

### Features and hooks

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── flyffgame_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`flyffgame_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```php
$achievement = $client->achievement();
$achievement->load(["id" => "example_id"]);

// $achievement->dataGet() now returns the loaded achievement data
// $achievement->matchGet() returns the last match criteria
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
