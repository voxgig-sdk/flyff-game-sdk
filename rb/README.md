# FlyffGame Ruby SDK



The Ruby SDK for the FlyffGame API — an entity-oriented client using idiomatic Ruby conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Achievement` — with named operations (`list`/`load`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/flyff-game-sdk/releases](https://github.com/voxgig-sdk/flyff-game-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "FlyffGame_sdk"

client = FlyffGameSDK.new
```

### 2. List achievement records

```ruby
begin
  # list returns an Array of Achievement records — iterate directly.
  achievements = client.Achievement.list
  achievements.each do |item|
    puts "#{item["id"]}"
  end
rescue => err
  warn "list failed: #{err}"
end
```

### 3. Load a core

Core is nested under parameter, so provide the `parameter_id`.

```ruby
begin
  # load returns the ENTITY — call data_get for the Core record (raises on error).
  core = client.Core.load({ "parameter_id" => "example_parameter_id" })
  puts core
rescue => err
  warn "load failed: #{err}"
end
```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  dungeon = client.Dungeon.load()
rescue => err
  warn "load failed: #{err}"
end
```

`direct` does **not** raise — it returns the result hash. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example_id" },
})

warn "request failed: #{result["err"] || "HTTP #{result["status"]}"}" unless result["ok"]
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  # On an HTTP error status there is no err (only a transport failure sets
  # it), so fall back to the status code.
  warn(result["err"] || "HTTP #{result["status"]}")
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required:

```ruby
client = FlyffGameSDK.test

# Entity ops return the ENTITY (raises on error);
# call data_get for the mock record.
dungeon = client.Dungeon.load()
puts dungeon
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = FlyffGameSDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
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
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### FlyffGameSDK

```ruby
require_relative "FlyffGame_sdk"
client = FlyffGameSDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = FlyffGameSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### FlyffGameSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
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
| `list` | `(reqmatch = nil, ctrl) -> Array` | List entities matching the criteria (call with no argument to list all). Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the result data directly. On failure they
raise a `FlyffGameError` (a `StandardError` subclass), so wrap
calls in `begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

### Entities

#### Achievement

| Field | Description |
| --- | --- |
| `id` |  |

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
| `id` |  |

Operations: Load.

API path: `/image/badge/{fileName}`

#### Class

| Field | Description |
| --- | --- |
| `attackSpeed` | Attack speed constant used in attack speed calculation |
| `autoAttackFactors` | Auto attack damage factors used in damage calculation |
| `block` | Blocking constant used in block calculation |
| `critical` | Critical chance constant used in critical chance calculation |
| `defense` | Defense factor use in defensive calculations |
| `fp` | FP Factor |
| `hp` | HP Factor |
| `icon` | Icon of the Class |
| `id` | ID of the class |
| `magicDefenseIntFactor` | Magic defense factor based on INT used in defensive calculations |
| `magicDefenseStaFactor` | Magic defense factor based on STA used in defensive calculations |
| `maxFP` | Formula to compute the maximum Fatigue Points of the player |
| `maxHP` | Formula to compute the maximum Hit Points of the player |
| `maxLevel` | Maximum player level for the Class |
| `maxMP` | Formula to compute the maximum Mana Points of the player |
| `minLevel` | Minimum player level for the Class |
| `mp` | MP Factor |
| `name` | Text available in several languages |
| `parent` | ID of the parent class |
| `tree` | Skill tree image for the class |
| `type` | Type of the class |

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
| `id` |  |

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
| `id` |  |

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
| `id` |  |

Operations: List, Load.

API path: `/monster`

#### Npc

| Field | Description |
| --- | --- |
| `id` |  |

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
| `id` |  |

Operations: Load.

API path: `/image/place/{fileName}`

#### Quest

| Field | Description |
| --- | --- |
| `id` |  |

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
| `id` |  |

Operations: List, Load.

API path: `/recipe`

#### Skill

| Field | Description |
| --- | --- |
| `id` |  |

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
| `continents` | Continents in the World |
| `flying` | Whether players can fly in the World or not |
| `height` | Height of the World in meters |
| `id` | ID of the World |
| `inDoor` | Whether the World has a sky or not |
| `lodestars` | Revival places in the World |
| `name` | Text available in several languages |
| `pk` | Whether players can kill other players in the World or not |
| `places` | Special Places in the World |
| `revivalKey` | ID of the Lodestar where players revive when they die in the World |
| `revivalWorld` | ID of the World where players revive when they die in the World |
| `tileName` | Name of the world Tiles for navigator |
| `tileSize` | World meters per Tile |
| `type` | Type of the World |
| `width` | Width of the World in meters |

