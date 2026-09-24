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
(0, node_test_1.describe)('PartySkillEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when FLYFF_GAME_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('FLYFF_GAME_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.FlyffGameSDK.test();
        const ent = testsdk.PartySkill();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.FLYFF_GAME_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'party_skill.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": {}, "name": "party_skill", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /partyskill", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/partyskill", "q": {}, "r": {}, "s": [{ "lit": "partyskill" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /partyskill/{partySkillIds}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "party_skill_id", "or": "party_skill_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/partyskill/{partySkillIds}", "q": { "exist": ["party_skill_id"] }, "r": { "param": { "partySkillIds": "party_skill_id" } }, "s": [{ "lit": "partyskill" }, { "var": "party_skill_id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /partyskill/{partySkillId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "party_skill_id", "or": "party_skill_id", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/partyskill/{partySkillId}", "q": { "exist": ["party_skill_id"] }, "r": { "param": { "partySkillId": "party_skill_id" } }, "s": [{ "lit": "partyskill" }, { "var": "party_skill_id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "party_skill", "name__orig": "party_skill", "Name": "PartySkill", "name_": "party_skill", "name-": "party-skill", "NAME": "PARTY_SKILL", "index$": 17 }, { "active": true, "entity": "party_skill", "key$": "BasicPartySkillFlow", "kind": "basic", "name": "BasicPartySkillFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "party_skill_ref01" } }], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "party_skill_ref01", "srcdatavar": "party_skill_ref01_data", "suffix": "_dt0" }, "m": { "id": "party_skill01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-party_skill_ref01" } }], "index$": 1 }] }, 'PartySkill', { "GET /partyskill": { "protocol": "http", "operationId": "getAllPartySkillIds", "responses": { "200": { "description": "Successful operation", "content": { "application/json": { "schema": { "type": "array", "items": { "type": "integer", "key$": "items" } } } } } }, "parameters": [], "securitySource": "unspecified" }, "GET /partyskill/{partySkillIds}": { "protocol": "http", "operationId": "getPartySkillsByIds", "responses": { "200": { "description": "Successful operation", "content": { "application/json": { "schema": { "type": "array", "items": { "type": "object", "key$": "items" } } } } }, "400": { "description": "Invalid list of IDs supplied" }, "404": { "description": "Party skill not found" } }, "parameters": [{ "name": "partySkillIds", "in": "path", "description": "IDs of party skills to return separated by comma", "required": true, "schema": { "type": "string" }, "index$": 0 }], "securitySource": "unspecified" }, "GET /partyskill/{partySkillId}": { "protocol": "http", "operationId": "getPartySkillById", "responses": { "200": { "description": "Successful operation", "content": { "application/json": { "schema": { "type": "object" } } } }, "400": { "description": "Invalid ID supplied" }, "404": { "description": "Party skill not found" } }, "parameters": [{ "name": "partySkillId", "in": "path", "description": "ID of party skill to return", "required": true, "schema": { "type": "integer" }, "index$": 0 }], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let party_skill_ref01_data = Object.values(setup.data.existing.party_skill)[0];
        // LIST
        const party_skill_ref01_ent = client.PartySkill();
        const party_skill_ref01_match = {};
        const party_skill_ref01_list = (await party_skill_ref01_ent.list(party_skill_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/party_skill/PartySkillTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.FlyffGameSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['party_skill01', 'party_skill02', 'party_skill03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'FLYFF_GAME_TEST_PARTY_SKILL_ENTID': idmap,
        'FLYFF_GAME_TEST_LIVE': 'FALSE',
        'FLYFF_GAME_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['FLYFF_GAME_TEST_PARTY_SKILL_ENTID'];
    const live = 'TRUE' === env.FLYFF_GAME_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['FLYFF_GAME_TEST_PARTY_SKILL_ENTID'];
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
//# sourceMappingURL=PartySkillEntity.test.js.map