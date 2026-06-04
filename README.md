# FlyffGame SDK

Read-only access to Flyff Universe game data — classes, worlds, monsters, items, skills and more

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Flyff Game API

The Flyff Game API exposes the static game data behind [Flyff Universe](https://universe.flyff.com), the browser MMORPG published by [Gala Lab](https://gala-lab.com). It is the same data source the official site uses to render classes, monsters, items, skills and world maps.

What you get from the API:
- Character data — classes and their skill trees, party skills, skill scaling and requirements
- World data — world IDs, continents, revival points and pre-rendered tilemap images
- Combat data — monsters with stats, drops and spawn locations; elements and debuff types
- Equipment and economy — items, equipment sets and set bonuses, recipes, upgrade and awake bonuses, exchange menus
- Progression and social systems — quests, achievements, badges, NPCs, dungeons, housing, lifestyle, couples and raised pets
- Localisation — language packs and translated text
- Image endpoints — class, monster, item, skill, NPC and world tile assets under `/image/...`

Operational notes: the API is public and unauthenticated, served from `https://api.flyff.com`. The publisher documents a limit of **300 calls per minute per IP** and recommends caching, refreshing only when `/version/data` changes. CORS is disabled, so requests are intended to be made server-side. `/version/api` exposes the current API version.

## Try it

**TypeScript**
```bash
npm install flyff-game
```

**Python**
```bash
pip install flyff-game-sdk
```

**PHP**
```bash
composer require voxgig/flyff-game-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/flyff-game-sdk/go
```

**Ruby**
```bash
gem install flyff-game-sdk
```

**Lua**
```bash
luarocks install flyff-game-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { FlyffGameSDK } from 'flyff-game'

const client = new FlyffGameSDK({})

// List all achievements
const achievements = await client.Achievement().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o flyff-game-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "flyff-game": {
      "command": "/abs/path/to/flyff-game-mcp"
    }
  }
}
```

## Entities

The API exposes 27 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Achievement** | In-game achievement definitions — `GET /achievement` for IDs and `GET /achievement/{id}` for details. | `/achievement` |
| **Awake** | Awakening bonus tables used by the gear awakening system. | `/awake/skill` |
| **Badge** | Badge definitions used as supporting metadata on characters and items. | `/image/badge/{fileName}` |
| **Class** | Playable character classes and their skill trees — `GET /class`, `GET /class/{classId}` and batch `GET /class/{classIds}`. | `/class` |
| **Core** | Core/shared reference data used across other resources. | `/parameter/{parameterIds}` |
| **Couple** | Couple system data describing paired-character bonuses and mechanics. | `/couple` |
| **Dungeon** | Dungeon definitions covering mechanics, layout and rewards. | `/dungeon` |
| **Element** | Elemental type definitions used by skills, monsters and items. | `/image/element/{fileName}` |
| **EquipmentSet** | Equipment sets and their set bonuses — `GET /equipset` and `GET /equipset/{equipSetId}`. | `/equipmentset` |
| **ExchangeMenus** | Exchange/shop menu definitions used by in-game exchange systems. | `/exchangemenu` |
| **HousingPack** | Player housing packs — bundled housing content definitions. | `/housingpack` |
| **HousingTemplate** | Housing template definitions describing house layouts and slots, under `/housing*`. | `/housingtemplate` |
| **Item** | Items with properties, abilities and pricing — `GET /item`, `GET /item/{itemId}` and batch `GET /item/{itemIds}`. | `/item` |
| **Language** | Language packs and localised strings for translated UI text. | `/language` |
| **Lifestyle** | Lifestyle system data covering non-combat character activities. | `/lifestyle` |
| **Monster** | Monsters with stats, drops and spawn locations — `GET /monster`, `GET /monster/{monsterId}` and batch `GET /monster/{monsterIds}`. | `/monster` |
| **Npc** | Non-player characters including dialog and portrait images under `/npc` and `/image/npc/...`. | `/npc` |
| **PartySkill** | Party-wide skill definitions — `GET /partyskill`. | `/partyskill` |
| **Pkn** | PKN (player-versus-player related) reference data used by combat systems. | `/pk` |
| **Place** | Place/location definitions used by worlds, quests and NPCs. | `/image/place/{fileName}` |
| **Quest** | Quest definitions including objectives and rewards under `/quest`. | `/quest` |
| **RaisedPet** | Raised-pet definitions describing pet growth and bonuses. | `/raisedpet` |
| **Recipe** | Crafting recipes and their ingredient/result mappings under `/recipe`. | `/recipe` |
| **Skill** | Skills with mechanics, scaling and requirements — `GET /skill`, `GET /skill/{skillId}` and batch `GET /skill/{skillIds}`. | `/skill` |
| **UpgradeLevelBonus** | Upgrade-level bonus tables describing stat gains from gear upgrades. | `/upgradelevelbonus` |
| **Version** | Data and API version identifiers — `GET /version/data` and `GET /version/api`, used to invalidate caches. | `/version/api` |
| **World** | Worlds with continents and revival points, plus tilemap images — `GET /world`, `GET /world/{worldId}`, batch `GET /world/{worldIds}` and `/image/world/...`. | `/world` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from flyffgame_sdk import FlyffGameSDK

client = FlyffGameSDK({})

# List all achievements
achievements, err = client.Achievement(None).list(None, None)

# Load a specific achievement
achievement, err = client.Achievement(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'flyffgame_sdk.php';

$client = new FlyffGameSDK([]);

// List all achievements
[$achievements, $err] = $client->Achievement(null)->list(null, null);

// Load a specific achievement
[$achievement, $err] = $client->Achievement(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/flyff-game-sdk/go"

client := sdk.NewFlyffGameSDK(map[string]any{})

// List all achievements
achievements, err := client.Achievement(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "FlyffGame_sdk"

client = FlyffGameSDK.new({})

# List all achievements
achievements, err = client.Achievement(nil).list(nil, nil)

# Load a specific achievement
achievement, err = client.Achievement(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("flyff-game_sdk")

local client = sdk.new({})

-- List all achievements
local achievements, err = client:Achievement(nil):list(nil, nil)

-- Load a specific achievement
local achievement, err = client:Achievement(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = FlyffGameSDK.test()
const result = await client.Achievement().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = FlyffGameSDK.test(None, None)
result, err = client.Achievement(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = FlyffGameSDK::test(null, null);
[$result, $err] = $client->Achievement(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Achievement(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = FlyffGameSDK.test(nil, nil)
result, err = client.Achievement(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Achievement(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Flyff Game API

- Upstream: [https://api.flyff.com](https://api.flyff.com)

- Proprietary licence from Gala Lab (publisher of Flyff Universe).
- Permission to use data and images is granted only for information sites and tools about the official game.
- Commercial use, in-game automation, cheat tools, and use in other video games are prohibited.
- Gala Lab reserves the right to modify the terms; contact `ir@gala.kr` for licence questions.

---

Generated from the Flyff Game API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
