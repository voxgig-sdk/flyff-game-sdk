# Typed models for the FlyffGame SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Achievement(TypedDict):
    pass


class AchievementLoadMatch(TypedDict):
    id: str


class AchievementListMatch(TypedDict):
    pass


class Awake(TypedDict):
    pass


class AwakeLoadMatch(TypedDict):
    pass


class Badge(TypedDict):
    pass


class BadgeLoadMatch(TypedDict):
    id: str


class ClassRequired(TypedDict):
    attackSpeed: float
    autoAttackFactors: dict
    block: float
    critical: float
    defense: float
    fp: float
    hp: float
    icon: str
    id: int
    magicDefenseIntFactor: float
    magicDefenseStaFactor: float
    maxFP: str
    maxHP: str
    maxLevel: int
    maxMP: str
    minLevel: int
    mp: float
    name: dict
    tree: str
    type: str


class Class(ClassRequired, total=False):
    parent: int


class ClassLoadMatch(TypedDict):
    id: str


class ClassListMatch(TypedDict, total=False):
    attackSpeed: float
    autoAttackFactors: dict
    block: float
    critical: float
    defense: float
    fp: float
    hp: float
    icon: str
    id: int
    magicDefenseIntFactor: float
    magicDefenseStaFactor: float
    maxFP: str
    maxHP: str
    maxLevel: int
    maxMP: str
    minLevel: int
    mp: float
    name: dict
    parent: int
    tree: str
    type: str


class Core(TypedDict):
    pass


class CoreLoadMatch(TypedDict):
    parameter_id: str


class Couple(TypedDict):
    pass


class CoupleLoadMatch(TypedDict):
    pass


class Dungeon(TypedDict):
    pass


class DungeonLoadMatch(TypedDict):
    pass


class Element(TypedDict):
    pass


class ElementLoadMatch(TypedDict):
    id: str


class EquipmentSet(TypedDict):
    pass


class EquipmentSetLoadMatch(TypedDict):
    equipment_set_id: str


class EquipmentSetListMatch(TypedDict):
    pass


class ExchangeMenus(TypedDict):
    pass


class ExchangeMenusLoadMatch(TypedDict):
    pass


class HousingPack(TypedDict):
    pass


class HousingPackLoadMatch(TypedDict):
    housing_pack_id: str


class HousingPackListMatch(TypedDict):
    pass


class HousingTemplate(TypedDict):
    pass


class HousingTemplateLoadMatch(TypedDict):
    housing_template_id: str


class HousingTemplateListMatch(TypedDict):
    pass


class Item(TypedDict):
    pass


class ItemLoadMatch(TypedDict):
    id: str


class ItemListMatch(TypedDict):
    pass


class Language(TypedDict):
    pass


class LanguageLoadMatch(TypedDict):
    language_code: str


class LanguageListMatch(TypedDict):
    pass


class Lifestyle(TypedDict):
    pass


class LifestyleLoadMatch(TypedDict):
    pass


class Monster(TypedDict):
    pass


class MonsterLoadMatch(TypedDict):
    id: str


class MonsterListMatch(TypedDict):
    pass


class Npc(TypedDict):
    pass


class NpcLoadMatch(TypedDict):
    id: str


class NpcListMatch(TypedDict):
    pass


class PartySkill(TypedDict):
    pass


class PartySkillLoadMatch(TypedDict):
    party_skill_id: str


class PartySkillListMatch(TypedDict):
    pass


class Pkn(TypedDict):
    pass


class PknLoadMatch(TypedDict):
    pass


class Place(TypedDict):
    pass


class PlaceLoadMatch(TypedDict):
    id: str


class Quest(TypedDict):
    pass


class QuestLoadMatch(TypedDict):
    id: str


class QuestListMatch(TypedDict):
    pass


class RaisedPet(TypedDict):
    pass


class RaisedPetLoadMatch(TypedDict):
    pass


class Recipe(TypedDict):
    pass


class RecipeLoadMatch(TypedDict):
    id: str


class RecipeListMatch(TypedDict):
    pass


class Skill(TypedDict):
    pass


class SkillLoadMatch(TypedDict):
    id: str


class SkillListMatch(TypedDict):
    pass


class UpgradeLevelBonus(TypedDict):
    pass


class UpgradeLevelBonusLoadMatch(TypedDict):
    pass


class Version(TypedDict):
    pass


class VersionLoadMatch(TypedDict):
    pass


class WorldRequired(TypedDict):
    continents: list
    flying: bool
    height: int
    id: int
    inDoor: bool
    lodestars: list
    name: dict
    pk: bool
    places: list
    tileName: str
    tileSize: int
    type: str
    width: int


class World(WorldRequired, total=False):
    revivalKey: str
    revivalWorld: int


class WorldLoadMatch(TypedDict):
    id: str


class WorldListMatch(TypedDict, total=False):
    continents: list
    flying: bool
    height: int
    id: int
    inDoor: bool
    lodestars: list
    name: dict
    pk: bool
    places: list
    revivalKey: str
    revivalWorld: int
    tileName: str
    tileSize: int
    type: str
    width: int
