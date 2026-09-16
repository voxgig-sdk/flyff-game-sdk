"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('WorldEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when FLYFF_GAME_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('FLYFF_GAME_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.FlyffGameSDK.test();
        const ent = testsdk.World();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.FLYFF_GAME_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'world.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "continents", "req": true, "short": "Continents in the World", "type": "`$ARRAY`", "index$": 0 }, { "active": true, "name": "flying", "req": true, "short": "Whether players can fly in the World or not", "type": "`$BOOLEAN`", "index$": 1 }, { "active": true, "name": "height", "req": true, "short": "Height of the World in meters", "type": "`$INTEGER`", "index$": 2 }, { "active": true, "name": "id", "req": true, "short": "ID of the World", "type": "`$INTEGER`", "index$": 3 }, { "active": true, "name": "inDoor", "req": true, "short": "Whether the World has a sky or not", "type": "`$BOOLEAN`", "index$": 4 }, { "active": true, "name": "lodestars", "req": true, "short": "Revival places in the World", "type": "`$ARRAY`", "index$": 5 }, { "active": true, "name": "name", "req": true, "short": "Text available in several languages", "type": "`$OBJECT`", "index$": 6 }, { "active": true, "name": "pk", "req": true, "short": "Whether players can kill other players in the World or not", "type": "`$BOOLEAN`", "index$": 7 }, { "active": true, "name": "places", "req": true, "short": "Special Places in the World", "type": "`$ARRAY`", "index$": 8 }, { "active": true, "name": "revivalKey", "req": false, "short": "ID of the Lodestar where players revive when they die in the World", "type": "`$STRING`", "index$": 9 }, { "active": true, "name": "revivalWorld", "req": false, "short": "ID of the World where players revive when they die in the World", "type": "`$INTEGER`", "index$": 10 }, { "active": true, "name": "tileName", "req": true, "short": "Name of the world Tiles for navigator", "type": "`$STRING`", "index$": 11 }, { "active": true, "name": "tileSize", "req": true, "short": "World meters per Tile", "type": "`$INTEGER`", "index$": 12 }, { "active": true, "name": "type", "req": true, "short": "Type of the World", "type": "`$STRING`", "index$": 13 }, { "active": true, "name": "width", "req": true, "short": "Width of the World in meters", "type": "`$INTEGER`", "index$": 14 }], "id": { "field": "id", "name": "id" }, "name": "world", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": {}, "contract": { "id": "GET /world", "json": "{\"operationId\":\"getAllWorldIds\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"example\":[4015,4839,6063],\"items\":{\"type\":\"integer\"},\"type\":\"array\"}}},\"description\":\"Successful operation\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/world", "segments": [{ "lit": "world" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "tile_x", "orig": "tile_x", "reqd": true, "type": "`$INTEGER`" }, { "active": true, "kind": "param", "name": "tile_y", "orig": "tile_y", "reqd": true, "type": "`$INTEGER`" }, { "active": true, "example": "wdmadrigal", "kind": "param", "name": "world_tile_name", "orig": "world_tile_name", "reqd": true, "type": "`$STRING`" }] }, "contract": { "id": "GET /image/world/{worldTileName}{tileX}-{tileY}-0.png", "json": "{\"operationId\":\"getWorldTile\",\"parameters\":[{\"description\":\"Tile name of the world\",\"in\":\"path\",\"name\":\"worldTileName\",\"required\":true,\"schema\":{\"example\":\"wdmadrigal\",\"type\":\"string\"}},{\"description\":\"X position of the tile\",\"in\":\"path\",\"name\":\"tileX\",\"required\":true,\"schema\":{\"type\":\"integer\"}},{\"description\":\"Y position of the tile\",\"in\":\"path\",\"name\":\"tileY\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"image/png\":{\"schema\":{\"format\":\"binary\",\"type\":\"string\"}}},\"description\":\"Successful operation\"},\"404\":{\"description\":\"Tile not found\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/image/world/{worldTileName}{tileX}-{tileY}-0.png", "segments": [{ "lit": "image" }, { "lit": "world" }, { "lit": "{worldTileName}{tileX}-{tileY}-0.png" }], "select": { "$action": "world_tile_nametile_x_tile_y_0", "exist": ["tile_x", "tile_y", "world_tile_name"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "active": true, "args": { "params": [{ "active": true, "example": "4015,4839,6063", "kind": "param", "name": "id", "orig": "world_id", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /world/{worldIds}", "json": "{\"operationId\":\"getWorldsByIds\",\"parameters\":[{\"description\":\"IDs of worlds to return separated by comma\",\"in\":\"path\",\"name\":\"worldIds\",\"required\":true,\"schema\":{\"example\":\"4015,4839,6063\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"continents\":{\"description\":\"Continents in the World\",\"items\":{\"properties\":{\"id\":{\"description\":\"Continent ID\",\"type\":\"integer\"},\"name\":{\"description\":\"Text available in several languages\",\"example\":{\"en\":\"Julia\",\"fr\":\"[Intendante de Flarine] Julia\",\"kr\":\"쥬리아\"},\"properties\":{\"en\":{\"description\":\"English text\",\"type\":\"string\"},\"fr\":{\"description\":\"French text\",\"type\":\"string\"},\"kr\":{\"description\":\"Korean text\",\"type\":\"string\"}},\"type\":\"object\"},\"polygon\":{\"items\":{\"properties\":{\"x\":{\"type\":\"number\"},\"z\":{\"type\":\"number\"}},\"type\":\"object\"},\"type\":\"array\"},\"town\":{\"description\":\"Whether the continent is a town\",\"type\":\"boolean\"}},\"type\":\"object\"},\"type\":\"array\"},\"flying\":{\"description\":\"Whether players can fly in the World or not\",\"type\":\"boolean\"},\"height\":{\"description\":\"Height of the World in meters\",\"type\":\"integer\"},\"id\":{\"description\":\"ID of the World\",\"type\":\"integer\"},\"inDoor\":{\"description\":\"Whether the World has a sky or not\",\"type\":\"boolean\"},\"lodestars\":{\"description\":\"Revival places in the World\",\"items\":{\"properties\":{\"key\":{\"description\":\"Lodestar key\",\"type\":\"string\"},\"location\":{\"properties\":{\"continent\":{\"description\":\"Continent ID\",\"type\":\"integer\"},\"world\":{\"description\":\"World ID\",\"type\":\"integer\"},\"x\":{\"description\":\"X coordinate\",\"format\":\"float\",\"type\":\"number\"},\"y\":{\"description\":\"Y coordinate\",\"format\":\"float\",\"type\":\"number\"},\"z\":{\"description\":\"Z coordinate\",\"format\":\"float\",\"type\":\"number\"}},\"type\":\"object\"}},\"type\":\"object\"},\"type\":\"array\"},\"name\":{\"description\":\"Text available in several languages\",\"example\":{\"en\":\"Julia\",\"fr\":\"[Intendante de Flarine] Julia\",\"kr\":\"쥬리아\"},\"properties\":{\"en\":{\"description\":\"English text\",\"type\":\"string\"},\"fr\":{\"description\":\"French text\",\"type\":\"string\"},\"kr\":{\"description\":\"Korean text\",\"type\":\"string\"}},\"type\":\"object\"},\"pk\":{\"description\":\"Whether players can kill other players in the World or not\",\"type\":\"boolean\"},\"places\":{\"description\":\"Special Places in the World\",\"items\":{\"properties\":{\"location\":{\"properties\":{\"continent\":{\"description\":\"Continent ID\",\"type\":\"integer\"},\"world\":{\"description\":\"World ID\",\"type\":\"integer\"},\"x\":{\"description\":\"X coordinate\",\"format\":\"float\",\"type\":\"number\"},\"y\":{\"description\":\"Y coordinate\",\"format\":\"float\",\"type\":\"number\"},\"z\":{\"description\":\"Z coordinate\",\"format\":\"float\",\"type\":\"number\"}},\"type\":\"object\"},\"type\":{\"description\":\"Type of place\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"revivalKey\":{\"description\":\"ID of the Lodestar where players revive when they die in the World\",\"type\":\"string\"},\"revivalWorld\":{\"description\":\"ID of the World where players revive when they die in the World\",\"type\":\"integer\"},\"tileName\":{\"description\":\"Name of the world Tiles for navigator\",\"type\":\"string\"},\"tileSize\":{\"description\":\"World meters per Tile\",\"type\":\"integer\"},\"type\":{\"description\":\"Type of the World\",\"enum\":[\"main\",\"prison\",\"dungeon\",\"instance\",\"event\"],\"type\":\"string\"},\"width\":{\"description\":\"Width of the World in meters\",\"type\":\"integer\"}},\"required\":[\"id\",\"name\",\"type\",\"width\",\"height\",\"tileName\",\"tileSize\",\"flying\",\"pk\",\"inDoor\",\"places\",\"lodestars\",\"continents\"],\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful operation\"},\"400\":{\"description\":\"Invalid list of IDs supplied\"},\"404\":{\"description\":\"World not found\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/world/{worldIds}", "rename": { "param": { "worldIds": "id" } }, "segments": [{ "lit": "world" }, { "var": "id" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "active": true, "args": { "params": [{ "active": true, "example": 4015, "kind": "param", "name": "id", "orig": "world_id", "reqd": true, "type": "`$INTEGER`", "index$": 0 }] }, "contract": { "id": "GET /world/{worldId}", "json": "{\"operationId\":\"getWorldById\",\"parameters\":[{\"description\":\"ID of world to return\",\"in\":\"path\",\"name\":\"worldId\",\"required\":true,\"schema\":{\"example\":4015,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"continents\":{\"description\":\"Continents in the World\",\"items\":{\"properties\":{\"id\":{\"description\":\"Continent ID\",\"type\":\"integer\"},\"name\":{\"description\":\"Text available in several languages\",\"example\":{\"en\":\"Julia\",\"fr\":\"[Intendante de Flarine] Julia\",\"kr\":\"쥬리아\"},\"properties\":{\"en\":{\"description\":\"English text\",\"type\":\"string\"},\"fr\":{\"description\":\"French text\",\"type\":\"string\"},\"kr\":{\"description\":\"Korean text\",\"type\":\"string\"}},\"type\":\"object\"},\"polygon\":{\"items\":{\"properties\":{\"x\":{\"type\":\"number\"},\"z\":{\"type\":\"number\"}},\"type\":\"object\"},\"type\":\"array\"},\"town\":{\"description\":\"Whether the continent is a town\",\"type\":\"boolean\"}},\"type\":\"object\"},\"type\":\"array\"},\"flying\":{\"description\":\"Whether players can fly in the World or not\",\"type\":\"boolean\"},\"height\":{\"description\":\"Height of the World in meters\",\"type\":\"integer\"},\"id\":{\"description\":\"ID of the World\",\"type\":\"integer\"},\"inDoor\":{\"description\":\"Whether the World has a sky or not\",\"type\":\"boolean\"},\"lodestars\":{\"description\":\"Revival places in the World\",\"items\":{\"properties\":{\"key\":{\"description\":\"Lodestar key\",\"type\":\"string\"},\"location\":{\"properties\":{\"continent\":{\"description\":\"Continent ID\",\"type\":\"integer\"},\"world\":{\"description\":\"World ID\",\"type\":\"integer\"},\"x\":{\"description\":\"X coordinate\",\"format\":\"float\",\"type\":\"number\"},\"y\":{\"description\":\"Y coordinate\",\"format\":\"float\",\"type\":\"number\"},\"z\":{\"description\":\"Z coordinate\",\"format\":\"float\",\"type\":\"number\"}},\"type\":\"object\"}},\"type\":\"object\"},\"type\":\"array\"},\"name\":{\"description\":\"Text available in several languages\",\"example\":{\"en\":\"Julia\",\"fr\":\"[Intendante de Flarine] Julia\",\"kr\":\"쥬리아\"},\"properties\":{\"en\":{\"description\":\"English text\",\"type\":\"string\"},\"fr\":{\"description\":\"French text\",\"type\":\"string\"},\"kr\":{\"description\":\"Korean text\",\"type\":\"string\"}},\"type\":\"object\"},\"pk\":{\"description\":\"Whether players can kill other players in the World or not\",\"type\":\"boolean\"},\"places\":{\"description\":\"Special Places in the World\",\"items\":{\"properties\":{\"location\":{\"properties\":{\"continent\":{\"description\":\"Continent ID\",\"type\":\"integer\"},\"world\":{\"description\":\"World ID\",\"type\":\"integer\"},\"x\":{\"description\":\"X coordinate\",\"format\":\"float\",\"type\":\"number\"},\"y\":{\"description\":\"Y coordinate\",\"format\":\"float\",\"type\":\"number\"},\"z\":{\"description\":\"Z coordinate\",\"format\":\"float\",\"type\":\"number\"}},\"type\":\"object\"},\"type\":{\"description\":\"Type of place\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"revivalKey\":{\"description\":\"ID of the Lodestar where players revive when they die in the World\",\"type\":\"string\"},\"revivalWorld\":{\"description\":\"ID of the World where players revive when they die in the World\",\"type\":\"integer\"},\"tileName\":{\"description\":\"Name of the world Tiles for navigator\",\"type\":\"string\"},\"tileSize\":{\"description\":\"World meters per Tile\",\"type\":\"integer\"},\"type\":{\"description\":\"Type of the World\",\"enum\":[\"main\",\"prison\",\"dungeon\",\"instance\",\"event\"],\"type\":\"string\"},\"width\":{\"description\":\"Width of the World in meters\",\"type\":\"integer\"}},\"required\":[\"id\",\"name\",\"type\",\"width\",\"height\",\"tileName\",\"tileSize\",\"flying\",\"pk\",\"inDoor\",\"places\",\"lodestars\",\"continents\"],\"type\":\"object\"}}},\"description\":\"Successful operation\"},\"400\":{\"description\":\"Invalid ID supplied\"},\"404\":{\"description\":\"World not found\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/world/{worldId}", "rename": { "param": { "worldId": "id" } }, "segments": [{ "lit": "world" }, { "var": "id" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "world", "name__orig": "world", "Name": "World", "name_": "world", "name-": "world", "NAME": "WORLD", "index$": 26 }, { "active": true, "entity": "world", "key$": "BasicWorldFlow", "kind": "basic", "name": "BasicWorldFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "world_ref01" } }], "index$": 0 }, { "active": true, "data": {}, "input": { "ref": "world_ref01", "srcdatavar": "world_ref01_data", "suffix": "_dt0" }, "match": { "id": "world01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-world_ref01" } }], "index$": 1 }] }, 'World');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let world_ref01_data = Object.values(setup.data.existing.world)[0];
        // LIST
        const world_ref01_ent = client.World();
        const world_ref01_match = {};
        const world_ref01_list = (await world_ref01_ent.list(world_ref01_match)).map((e) => e.data());
        // LOAD
        const world_ref01_match_dt0 = {};
        world_ref01_match_dt0.id = world_ref01_data.id;
        const world_ref01_data_dt0 = (await world_ref01_ent.load(world_ref01_match_dt0)).data();
        (0, node_assert_1.default)(world_ref01_data_dt0.id === world_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/world/WorldTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.FlyffGameSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['world01', 'world02', 'world03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'FLYFF_GAME_TEST_WORLD_ENTID': idmap,
        'FLYFF_GAME_TEST_LIVE': 'FALSE',
        'FLYFF_GAME_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['FLYFF_GAME_TEST_WORLD_ENTID'];
    const live = 'TRUE' === env.FLYFF_GAME_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['FLYFF_GAME_TEST_WORLD_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.FlyffGameSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.FLYFF_GAME_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=WorldEntity.test.js.map