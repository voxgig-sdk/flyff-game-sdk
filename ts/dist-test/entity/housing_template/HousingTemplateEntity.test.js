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
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": {}, "name": "housing_template", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /housingtemplate", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/housingtemplate", "q": {}, "r": {}, "s": [{ "lit": "housingtemplate" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /image/housingtemplate/{fileName}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "file_name", "or": "file_name", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/image/housingtemplate/{fileName}", "q": { "exist": ["file_name"] }, "r": { "param": { "fileName": "file_name" } }, "s": [{ "lit": "image" }, { "lit": "housingtemplate" }, { "var": "file_name" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /housingtemplate/{housingTemplateIds}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "housing_template_id", "or": "housing_template_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/housingtemplate/{housingTemplateIds}", "q": { "exist": ["housing_template_id"] }, "r": { "param": { "housingTemplateIds": "housing_template_id" } }, "s": [{ "lit": "housingtemplate" }, { "var": "housing_template_id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /housingtemplate/{housingTemplateId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "housing_template_id", "or": "housing_template_id", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/housingtemplate/{housingTemplateId}", "q": { "exist": ["housing_template_id"] }, "r": { "param": { "housingTemplateId": "housing_template_id" } }, "s": [{ "lit": "housingtemplate" }, { "var": "housing_template_id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "housing_template", "name__orig": "housing_template", "Name": "HousingTemplate", "name_": "housing_template", "name-": "housing-template", "NAME": "HOUSING_TEMPLATE", "index$": 11 }, { "active": true, "entity": "housing_template", "key$": "BasicHousingTemplateFlow", "kind": "basic", "name": "BasicHousingTemplateFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "housing_template_ref01" } }], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "housing_template_ref01", "srcdatavar": "housing_template_ref01_data", "suffix": "_dt0" }, "m": { "id": "housing_template01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-housing_template_ref01" } }], "index$": 1 }] }, 'HousingTemplate', { "GET /housingtemplate": { "protocol": "http", "operationId": "getAllHousingTemplateIds", "responses": { "200": { "description": "Successful operation", "content": { "application/json": { "schema": { "type": "array", "items": { "type": "integer", "key$": "items" } } } } } }, "parameters": [], "securitySource": "unspecified" }, "GET /image/housingtemplate/{fileName}": { "protocol": "http", "operationId": "getHousingTemplatePreview", "responses": { "200": { "description": "Successful operation", "content": { "image/png": { "schema": { "type": "string", "format": "binary" } } } }, "404": { "description": "Preview image not found" } }, "parameters": [{ "name": "fileName", "in": "path", "description": "File name of the housing template preview", "required": true, "schema": { "type": "string" }, "index$": 0 }], "securitySource": "unspecified" }, "GET /housingtemplate/{housingTemplateIds}": { "protocol": "http", "operationId": "getHousingTemplatesByIds", "responses": { "200": { "description": "Successful operation", "content": { "application/json": { "schema": { "type": "array", "items": { "type": "object", "key$": "items" } } } } }, "400": { "description": "Invalid list of IDs supplied" }, "404": { "description": "Housing template not found" } }, "parameters": [{ "name": "housingTemplateIds", "in": "path", "description": "IDs of housing templates to return separated by comma", "required": true, "schema": { "type": "string" }, "index$": 0 }], "securitySource": "unspecified" }, "GET /housingtemplate/{housingTemplateId}": { "protocol": "http", "operationId": "getHousingTemplateById", "responses": { "200": { "description": "Successful operation", "content": { "application/json": { "schema": { "type": "object" } } } }, "400": { "description": "Invalid ID supplied" }, "404": { "description": "Housing template not found" } }, "parameters": [{ "name": "housingTemplateId", "in": "path", "description": "ID of housing template to return", "required": true, "schema": { "type": "integer" }, "index$": 0 }], "securitySource": "unspecified" } });
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
    let idmap = transform(['housing_template01', 'housing_template02', 'housing_template03'], {
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