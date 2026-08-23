# FlyffGame TypeScript SDK Reference

Complete API reference for the FlyffGame TypeScript SDK.


## FlyffGameSDK

### Constructor

```ts
new FlyffGameSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `FlyffGameSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = FlyffGameSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `FlyffGameSDK` instance in test mode.


### Instance Methods

#### `Achievement(data?: object)`

Create a new `Achievement` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AchievementEntity` instance.

#### `Awake(data?: object)`

Create a new `Awake` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AwakeEntity` instance.

#### `Badge(data?: object)`

Create a new `Badge` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BadgeEntity` instance.

#### `Class(data?: object)`

Create a new `Class` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ClassEntity` instance.

#### `Core(data?: object)`

Create a new `Core` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CoreEntity` instance.

#### `Couple(data?: object)`

Create a new `Couple` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CoupleEntity` instance.

#### `Dungeon(data?: object)`

Create a new `Dungeon` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DungeonEntity` instance.

#### `Element(data?: object)`

Create a new `Element` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ElementEntity` instance.

#### `EquipmentSet(data?: object)`

Create a new `EquipmentSet` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `EquipmentSetEntity` instance.

#### `ExchangeMenus(data?: object)`

Create a new `ExchangeMenus` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ExchangeMenusEntity` instance.

#### `HousingPack(data?: object)`

Create a new `HousingPack` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `HousingPackEntity` instance.

#### `HousingTemplate(data?: object)`

Create a new `HousingTemplate` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `HousingTemplateEntity` instance.

#### `Item(data?: object)`

Create a new `Item` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ItemEntity` instance.

#### `Language(data?: object)`

Create a new `Language` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `LanguageEntity` instance.

#### `Lifestyle(data?: object)`

Create a new `Lifestyle` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `LifestyleEntity` instance.

#### `Monster(data?: object)`

Create a new `Monster` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MonsterEntity` instance.

#### `Npc(data?: object)`

Create a new `Npc` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `NpcEntity` instance.

#### `PartySkill(data?: object)`

Create a new `PartySkill` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PartySkillEntity` instance.

#### `Pkn(data?: object)`

Create a new `Pkn` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PknEntity` instance.

#### `Place(data?: object)`

Create a new `Place` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PlaceEntity` instance.

#### `Quest(data?: object)`

Create a new `Quest` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `QuestEntity` instance.

#### `RaisedPet(data?: object)`

Create a new `RaisedPet` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `RaisedPetEntity` instance.

#### `Recipe(data?: object)`

Create a new `Recipe` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `RecipeEntity` instance.

#### `Skill(data?: object)`

Create a new `Skill` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SkillEntity` instance.

#### `UpgradeLevelBonus(data?: object)`

Create a new `UpgradeLevelBonus` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `UpgradeLevelBonusEntity` instance.

#### `Version(data?: object)`

Create a new `Version` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `VersionEntity` instance.

#### `World(data?: object)`

Create a new `World` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `WorldEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `FlyffGameSDK.test()`.

**Returns:** `FlyffGameSDK` instance in test mode.


---

## AchievementEntity

