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
(0, node_test_1.describe)('ClassEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when FLYFF_GAME_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('FLYFF_GAME_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.FlyffGameSDK.test();
        const ent = testsdk.Class();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.FLYFF_GAME_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'class.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "attackSpeed": { "a": true, "fo": "float", "h": "Attack Speed", "n": "attackSpeed", "r": true, "sh": "Attack speed constant used in attack speed calculation", "t": "`$NUMBER`", "key$": "attackSpeed", "index$": 0 }, "autoAttackFactors": { "a": true, "h": "Auto Attack Factors", "n": "autoAttackFactors", "r": true, "sh": "Auto attack damage factors used in damage calculation", "t": "`$OBJECT`", "key$": "autoAttackFactors", "index$": 1 }, "block": { "a": true, "fo": "float", "h": "Block", "n": "block", "r": true, "sh": "Blocking constant used in block calculation", "t": "`$NUMBER`", "key$": "block", "index$": 2 }, "critical": { "a": true, "fo": "float", "h": "Critical", "n": "critical", "r": true, "sh": "Critical chance constant used in critical chance calculation", "t": "`$NUMBER`", "key$": "critical", "index$": 3 }, "defense": { "a": true, "fo": "float", "h": "Defense", "n": "defense", "r": true, "sh": "Defense factor use in defensive calculations", "t": "`$NUMBER`", "key$": "defense", "index$": 4 }, "fp": { "a": true, "fo": "float", "h": "Fp", "n": "fp", "r": true, "sh": "FP Factor", "t": "`$NUMBER`", "key$": "fp", "index$": 5 }, "hp": { "a": true, "fo": "float", "h": "Hp", "n": "hp", "r": true, "sh": "HP Factor", "t": "`$NUMBER`", "key$": "hp", "index$": 6 }, "icon": { "a": true, "h": "Icon", "n": "icon", "r": true, "sh": "Icon of the Class", "t": "`$STRING`", "key$": "icon", "index$": 7 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "sh": "ID of the class", "t": "`$INTEGER`", "key$": "id", "index$": 8 }, "magicDefenseIntFactor": { "a": true, "fo": "float", "h": "Magic Defense Int Factor", "n": "magicDefenseIntFactor", "r": true, "sh": "Magic defense factor based on INT used in defensive calculations", "t": "`$NUMBER`", "key$": "magicDefenseIntFactor", "index$": 9 }, "magicDefenseStaFactor": { "a": true, "fo": "float", "h": "Magic Defense Sta Factor", "n": "magicDefenseStaFactor", "r": true, "sh": "Magic defense factor based on STA used in defensive calculations", "t": "`$NUMBER`", "key$": "magicDefenseStaFactor", "index$": 10 }, "maxFP": { "a": true, "h": "Max Fp", "n": "maxFP", "r": true, "sh": "Formula to compute the maximum Fatigue Points of the player", "t": "`$STRING`", "key$": "maxFP", "index$": 11 }, "maxHP": { "a": true, "h": "Max Hp", "n": "maxHP", "r": true, "sh": "Formula to compute the maximum Hit Points of the player", "t": "`$STRING`", "key$": "maxHP", "index$": 12 }, "maxLevel": { "a": true, "h": "Max Level", "n": "maxLevel", "r": true, "sh": "Maximum player level for the Class", "t": "`$INTEGER`", "key$": "maxLevel", "index$": 13 }, "maxMP": { "a": true, "h": "Max Mp", "n": "maxMP", "r": true, "sh": "Formula to compute the maximum Mana Points of the player", "t": "`$STRING`", "key$": "maxMP", "index$": 14 }, "minLevel": { "a": true, "h": "Min Level", "n": "minLevel", "r": true, "sh": "Minimum player level for the Class", "t": "`$INTEGER`", "key$": "minLevel", "index$": 15 }, "mp": { "a": true, "fo": "float", "h": "Mp", "n": "mp", "r": true, "sh": "MP Factor", "t": "`$NUMBER`", "key$": "mp", "index$": 16 }, "name": { "a": true, "h": "Name", "n": "name", "r": true, "sh": "Text available in several languages", "t": "`$OBJECT`", "key$": "name", "index$": 17 }, "parent": { "a": true, "h": "Parent", "n": "parent", "r": false, "sh": "ID of the parent class", "t": "`$INTEGER`", "key$": "parent", "index$": 18 }, "tree": { "a": true, "h": "Tree", "n": "tree", "r": true, "sh": "Skill tree image for the class", "t": "`$STRING`", "key$": "tree", "index$": 19 }, "type": { "a": true, "h": "Type", "n": "type", "r": true, "sh": "Type of the class", "t": "`$STRING`", "key$": "type", "index$": 20 } }, "id": { "field": "id", "name": "id" }, "name": "class", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /class", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/class", "q": {}, "r": {}, "s": [{ "lit": "class" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /image/class/{style}/{fileName}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "vagrant.png", "k": "param", "n": "file_name", "or": "file_name", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "messenger", "k": "param", "n": "style", "or": "style", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/image/class/{style}/{fileName}", "q": { "exist": ["file_name", "style"] }, "r": { "param": { "fileName": "file_name" } }, "s": [{ "lit": "image" }, { "lit": "class" }, { "var": "style" }, { "var": "file_name" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /image/class/tree/{fileName}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "Vagrant.png", "k": "param", "n": "file_name", "or": "file_name", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/image/class/tree/{fileName}", "q": { "exist": ["file_name"] }, "r": { "param": { "fileName": "file_name" } }, "s": [{ "lit": "image" }, { "lit": "class" }, { "lit": "tree" }, { "var": "file_name" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "co": { "id": "GET /class/{classIds}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "1689,296,2881", "k": "param", "n": "id", "or": "class_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/class/{classIds}", "q": { "exist": ["id"] }, "r": { "param": { "classIds": "id" } }, "s": [{ "lit": "class" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /class/{classId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": 1689, "k": "param", "n": "id", "or": "class_id", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/class/{classId}", "q": { "exist": ["id"] }, "r": { "param": { "classId": "id" } }, "s": [{ "lit": "class" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 3 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "class", "name__orig": "class", "Name": "Class", "name_": "class", "name-": "class", "NAME": "CLASS", "index$": 3 }, { "active": true, "entity": "class", "key$": "BasicClassFlow", "kind": "basic", "name": "BasicClassFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "class_ref01" } }], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "class_ref01", "srcdatavar": "class_ref01_data", "suffix": "_dt0" }, "m": { "id": "class01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-class_ref01" } }], "index$": 1 }] }, 'Class', { "GET /class": { "protocol": "http", "operationId": "getAllClassIds", "responses": { "200": { "description": "Successful operation", "content": { "application/json": { "schema": { "type": "array", "items": { "type": "integer", "key$": "items" }, "example": [1689, 296, 2881] } } } } }, "parameters": [], "securitySource": "unspecified" }, "GET /image/class/{style}/{fileName}": { "protocol": "http", "operationId": "getClassIcon", "responses": { "200": { "description": "Successful operation", "content": { "image/png": { "schema": { "type": "string", "format": "binary" } } } }, "404": { "description": "Icon not found" } }, "parameters": [{ "name": "style", "in": "path", "description": "Style of the icon. Accepted values: messenger, old_female, old_male, target", "required": true, "schema": { "type": "string", "enum": ["messenger", "old_female", "old_male", "target"], "example": "messenger" }, "index$": 0 }, { "name": "fileName", "in": "path", "description": "File name of the icon", "required": true, "schema": { "type": "string", "example": "vagrant.png" }, "index$": 1 }], "securitySource": "unspecified" }, "GET /image/class/tree/{fileName}": { "protocol": "http", "operationId": "getClassSkillTree", "responses": { "200": { "description": "Successful operation", "content": { "image/png": { "schema": { "type": "string", "format": "binary" } } } }, "404": { "description": "Tree not found" } }, "parameters": [{ "name": "fileName", "in": "path", "description": "File name of the skill tree", "required": true, "schema": { "type": "string", "example": "Vagrant.png" }, "index$": 0 }], "securitySource": "unspecified" }, "GET /class/{classIds}": { "protocol": "http", "operationId": "getClassesByIds", "responses": { "200": { "description": "Successful operation", "content": { "application/json": { "schema": { "type": "array", "items": { "type": "object", "required": ["id", "name", "type", "icon", "tree", "minLevel", "maxLevel", "maxHP", "maxFP", "maxMP", "hp", "mp", "fp", "attackSpeed", "block", "critical", "autoAttackFactors", "defense", "magicDefenseStaFactor", "magicDefenseIntFactor"], "properties": { "id": { "type": "integer", "description": "ID of the class", "key$": "id" }, "name": { "type": "object", "description": "Text available in several languages", "properties": { "en": { "type": "string", "description": "English text" }, "fr": { "type": "string", "description": "French text" }, "kr": { "type": "string", "description": "Korean text" } }, "example": { "en": "Julia", "fr": "[Intendante de Flarine] Julia", "kr": "쥬리아" }, "x-ref": "#/components/schemas/LocalizedText", "key$": "name" }, "type": { "type": "string", "enum": ["beginner", "expert", "professional"], "description": "Type of the class", "key$": "type" }, "icon": { "type": "string", "description": "Icon of the Class", "key$": "icon" }, "tree": { "type": "string", "description": "Skill tree image for the class", "key$": "tree" }, "minLevel": { "type": "integer", "description": "Minimum player level for the Class", "key$": "minLevel" }, "maxLevel": { "type": "integer", "description": "Maximum player level for the Class", "key$": "maxLevel" }, "parent": { "type": "integer", "description": "ID of the parent class", "key$": "parent" }, "maxHP": { "type": "string", "description": "Formula to compute the maximum Hit Points of the player", "key$": "maxHP" }, "maxFP": { "type": "string", "description": "Formula to compute the maximum Fatigue Points of the player", "key$": "maxFP" }, "maxMP": { "type": "string", "description": "Formula to compute the maximum Mana Points of the player", "key$": "maxMP" }, "hp": { "type": "number", "format": "float", "description": "HP Factor", "key$": "hp" }, "mp": { "type": "number", "format": "float", "description": "MP Factor", "key$": "mp" }, "fp": { "type": "number", "format": "float", "description": "FP Factor", "key$": "fp" }, "attackSpeed": { "type": "number", "format": "float", "description": "Attack speed constant used in attack speed calculation", "key$": "attackSpeed" }, "block": { "type": "number", "format": "float", "description": "Blocking constant used in block calculation", "key$": "block" }, "critical": { "type": "number", "format": "float", "description": "Critical chance constant used in critical chance calculation", "key$": "critical" }, "autoAttackFactors": { "type": "object", "description": "Auto attack damage factors used in damage calculation", "properties": { "sword": { "type": "number", "format": "float" }, "axe": { "type": "number", "format": "float" }, "staff": { "type": "number", "format": "float" }, "stick": { "type": "number", "format": "float" }, "knuckle": { "type": "number", "format": "float" }, "yoyo": { "type": "number", "format": "float" }, "bow": { "type": "number", "format": "float" }, "wand": { "type": "number", "format": "float" } }, "key$": "autoAttackFactors" }, "defense": { "type": "number", "format": "float", "description": "Defense factor use in defensive calculations", "key$": "defense" }, "magicDefenseStaFactor": { "type": "number", "format": "float", "description": "Magic defense factor based on STA used in defensive calculations", "key$": "magicDefenseStaFactor" }, "magicDefenseIntFactor": { "type": "number", "format": "float", "description": "Magic defense factor based on INT used in defensive calculations", "key$": "magicDefenseIntFactor" } }, "x-ref": "#/components/schemas/Class", "key$": "items" } } } } }, "400": { "description": "Invalid list of IDs supplied" }, "404": { "description": "Class not found" } }, "parameters": [{ "name": "classIds", "in": "path", "description": "IDs of classes to return separated by comma", "required": true, "schema": { "type": "string", "example": "1689,296,2881" }, "index$": 0 }], "securitySource": "unspecified" }, "GET /class/{classId}": { "protocol": "http", "operationId": "getClassById", "responses": { "200": { "description": "Successful operation", "content": { "application/json": { "schema": { "type": "object", "required": ["id", "name", "type", "icon", "tree", "minLevel", "maxLevel", "maxHP", "maxFP", "maxMP", "hp", "mp", "fp", "attackSpeed", "block", "critical", "autoAttackFactors", "defense", "magicDefenseStaFactor", "magicDefenseIntFactor"], "properties": { "id": { "type": "integer", "description": "ID of the class", "key$": "id" }, "name": { "type": "object", "description": "Text available in several languages", "properties": { "en": { "type": "string", "description": "English text" }, "fr": { "type": "string", "description": "French text" }, "kr": { "type": "string", "description": "Korean text" } }, "example": { "en": "Julia", "fr": "[Intendante de Flarine] Julia", "kr": "쥬리아" }, "x-ref": "#/components/schemas/LocalizedText", "key$": "name" }, "type": { "type": "string", "enum": ["beginner", "expert", "professional"], "description": "Type of the class", "key$": "type" }, "icon": { "type": "string", "description": "Icon of the Class", "key$": "icon" }, "tree": { "type": "string", "description": "Skill tree image for the class", "key$": "tree" }, "minLevel": { "type": "integer", "description": "Minimum player level for the Class", "key$": "minLevel" }, "maxLevel": { "type": "integer", "description": "Maximum player level for the Class", "key$": "maxLevel" }, "parent": { "type": "integer", "description": "ID of the parent class", "key$": "parent" }, "maxHP": { "type": "string", "description": "Formula to compute the maximum Hit Points of the player", "key$": "maxHP" }, "maxFP": { "type": "string", "description": "Formula to compute the maximum Fatigue Points of the player", "key$": "maxFP" }, "maxMP": { "type": "string", "description": "Formula to compute the maximum Mana Points of the player", "key$": "maxMP" }, "hp": { "type": "number", "format": "float", "description": "HP Factor", "key$": "hp" }, "mp": { "type": "number", "format": "float", "description": "MP Factor", "key$": "mp" }, "fp": { "type": "number", "format": "float", "description": "FP Factor", "key$": "fp" }, "attackSpeed": { "type": "number", "format": "float", "description": "Attack speed constant used in attack speed calculation", "key$": "attackSpeed" }, "block": { "type": "number", "format": "float", "description": "Blocking constant used in block calculation", "key$": "block" }, "critical": { "type": "number", "format": "float", "description": "Critical chance constant used in critical chance calculation", "key$": "critical" }, "autoAttackFactors": { "type": "object", "description": "Auto attack damage factors used in damage calculation", "properties": { "sword": { "type": "number", "format": "float" }, "axe": { "type": "number", "format": "float" }, "staff": { "type": "number", "format": "float" }, "stick": { "type": "number", "format": "float" }, "knuckle": { "type": "number", "format": "float" }, "yoyo": { "type": "number", "format": "float" }, "bow": { "type": "number", "format": "float" }, "wand": { "type": "number", "format": "float" } }, "key$": "autoAttackFactors" }, "defense": { "type": "number", "format": "float", "description": "Defense factor use in defensive calculations", "key$": "defense" }, "magicDefenseStaFactor": { "type": "number", "format": "float", "description": "Magic defense factor based on STA used in defensive calculations", "key$": "magicDefenseStaFactor" }, "magicDefenseIntFactor": { "type": "number", "format": "float", "description": "Magic defense factor based on INT used in defensive calculations", "key$": "magicDefenseIntFactor" } }, "x-ref": "#/components/schemas/Class", "index$": 0 } } } }, "400": { "description": "Invalid ID supplied" }, "404": { "description": "Class not found" } }, "parameters": [{ "name": "classId", "in": "path", "description": "ID of class to return", "required": true, "schema": { "type": "integer", "example": 1689 }, "index$": 0 }], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let class_ref01_data = Object.values(setup.data.existing.class)[0];
        // LIST
        const class_ref01_ent = client.Class();
        const class_ref01_match = {};
        const class_ref01_list = (await class_ref01_ent.list(class_ref01_match)).map((e) => e.data());
        // LOAD
        const class_ref01_match_dt0 = {};
        class_ref01_match_dt0.id = class_ref01_data.id;
        const class_ref01_data_dt0 = (await class_ref01_ent.load(class_ref01_match_dt0)).data();
        (0, node_assert_1.default)(class_ref01_data_dt0.id === class_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/class/ClassTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.FlyffGameSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['class01', 'class02', 'class03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'FLYFF_GAME_TEST_CLASS_ENTID': idmap,
        'FLYFF_GAME_TEST_LIVE': 'FALSE',
        'FLYFF_GAME_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['FLYFF_GAME_TEST_CLASS_ENTID'];
    const live = 'TRUE' === env.FLYFF_GAME_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['FLYFF_GAME_TEST_CLASS_ENTID'];
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
//# sourceMappingURL=ClassEntity.test.js.map