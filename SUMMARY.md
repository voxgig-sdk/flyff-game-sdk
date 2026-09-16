# Flyff Game API

All Game Data from Flyff Universe. This API provides access to game data including classes, worlds, monsters, items, equipment sets, skills, NPCs, quests, achievements, and more. Limited to 300 calls per minute per IP.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 27 entities and 65 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### Achievement

Results: Successful operation.

SDK operations: `list`, `load`.

### Awake

Results: Successful operation.

SDK operations: `load`.

### Badge

Results: Successful operation.

SDK operations: `load`.

### Class

Results: Successful operation.

SDK operations: `list`, `load`.

Key fields to recognise:

- `attackSpeed`: Attack speed constant used in attack speed calculation
- `autoAttackFactors`: Auto attack damage factors used in damage calculation
- `block`: Blocking constant used in block calculation
- `critical`: Critical chance constant used in critical chance calculation
- `defense`: Defense factor use in defensive calculations

### Core

Results: Successful operation.

SDK operations: `load`.

### Couple

Results: Successful operation.

SDK operations: `load`.

### Dungeon

Results: Successful operation.

SDK operations: `load`.

### Element

Results: Successful operation.

SDK operations: `load`.

### EquipmentSet

Results: Successful operation.

SDK operations: `list`, `load`.

### ExchangeMenus

Results: Successful operation.

SDK operations: `load`.

### HousingPack

Results: Successful operation.

SDK operations: `list`, `load`.

### HousingTemplate

Results: Successful operation.

SDK operations: `list`, `load`.

### Item

Results: Successful operation.

SDK operations: `list`, `load`.

### Language

Results: Successful operation.

SDK operations: `list`, `load`.

### Lifestyle

Results: Successful operation.

SDK operations: `load`.

### Monster

Results: Successful operation.

SDK operations: `list`, `load`.

### Npc

Results: Successful operation.

SDK operations: `list`, `load`.

### PartySkill

Results: Successful operation.

SDK operations: `list`, `load`.

### Pkn

Results: Successful operation.

SDK operations: `load`.

### Place

Results: Successful operation.

SDK operations: `load`.

### Quest

Results: Successful operation.

SDK operations: `list`, `load`.

### RaisedPet

Results: Successful operation.

SDK operations: `load`.

### Recipe

Results: Successful operation.

SDK operations: `list`, `load`.

### Skill

Results: Successful operation.

SDK operations: `list`, `load`.

### UpgradeLevelBonus

Results: Successful operation.

SDK operations: `load`.

### Version

Results: Successful operation.

SDK operations: `load`.

### World

Results: Successful operation.

SDK operations: `list`, `load`.

Key fields to recognise:

