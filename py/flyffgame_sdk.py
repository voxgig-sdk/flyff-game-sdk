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
            raise err

        fetchdef, err = utility.make_fetch_def(ctx)
        if err is not None:
            raise err

        return fetchdef

    def direct(self, fetchargs=None):
        utility = self._utility

        try:
            fetchdef = self.prepare(fetchargs)
        except Exception as err:
            # direct() is the raw-HTTP escape hatch: it never raises, it
            # returns a result object callers branch on via result["ok"].
            return {"ok": False, "err": err}

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
            return {"ok": False, "err": fetch_err}

        if fetched is None:
            return {
                "ok": False,
                "err": ctx.make_error("direct_no_response", "response: undefined"),
            }

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
            }

        return {
            "ok": False,
            "err": ctx.make_error("direct_invalid", "invalid response type"),
        }


    @property
    def achievement(self):
        """Idiomatic facade: client.achievement.list() / client.achievement.load({"id": ...})."""
        from entity.achievement_entity import AchievementEntity
        cached = getattr(self, "_achievement", None)
        if cached is None:
            cached = AchievementEntity(self, None)
            self._achievement = cached
        return cached

    def Achievement(self, data=None):
        # Deprecated: use client.achievement instead.
        from entity.achievement_entity import AchievementEntity
        return AchievementEntity(self, data)


    @property
    def awake(self):
        """Idiomatic facade: client.awake.list() / client.awake.load({"id": ...})."""
        from entity.awake_entity import AwakeEntity
        cached = getattr(self, "_awake", None)
        if cached is None:
            cached = AwakeEntity(self, None)
            self._awake = cached
        return cached

    def Awake(self, data=None):
        # Deprecated: use client.awake instead.
        from entity.awake_entity import AwakeEntity
        return AwakeEntity(self, data)


    @property
    def badge(self):
        """Idiomatic facade: client.badge.list() / client.badge.load({"id": ...})."""
        from entity.badge_entity import BadgeEntity
        cached = getattr(self, "_badge", None)
        if cached is None:
            cached = BadgeEntity(self, None)
            self._badge = cached
        return cached

    def Badge(self, data=None):
        # Deprecated: use client.badge instead.
        from entity.badge_entity import BadgeEntity
        return BadgeEntity(self, data)


    @property
    def class(self):
        """Idiomatic facade: client.class.list() / client.class.load({"id": ...})."""
        from entity.class_entity import ClassEntity
        cached = getattr(self, "_class", None)
        if cached is None:
            cached = ClassEntity(self, None)
            self._class = cached
        return cached

    def Class(self, data=None):
        # Deprecated: use client.class instead.
        from entity.class_entity import ClassEntity
        return ClassEntity(self, data)


    @property
    def core(self):
        """Idiomatic facade: client.core.list() / client.core.load({"id": ...})."""
        from entity.core_entity import CoreEntity
        cached = getattr(self, "_core", None)
        if cached is None:
            cached = CoreEntity(self, None)
            self._core = cached
        return cached

    def Core(self, data=None):
        # Deprecated: use client.core instead.
        from entity.core_entity import CoreEntity
        return CoreEntity(self, data)


    @property
    def couple(self):
        """Idiomatic facade: client.couple.list() / client.couple.load({"id": ...})."""
        from entity.couple_entity import CoupleEntity
        cached = getattr(self, "_couple", None)
        if cached is None:
            cached = CoupleEntity(self, None)
            self._couple = cached
        return cached

    def Couple(self, data=None):
        # Deprecated: use client.couple instead.
        from entity.couple_entity import CoupleEntity
        return CoupleEntity(self, data)


    @property
    def dungeon(self):
        """Idiomatic facade: client.dungeon.list() / client.dungeon.load({"id": ...})."""
        from entity.dungeon_entity import DungeonEntity
        cached = getattr(self, "_dungeon", None)
        if cached is None:
            cached = DungeonEntity(self, None)
            self._dungeon = cached
        return cached

    def Dungeon(self, data=None):
        # Deprecated: use client.dungeon instead.
        from entity.dungeon_entity import DungeonEntity
        return DungeonEntity(self, data)


    @property
    def element(self):
        """Idiomatic facade: client.element.list() / client.element.load({"id": ...})."""
        from entity.element_entity import ElementEntity
        cached = getattr(self, "_element", None)
        if cached is None:
            cached = ElementEntity(self, None)
            self._element = cached
        return cached

    def Element(self, data=None):
        # Deprecated: use client.element instead.
        from entity.element_entity import ElementEntity
        return ElementEntity(self, data)


    @property
    def equipment_set(self):
        """Idiomatic facade: client.equipment_set.list() / client.equipment_set.load({"id": ...})."""
        from entity.equipment_set_entity import EquipmentSetEntity
        cached = getattr(self, "_equipment_set", None)
        if cached is None:
            cached = EquipmentSetEntity(self, None)
            self._equipment_set = cached
        return cached

    def EquipmentSet(self, data=None):
        # Deprecated: use client.equipment_set instead.
        from entity.equipment_set_entity import EquipmentSetEntity
        return EquipmentSetEntity(self, data)


    @property
    def exchange_menus(self):
        """Idiomatic facade: client.exchange_menus.list() / client.exchange_menus.load({"id": ...})."""
        from entity.exchange_menus_entity import ExchangeMenusEntity
        cached = getattr(self, "_exchange_menus", None)
        if cached is None:
            cached = ExchangeMenusEntity(self, None)
            self._exchange_menus = cached
        return cached

    def ExchangeMenus(self, data=None):
        # Deprecated: use client.exchange_menus instead.
        from entity.exchange_menus_entity import ExchangeMenusEntity
        return ExchangeMenusEntity(self, data)


    @property
    def housing_pack(self):
        """Idiomatic facade: client.housing_pack.list() / client.housing_pack.load({"id": ...})."""
        from entity.housing_pack_entity import HousingPackEntity
        cached = getattr(self, "_housing_pack", None)
        if cached is None:
            cached = HousingPackEntity(self, None)
            self._housing_pack = cached
        return cached

    def HousingPack(self, data=None):
        # Deprecated: use client.housing_pack instead.
        from entity.housing_pack_entity import HousingPackEntity
        return HousingPackEntity(self, data)


    @property
    def housing_template(self):
        """Idiomatic facade: client.housing_template.list() / client.housing_template.load({"id": ...})."""
        from entity.housing_template_entity import HousingTemplateEntity
        cached = getattr(self, "_housing_template", None)
        if cached is None:
            cached = HousingTemplateEntity(self, None)
            self._housing_template = cached
        return cached

    def HousingTemplate(self, data=None):
        # Deprecated: use client.housing_template instead.
        from entity.housing_template_entity import HousingTemplateEntity
        return HousingTemplateEntity(self, data)


    @property
    def item(self):
        """Idiomatic facade: client.item.list() / client.item.load({"id": ...})."""
        from entity.item_entity import ItemEntity
        cached = getattr(self, "_item", None)
        if cached is None:
            cached = ItemEntity(self, None)
            self._item = cached
        return cached

    def Item(self, data=None):
        # Deprecated: use client.item instead.
        from entity.item_entity import ItemEntity
        return ItemEntity(self, data)


    @property
    def language(self):
        """Idiomatic facade: client.language.list() / client.language.load({"id": ...})."""
        from entity.language_entity import LanguageEntity
        cached = getattr(self, "_language", None)
        if cached is None:
            cached = LanguageEntity(self, None)
            self._language = cached
        return cached

    def Language(self, data=None):
        # Deprecated: use client.language instead.
        from entity.language_entity import LanguageEntity
        return LanguageEntity(self, data)


    @property
    def lifestyle(self):
        """Idiomatic facade: client.lifestyle.list() / client.lifestyle.load({"id": ...})."""
        from entity.lifestyle_entity import LifestyleEntity
        cached = getattr(self, "_lifestyle", None)
        if cached is None:
            cached = LifestyleEntity(self, None)
            self._lifestyle = cached
        return cached

    def Lifestyle(self, data=None):
        # Deprecated: use client.lifestyle instead.
        from entity.lifestyle_entity import LifestyleEntity
        return LifestyleEntity(self, data)


    @property
    def monster(self):
        """Idiomatic facade: client.monster.list() / client.monster.load({"id": ...})."""
        from entity.monster_entity import MonsterEntity
        cached = getattr(self, "_monster", None)
        if cached is None:
            cached = MonsterEntity(self, None)
            self._monster = cached
        return cached

    def Monster(self, data=None):
        # Deprecated: use client.monster instead.
        from entity.monster_entity import MonsterEntity
        return MonsterEntity(self, data)


    @property
    def npc(self):
        """Idiomatic facade: client.npc.list() / client.npc.load({"id": ...})."""
        from entity.npc_entity import NpcEntity
        cached = getattr(self, "_npc", None)
        if cached is None:
            cached = NpcEntity(self, None)
            self._npc = cached
        return cached

    def Npc(self, data=None):
        # Deprecated: use client.npc instead.
        from entity.npc_entity import NpcEntity
        return NpcEntity(self, data)


    @property
    def party_skill(self):
        """Idiomatic facade: client.party_skill.list() / client.party_skill.load({"id": ...})."""
        from entity.party_skill_entity import PartySkillEntity
        cached = getattr(self, "_party_skill", None)
        if cached is None:
            cached = PartySkillEntity(self, None)
            self._party_skill = cached
        return cached

    def PartySkill(self, data=None):
        # Deprecated: use client.party_skill instead.
        from entity.party_skill_entity import PartySkillEntity
        return PartySkillEntity(self, data)


    @property
    def pkn(self):
        """Idiomatic facade: client.pkn.list() / client.pkn.load({"id": ...})."""
        from entity.pkn_entity import PknEntity
        cached = getattr(self, "_pkn", None)
        if cached is None:
            cached = PknEntity(self, None)
            self._pkn = cached
        return cached

    def Pkn(self, data=None):
        # Deprecated: use client.pkn instead.
        from entity.pkn_entity import PknEntity
        return PknEntity(self, data)


    @property
    def place(self):
        """Idiomatic facade: client.place.list() / client.place.load({"id": ...})."""
        from entity.place_entity import PlaceEntity
        cached = getattr(self, "_place", None)
        if cached is None:
            cached = PlaceEntity(self, None)
            self._place = cached
        return cached

    def Place(self, data=None):
        # Deprecated: use client.place instead.
        from entity.place_entity import PlaceEntity
        return PlaceEntity(self, data)


    @property
    def quest(self):
        """Idiomatic facade: client.quest.list() / client.quest.load({"id": ...})."""
        from entity.quest_entity import QuestEntity
        cached = getattr(self, "_quest", None)
        if cached is None:
            cached = QuestEntity(self, None)
            self._quest = cached
        return cached

    def Quest(self, data=None):
        # Deprecated: use client.quest instead.
        from entity.quest_entity import QuestEntity
        return QuestEntity(self, data)


    @property
    def raised_pet(self):
        """Idiomatic facade: client.raised_pet.list() / client.raised_pet.load({"id": ...})."""
        from entity.raised_pet_entity import RaisedPetEntity
        cached = getattr(self, "_raised_pet", None)
        if cached is None:
            cached = RaisedPetEntity(self, None)
            self._raised_pet = cached
        return cached

    def RaisedPet(self, data=None):
        # Deprecated: use client.raised_pet instead.
        from entity.raised_pet_entity import RaisedPetEntity
        return RaisedPetEntity(self, data)


    @property
    def recipe(self):
        """Idiomatic facade: client.recipe.list() / client.recipe.load({"id": ...})."""
        from entity.recipe_entity import RecipeEntity
        cached = getattr(self, "_recipe", None)
        if cached is None:
            cached = RecipeEntity(self, None)
            self._recipe = cached
        return cached

    def Recipe(self, data=None):
        # Deprecated: use client.recipe instead.
        from entity.recipe_entity import RecipeEntity
        return RecipeEntity(self, data)


    @property
    def skill(self):
        """Idiomatic facade: client.skill.list() / client.skill.load({"id": ...})."""
        from entity.skill_entity import SkillEntity
        cached = getattr(self, "_skill", None)
        if cached is None:
            cached = SkillEntity(self, None)
            self._skill = cached
        return cached

    def Skill(self, data=None):
        # Deprecated: use client.skill instead.
        from entity.skill_entity import SkillEntity
        return SkillEntity(self, data)


    @property
    def upgrade_level_bonus(self):
        """Idiomatic facade: client.upgrade_level_bonus.list() / client.upgrade_level_bonus.load({"id": ...})."""
        from entity.upgrade_level_bonus_entity import UpgradeLevelBonusEntity
        cached = getattr(self, "_upgrade_level_bonus", None)
        if cached is None:
            cached = UpgradeLevelBonusEntity(self, None)
            self._upgrade_level_bonus = cached
        return cached

    def UpgradeLevelBonus(self, data=None):
        # Deprecated: use client.upgrade_level_bonus instead.
        from entity.upgrade_level_bonus_entity import UpgradeLevelBonusEntity
        return UpgradeLevelBonusEntity(self, data)


    @property
    def version(self):
        """Idiomatic facade: client.version.list() / client.version.load({"id": ...})."""
        from entity.version_entity import VersionEntity
        cached = getattr(self, "_version", None)
        if cached is None:
            cached = VersionEntity(self, None)
            self._version = cached
        return cached

    def Version(self, data=None):
        # Deprecated: use client.version instead.
        from entity.version_entity import VersionEntity
        return VersionEntity(self, data)


    @property
    def world(self):
        """Idiomatic facade: client.world.list() / client.world.load({"id": ...})."""
        from entity.world_entity import WorldEntity
        cached = getattr(self, "_world", None)
        if cached is None:
            cached = WorldEntity(self, None)
            self._world = cached
        return cached

    def World(self, data=None):
        # Deprecated: use client.world instead.
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
