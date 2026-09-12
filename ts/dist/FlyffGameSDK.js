"use strict";
// FlyffGame Ts SDK
Object.defineProperty(exports, "__esModule", { value: true });
exports.SDK = exports.FlyffGameSDK = exports.FlyffGameEntityBase = exports.BaseFeature = exports.config = exports.stdutil = void 0;
const AchievementEntity_1 = require("./entity/AchievementEntity");
const AwakeEntity_1 = require("./entity/AwakeEntity");
const BadgeEntity_1 = require("./entity/BadgeEntity");
const ClassEntity_1 = require("./entity/ClassEntity");
const CoreEntity_1 = require("./entity/CoreEntity");
const CoupleEntity_1 = require("./entity/CoupleEntity");
const DungeonEntity_1 = require("./entity/DungeonEntity");
const ElementEntity_1 = require("./entity/ElementEntity");
const EquipmentSetEntity_1 = require("./entity/EquipmentSetEntity");
const ExchangeMenusEntity_1 = require("./entity/ExchangeMenusEntity");
const HousingPackEntity_1 = require("./entity/HousingPackEntity");
const HousingTemplateEntity_1 = require("./entity/HousingTemplateEntity");
const ItemEntity_1 = require("./entity/ItemEntity");
const LanguageEntity_1 = require("./entity/LanguageEntity");
const LifestyleEntity_1 = require("./entity/LifestyleEntity");
const MonsterEntity_1 = require("./entity/MonsterEntity");
const NpcEntity_1 = require("./entity/NpcEntity");
const PartySkillEntity_1 = require("./entity/PartySkillEntity");
const PknEntity_1 = require("./entity/PknEntity");
const PlaceEntity_1 = require("./entity/PlaceEntity");
const QuestEntity_1 = require("./entity/QuestEntity");
const RaisedPetEntity_1 = require("./entity/RaisedPetEntity");
const RecipeEntity_1 = require("./entity/RecipeEntity");
const SkillEntity_1 = require("./entity/SkillEntity");
const UpgradeLevelBonusEntity_1 = require("./entity/UpgradeLevelBonusEntity");
const VersionEntity_1 = require("./entity/VersionEntity");
const WorldEntity_1 = require("./entity/WorldEntity");
const node_util_1 = require("node:util");
const Config_1 = require("./Config");
Object.defineProperty(exports, "config", { enumerable: true, get: function () { return Config_1.config; } });
const FlyffGameEntityBase_1 = require("./FlyffGameEntityBase");
Object.defineProperty(exports, "FlyffGameEntityBase", { enumerable: true, get: function () { return FlyffGameEntityBase_1.FlyffGameEntityBase; } });
const Utility_1 = require("./utility/Utility");
const BaseFeature_1 = require("./feature/base/BaseFeature");
Object.defineProperty(exports, "BaseFeature", { enumerable: true, get: function () { return BaseFeature_1.BaseFeature; } });
const stdutil = new Utility_1.Utility();
exports.stdutil = stdutil;
class FlyffGameSDK {
    _mode = 'live';
    _options;
    _utility = new Utility_1.Utility();
    _features;
    _rootctx;
    constructor(options) {
        this._rootctx = this._utility.makeContext({
            client: this,
            utility: this._utility,
            config: Config_1.config,
            options,
            shared: new WeakMap()
        });
        this._options = this._utility.makeOptions(this._rootctx);
        const struct = this._utility.struct;
        const getpath = struct.getpath;
        if (true === getpath(this._options.feature, 'test.active')) {
            this._mode = 'test';
        }
        this._rootctx.options = this._options;
        this._features = [];
        const featureAdd = this._utility.featureAdd;
        const featureInit = this._utility.featureInit;
        // Add features in the resolved order (makeOptions puts an explicit
        // array order first, else defaults to test-first). Ordering matters:
        // the `test` feature installs the base mock transport and the transport
        // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is current,
        // so `test` must be added before them to sit at the base of the chain.
        const extend = this._options.extend || [];
        const featureorder = getpath(this._options, '__derived__.featureorder') || [];
        for (const fname of featureorder) {
            const fopts = this._options.feature[fname] || {};
            if (fopts.active) {
                // An active name with no generated class is legal when an
                // extend-supplied instance carries that name (station's adopt
                // path): the instance is added below, positioned by its own
                // __after__ entry, so skip it here rather than fail construction.
                if (!this._rootctx.config.hasFeature(fname) &&
                    extend.some((f) => fname === f.name)) {
                    continue;
                }
                featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname));
            }
        }
        for (let f of extend) {
            featureAdd(this._rootctx, f);
        }
        for (let f of this._features) {
            featureInit(this._rootctx, f);
        }
        const featureHook = this._utility.featureHook;
        featureHook(this._rootctx, 'PostConstruct');
    }
    options() {
        return this._utility.struct.clone(this._options);
    }
    utility() {
        return this._utility.struct.clone(this._utility);
    }
    async prepare(fetchargs) {
        const utility = this._utility;
        const struct = utility.struct;
        const clone = struct.clone;
        const { makeContext, makeFetchDef, prepareHeaders, prepareAuth, } = utility;
        fetchargs = fetchargs || {};
        let ctx = makeContext({
            opname: 'prepare',
            ctrl: fetchargs.ctrl || {},
        }, this._rootctx);
        const options = this._options;
        // Build spec directly from SDK options + user-provided fetch args.
        const spec = {
            base: options.base,
            prefix: options.prefix,
            suffix: options.suffix,
            path: fetchargs.path || '',
            method: fetchargs.method || 'GET',
            params: fetchargs.params || {},
            query: fetchargs.query || {},
            headers: prepareHeaders(ctx),
            body: fetchargs.body,
            step: 'start',
        };
        ctx.spec = spec;
        // Merge user-provided headers over SDK defaults.
        if (fetchargs.headers) {
            const uheaders = fetchargs.headers;
            for (let key in uheaders) {
                spec.headers[key] = uheaders[key];
            }
        }
        // Apply SDK auth (apikey, auth prefix, etc.)
        const authResult = prepareAuth(ctx);
        if (authResult instanceof Error) {
            return authResult;
        }
        return makeFetchDef(ctx);
    }
    // Raw endpoint access is operator-controllable, like every entity op.
    // Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
    // either one reaches the same endpoint.
    async direct(fetchargs) {
        if (!this._options.allow.op.includes('direct')) {
            return {
                ok: false,
                err: new Error('FlyffGameSDK: direct: operation not allowed by' +
                    ' SDK option allow.op value: "' + this._options.allow.op + '"'),
            };
        }
        return this._rawRequest(fetchargs);
    }
    // Ungated request path shared by direct() and graphql(), each of which
    // checks its own allow.op token first. Private, rather than a flag on
    // fetchargs: a caller-supplied marker would let anyone opt straight back
    // out of the gate by passing it.
    async _rawRequest(fetchargs) {
        const utility = this._utility;
        const fetcher = utility.fetcher;
        const makeContext = utility.makeContext;
        const fetchdef = await this.prepare(fetchargs);
        if (fetchdef instanceof Error) {
            return fetchdef;
        }
        let ctx = makeContext({
            opname: 'direct',
            ctrl: (fetchargs || {}).ctrl || {},
        }, this._rootctx);
        try {
            const fetched = await fetcher(ctx, fetchdef.url, fetchdef);
            if (null == fetched) {
                return { ok: false, err: ctx.error('direct_no_response', 'response: undefined') };
            }
            else if (fetched instanceof Error) {
                return { ok: false, err: fetched };
            }
            const status = fetched.status;
            // No body responses (204 No Content, 304 Not Modified) and explicit
            // zero content-length must skip JSON parsing — fetched.json() would
            // throw `Unexpected end of JSON input` on an empty body.
            const headers = fetched.headers;
            const contentLength = headers && 'function' === typeof headers.get
                ? headers.get('content-length')
                : (headers || {})['content-length'];
            const noBody = 204 === status || 304 === status || '0' === String(contentLength);
            let json = undefined;
            if (!noBody) {
                try {
                    json = 'function' === typeof fetched.json ? await fetched.json() : fetched.json;
                }
                catch (parseErr) {
                    // Body wasn't valid JSON — surface the raw response rather than
                    // throwing. data stays undefined; callers can inspect status/headers.
                    json = undefined;
                }
            }
            return {
                ok: status >= 200 && status < 300,
                status,
                headers: fetched.headers,
                data: json,
            };
        }
        catch (err) {
            return { ok: false, err };
        }
    }
    // Raw GraphQL access: the pressure valve that makes the generated
    // surface's deliberate omissions (per-call selection sets, typed filter
    // builders, batching, subscriptions) livable — the whole schema stays
    // reachable.
    //
    // Thin wrapper over the same prepare/fetch path `direct` uses, with the
    // one thing raw `direct` cannot do for GraphQL: a GraphQL failure rides
    // HTTP 200 as a top-level `errors` array, so status alone would report a
    // failed query as ok.
    //
    // NOTE: like `direct`, this bypasses the feature pipeline — no retry,
    // ratelimit or paging features apply.
    async graphql(query, variables, ctrl) {
        const options = this._options;
        if (!options.allow.op.includes('graphql')) {
            return {
                ok: false,
                err: new Error('FlyffGameSDK: graphql: operation not allowed by' +
                    ' SDK option allow.op value: "' + options.allow.op + '"'),
            };
        }
        const res = await this._rawRequest({
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: { query, variables: variables || {} },
            ctrl,
        });
        if (res instanceof Error) {
            return res;
        }
        // Errors are read BEFORE any status check: a GraphQL parse or validation
        // failure comes back as HTTP 400 carrying the standard { errors: [...] }
        // body, and the raw path represents a non-2xx as { ok: false } with no
        // err — so returning early on status would discard the server's own
        // diagnostics, which are the only useful part of that response.
        const errors = null == res.data ? undefined : res.data.errors;
        if (null != errors && Array.isArray(errors) && 0 < errors.length) {
            const first = errors[0] || {};
            const err = new Error('FlyffGameSDK: graphql: ' +
                (first.message || 'graphql error'));
            err.graphql = errors;
            return { ok: false, status: res.status, headers: res.headers, err, data: res.data };
        }
        return res;
    }
    // Entity access: `client.Achievement().list()` / `client.Achievement().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Achievement(entopts) {
        const self = this;
        return new AchievementEntity_1.AchievementEntity(self, entopts);
    }
    // Entity access: `client.Awake().list()` / `client.Awake().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Awake(entopts) {
        const self = this;
        return new AwakeEntity_1.AwakeEntity(self, entopts);
    }
    // Entity access: `client.Badge().list()` / `client.Badge().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Badge(entopts) {
        const self = this;
        return new BadgeEntity_1.BadgeEntity(self, entopts);
    }
    // Entity access: `client.Class().list()` / `client.Class().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Class(entopts) {
        const self = this;
        return new ClassEntity_1.ClassEntity(self, entopts);
    }
    // Entity access: `client.Core().list()` / `client.Core().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Core(entopts) {
        const self = this;
        return new CoreEntity_1.CoreEntity(self, entopts);
    }
    // Entity access: `client.Couple().list()` / `client.Couple().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Couple(entopts) {
        const self = this;
        return new CoupleEntity_1.CoupleEntity(self, entopts);
    }
    // Entity access: `client.Dungeon().list()` / `client.Dungeon().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Dungeon(entopts) {
        const self = this;
        return new DungeonEntity_1.DungeonEntity(self, entopts);
    }
    // Entity access: `client.Element().list()` / `client.Element().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Element(entopts) {
        const self = this;
        return new ElementEntity_1.ElementEntity(self, entopts);
    }
    // Entity access: `client.EquipmentSet().list()` / `client.EquipmentSet().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    EquipmentSet(entopts) {
        const self = this;
        return new EquipmentSetEntity_1.EquipmentSetEntity(self, entopts);
    }
    // Entity access: `client.ExchangeMenus().list()` / `client.ExchangeMenus().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ExchangeMenus(entopts) {
        const self = this;
        return new ExchangeMenusEntity_1.ExchangeMenusEntity(self, entopts);
    }
    // Entity access: `client.HousingPack().list()` / `client.HousingPack().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    HousingPack(entopts) {
        const self = this;
        return new HousingPackEntity_1.HousingPackEntity(self, entopts);
    }
    // Entity access: `client.HousingTemplate().list()` / `client.HousingTemplate().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    HousingTemplate(entopts) {
        const self = this;
        return new HousingTemplateEntity_1.HousingTemplateEntity(self, entopts);
    }
    // Entity access: `client.Item().list()` / `client.Item().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Item(entopts) {
        const self = this;
        return new ItemEntity_1.ItemEntity(self, entopts);
    }
    // Entity access: `client.Language().list()` / `client.Language().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Language(entopts) {
        const self = this;
        return new LanguageEntity_1.LanguageEntity(self, entopts);
    }
    // Entity access: `client.Lifestyle().list()` / `client.Lifestyle().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Lifestyle(entopts) {
        const self = this;
        return new LifestyleEntity_1.LifestyleEntity(self, entopts);
    }
    // Entity access: `client.Monster().list()` / `client.Monster().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Monster(entopts) {
        const self = this;
        return new MonsterEntity_1.MonsterEntity(self, entopts);
    }
    // Entity access: `client.Npc().list()` / `client.Npc().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Npc(entopts) {
        const self = this;
        return new NpcEntity_1.NpcEntity(self, entopts);
    }
    // Entity access: `client.PartySkill().list()` / `client.PartySkill().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    PartySkill(entopts) {
        const self = this;
        return new PartySkillEntity_1.PartySkillEntity(self, entopts);
    }
    // Entity access: `client.Pkn().list()` / `client.Pkn().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Pkn(entopts) {
        const self = this;
        return new PknEntity_1.PknEntity(self, entopts);
    }
    // Entity access: `client.Place().list()` / `client.Place().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Place(entopts) {
        const self = this;
        return new PlaceEntity_1.PlaceEntity(self, entopts);
    }
    // Entity access: `client.Quest().list()` / `client.Quest().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Quest(entopts) {
        const self = this;
        return new QuestEntity_1.QuestEntity(self, entopts);
    }
    // Entity access: `client.RaisedPet().list()` / `client.RaisedPet().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    RaisedPet(entopts) {
        const self = this;
        return new RaisedPetEntity_1.RaisedPetEntity(self, entopts);
    }
    // Entity access: `client.Recipe().list()` / `client.Recipe().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Recipe(entopts) {
        const self = this;
        return new RecipeEntity_1.RecipeEntity(self, entopts);
    }
    // Entity access: `client.Skill().list()` / `client.Skill().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Skill(entopts) {
        const self = this;
        return new SkillEntity_1.SkillEntity(self, entopts);
    }
    // Entity access: `client.UpgradeLevelBonus().list()` / `client.UpgradeLevelBonus().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    UpgradeLevelBonus(entopts) {
        const self = this;
        return new UpgradeLevelBonusEntity_1.UpgradeLevelBonusEntity(self, entopts);
    }
    // Entity access: `client.Version().list()` / `client.Version().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Version(entopts) {
        const self = this;
        return new VersionEntity_1.VersionEntity(self, entopts);
    }
    // Entity access: `client.World().list()` / `client.World().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    World(entopts) {
        const self = this;
        return new WorldEntity_1.WorldEntity(self, entopts);
    }
    static test(testoptsarg, sdkoptsarg) {
        const struct = stdutil.struct;
        const setpath = struct.setpath;
        const getdef = struct.getdef;
        const clone = struct.clone;
        const setprop = struct.setprop;
        const sdkopts = getdef(clone(sdkoptsarg), {});
        const testopts = getdef(clone(testoptsarg), {});
        setprop(testopts, 'active', true);
        setpath(sdkopts, 'feature.test', testopts);
        const testsdk = new FlyffGameSDK(sdkopts);
        testsdk._mode = 'test';
        return testsdk;
    }
    tester(testopts, sdkopts) {
        return FlyffGameSDK.test(testopts, sdkopts);
    }
    toJSON() {
        return { name: 'FlyffGame' };
    }
    toString() {
        return 'FlyffGame ' + this._utility.struct.jsonify(this.toJSON());
    }
    [node_util_1.inspect.custom]() {
        return this.toString();
    }
}
exports.FlyffGameSDK = FlyffGameSDK;
const SDK = FlyffGameSDK;
exports.SDK = SDK;
//# sourceMappingURL=FlyffGameSDK.js.map