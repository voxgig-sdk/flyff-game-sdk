# FlyffGame SDK

Flyff Game API client, generated from the OpenAPI spec.

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

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

## Quickstart

### TypeScript

```ts
import { FlyffGameSDK } from 'flyff-game'

const client = new FlyffGameSDK({
  apikey: process.env.FLYFF-GAME_APIKEY,
})

// List all achievements
const achievements = await client.Achievement().list()
console.log(achievements.data)
```

See the [TypeScript README](ts/README.md) for the full guide.

## Surfaces

| Surface | Path |
| --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | `go-cli/` |
| **MCP server** | `go-mcp/` |

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
| **Achievement** |  | `/achievement` |
| **Awake** |  | `/awake/skill` |
| **Badge** |  | `/image/badge/{fileName}` |
| **Class** |  | `/class` |
| **Core** |  | `/parameter/{parameterIds}` |
| **Couple** |  | `/couple` |
| **Dungeon** |  | `/dungeon` |
| **Element** |  | `/image/element/{fileName}` |
| **EquipmentSet** |  | `/equipmentset` |
| **ExchangeMenus** |  | `/exchangemenu` |
| **HousingPack** |  | `/housingpack` |
| **HousingTemplate** |  | `/housingtemplate` |
| **Item** |  | `/item` |
| **Language** |  | `/language` |
| **Lifestyle** |  | `/lifestyle` |
| **Monster** |  | `/monster` |
| **Npc** |  | `/npc` |
| **PartySkill** |  | `/partyskill` |
| **Pkn** |  | `/pk` |
| **Place** |  | `/image/place/{fileName}` |
| **Quest** |  | `/quest` |
| **RaisedPet** |  | `/raisedpet` |
| **Recipe** |  | `/recipe` |
| **Skill** |  | `/skill` |
| **UpgradeLevelBonus** |  | `/upgradelevelbonus` |
| **Version** |  | `/version/api` |
| **World** |  | `/world` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
import os
from flyffgame_sdk import FlyffGameSDK

client = FlyffGameSDK({
    "apikey": os.environ.get("FLYFF-GAME_APIKEY"),
})

# List all achievements
achievements, err = client.Achievement().list()
print(achievements)

# Load a specific achievement
achievement, err = client.Achievement().load({"id": "example_id"})
print(achievement)
```

### PHP

```php
<?php
require_once 'flyffgame_sdk.php';

$client = new FlyffGameSDK([
    "apikey" => getenv("FLYFF-GAME_APIKEY"),
]);

// List all achievements
[$achievements, $err] = $client->Achievement()->list();
print_r($achievements);

// Load a specific achievement
[$achievement, $err] = $client->Achievement()->load(["id" => "example_id"]);
print_r($achievement);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/flyff-game-sdk/go"

client := sdk.NewFlyffGameSDK(map[string]any{
    "apikey": os.Getenv("FLYFF-GAME_APIKEY"),
})

// List all achievements
achievements, err := client.Achievement(nil).List(nil, nil)
fmt.Println(achievements)
```

### Ruby

```ruby
require_relative "FlyffGame_sdk"

client = FlyffGameSDK.new({
  "apikey" => ENV["FLYFF-GAME_APIKEY"],
})

# List all achievements
achievements, err = client.Achievement().list
puts achievements

# Load a specific achievement
achievement, err = client.Achievement().load({ "id" => "example_id" })
puts achievement
```

### Lua

```lua
local sdk = require("flyff-game_sdk")

local client = sdk.new({
  apikey = os.getenv("FLYFF-GAME_APIKEY"),
})

-- List all achievements
local achievements, err = client:Achievement():list()
print(achievements)

-- Load a specific achievement
local achievement, err = client:Achievement():load({ id = "example_id" })
print(achievement)
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
client = FlyffGameSDK.test()
result, err = client.Achievement().load({"id": "test01"})
```

### PHP

```php
$client = FlyffGameSDK::test();
[$result, $err] = $client->Achievement()->load(["id" => "test01"]);
```

### Golang

```go
client := sdk.Test()
result, err := client.Achievement(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = FlyffGameSDK.test
result, err = client.Achievement().load({ "id" => "test01" })
```

### Lua

```lua
local client = sdk.test()
local result, err = client:Achievement():load({ id = "test01" })
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

---

Generated from the Flyff Game API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
