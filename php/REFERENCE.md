# FlyffGame PHP SDK Reference

Complete API reference for the FlyffGame PHP SDK.


## FlyffGameSDK

### Constructor

```php
require_once __DIR__ . '/flyffgame_sdk.php';

$client = new FlyffGameSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `FlyffGameSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = FlyffGameSDK::test();
```


### Instance Methods

#### `Achievement($data = null)`

Create a new `AchievementEntity` instance. Pass `null` for no initial data.

#### `Awake($data = null)`

Create a new `AwakeEntity` instance. Pass `null` for no initial data.

#### `Badge($data = null)`

Create a new `BadgeEntity` instance. Pass `null` for no initial data.

#### `Class($data = null)`

Create a new `ClassEntity` instance. Pass `null` for no initial data.

#### `Core($data = null)`

Create a new `CoreEntity` instance. Pass `null` for no initial data.

#### `Couple($data = null)`

Create a new `CoupleEntity` instance. Pass `null` for no initial data.

#### `Dungeon($data = null)`

Create a new `DungeonEntity` instance. Pass `null` for no initial data.

#### `Element($data = null)`

Create a new `ElementEntity` instance. Pass `null` for no initial data.

#### `EquipmentSet($data = null)`

Create a new `EquipmentSetEntity` instance. Pass `null` for no initial data.

#### `ExchangeMenus($data = null)`

Create a new `ExchangeMenusEntity` instance. Pass `null` for no initial data.

#### `HousingPack($data = null)`

Create a new `HousingPackEntity` instance. Pass `null` for no initial data.

#### `HousingTemplate($data = null)`

Create a new `HousingTemplateEntity` instance. Pass `null` for no initial data.

#### `Item($data = null)`

Create a new `ItemEntity` instance. Pass `null` for no initial data.

#### `Language($data = null)`

Create a new `LanguageEntity` instance. Pass `null` for no initial data.

#### `Lifestyle($data = null)`

Create a new `LifestyleEntity` instance. Pass `null` for no initial data.

#### `Monster($data = null)`

Create a new `MonsterEntity` instance. Pass `null` for no initial data.

#### `Npc($data = null)`

Create a new `NpcEntity` instance. Pass `null` for no initial data.

#### `PartySkill($data = null)`

Create a new `PartySkillEntity` instance. Pass `null` for no initial data.

#### `Pkn($data = null)`

Create a new `PknEntity` instance. Pass `null` for no initial data.

#### `Place($data = null)`

Create a new `PlaceEntity` instance. Pass `null` for no initial data.

#### `Quest($data = null)`

Create a new `QuestEntity` instance. Pass `null` for no initial data.

#### `RaisedPet($data = null)`

Create a new `RaisedPetEntity` instance. Pass `null` for no initial data.

#### `Recipe($data = null)`

Create a new `RecipeEntity` instance. Pass `null` for no initial data.

#### `Skill($data = null)`

Create a new `SkillEntity` instance. Pass `null` for no initial data.

#### `UpgradeLevelBonus($data = null)`

Create a new `UpgradeLevelBonusEntity` instance. Pass `null` for no initial data.

#### `Version($data = null)`

Create a new `VersionEntity` instance. Pass `null` for no initial data.

#### `World($data = null)`

Create a new `WorldEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): FlyffGameUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## AchievementEntity

