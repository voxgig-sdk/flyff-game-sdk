# FlyffGame Golang SDK



The Golang SDK for the FlyffGame API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Achievement(nil)` — each with the same small set of operations (`List`, `Load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Also generated from this model: `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb`, `ts` — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/flyff-game-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/flyff-game-sdk/releases) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/flyff-game-sdk/go=../flyff-game-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the data itself
(there is no `{ok, data}` wrapper), so check `err` and use the value
directly.

```go
package main

import (
    "fmt"
    sdk "github.com/voxgig-sdk/flyff-game-sdk/go"
)

func main() {
    client := sdk.New()

    // List achievement records — the value is the array of records itself.
    achievements, err := client.Achievement(nil).List(nil, nil)
    if err != nil {
        panic(err)
    }
    for _, item := range achievements.([]any) {
        fmt.Println(item)
    }

    // Load a single achievement — the value is the loaded record.
    achievement, err := client.Achievement(nil).Load(map[string]any{"id": "example_id"}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(achievement)
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
dungeon, err := client.Dungeon(nil).Load(nil, nil)
if err != nil {
    // handle err
    return
}
_ = dungeon
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

dungeon, err := client.Dungeon(nil).Load(
    nil, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(dungeon) // the returned mock data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewFlyffGameSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
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
cd go && go test ./test/...
```


## Reference

### NewFlyffGameSDK

