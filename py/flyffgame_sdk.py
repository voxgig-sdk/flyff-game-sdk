# FlyffGame SDK

from utility.voxgig_struct import voxgig_struct as vs
from core.utility_type import FlyffGameUtility
from core.spec import FlyffGameSpec
from core import helpers

# Load utility registration (populates Utility._registrar)
from utility import register

# Load features
from feature.base_feature import FlyffGameBaseFeature
from features import _make_feature


class FlyffGameSDK:

    def __init__(self, options=None):
        self.mode = "live"
        self.features = []
        self.options = None

        utility = FlyffGameUtility()
        self._utility = utility

        from config import make_config
        config = make_config()

        self._rootctx = utility.make_context({
            "client": self,
            "utility": utility,
            "config": config,
            "options": options if options is not None else {},
            "shared": {},
        }, None)

        self.options = utility.make_options(self._rootctx)

        if vs.getpath(self.options, "feature.test.active") is True:
            self.mode = "test"

        self._rootctx.options = self.options

        # Add features from config.
        feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
        if feature_opts is not None:
            feature_items = vs.items(feature_opts)
            if feature_items is not None:
                for item in feature_items:
                    fname = item[0]
                    fopts = helpers.to_map(item[1])
                    if fopts is not None and fopts.get("active") is True:
                        utility.feature_add(self._rootctx, _make_feature(fname))

        # Add extension features.
        extend = vs.getprop(self.options, "extend")
        if isinstance(extend, list):
            for f in extend:
                if isinstance(f, dict) or (hasattr(f, "get_name") and callable(f.get_name)):
                    utility.feature_add(self._rootctx, f)

        # Initialize features.
        for f in self.features:
            utility.feature_init(self._rootctx, f)

        utility.feature_hook(self._rootctx, "PostConstruct")

        # #BuildFeatures

    def options_map(self):
        out = vs.clone(self.options)
        if isinstance(out, dict):
            return out
        return {}

    def get_utility(self):
        return FlyffGameUtility.copy(self._utility)

    def get_root_ctx(self):
        return self._rootctx

    def prepare(self, fetchargs=None):
        utility = self._utility

        if fetchargs is None:
            fetchargs = {}

        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "prepare",
            "ctrl": ctrl,
        }, self._rootctx)

        options = self.options

        path = vs.getprop(fetchargs, "path") or ""
        if not isinstance(path, str):
            path = ""

        method = vs.getprop(fetchargs, "method") or "GET"
        if not isinstance(method, str):
            method = "GET"

        params = helpers.to_map(vs.getprop(fetchargs, "params"))
        if params is None:
            params = {}
        query = helpers.to_map(vs.getprop(fetchargs, "query"))
        if query is None:
            query = {}

        headers = utility.prepare_headers(ctx)

        base = vs.getprop(options, "base") or ""
        if not isinstance(base, str):
            base = ""
        prefix = vs.getprop(options, "prefix") or ""
        if not isinstance(prefix, str):
            prefix = ""
        suffix = vs.getprop(options, "suffix") or ""
        if not isinstance(suffix, str):
            suffix = ""

        ctx.spec = FlyffGameSpec({
            "base": base,
            "prefix": prefix,
            "suffix": suffix,
            "path": path,
            "method": method,
            "params": params,
            "query": query,
            "headers": headers,
            "body": vs.getprop(fetchargs, "body"),
            "step": "start",
        })

        # Merge user-provided headers.
        uh = vs.getprop(fetchargs, "headers")
        if isinstance(uh, dict):
            for k, v in uh.items():
                ctx.spec.headers[k] = v

        _, err = utility.prepare_auth(ctx)
        if err is not None:
            return None, err

        return utility.make_fetch_def(ctx)

    def direct(self, fetchargs=None):
        utility = self._utility

        fetchdef, err = self.prepare(fetchargs)
        if err is not None:
            return {"ok": False, "err": err}, None

        if fetchargs is None:
            fetchargs = {}
        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "direct",
            "ctrl": ctrl,
        }, self._rootctx)

        url = fetchdef.get("url", "")
        fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

        if fetch_err is not None:
            return {"ok": False, "err": fetch_err}, None

        if fetched is None:
            return {
                "ok": False,
                "err": ctx.make_error("direct_no_response", "response: undefined"),
            }, None

        if isinstance(fetched, dict):
            status = helpers.to_int(vs.getprop(fetched, "status"))
            headers = vs.getprop(fetched, "headers") or {}

            # No-body responses (204, 304) and explicit zero content-length
            # must skip JSON parsing — calling json() on an empty body raises.
            content_length = None
            if isinstance(headers, dict):
                content_length = headers.get("content-length")
            no_body = status in (204, 304) or str(content_length) == "0"

            json_data = None
            if not no_body:
                jf = vs.getprop(fetched, "json")
                if callable(jf):
                    try:
                        json_data = jf()
                    except Exception:
                        # Non-JSON body (e.g. text/plain, text/html). Surface
                        # status + headers but leave data as None.
                        json_data = None

            return {
                "ok": status >= 200 and status < 300,
                "status": status,
                "headers": headers,
                "data": json_data,
            }, None

        return {
            "ok": False,
            "err": ctx.make_error("direct_invalid", "invalid response type"),
        }, None


    def Achievement(self, data=None):
        from entity.achievement_entity import AchievementEntity
        return AchievementEntity(self, data)


    def Awake(self, data=None):
        from entity.awake_entity import AwakeEntity
        return AwakeEntity(self, data)


    def Badge(self, data=None):
        from entity.badge_entity import BadgeEntity
        return BadgeEntity(self, data)


    def Class(self, data=None):
        from entity.class_entity import ClassEntity
        return ClassEntity(self, data)


    def Core(self, data=None):
        from entity.core_entity import CoreEntity
        return CoreEntity(self, data)


    def Couple(self, data=None):
        from entity.couple_entity import CoupleEntity
        return CoupleEntity(self, data)


    def Dungeon(self, data=None):
        from entity.dungeon_entity import DungeonEntity
        return DungeonEntity(self, data)


    def Element(self, data=None):
        from entity.element_entity import ElementEntity
        return ElementEntity(self, data)


    def EquipmentSet(self, data=None):
        from entity.equipment_set_entity import EquipmentSetEntity
        return EquipmentSetEntity(self, data)


    def ExchangeMenus(self, data=None):
        from entity.exchange_menus_entity import ExchangeMenusEntity
        return ExchangeMenusEntity(self, data)


    def HousingPack(self, data=None):
        from entity.housing_pack_entity import HousingPackEntity
        return HousingPackEntity(self, data)


    def HousingTemplate(self, data=None):
        from entity.housing_template_entity import HousingTemplateEntity
        return HousingTemplateEntity(self, data)


    def Item(self, data=None):
        from entity.item_entity import ItemEntity
        return ItemEntity(self, data)


    def Language(self, data=None):
        from entity.language_entity import LanguageEntity
        return LanguageEntity(self, data)


    def Lifestyle(self, data=None):
        from entity.lifestyle_entity import LifestyleEntity
        return LifestyleEntity(self, data)


    def Monster(self, data=None):
        from entity.monster_entity import MonsterEntity
        return MonsterEntity(self, data)


    def Npc(self, data=None):
        from entity.npc_entity import NpcEntity
        return NpcEntity(self, data)


    def PartySkill(self, data=None):
        from entity.party_skill_entity import PartySkillEntity
        return PartySkillEntity(self, data)


    def Pkn(self, data=None):
        from entity.pkn_entity import PknEntity
        return PknEntity(self, data)


    def Place(self, data=None):
        from entity.place_entity import PlaceEntity
        return PlaceEntity(self, data)


    def Quest(self, data=None):
        from entity.quest_entity import QuestEntity
        return QuestEntity(self, data)


    def RaisedPet(self, data=None):
        from entity.raised_pet_entity import RaisedPetEntity
        return RaisedPetEntity(self, data)


    def Recipe(self, data=None):
        from entity.recipe_entity import RecipeEntity
        return RecipeEntity(self, data)


    def Skill(self, data=None):
        from entity.skill_entity import SkillEntity
        return SkillEntity(self, data)


    def UpgradeLevelBonus(self, data=None):
        from entity.upgrade_level_bonus_entity import UpgradeLevelBonusEntity
        return UpgradeLevelBonusEntity(self, data)


    def Version(self, data=None):
        from entity.version_entity import VersionEntity
        return VersionEntity(self, data)


    def World(self, data=None):
        from entity.world_entity import WorldEntity
        return WorldEntity(self, data)



    @classmethod
    def test(cls, testopts=None, sdkopts=None):
        if sdkopts is None:
            sdkopts = {}
        sdkopts = vs.clone(sdkopts)
        if not isinstance(sdkopts, dict):
            sdkopts = {}

        if testopts is None:
            testopts = {}
        testopts = vs.clone(testopts)
        if not isinstance(testopts, dict):
            testopts = {}
        testopts["active"] = True

        vs.setpath(sdkopts, "feature.test", testopts)

        sdk = cls(sdkopts)
        sdk.mode = "test"

        return sdk