```php
$achievement = $client->Achievement();
```

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Achievement()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Achievement()->load(["id" => "achievement_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AchievementEntity`

Create a new `AchievementEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AwakeEntity

```php
$awake = $client->Awake();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Awake()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AwakeEntity`

Create a new `AwakeEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## BadgeEntity

```php
$badge = $client->Badge();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Badge()->load(["id" => "badge_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): BadgeEntity`

Create a new `BadgeEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ClassEntity

```php
$class = $client->Class();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attackSpeed` | `float` | Yes |  |
| `autoAttackFactors` | `array` | Yes |  |
| `block` | `float` | Yes |  |
| `critical` | `float` | Yes |  |
| `defense` | `float` | Yes |  |
| `fp` | `float` | Yes |  |
| `hp` | `float` | Yes |  |
| `icon` | `string` | Yes |  |
| `id` | `int` | Yes |  |
| `magicDefenseIntFactor` | `float` | Yes |  |
| `magicDefenseStaFactor` | `float` | Yes |  |
| `maxFP` | `string` | Yes |  |
| `maxHP` | `string` | Yes |  |
| `maxLevel` | `int` | Yes |  |
| `maxMP` | `string` | Yes |  |
| `minLevel` | `int` | Yes |  |
| `mp` | `float` | Yes |  |
| `name` | `array` | Yes |  |
| `parent` | `int` | No |  |
| `tree` | `string` | Yes |  |
| `type` | `string` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Class()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Class()->load(["id" => "class_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ClassEntity`

Create a new `ClassEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CoreEntity

```php
$core = $client->Core();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Core()->load(["parameter_id" => "parameter_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CoreEntity`

Create a new `CoreEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CoupleEntity

```php
$couple = $client->Couple();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Couple()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CoupleEntity`

Create a new `CoupleEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## DungeonEntity

```php
$dungeon = $client->Dungeon();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Dungeon()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): DungeonEntity`

Create a new `DungeonEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ElementEntity

```php
$element = $client->Element();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Element()->load(["id" => "element_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ElementEntity`

Create a new `ElementEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## EquipmentSetEntity

```php
$equipment_set = $client->EquipmentSet();
```

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->EquipmentSet()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->EquipmentSet()->load(["equipment_set_id" => "equipment_set_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): EquipmentSetEntity`

Create a new `EquipmentSetEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ExchangeMenusEntity

```php
$exchange_menus = $client->ExchangeMenus();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->ExchangeMenus()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ExchangeMenusEntity`

Create a new `ExchangeMenusEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## HousingPackEntity

```php
$housing_pack = $client->HousingPack();
```

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->HousingPack()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->HousingPack()->load(["housing_pack_id" => "housing_pack_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): HousingPackEntity`

Create a new `HousingPackEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## HousingTemplateEntity

```php
$housing_template = $client->HousingTemplate();
```

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->HousingTemplate()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->HousingTemplate()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): HousingTemplateEntity`

Create a new `HousingTemplateEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ItemEntity

```php
$item = $client->Item();
```

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Item()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Item()->load(["id" => "item_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ItemEntity`

Create a new `ItemEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## LanguageEntity

```php
$language = $client->Language();
```

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Language()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Language()->load(["language_code" => "language_code"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): LanguageEntity`

Create a new `LanguageEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## LifestyleEntity

```php
$lifestyle = $client->Lifestyle();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Lifestyle()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): LifestyleEntity`

Create a new `LifestyleEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## MonsterEntity

```php
$monster = $client->Monster();
```

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Monster()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Monster()->load(["id" => "monster_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): MonsterEntity`

Create a new `MonsterEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## NpcEntity

```php
$npc = $client->Npc();
```

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Npc()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Npc()->load(["id" => "npc_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): NpcEntity`

Create a new `NpcEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PartySkillEntity

```php
$party_skill = $client->PartySkill();
```

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->PartySkill()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->PartySkill()->load(["party_skill_id" => "party_skill_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PartySkillEntity`

Create a new `PartySkillEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PknEntity

```php
$pkn = $client->Pkn();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Pkn()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PknEntity`

Create a new `PknEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PlaceEntity

```php
$place = $client->Place();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Place()->load(["id" => "place_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PlaceEntity`

Create a new `PlaceEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## QuestEntity

```php
$quest = $client->Quest();
```

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Quest()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Quest()->load(["id" => "quest_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): QuestEntity`

Create a new `QuestEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## RaisedPetEntity

```php
$raised_pet = $client->RaisedPet();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->RaisedPet()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): RaisedPetEntity`

Create a new `RaisedPetEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## RecipeEntity

```php
$recipe = $client->Recipe();
```

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Recipe()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Recipe()->load(["id" => "recipe_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): RecipeEntity`

Create a new `RecipeEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## SkillEntity

```php
$skill = $client->Skill();
```

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Skill()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Skill()->load(["id" => "skill_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): SkillEntity`

Create a new `SkillEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## UpgradeLevelBonusEntity

```php
$upgrade_level_bonus = $client->UpgradeLevelBonus();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->UpgradeLevelBonus()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): UpgradeLevelBonusEntity`

Create a new `UpgradeLevelBonusEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## VersionEntity

```php
$version = $client->Version();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Version()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): VersionEntity`

Create a new `VersionEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## WorldEntity

```php
$world = $client->World();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `continents` | `array` | Yes |  |
| `flying` | `bool` | Yes |  |
| `height` | `int` | Yes |  |
| `id` | `int` | Yes |  |
| `inDoor` | `bool` | Yes |  |
| `lodestars` | `array` | Yes |  |
| `name` | `array` | Yes |  |
| `pk` | `bool` | Yes |  |
| `places` | `array` | Yes |  |
| `revivalKey` | `string` | No |  |
| `revivalWorld` | `int` | No |  |
| `tileName` | `string` | Yes |  |
| `tileSize` | `int` | Yes |  |
| `type` | `string` | Yes |  |
| `width` | `int` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->World()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->World()->load(["id" => "world_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): WorldEntity`

Create a new `WorldEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new FlyffGameSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

