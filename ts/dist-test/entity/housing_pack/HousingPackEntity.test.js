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
(0, node_test_1.describe)('HousingPackEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when FLYFF_GAME_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('FLYFF_GAME_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.FlyffGameSDK.test();
        const ent = testsdk.HousingPack();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.FLYFF_GAME_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'housing_pack.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [], "name": "housing_pack", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": {}, "contract": { "id": "GET /housingpack", "json": "{\"operationId\":\"getAllHousingPackIds\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"type\":\"integer\"},\"type\":\"array\"}}},\"description\":\"Successful operation\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/housingpack", "segments": [{ "lit": "housingpack" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "housing_pack_id", "orig": "housing_pack_id", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /housingpack/{housingPackIds}", "json": "{\"operationId\":\"getHousingPacksByIds\",\"parameters\":[{\"description\":\"IDs of housing packs to return separated by comma\",\"in\":\"path\",\"name\":\"housingPackIds\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful operation\"},\"400\":{\"description\":\"Invalid list of IDs supplied\"},\"404\":{\"description\":\"Housing pack not found\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/housingpack/{housingPackIds}", "rename": { "param": { "housingPackIds": "housing_pack_id" } }, "segments": [{ "lit": "housingpack" }, { "var": "housing_pack_id" }], "select": { "exist": ["housing_pack_id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "housing_pack_id", "orig": "housing_pack_id", "reqd": true, "type": "`$INTEGER`", "index$": 0 }] }, "contract": { "id": "GET /housingpack/{housingPackId}", "json": "{\"operationId\":\"getHousingPackById\",\"parameters\":[{\"description\":\"ID of housing pack to return\",\"in\":\"path\",\"name\":\"housingPackId\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"type\":\"object\"}}},\"description\":\"Successful operation\"},\"400\":{\"description\":\"Invalid ID supplied\"},\"404\":{\"description\":\"Housing pack not found\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/housingpack/{housingPackId}", "rename": { "param": { "housingPackId": "housing_pack_id" } }, "segments": [{ "lit": "housingpack" }, { "var": "housing_pack_id" }], "select": { "exist": ["housing_pack_id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "load" } }, "relations": { "ancestors": [["housingpack"]] }, "key$": "housing_pack", "name__orig": "housing_pack", "Name": "HousingPack", "name_": "housing_pack", "name-": "housing-pack", "NAME": "HOUSING_PACK", "index$": 10 }, { "active": true, "entity": "housing_pack", "key$": "BasicHousingPackFlow", "kind": "basic", "name": "BasicHousingPackFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "housing_pack_ref01" } }], "index$": 0 }, { "active": true, "data": {}, "input": { "ref": "housing_pack_ref01", "srcdatavar": "housing_pack_ref01_data", "suffix": "_dt0" }, "match": { "id": "housing_pack01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-housing_pack_ref01" } }], "index$": 1 }] }, 'HousingPack');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let housing_pack_ref01_data = Object.values(setup.data.existing.housing_pack)[0];
        // LIST
        const housing_pack_ref01_ent = client.HousingPack();
        const housing_pack_ref01_match = {};
        const housing_pack_ref01_list = (await housing_pack_ref01_ent.list(housing_pack_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/housing_pack/HousingPackTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.FlyffGameSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['housing_pack01', 'housing_pack02', 'housing_pack03', 'housingpack01', 'housingpack02', 'housingpack03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'FLYFF_GAME_TEST_HOUSING_PACK_ENTID': idmap,
        'FLYFF_GAME_TEST_LIVE': 'FALSE',
        'FLYFF_GAME_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['FLYFF_GAME_TEST_HOUSING_PACK_ENTID'];
    const live = 'TRUE' === env.FLYFF_GAME_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['FLYFF_GAME_TEST_HOUSING_PACK_ENTID'];
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
//# sourceMappingURL=HousingPackEntity.test.js.map