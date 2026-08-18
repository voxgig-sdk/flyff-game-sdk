# FlyffGame PHP SDK



The PHP SDK for the FlyffGame API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->Achievement()` — with named operations (`list`/`load`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

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

### 2. List achievement records

```php
try {
    // list() returns an array of Achievement records — iterate directly.
    $achievements = $client->Achievement()->list();
    foreach ($achievements as $item) {
        echo json_encode($item) . "\n";
    }
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

### 3. Load a core

Core is nested under parameter, so provide the `parameter_id`.

```php
try {
    // load() returns the ENTITY — call data_get() for the Core record (throws on error).
    $core = $client->Core()->load(["parameter_id" => "example_parameter_id"]);
    print_r($core);
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $dungeon = $client->Dungeon()->load();
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
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
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
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

// Entity ops return the ENTITY (throws on error);
// call data_get() for the mock record.
$dungeon = $client->Dungeon()->load();
print_r($dungeon);
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
| `Achievement` | `($data): AchievementEntity` | Create an Achievement entity instance. |
| `Awake` | `($data): AwakeEntity` | Create an Awake entity instance. |
| `Badge` | `($data): BadgeEntity` | Create a Badge entity instance. |
| `Class` | `($data): ClassEntity` | Create a Class entity instance. |
| `Core` | `($data): CoreEntity` | Create a Core entity instance. |
| `Couple` | `($data): CoupleEntity` | Create a Couple entity instance. |
| `Dungeon` | `($data): DungeonEntity` | Create a Dungeon entity instance. |
| `Element` | `($data): ElementEntity` | Create an Element entity instance. |
| `EquipmentSet` | `($data): EquipmentSetEntity` | Create an EquipmentSet entity instance. |
| `ExchangeMenus` | `($data): ExchangeMenusEntity` | Create an ExchangeMenus entity instance. |
| `HousingPack` | `($data): HousingPackEntity` | Create a HousingPack entity instance. |
| `HousingTemplate` | `($data): HousingTemplateEntity` | Create a HousingTemplate entity instance. |
| `Item` | `($data): ItemEntity` | Create an Item entity instance. |
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
| `UpgradeLevelBonus` | `($data): UpgradeLevelBonusEntity` | Create an UpgradeLevelBonus entity instance. |
| `Version` | `($data): VersionEntity` | Create a Version entity instance. |
| `World` | `($data): WorldEntity` | Create a World entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `list` | `(?array $reqmatch = null, $ctrl): array` | List entities matching the criteria (call with no argument to list all). |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (an `array` for single-entity
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

Create an instance: `$achievement = $client->Achievement();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Achievement record (throws on error).
$achievement = $client->Achievement()->load(["id" => "achievement_id"]);
```

#### Example: List

```php
// list() returns an array of Achievement records (throws on error).
$achievements = $client->Achievement()->list();
```


### Awake

Create an instance: `$awake = $client->Awake();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Awake record (throws on error).
$awake = $client->Awake()->load();
```


### Badge

Create an instance: `$badge = $client->Badge();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Badge record (throws on error).
$badge = $client->Badge()->load(["id" => "badge_id"]);
```


### Class

Create an instance: `$class = $client->Class();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attackSpeed` | `float` |  |
| `autoAttackFactors` | `array` |  |
| `block` | `float` |  |
| `critical` | `float` |  |
| `defense` | `float` |  |
| `fp` | `float` |  |
| `hp` | `float` |  |
| `icon` | `string` |  |
| `id` | `int` |  |
| `magicDefenseIntFactor` | `float` |  |
| `magicDefenseStaFactor` | `float` |  |
| `maxFP` | `string` |  |
| `maxHP` | `string` |  |
| `maxLevel` | `int` |  |
| `maxMP` | `string` |  |
| `minLevel` | `int` |  |
| `mp` | `float` |  |
| `name` | `array` |  |
| `parent` | `int` |  |
| `tree` | `string` |  |
| `type` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Class record (throws on error).
$class = $client->Class()->load(["id" => "class_id"]);
```

#### Example: List

```php
// list() returns an array of Class records (throws on error).
$classs = $client->Class()->list();
```


### Core

Create an instance: `$core = $client->Core();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Core record (throws on error).
$core = $client->Core()->load(["parameter_id" => "parameter_id"]);
```


### Couple

Create an instance: `$couple = $client->Couple();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Couple record (throws on error).
$couple = $client->Couple()->load();
```


### Dungeon

Create an instance: `$dungeon = $client->Dungeon();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Dungeon record (throws on error).
$dungeon = $client->Dungeon()->load();
```


### Element

Create an instance: `$element = $client->Element();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Element record (throws on error).
$element = $client->Element()->load(["id" => "element_id"]);
```


### EquipmentSet

Create an instance: `$equipment_set = $client->EquipmentSet();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the EquipmentSet record (throws on error).
$equipment_set = $client->EquipmentSet()->load(["equipment_set_id" => "equipment_set_id"]);
```

#### Example: List

```php
// list() returns an array of EquipmentSet records (throws on error).
$equipment_sets = $client->EquipmentSet()->list();
```


### ExchangeMenus

Create an instance: `$exchange_menus = $client->ExchangeMenus();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the ExchangeMenus record (throws on error).
$exchange_menus = $client->ExchangeMenus()->load();
```


### HousingPack

Create an instance: `$housing_pack = $client->HousingPack();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the HousingPack record (throws on error).
$housing_pack = $client->HousingPack()->load(["housing_pack_id" => "housing_pack_id"]);
```

#### Example: List

```php
// list() returns an array of HousingPack records (throws on error).
$housing_packs = $client->HousingPack()->list();
```


### HousingTemplate

Create an instance: `$housing_template = $client->HousingTemplate();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the HousingTemplate record (throws on error).
$housing_template = $client->HousingTemplate()->load(["housing_template_id" => "housing_template_id"]);
```

#### Example: List

```php
// list() returns an array of HousingTemplate records (throws on error).
$housing_templates = $client->HousingTemplate()->list();
```


### Item

Create an instance: `$item = $client->Item();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Item record (throws on error).
$item = $client->Item()->load(["id" => "item_id"]);
```

#### Example: List

```php
// list() returns an array of Item records (throws on error).
$items = $client->Item()->list();
```


### Language

Create an instance: `$language = $client->Language();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Language record (throws on error).
$language = $client->Language()->load(["language_code" => "language_code"]);
```

#### Example: List

```php
// list() returns an array of Language records (throws on error).
$languages = $client->Language()->list();
```


### Lifestyle

Create an instance: `$lifestyle = $client->Lifestyle();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Lifestyle record (throws on error).
$lifestyle = $client->Lifestyle()->load();
```


### Monster

Create an instance: `$monster = $client->Monster();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Monster record (throws on error).
$monster = $client->Monster()->load(["id" => "monster_id"]);
```

#### Example: List

```php
// list() returns an array of Monster records (throws on error).
$monsters = $client->Monster()->list();
```


### Npc

Create an instance: `$npc = $client->Npc();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Npc record (throws on error).
$npc = $client->Npc()->load(["id" => "npc_id"]);
```

#### Example: List

```php
// list() returns an array of Npc records (throws on error).
$npcs = $client->Npc()->list();
```


### PartySkill

Create an instance: `$party_skill = $client->PartySkill();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the PartySkill record (throws on error).
$party_skill = $client->PartySkill()->load(["party_skill_id" => "party_skill_id"]);
```

#### Example: List

```php
// list() returns an array of PartySkill records (throws on error).
$party_skills = $client->PartySkill()->list();
```


### Pkn

Create an instance: `$pkn = $client->Pkn();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Pkn record (throws on error).
$pkn = $client->Pkn()->load();
```


### Place

Create an instance: `$place = $client->Place();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Place record (throws on error).
$place = $client->Place()->load(["id" => "place_id"]);
```


### Quest

Create an instance: `$quest = $client->Quest();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Quest record (throws on error).
$quest = $client->Quest()->load(["id" => "quest_id"]);
```

#### Example: List

```php
// list() returns an array of Quest records (throws on error).
$quests = $client->Quest()->list();
```


### RaisedPet

Create an instance: `$raised_pet = $client->RaisedPet();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the RaisedPet record (throws on error).
$raised_pet = $client->RaisedPet()->load();
```


### Recipe

Create an instance: `$recipe = $client->Recipe();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Recipe record (throws on error).
$recipe = $client->Recipe()->load(["id" => "recipe_id"]);
```

#### Example: List

```php
// list() returns an array of Recipe records (throws on error).
$recipes = $client->Recipe()->list();
```


### Skill

Create an instance: `$skill = $client->Skill();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Skill record (throws on error).
$skill = $client->Skill()->load(["id" => "skill_id"]);
```

#### Example: List

```php
// list() returns an array of Skill records (throws on error).
$skills = $client->Skill()->list();
```


### UpgradeLevelBonus

Create an instance: `$upgrade_level_bonus = $client->UpgradeLevelBonus();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the UpgradeLevelBonus record (throws on error).
$upgrade_level_bonus = $client->UpgradeLevelBonus()->load();
```


### Version

Create an instance: `$version = $client->Version();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Version record (throws on error).
$version = $client->Version()->load();
```


### World

Create an instance: `$world = $client->World();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `continents` | `array` |  |
| `flying` | `bool` |  |
| `height` | `int` |  |
| `id` | `int` |  |
| `inDoor` | `bool` |  |
| `lodestars` | `array` |  |
| `name` | `array` |  |
| `pk` | `bool` |  |
| `places` | `array` |  |
| `revivalKey` | `string` |  |
| `revivalWorld` | `int` |  |
| `tileName` | `string` |  |
| `tileSize` | `int` |  |
| `type` | `string` |  |
| `width` | `int` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the World record (throws on error).
$world = $client->World()->load(["id" => "world_id"]);
```

#### Example: List

```php
// list() returns an array of World records (throws on error).
$worlds = $client->World()->list();
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
$dungeon = $client->Dungeon();
$dungeon->load();

// $dungeon->data_get() now returns the dungeon data from the last load
// $dungeon->match_get() returns the last match criteria
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