Operations: List, Load.

API path: `/world`



## Entities


### Achievement

Create an instance: `achievement = client.Achievement`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Achievement record (raises on error).
achievement = client.Achievement.load({ "id" => "achievement_id" })
```

#### Example: List

```ruby
# list returns an Array of Achievement records (raises on error).
achievements = client.Achievement.list
```


### Awake

Create an instance: `awake = client.Awake`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Awake record (raises on error).
awake = client.Awake.load()
```


### Badge

Create an instance: `badge = client.Badge`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Badge record (raises on error).
badge = client.Badge.load({ "id" => "badge_id" })
```


### Class

Create an instance: `class_ = client.Class`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attackSpeed` | `Float` | Attack speed constant used in attack speed calculation |
| `autoAttackFactors` | `Hash` | Auto attack damage factors used in damage calculation |
| `block` | `Float` | Blocking constant used in block calculation |
| `critical` | `Float` | Critical chance constant used in critical chance calculation |
| `defense` | `Float` | Defense factor use in defensive calculations |
| `fp` | `Float` | FP Factor |
| `hp` | `Float` | HP Factor |
| `icon` | `String` | Icon of the Class |
| `id` | `Integer` | ID of the class |
| `magicDefenseIntFactor` | `Float` | Magic defense factor based on INT used in defensive calculations |
| `magicDefenseStaFactor` | `Float` | Magic defense factor based on STA used in defensive calculations |
| `maxFP` | `String` | Formula to compute the maximum Fatigue Points of the player |
| `maxHP` | `String` | Formula to compute the maximum Hit Points of the player |
| `maxLevel` | `Integer` | Maximum player level for the Class |
| `maxMP` | `String` | Formula to compute the maximum Mana Points of the player |
| `minLevel` | `Integer` | Minimum player level for the Class |
| `mp` | `Float` | MP Factor |
| `name` | `Hash` | Text available in several languages |
| `parent` | `Integer` | ID of the parent class |
| `tree` | `String` | Skill tree image for the class |
| `type` | `String` | Type of the class |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Class record (raises on error).
class_ = client.Class.load({ "id" => "class_id" })
```

#### Example: List

```ruby
# list returns an Array of Class records (raises on error).
class_s = client.Class.list
```


### Core

Create an instance: `core = client.Core`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Core record (raises on error).
core = client.Core.load({ "parameter_id" => "parameter_id" })
```


### Couple

Create an instance: `couple = client.Couple`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Couple record (raises on error).
couple = client.Couple.load()
```


### Dungeon

Create an instance: `dungeon = client.Dungeon`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Dungeon record (raises on error).
dungeon = client.Dungeon.load()
```


### Element

Create an instance: `element = client.Element`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Element record (raises on error).
element = client.Element.load({ "id" => "element_id" })
```


### EquipmentSet

Create an instance: `equipment_set = client.EquipmentSet`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the EquipmentSet record (raises on error).
equipment_set = client.EquipmentSet.load({ "equipment_set_id" => "equipment_set_id" })
```

#### Example: List

```ruby
# list returns an Array of EquipmentSet records (raises on error).
equipment_sets = client.EquipmentSet.list
```


### ExchangeMenus

Create an instance: `exchange_menus = client.ExchangeMenus`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the ExchangeMenus record (raises on error).
exchange_menus = client.ExchangeMenus.load()
```


### HousingPack

Create an instance: `housing_pack = client.HousingPack`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the HousingPack record (raises on error).
housing_pack = client.HousingPack.load({ "housing_pack_id" => "housing_pack_id" })
```

#### Example: List

```ruby
# list returns an Array of HousingPack records (raises on error).
housing_packs = client.HousingPack.list
```


### HousingTemplate

Create an instance: `housing_template = client.HousingTemplate`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the HousingTemplate record (raises on error).
housing_template = client.HousingTemplate.load({ "housing_template_id" => "housing_template_id" })
```

#### Example: List

```ruby
# list returns an Array of HousingTemplate records (raises on error).
housing_templates = client.HousingTemplate.list
```


### Item

Create an instance: `item = client.Item`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Item record (raises on error).
item = client.Item.load({ "id" => "item_id" })
```