```ts
const achievement = client.Achievement()
```

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Achievement().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Achievement().load({ id: 'achievement_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AchievementEntity` instance with the same client and
options.

#### `client()`

Return the parent `FlyffGameSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AwakeEntity

```ts
const awake = client.Awake()
```

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `skill` | `/awake/skill` | `client.Awake().load({ $action: 'skill', ... })` |
| `stat` | `/awake/stat` | `client.Awake().load({ $action: 'stat', ... })` |

An action returns that action's OWN response, which is not necessarily a
Awake record — check the API definition for its shape.

```ts
const result = await client.Awake().load({
  $action: 'skill',
  /* ...the action's own arguments */
})
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Awake().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AwakeEntity` instance with the same client and
options.

#### `client()`

Return the parent `FlyffGameSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## BadgeEntity

```ts
const badge = client.Badge()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Badge().load({ id: 'badge_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BadgeEntity` instance with the same client and
options.

#### `client()`

Return the parent `FlyffGameSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ClassEntity

```ts
const class_ = client.Class()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attackSpeed` | `number` | Yes | Attack speed constant used in attack speed calculation |
| `autoAttackFactors` | `Record<string, any>` | Yes | Auto attack damage factors used in damage calculation |
| `block` | `number` | Yes | Blocking constant used in block calculation |
| `critical` | `number` | Yes | Critical chance constant used in critical chance calculation |
| `defense` | `number` | Yes | Defense factor use in defensive calculations |
| `fp` | `number` | Yes | FP Factor |
| `hp` | `number` | Yes | HP Factor |
| `icon` | `string` | Yes | Icon of the Class |
| `id` | `number` | Yes | ID of the class |
| `magicDefenseIntFactor` | `number` | Yes | Magic defense factor based on INT used in defensive calculations |
| `magicDefenseStaFactor` | `number` | Yes | Magic defense factor based on STA used in defensive calculations |
| `maxFP` | `string` | Yes | Formula to compute the maximum Fatigue Points of the player |
| `maxHP` | `string` | Yes | Formula to compute the maximum Hit Points of the player |
| `maxLevel` | `number` | Yes | Maximum player level for the Class |
| `maxMP` | `string` | Yes | Formula to compute the maximum Mana Points of the player |
| `minLevel` | `number` | Yes | Minimum player level for the Class |
| `mp` | `number` | Yes | MP Factor |
| `name` | `Record<string, any>` | Yes | Text available in several languages |
| `parent` | `number` | No | ID of the parent class |
| `tree` | `string` | Yes | Skill tree image for the class |
| `type` | `string` | Yes | Type of the class |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Class().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Class().load({ id: 'class_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ClassEntity` instance with the same client and
options.

#### `client()`

Return the parent `FlyffGameSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CoreEntity

```ts
const core = client.Core()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Core().load({ parameter_id: 'parameter_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CoreEntity` instance with the same client and
options.

#### `client()`

Return the parent `FlyffGameSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CoupleEntity

```ts
const couple = client.Couple()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Couple().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CoupleEntity` instance with the same client and
options.

#### `client()`

Return the parent `FlyffGameSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DungeonEntity

```ts
const dungeon = client.Dungeon()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Dungeon().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DungeonEntity` instance with the same client and
options.

#### `client()`

Return the parent `FlyffGameSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ElementEntity

```ts
const element = client.Element()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Element().load({ id: 'element_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ElementEntity` instance with the same client and
options.

#### `client()`

Return the parent `FlyffGameSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## EquipmentSetEntity

```ts
const equipment_set = client.EquipmentSet()
```

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.EquipmentSet().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.EquipmentSet().load({ equipment_set_id: 'equipment_set_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `EquipmentSetEntity` instance with the same client and
options.

#### `client()`

Return the parent `FlyffGameSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ExchangeMenusEntity

```ts
const exchange_menus = client.ExchangeMenus()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.ExchangeMenus().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ExchangeMenusEntity` instance with the same client and
options.

#### `client()`

Return the parent `FlyffGameSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## HousingPackEntity

```ts
const housing_pack = client.HousingPack()
```

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.HousingPack().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.HousingPack().load({ housing_pack_id: 'housing_pack_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `HousingPackEntity` instance with the same client and
options.

#### `client()`

Return the parent `FlyffGameSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## HousingTemplateEntity

```ts
const housing_template = client.HousingTemplate()
```

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.HousingTemplate().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.HousingTemplate().load({ housing_template_id: 'housing_template_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `HousingTemplateEntity` instance with the same client and
options.

#### `client()`

Return the parent `FlyffGameSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ItemEntity

```ts
const item = client.Item()
```

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Item().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Item().load({ id: 'item_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ItemEntity` instance with the same client and
options.

#### `client()`

Return the parent `FlyffGameSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## LanguageEntity

```ts
const language = client.Language()
```

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `language_code` | `/image/language/{languageCode}.png` | `client.Language().load({ $action: 'language_code', ... })` |

An action returns that action's OWN response, which is not necessarily a
Language record — check the API definition for its shape.

```ts
const result = await client.Language().load({
  $action: 'language_code',
  /* ...the action's own arguments */
})
```

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Language().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Language().load({ language_code: 'language_code' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `LanguageEntity` instance with the same client and
options.

#### `client()`

Return the parent `FlyffGameSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## LifestyleEntity

```ts
const lifestyle = client.Lifestyle()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Lifestyle().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `LifestyleEntity` instance with the same client and
options.

#### `client()`

Return the parent `FlyffGameSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MonsterEntity

```ts
const monster = client.Monster()
```

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Monster().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Monster().load({ id: 'monster_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MonsterEntity` instance with the same client and
options.

#### `client()`

Return the parent `FlyffGameSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## NpcEntity

```ts
const npc = client.Npc()
```

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Npc().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Npc().load({ id: 'npc_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `NpcEntity` instance with the same client and
options.

#### `client()`

Return the parent `FlyffGameSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PartySkillEntity

```ts
const party_skill = client.PartySkill()
```

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.PartySkill().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.PartySkill().load({ party_skill_id: 'party_skill_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PartySkillEntity` instance with the same client and
options.

#### `client()`

Return the parent `FlyffGameSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PknEntity

```ts
const pkn = client.Pkn()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Pkn().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PknEntity` instance with the same client and
options.

#### `client()`

Return the parent `FlyffGameSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PlaceEntity

```ts
const place = client.Place()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Place().load({ id: 'place_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PlaceEntity` instance with the same client and
options.

#### `client()`

Return the parent `FlyffGameSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## QuestEntity

```ts
const quest = client.Quest()
```

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Quest().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Quest().load({ id: 'quest_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `QuestEntity` instance with the same client and
options.

#### `client()`

Return the parent `FlyffGameSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## RaisedPetEntity

```ts
const raised_pet = client.RaisedPet()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.RaisedPet().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `RaisedPetEntity` instance with the same client and
options.

#### `client()`

Return the parent `FlyffGameSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## RecipeEntity

```ts
const recipe = client.Recipe()
```

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Recipe().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Recipe().load({ id: 'recipe_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `RecipeEntity` instance with the same client and
options.

#### `client()`

Return the parent `FlyffGameSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SkillEntity

```ts
const skill = client.Skill()
```

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Skill().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Skill().load({ id: 'skill_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SkillEntity` instance with the same client and
options.

#### `client()`

Return the parent `FlyffGameSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## UpgradeLevelBonusEntity

```ts
const upgrade_level_bonus = client.UpgradeLevelBonus()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.UpgradeLevelBonus().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `UpgradeLevelBonusEntity` instance with the same client and
options.

#### `client()`

Return the parent `FlyffGameSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## VersionEntity

```ts
const version = client.Version()
```

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `api` | `/version/api` | `client.Version().load({ $action: 'api', ... })` |
| `data` | `/version/data` | `client.Version().load({ $action: 'data', ... })` |

An action returns that action's OWN response, which is not necessarily a
Version record — check the API definition for its shape.

```ts
const result = await client.Version().load({
  $action: 'api',
  /* ...the action's own arguments */
})
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Version().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `VersionEntity` instance with the same client and
options.

#### `client()`

Return the parent `FlyffGameSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## WorldEntity

```ts
const world = client.World()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `continents` | `any[]` | Yes | Continents in the World |
| `flying` | `boolean` | Yes | Whether players can fly in the World or not |
| `height` | `number` | Yes | Height of the World in meters |
| `id` | `number` | Yes | ID of the World |
| `inDoor` | `boolean` | Yes | Whether the World has a sky or not |
| `lodestars` | `any[]` | Yes | Revival places in the World |
| `name` | `Record<string, any>` | Yes | Text available in several languages |
| `pk` | `boolean` | Yes | Whether players can kill other players in the World or not |
| `places` | `any[]` | Yes | Special Places in the World |
| `revivalKey` | `string` | No | ID of the Lodestar where players revive when they die in the World |
| `revivalWorld` | `number` | No | ID of the World where players revive when they die in the World |
| `tileName` | `string` | Yes | Name of the world Tiles for navigator |
| `tileSize` | `number` | Yes | World meters per Tile |
| `type` | `string` | Yes | Type of the World |
| `width` | `number` | Yes | Width of the World in meters |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `world_tile_nametile_x_tile_y_0` | `/image/world/{worldTileName}{tileX}-{tileY}-0.png` | `client.World().load({ $action: 'world_tile_nametile_x_tile_y_0', ... })` |

An action returns that action's OWN response, which is not necessarily a
World record — check the API definition for its shape.

```ts
const result = await client.World().load({
  $action: 'world_tile_nametile_x_tile_y_0',
  /* ...the action's own arguments */
})
```

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.World().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.World().load({ id: 'world_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `WorldEntity` instance with the same client and
options.

#### `client()`

Return the parent `FlyffGameSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new FlyffGameSDK({
  feature: {
    test: { active: true },
  }
})
```