- `continents`: Continents in the World
- `flying`: Whether players can fly in the World or not
- `height`: Height of the World in meters
- `id`: ID of the World
- `inDoor`: Whether the World has a sky or not

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| Achievement | `list` | `GET /achievement` | See reference |
| Achievement | `load` | `GET /achievement/{achievementIds}` | See reference |
| Achievement | `load` | `GET /achievement/{achievementId}` | See reference |
| Awake | `load` | `GET /awake/skill` | See reference |
| Awake | `load` | `GET /awake/stat` | See reference |
| Badge | `load` | `GET /image/badge/{fileName}` | See reference |
| Class | `list` | `GET /class` | See reference |
| Class | `load` | `GET /image/class/{style}/{fileName}` | See reference |
| Class | `load` | `GET /image/class/tree/{fileName}` | See reference |
| Class | `load` | `GET /class/{classIds}` | See reference |
| Class | `load` | `GET /class/{classId}` | See reference |
| Core | `load` | `GET /parameter/{parameterIds}` | See reference |
| Core | `load` | `GET /parameter/{parameterId}` | See reference |
| Couple | `load` | `GET /couple` | See reference |
| Dungeon | `load` | `GET /dungeon` | See reference |
| Element | `load` | `GET /image/element/{fileName}` | See reference |
| EquipmentSet | `list` | `GET /equipmentset` | See reference |
| EquipmentSet | `load` | `GET /equipmentset/{equipmentSetIds}` | See reference |
| EquipmentSet | `load` | `GET /equipmentset/{equipmentSetId}` | See reference |
| ExchangeMenus | `load` | `GET /exchangemenu` | See reference |
| HousingPack | `list` | `GET /housingpack` | See reference |
| HousingPack | `load` | `GET /housingpack/{housingPackIds}` | See reference |
| HousingPack | `load` | `GET /housingpack/{housingPackId}` | See reference |
| HousingTemplate | `list` | `GET /housingtemplate` | See reference |
| HousingTemplate | `load` | `GET /image/housingtemplate/{fileName}` | See reference |
| HousingTemplate | `load` | `GET /housingtemplate/{housingTemplateIds}` | See reference |
| HousingTemplate | `load` | `GET /housingtemplate/{housingTemplateId}` | See reference |
| Item | `list` | `GET /item` | See reference |
| Item | `load` | `GET /image/item/{fileName}` | See reference |
| Item | `load` | `GET /item/{itemIds}` | See reference |
| Item | `load` | `GET /item/{itemId}` | See reference |
| Language | `list` | `GET /language` | See reference |
| Language | `load` | `GET /image/language/{languageCode}.png` | See reference |
| Lifestyle | `load` | `GET /lifestyle` | See reference |
| Monster | `list` | `GET /monster` | See reference |
| Monster | `load` | `GET /image/monster/{fileName}` | See reference |
| Monster | `load` | `GET /monster/{monsterIds}` | See reference |
| Monster | `load` | `GET /monster/{monsterId}` | See reference |
| Npc | `list` | `GET /npc` | See reference |
| Npc | `load` | `GET /image/npc/{fileName}` | See reference |
| Npc | `load` | `GET /npc/{npcIds}` | See reference |
| Npc | `load` | `GET /npc/{npcId}` | See reference |
| PartySkill | `list` | `GET /partyskill` | See reference |
| PartySkill | `load` | `GET /partyskill/{partySkillIds}` | See reference |
| PartySkill | `load` | `GET /partyskill/{partySkillId}` | See reference |
| Pkn | `load` | `GET /pk` | See reference |
| Place | `load` | `GET /image/place/{fileName}` | See reference |
| Quest | `list` | `GET /quest` | See reference |
| Quest | `load` | `GET /quest/{questIds}` | See reference |
| Quest | `load` | `GET /quest/{questId}` | See reference |
| RaisedPet | `load` | `GET /raisedpet` | See reference |
| Recipe | `list` | `GET /recipe` | See reference |
| Recipe | `load` | `GET /recipe/{recipeIds}` | See reference |
| Recipe | `load` | `GET /recipe/{recipeId}` | See reference |
| Skill | `list` | `GET /skill` | See reference |
| Skill | `load` | `GET /image/skill/{fileName}` | See reference |
| Skill | `load` | `GET /skill/{skillIds}` | See reference |
| Skill | `load` | `GET /skill/{skillId}` | See reference |
| UpgradeLevelBonus | `load` | `GET /upgradelevelbonus` | See reference |
| Version | `load` | `GET /version/api` | See reference |
| Version | `load` | `GET /version/data` | See reference |
| World | `list` | `GET /world` | See reference |
| World | `load` | `GET /image/world/{worldTileName}{tileX}-{tileY}-0.png` | See reference |
| World | `load` | `GET /world/{worldIds}` | See reference |
| World | `load` | `GET /world/{worldId}` | See reference |

## Connect to the API

- Main server: `https://api.flyff.com`

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Golang | `go/` | Build from source |
| Lua | `lua/` | Build from source |
| PHP | `php/` | Build from source |
| Python | `py/` | Build from source |
| Ruby | `rb/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### Go CLI

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### Go MCP server

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `flyff-game_list`: List records for an entity. Supported entities: `achievement`, `class`, `equipment_set`, `housing_pack`, `housing_template`, `item`, `language`, `monster`, `npc`, `party_skill`, `quest`, `recipe`, `skill`, `world`.
- `flyff-game_load`: Load one record for an entity. Supported entities: `achievement`, `awake`, `badge`, `class`, `core`, `couple`, `dungeon`, `element`, `equipment_set`, `exchange_menus`, `housing_pack`, `housing_template`, `item`, `language`, `lifestyle`, `monster`, `npc`, `party_skill`, `pkn`, `place`, `quest`, `raised_pet`, `recipe`, `skill`, `upgrade_level_bonus`, `version`, `world`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `ratelimit`: Client-side rate limiting via a token bucket
- `retry`: Automatic retry of transient failures with exponential backoff
- `test`: In-memory mock transport for testing without a live server
- `timeout`: Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