#### Example: List

```ruby
# list returns an Array of Item records (raises on error).
items = client.Item.list
```


### Language

Create an instance: `language = client.Language`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Language record (raises on error).
language = client.Language.load({ "language_code" => "language_code" })
```

#### Example: List

```ruby
# list returns an Array of Language records (raises on error).
languages = client.Language.list
```


### Lifestyle

Create an instance: `lifestyle = client.Lifestyle`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Lifestyle record (raises on error).
lifestyle = client.Lifestyle.load()
```


### Monster

Create an instance: `monster = client.Monster`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Monster record (raises on error).
monster = client.Monster.load({ "id" => "monster_id" })
```

#### Example: List

```ruby
# list returns an Array of Monster records (raises on error).
monsters = client.Monster.list
```


### Npc

Create an instance: `npc = client.Npc`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Npc record (raises on error).
npc = client.Npc.load({ "id" => "npc_id" })
```

#### Example: List

```ruby
# list returns an Array of Npc records (raises on error).
npcs = client.Npc.list
```


### PartySkill

Create an instance: `party_skill = client.PartySkill`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the PartySkill record (raises on error).
party_skill = client.PartySkill.load({ "party_skill_id" => "party_skill_id" })
```

#### Example: List

```ruby
# list returns an Array of PartySkill records (raises on error).
party_skills = client.PartySkill.list
```


### Pkn

Create an instance: `pkn = client.Pkn`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Pkn record (raises on error).
pkn = client.Pkn.load()
```


### Place

Create an instance: `place = client.Place`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Place record (raises on error).
place = client.Place.load({ "id" => "place_id" })
```


### Quest

Create an instance: `quest = client.Quest`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Quest record (raises on error).
quest = client.Quest.load({ "id" => "quest_id" })
```

#### Example: List

```ruby
# list returns an Array of Quest records (raises on error).
quests = client.Quest.list
```


### RaisedPet

Create an instance: `raised_pet = client.RaisedPet`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the RaisedPet record (raises on error).
raised_pet = client.RaisedPet.load()
```


### Recipe

Create an instance: `recipe = client.Recipe`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Recipe record (raises on error).
recipe = client.Recipe.load({ "id" => "recipe_id" })
```

#### Example: List

```ruby
# list returns an Array of Recipe records (raises on error).
recipes = client.Recipe.list
```


### Skill

Create an instance: `skill = client.Skill`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Skill record (raises on error).
skill = client.Skill.load({ "id" => "skill_id" })
```

#### Example: List

```ruby
# list returns an Array of Skill records (raises on error).
skills = client.Skill.list
```


### UpgradeLevelBonus

Create an instance: `upgrade_level_bonus = client.UpgradeLevelBonus`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the UpgradeLevelBonus record (raises on error).
upgrade_level_bonus = client.UpgradeLevelBonus.load()
```


### Version

Create an instance: `version = client.Version`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Version record (raises on error).
version = client.Version.load()
```


### World

Create an instance: `world = client.World`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `continents` | `Array` | Continents in the World |
| `flying` | `Boolean` | Whether players can fly in the World or not |
| `height` | `Integer` | Height of the World in meters |
| `id` | `Integer` | ID of the World |
| `inDoor` | `Boolean` | Whether the World has a sky or not |
| `lodestars` | `Array` | Revival places in the World |
| `name` | `Hash` | Text available in several languages |
| `pk` | `Boolean` | Whether players can kill other players in the World or not |
| `places` | `Array` | Special Places in the World |
| `revivalKey` | `String` | ID of the Lodestar where players revive when they die in the World |
| `revivalWorld` | `Integer` | ID of the World where players revive when they die in the World |
| `tileName` | `String` | Name of the world Tiles for navigator |
| `tileSize` | `Integer` | World meters per Tile |
| `type` | `String` | Type of the World |
| `width` | `Integer` | Width of the World in meters |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the World record (raises on error).
world = client.World.load({ "id" => "world_id" })
```

#### Example: List

```ruby
# list returns an Array of World records (raises on error).
worlds = client.World.list
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

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── FlyffGame_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`FlyffGame_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```ruby
dungeon = client.Dungeon
dungeon.load()

# dungeon.data_get now returns the dungeon data from the last load
# dungeon.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
