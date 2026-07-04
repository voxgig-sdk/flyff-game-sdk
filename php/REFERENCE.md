# FlyffGame PHP SDK Reference

Complete API reference for the FlyffGame PHP SDK.


## FlyffGameSDK

### Constructor

```php
require_once __DIR__ . '/flyff-game_sdk.php';

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

#### `optionsMap(): array`

Return a deep copy of the current SDK options.

#### `getUtility(): ProjectNameUtility`

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
$achievement = $client->achievement();
```

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->achievement()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->achievement()->load(["id" => "achievement_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): AchievementEntity`

Create a new `AchievementEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## AwakeEntity

```php
$awake = $client->awake();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->awake()->load(["id" => "awake_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): AwakeEntity`

Create a new `AwakeEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## BadgeEntity

```php
$badge = $client->badge();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->badge()->load(["id" => "badge_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): BadgeEntity`

Create a new `BadgeEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## ClassEntity

```php
$class = $client->class();
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

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->class()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->class()->load(["id" => "class_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): ClassEntity`

Create a new `ClassEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## CoreEntity

```php
$core = $client->core();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->core()->load(["id" => "core_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): CoreEntity`

Create a new `CoreEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## CoupleEntity

```php
$couple = $client->couple();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->couple()->load(["id" => "couple_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): CoupleEntity`

Create a new `CoupleEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## DungeonEntity

```php
$dungeon = $client->dungeon();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->dungeon()->load(["id" => "dungeon_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): DungeonEntity`

Create a new `DungeonEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## ElementEntity

```php
$element = $client->element();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->element()->load(["id" => "element_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): ElementEntity`

Create a new `ElementEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## EquipmentSetEntity

```php
$equipment_set = $client->equipment_set();
```

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->equipment_set()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->equipment_set()->load(["id" => "equipment_set_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): EquipmentSetEntity`

Create a new `EquipmentSetEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## ExchangeMenusEntity

```php
$exchange_menus = $client->exchange_menus();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->exchange_menus()->load(["id" => "exchange_menus_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): ExchangeMenusEntity`

Create a new `ExchangeMenusEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## HousingPackEntity

```php
$housing_pack = $client->housing_pack();
```

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->housing_pack()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->housing_pack()->load(["id" => "housing_pack_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): HousingPackEntity`

Create a new `HousingPackEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## HousingTemplateEntity

```php
$housing_template = $client->housing_template();
```

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->housing_template()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->housing_template()->load(["id" => "housing_template_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): HousingTemplateEntity`

Create a new `HousingTemplateEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## ItemEntity

```php
$item = $client->item();
```

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->item()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->item()->load(["id" => "item_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): ItemEntity`

Create a new `ItemEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## LanguageEntity

```php
$language = $client->language();
```

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->language()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->language()->load(["id" => "language_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): LanguageEntity`

Create a new `LanguageEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## LifestyleEntity

```php
$lifestyle = $client->lifestyle();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->lifestyle()->load(["id" => "lifestyle_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): LifestyleEntity`

Create a new `LifestyleEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## MonsterEntity

```php
$monster = $client->monster();
```

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->monster()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->monster()->load(["id" => "monster_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): MonsterEntity`

Create a new `MonsterEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## NpcEntity

```php
$npc = $client->npc();
```

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->npc()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->npc()->load(["id" => "npc_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): NpcEntity`

Create a new `NpcEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## PartySkillEntity

```php
$party_skill = $client->party_skill();
```

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->party_skill()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->party_skill()->load(["id" => "party_skill_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): PartySkillEntity`

Create a new `PartySkillEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## PknEntity

```php
$pkn = $client->pkn();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->pkn()->load(["id" => "pkn_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): PknEntity`

Create a new `PknEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## PlaceEntity

```php
$place = $client->place();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->place()->load(["id" => "place_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): PlaceEntity`

Create a new `PlaceEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## QuestEntity

```php
$quest = $client->quest();
```

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->quest()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->quest()->load(["id" => "quest_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): QuestEntity`

Create a new `QuestEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## RaisedPetEntity

```php
$raised_pet = $client->raised_pet();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->raised_pet()->load(["id" => "raised_pet_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): RaisedPetEntity`

Create a new `RaisedPetEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## RecipeEntity

```php
$recipe = $client->recipe();
```

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->recipe()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->recipe()->load(["id" => "recipe_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): RecipeEntity`

Create a new `RecipeEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## SkillEntity

```php
$skill = $client->skill();
```

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->skill()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->skill()->load(["id" => "skill_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): SkillEntity`

Create a new `SkillEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## UpgradeLevelBonusEntity

```php
$upgrade_level_bonus = $client->upgrade_level_bonus();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->upgrade_level_bonus()->load(["id" => "upgrade_level_bonus_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): UpgradeLevelBonusEntity`

Create a new `UpgradeLevelBonusEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## VersionEntity

```php
$version = $client->version();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->version()->load(["id" => "version_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): VersionEntity`

Create a new `VersionEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## WorldEntity

```php
$world = $client->world();
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

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->world()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->world()->load(["id" => "world_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): WorldEntity`

Create a new `WorldEntity` instance with the same client and
options.

#### `getName(): string`

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