```go
func NewFlyffGameSDK(options map[string]any) *FlyffGameSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *FlyffGameSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### FlyffGameSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `Achievement` | `(data map[string]any) FlyffGameEntity` | Create an Achievement entity instance. |
| `Awake` | `(data map[string]any) FlyffGameEntity` | Create an Awake entity instance. |
| `Badge` | `(data map[string]any) FlyffGameEntity` | Create a Badge entity instance. |
| `Class` | `(data map[string]any) FlyffGameEntity` | Create a Class entity instance. |
| `Core` | `(data map[string]any) FlyffGameEntity` | Create a Core entity instance. |
| `Couple` | `(data map[string]any) FlyffGameEntity` | Create a Couple entity instance. |
| `Dungeon` | `(data map[string]any) FlyffGameEntity` | Create a Dungeon entity instance. |
| `Element` | `(data map[string]any) FlyffGameEntity` | Create an Element entity instance. |
| `EquipmentSet` | `(data map[string]any) FlyffGameEntity` | Create an EquipmentSet entity instance. |
| `ExchangeMenus` | `(data map[string]any) FlyffGameEntity` | Create an ExchangeMenus entity instance. |
| `HousingPack` | `(data map[string]any) FlyffGameEntity` | Create a HousingPack entity instance. |
| `HousingTemplate` | `(data map[string]any) FlyffGameEntity` | Create a HousingTemplate entity instance. |
| `Item` | `(data map[string]any) FlyffGameEntity` | Create an Item entity instance. |
| `Language` | `(data map[string]any) FlyffGameEntity` | Create a Language entity instance. |
| `Lifestyle` | `(data map[string]any) FlyffGameEntity` | Create a Lifestyle entity instance. |
| `Monster` | `(data map[string]any) FlyffGameEntity` | Create a Monster entity instance. |
| `Npc` | `(data map[string]any) FlyffGameEntity` | Create a Npc entity instance. |
| `PartySkill` | `(data map[string]any) FlyffGameEntity` | Create a PartySkill entity instance. |
| `Pkn` | `(data map[string]any) FlyffGameEntity` | Create a Pkn entity instance. |
| `Place` | `(data map[string]any) FlyffGameEntity` | Create a Place entity instance. |
| `Quest` | `(data map[string]any) FlyffGameEntity` | Create a Quest entity instance. |
| `RaisedPet` | `(data map[string]any) FlyffGameEntity` | Create a RaisedPet entity instance. |
| `Recipe` | `(data map[string]any) FlyffGameEntity` | Create a Recipe entity instance. |
| `Skill` | `(data map[string]any) FlyffGameEntity` | Create a Skill entity instance. |
| `UpgradeLevelBonus` | `(data map[string]any) FlyffGameEntity` | Create an UpgradeLevelBonus entity instance. |
| `Version` | `(data map[string]any) FlyffGameEntity` | Create a Version entity instance. |
| `World` | `(data map[string]any) FlyffGameEntity` | Create a World entity instance. |

### Entity interface (FlyffGameEntity)

All entities implement the `FlyffGameEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` | the entity record (`map[string]any`) |
| `List` | a `[]any` of entity records |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    achievement, err := client.Achievement(nil).List(map[string]any{/* fields */}, nil)
    if err != nil { /* handle */ }
    // achievement is the returned record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### Achievement

| Field | Description |
| --- | --- |
| `"id"` |  |

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
| `"id"` |  |

Operations: Load.

API path: `/image/badge/{fileName}`

#### Class

| Field | Description |
| --- | --- |
| `"attackSpeed"` | Attack speed constant used in attack speed calculation |
| `"autoAttackFactors"` | Auto attack damage factors used in damage calculation |
| `"block"` | Blocking constant used in block calculation |
| `"critical"` | Critical chance constant used in critical chance calculation |
| `"defense"` | Defense factor use in defensive calculations |
| `"fp"` | FP Factor |
| `"hp"` | HP Factor |
| `"icon"` | Icon of the Class |
| `"id"` | ID of the class |
| `"magicDefenseIntFactor"` | Magic defense factor based on INT used in defensive calculations |
| `"magicDefenseStaFactor"` | Magic defense factor based on STA used in defensive calculations |
| `"maxFP"` | Formula to compute the maximum Fatigue Points of the player |
| `"maxHP"` | Formula to compute the maximum Hit Points of the player |
| `"maxLevel"` | Maximum player level for the Class |
| `"maxMP"` | Formula to compute the maximum Mana Points of the player |
| `"minLevel"` | Minimum player level for the Class |
| `"mp"` | MP Factor |
| `"name"` | Text available in several languages |
| `"parent"` | ID of the parent class |
| `"tree"` | Skill tree image for the class |
| `"type"` | Type of the class |

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
| `"id"` |  |

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
| `"id"` |  |

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
| `"id"` |  |

Operations: List, Load.

API path: `/monster`

#### Npc

| Field | Description |
| --- | --- |
| `"id"` |  |

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
| `"id"` |  |

Operations: Load.

API path: `/image/place/{fileName}`

#### Quest

| Field | Description |
| --- | --- |
| `"id"` |  |

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
| `"id"` |  |

Operations: List, Load.

API path: `/recipe`

#### Skill

| Field | Description |
| --- | --- |
| `"id"` |  |

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
| `"continents"` | Continents in the World |
| `"flying"` | Whether players can fly in the World or not |
| `"height"` | Height of the World in meters |
| `"id"` | ID of the World |
| `"inDoor"` | Whether the World has a sky or not |
| `"lodestars"` | Revival places in the World |
| `"name"` | Text available in several languages |
| `"pk"` | Whether players can kill other players in the World or not |
| `"places"` | Special Places in the World |
| `"revivalKey"` | ID of the Lodestar where players revive when they die in the World |
| `"revivalWorld"` | ID of the World where players revive when they die in the World |
| `"tileName"` | Name of the world Tiles for navigator |
| `"tileSize"` | World meters per Tile |
| `"type"` | Type of the World |
| `"width"` | Width of the World in meters |

Operations: List, Load.

API path: `/world`



## Entities


### Achievement

Create an instance: `achievement := client.Achievement(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```go
achievement, err := client.Achievement(nil).Load(map[string]any{"id": "achievement_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(achievement) // the loaded record
```

#### Example: List

```go
achievements, err := client.Achievement(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(achievements) // the array of records
```


### Awake

Create an instance: `awake := client.Awake(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
awake, err := client.Awake(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(awake) // the loaded record
```


### Badge

Create an instance: `badge := client.Badge(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```go
badge, err := client.Badge(nil).Load(map[string]any{"id": "badge_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(badge) // the loaded record
```


### Class

Create an instance: `class := client.Class(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attackSpeed` | `float64` | Attack speed constant used in attack speed calculation |
| `autoAttackFactors` | `map[string]any` | Auto attack damage factors used in damage calculation |
| `block` | `float64` | Blocking constant used in block calculation |
| `critical` | `float64` | Critical chance constant used in critical chance calculation |
| `defense` | `float64` | Defense factor use in defensive calculations |
| `fp` | `float64` | FP Factor |
| `hp` | `float64` | HP Factor |
| `icon` | `string` | Icon of the Class |
| `id` | `int` | ID of the class |
| `magicDefenseIntFactor` | `float64` | Magic defense factor based on INT used in defensive calculations |
| `magicDefenseStaFactor` | `float64` | Magic defense factor based on STA used in defensive calculations |
| `maxFP` | `string` | Formula to compute the maximum Fatigue Points of the player |
| `maxHP` | `string` | Formula to compute the maximum Hit Points of the player |
| `maxLevel` | `int` | Maximum player level for the Class |
| `maxMP` | `string` | Formula to compute the maximum Mana Points of the player |
| `minLevel` | `int` | Minimum player level for the Class |
| `mp` | `float64` | MP Factor |
| `name` | `map[string]any` | Text available in several languages |
| `parent` | `int` | ID of the parent class |
| `tree` | `string` | Skill tree image for the class |
| `type` | `string` | Type of the class |

#### Example: Load

```go
class, err := client.Class(nil).Load(map[string]any{"id": "class_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(class) // the loaded record
```

#### Example: List

```go
classs, err := client.Class(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(classs) // the array of records
```


### Core

Create an instance: `core := client.Core(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
core, err := client.Core(nil).Load(map[string]any{"parameter_id": "parameter_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(core) // the loaded record
```


### Couple

Create an instance: `couple := client.Couple(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
couple, err := client.Couple(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(couple) // the loaded record
```


### Dungeon

Create an instance: `dungeon := client.Dungeon(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
dungeon, err := client.Dungeon(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(dungeon) // the loaded record
```


### Element

Create an instance: `element := client.Element(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```go
element, err := client.Element(nil).Load(map[string]any{"id": "element_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(element) // the loaded record
```


### EquipmentSet

Create an instance: `equipmentSet := client.EquipmentSet(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
equipmentSet, err := client.EquipmentSet(nil).Load(map[string]any{"equipment_set_id": "equipment_set_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(equipmentSet) // the loaded record
```

#### Example: List

```go
equipmentSets, err := client.EquipmentSet(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(equipmentSets) // the array of records
```


### ExchangeMenus

Create an instance: `exchangeMenus := client.ExchangeMenus(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
exchangeMenus, err := client.ExchangeMenus(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(exchangeMenus) // the loaded record
```


### HousingPack

Create an instance: `housingPack := client.HousingPack(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
housingPack, err := client.HousingPack(nil).Load(map[string]any{"housing_pack_id": "housing_pack_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(housingPack) // the loaded record
```

#### Example: List

```go
housingPacks, err := client.HousingPack(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(housingPacks) // the array of records
```


### HousingTemplate

Create an instance: `housingTemplate := client.HousingTemplate(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
housingTemplate, err := client.HousingTemplate(nil).Load(map[string]any{"housing_template_id": "housing_template_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(housingTemplate) // the loaded record
```

#### Example: List

```go
housingTemplates, err := client.HousingTemplate(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(housingTemplates) // the array of records
```


### Item

Create an instance: `item := client.Item(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```go
item, err := client.Item(nil).Load(map[string]any{"id": "item_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(item) // the loaded record
```

#### Example: List

```go
items, err := client.Item(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(items) // the array of records
```


### Language

Create an instance: `language := client.Language(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
language, err := client.Language(nil).Load(map[string]any{"language_code": "language_code"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(language) // the loaded record
```

#### Example: List

```go
languages, err := client.Language(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(languages) // the array of records
```


### Lifestyle

Create an instance: `lifestyle := client.Lifestyle(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
lifestyle, err := client.Lifestyle(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(lifestyle) // the loaded record
```


### Monster

Create an instance: `monster := client.Monster(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```go
monster, err := client.Monster(nil).Load(map[string]any{"id": "monster_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(monster) // the loaded record
```

#### Example: List

```go
monsters, err := client.Monster(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(monsters) // the array of records
```


### Npc

Create an instance: `npc := client.Npc(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```go
npc, err := client.Npc(nil).Load(map[string]any{"id": "npc_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(npc) // the loaded record
```

#### Example: List

```go
npcs, err := client.Npc(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(npcs) // the array of records
```


### PartySkill

Create an instance: `partySkill := client.PartySkill(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
partySkill, err := client.PartySkill(nil).Load(map[string]any{"party_skill_id": "party_skill_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(partySkill) // the loaded record
```

#### Example: List

```go
partySkills, err := client.PartySkill(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(partySkills) // the array of records
```


### Pkn

Create an instance: `pkn := client.Pkn(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
pkn, err := client.Pkn(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(pkn) // the loaded record
```


### Place

Create an instance: `place := client.Place(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```go
place, err := client.Place(nil).Load(map[string]any{"id": "place_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(place) // the loaded record
```


### Quest

Create an instance: `quest := client.Quest(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```go
quest, err := client.Quest(nil).Load(map[string]any{"id": "quest_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(quest) // the loaded record
```

#### Example: List

```go
quests, err := client.Quest(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(quests) // the array of records
```


### RaisedPet

Create an instance: `raisedPet := client.RaisedPet(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
raisedPet, err := client.RaisedPet(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(raisedPet) // the loaded record
```


### Recipe

Create an instance: `recipe := client.Recipe(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```go
recipe, err := client.Recipe(nil).Load(map[string]any{"id": "recipe_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(recipe) // the loaded record
```

#### Example: List

```go
recipes, err := client.Recipe(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(recipes) // the array of records
```


### Skill

Create an instance: `skill := client.Skill(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```go
skill, err := client.Skill(nil).Load(map[string]any{"id": "skill_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(skill) // the loaded record
```

#### Example: List

```go
skills, err := client.Skill(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(skills) // the array of records
```


### UpgradeLevelBonus

Create an instance: `upgradeLevelBonus := client.UpgradeLevelBonus(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
upgradeLevelBonus, err := client.UpgradeLevelBonus(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(upgradeLevelBonus) // the loaded record
```


### Version

Create an instance: `version := client.Version(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
version, err := client.Version(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(version) // the loaded record
```


### World

Create an instance: `world := client.World(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `continents` | `[]any` | Continents in the World |
| `flying` | `bool` | Whether players can fly in the World or not |
| `height` | `int` | Height of the World in meters |
| `id` | `int` | ID of the World |
| `inDoor` | `bool` | Whether the World has a sky or not |
| `lodestars` | `[]any` | Revival places in the World |
| `name` | `map[string]any` | Text available in several languages |
| `pk` | `bool` | Whether players can kill other players in the World or not |
| `places` | `[]any` | Special Places in the World |
| `revivalKey` | `string` | ID of the Lodestar where players revive when they die in the World |
| `revivalWorld` | `int` | ID of the World where players revive when they die in the World |
| `tileName` | `string` | Name of the world Tiles for navigator |
| `tileSize` | `int` | World meters per Tile |
| `type` | `string` | Type of the World |
| `width` | `int` | Width of the World in meters |

#### Example: Load

```go
world, err := client.World(nil).Load(map[string]any{"id": "world_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(world) // the loaded record
```

#### Example: List

```go
worlds, err := client.World(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(worlds) // the array of records
```

## Features

This SDK ships 1 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`test`](#test) | In-memory mock transport for testing without a live server |

### test

In-memory mock transport for testing without a live server.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.


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

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/flyff-game-sdk/go/
├── flyff-game.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/flyff-game-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `Load`, the entity
stores the returned data and match criteria internally.

```go
dungeon := client.Dungeon(nil)
dungeon.Load(nil, nil)

// dungeon.Data() now returns the dungeon data from the last load
// dungeon.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
