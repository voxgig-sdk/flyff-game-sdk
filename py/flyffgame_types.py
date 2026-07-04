# Typed models for the FlyffGame SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Achievement:
    pass


@dataclass
class AchievementLoadMatch:
    id: str


@dataclass
class AchievementListMatch:
    pass


@dataclass
class Awake:
    pass


@dataclass
class AwakeLoadMatch:
    pass


@dataclass
class Badge:
    pass


@dataclass
class BadgeLoadMatch:
    id: str


@dataclass
class Class:
    attack_speed: float
    auto_attack_factor: dict
    block: float
    critical: float
    defense: float
    fp: float
    hp: float
    icon: str
    id: int
    magic_defense_int_factor: float
    magic_defense_sta_factor: float
    max_fp: str
    max_hp: str
    max_level: int
    max_mp: str
    min_level: int
    mp: float
    name: dict
    tree: str
    type: str
    parent: Optional[int] = None


@dataclass
class ClassLoadMatch:
    file_name: str
    style: str
    id: str


@dataclass
class ClassListMatch:
    attack_speed: Optional[float] = None
    auto_attack_factor: Optional[dict] = None
    block: Optional[float] = None
    critical: Optional[float] = None
    defense: Optional[float] = None
    fp: Optional[float] = None
    hp: Optional[float] = None
    icon: Optional[str] = None
    id: Optional[int] = None
    magic_defense_int_factor: Optional[float] = None
    magic_defense_sta_factor: Optional[float] = None
    max_fp: Optional[str] = None
    max_hp: Optional[str] = None
    max_level: Optional[int] = None
    max_mp: Optional[str] = None
    min_level: Optional[int] = None
    mp: Optional[float] = None
    name: Optional[dict] = None
    parent: Optional[int] = None
    tree: Optional[str] = None
    type: Optional[str] = None


@dataclass
class Core:
    pass


@dataclass
class CoreLoadMatch:
    parameter_id: str


@dataclass
class Couple:
    pass


@dataclass
class CoupleLoadMatch:
    pass


@dataclass
class Dungeon:
    pass


@dataclass
class DungeonLoadMatch:
    pass


@dataclass
class Element:
    pass


@dataclass
class ElementLoadMatch:
    id: str


@dataclass
class EquipmentSet:
    pass


@dataclass
class EquipmentSetLoadMatch:
    equipment_set_id: str


@dataclass
class EquipmentSetListMatch:
    pass


@dataclass
class ExchangeMenus:
    pass


@dataclass
class ExchangeMenusLoadMatch:
    pass


@dataclass
class HousingPack:
    pass


@dataclass
class HousingPackLoadMatch:
    housing_pack_id: str


@dataclass
class HousingPackListMatch:
    pass


@dataclass
class HousingTemplate:
    pass


@dataclass
class HousingTemplateLoadMatch:
    file_name: str
    housing_template_id: str


@dataclass
class HousingTemplateListMatch:
    pass


@dataclass
class Item:
    pass


@dataclass
class ItemLoadMatch:
    id: str


@dataclass
class ItemListMatch:
    pass


@dataclass
class Language:
    pass


@dataclass
class LanguageLoadMatch:
    language_code: str


@dataclass
class LanguageListMatch:
    pass


@dataclass
class Lifestyle:
    pass


@dataclass
class LifestyleLoadMatch:
    pass


@dataclass
class Monster:
    pass


@dataclass
class MonsterLoadMatch:
    id: str


@dataclass
class MonsterListMatch:
    pass


@dataclass
class Npc:
    pass


@dataclass
class NpcLoadMatch:
    id: str


@dataclass
class NpcListMatch:
    pass


@dataclass
class PartySkill:
    pass


@dataclass
class PartySkillLoadMatch:
    party_skill_id: str


@dataclass
class PartySkillListMatch:
    pass


@dataclass
class Pkn:
    pass


@dataclass
class PknLoadMatch:
    pass


@dataclass
class Place:
    pass


@dataclass
class PlaceLoadMatch:
    id: str


@dataclass
class Quest:
    pass


@dataclass
class QuestLoadMatch:
    id: str


@dataclass
class QuestListMatch:
    pass


@dataclass
class RaisedPet:
    pass


@dataclass
class RaisedPetLoadMatch:
    pass


@dataclass
class Recipe:
    pass


@dataclass
class RecipeLoadMatch:
    id: str


@dataclass
class RecipeListMatch:
    pass


@dataclass
class Skill:
    pass


@dataclass
class SkillLoadMatch:
    id: str


@dataclass
class SkillListMatch:
    pass


@dataclass
class UpgradeLevelBonus:
    pass


@dataclass
class UpgradeLevelBonusLoadMatch:
    pass


@dataclass
class Version:
    pass


@dataclass
class VersionLoadMatch:
    pass


@dataclass
class World:
    continent: list
    flying: bool
    height: int
    id: int
    in_door: bool
    lodestar: list
    name: dict
    pk: bool
    place: list
    tile_name: str
    tile_size: int
    type: str
    width: int
    revival_key: Optional[str] = None
    revival_world: Optional[int] = None


@dataclass
class WorldLoadMatch:
    tile_x: int
    tile_y: int
    world_tile_name: str
    id: str


@dataclass
class WorldListMatch:
    continent: Optional[list] = None
    flying: Optional[bool] = None
    height: Optional[int] = None
    id: Optional[int] = None
    in_door: Optional[bool] = None
    lodestar: Optional[list] = None
    name: Optional[dict] = None
    pk: Optional[bool] = None
    place: Optional[list] = None
    revival_key: Optional[str] = None
    revival_world: Optional[int] = None
    tile_name: Optional[str] = None
    tile_size: Optional[int] = None
    type: Optional[str] = None
    width: Optional[int] = None

