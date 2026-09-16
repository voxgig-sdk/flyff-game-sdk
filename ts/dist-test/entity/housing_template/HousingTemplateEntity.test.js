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
(0, node_test_1.describe)('HousingTemplateEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when FLYFF_GAME_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('FLYFF_GAME_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.FlyffGameSDK.test();
        const ent = testsdk.HousingTemplate();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.FLYFF_GAME_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'housing_template.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [], "name": "housing_template", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": {}, "contract": { "id": "GET /housingtemplate", "json": "{\"operationId\":\"getAllHousingTemplateIds\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"type\":\"integer\"},\"type\":\"array\"}}},\"description\":\"Successful operation\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/housingtemplate", "segments": [{ "lit": "housingtemplate" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "file_name", "orig": "file_name", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /image/housingtemplate/{fileName}", "json": "{\"operationId\":\"getHousingTemplatePreview\",\"parameters\":[{\"description\":\"File name of the housing template preview\",\"in\":\"path\",\"name\":\"fileName\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"image/png\":{\"schema\":{\"format\":\"binary\",\"type\":\"string\"}}},\"description\":\"Successful operation\"},\"404\":{\"description\":\"Preview image not found\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/image/housingtemplate/{fileName}", "rename": { "param": { "fileName": "file_name" } }, "segments": [{ "lit": "image" }, { "lit": "housingtemplate" }, { "var": "file_name" }], "select": { "exist": ["file_name"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "housing_template_id", "orig": "housing_template_id", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /housingtemplate/{housingTemplateIds}", "json": "{\"operationId\":\"getHousingTemplatesByIds\",\"parameters\":[{\"description\":\"IDs of housing templates to return separated by comma\",\"in\":\"path\",\"name\":\"housingTemplateIds\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful operation\"},\"400\":{\"description\":\"Invalid list of IDs supplied\"},\"404\":{\"description\":\"Housing template not found\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/housingtemplate/{housingTemplateIds}", "rename": { "param": { "housingTemplateIds": "housing_template_id" } }, "segments": [{ "lit": "housingtemplate" }, { "var": "housing_template_id" }], "select": { "exist": ["housing_template_id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "housing_template_id", "orig": "housing_template_id", "reqd": true, "type": "`$INTEGER`", "index$": 0 }] }, "contract": { "id": "GET /housingtemplate/{housingTemplateId}", "json": "{\"operationId\":\"getHousingTemplateById\",\"parameters\":[{\"description\":\"ID of housing template to return\",\"in\":\"path\",\"name\":\"housingTemplateId\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"type\":\"object\"}}},\"description\":\"Successful operation\"},\"400\":{\"description\":\"Invalid ID supplied\"},\"404\":{\"description\":\"Housing template not found\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/housingtemplate/{housingTemplateId}", "rename": { "param": { "housingTemplateId": "housing_template_id" } }, "segments": [{ "lit": "housingtemplate" }, { "var": "housing_template_id" }], "select": { "exist": ["housing_template_id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }], "key$": "load" } }, "relations": { "ancestors": [["housingtemplate"]] }, "key$": "housing_template", "name__orig": "housing_template", "Name": "HousingTemplate", "name_": "housing_template", "name-": "housing-template", "NAME": "HOUSING_TEMPLATE", "index$": 11 }, { "active": true, "entity": "housing_template", "key$": "BasicHousingTemplateFlow", "kind": "basic", "name": "BasicHousingTemplateFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "housing_template_ref01" } }], "index$": 0 }, { "active": true, "data": {}, "input": { "ref": "housing_template_ref01", "srcdatavar": "housing_template_ref01_data", "suffix": "_dt0" }, "match": { "id": "housing_template01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-housing_template_ref01" } }], "index$": 1 }] }, 'HousingTemplate');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let housing_template_ref01_data = Object.values(setup.data.existing.housing_template)[0];
        // LIST
        const housing_template_ref01_ent = client.HousingTemplate();
        const housing_template_ref01_match = {};
        const housing_template_ref01_list = (await housing_template_ref01_ent.list(housing_template_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/housing_template/HousingTemplateTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.FlyffGameSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['housing_template01', 'housing_template02', 'housing_template03', 'housingtemplate01', 'housingtemplate02', 'housingtemplate03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'FLYFF_GAME_TEST_HOUSING_TEMPLATE_ENTID': idmap,
        'FLYFF_GAME_TEST_LIVE': 'FALSE',
        'FLYFF_GAME_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['FLYFF_GAME_TEST_HOUSING_TEMPLATE_ENTID'];
    const live = 'TRUE' === env.FLYFF_GAME_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['FLYFF_GAME_TEST_HOUSING_TEMPLATE_ENTID'];
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
//# sourceMappingURL=HousingTemplateEntity.test.js.map