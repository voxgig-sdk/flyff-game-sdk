-- Typed models for the FlyffGame SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Achievement

---@class AchievementLoadMatch
---@field id string

---@class AchievementListMatch

---@class Awake

---@class AwakeLoadMatch

---@class Badge

---@class BadgeLoadMatch
---@field id string

---@class Class
---@field attackSpeed number
---@field autoAttackFactors table
---@field block number
---@field critical number
---@field defense number
---@field fp number
---@field hp number
---@field icon string
---@field id number
---@field magicDefenseIntFactor number
---@field magicDefenseStaFactor number
---@field maxFP string
---@field maxHP string
---@field maxLevel number
---@field maxMP string
---@field minLevel number
---@field mp number
---@field name table
---@field parent? number
---@field tree string
---@field type string

---@class ClassLoadMatch
---@field id string

---@class ClassListMatch
---@field attackSpeed? number
---@field autoAttackFactors? table
---@field block? number
---@field critical? number
---@field defense? number
---@field fp? number
---@field hp? number
---@field icon? string
---@field id? number
---@field magicDefenseIntFactor? number
---@field magicDefenseStaFactor? number
---@field maxFP? string
---@field maxHP? string
---@field maxLevel? number
---@field maxMP? string
---@field minLevel? number
---@field mp? number
---@field name? table
---@field parent? number
---@field tree? string
---@field type? string

---@class Core

---@class CoreLoadMatch
---@field parameter_id string

---@class Couple

---@class CoupleLoadMatch

---@class Dungeon

---@class DungeonLoadMatch

---@class Element

---@class ElementLoadMatch
---@field id string

---@class EquipmentSet

---@class EquipmentSetLoadMatch
---@field equipment_set_id string

---@class EquipmentSetListMatch

---@class ExchangeMenus

---@class ExchangeMenusLoadMatch

---@class HousingPack

---@class HousingPackLoadMatch
---@field housing_pack_id string

---@class HousingPackListMatch

---@class HousingTemplate

---@class HousingTemplateLoadMatch
---@field housing_template_id string

---@class HousingTemplateListMatch

---@class Item

---@class ItemLoadMatch
---@field id string

---@class ItemListMatch

---@class Language

---@class LanguageLoadMatch
---@field language_code string

---@class LanguageListMatch

---@class Lifestyle

---@class LifestyleLoadMatch

---@class Monster

---@class MonsterLoadMatch
---@field id string

---@class MonsterListMatch

---@class Npc

---@class NpcLoadMatch
---@field id string

---@class NpcListMatch

---@class PartySkill

---@class PartySkillLoadMatch
---@field party_skill_id string

---@class PartySkillListMatch

---@class Pkn

---@class PknLoadMatch

---@class Place

---@class PlaceLoadMatch
---@field id string

---@class Quest

---@class QuestLoadMatch
---@field id string

---@class QuestListMatch

---@class RaisedPet

---@class RaisedPetLoadMatch

---@class Recipe

---@class RecipeLoadMatch
---@field id string

---@class RecipeListMatch

---@class Skill

---@class SkillLoadMatch
---@field id string

---@class SkillListMatch

---@class UpgradeLevelBonus

---@class UpgradeLevelBonusLoadMatch

---@class Version

---@class VersionLoadMatch

---@class World
---@field continents table
---@field flying boolean
---@field height number
---@field id number
---@field inDoor boolean
---@field lodestars table
---@field name table
---@field pk boolean
---@field places table
---@field revivalKey? string
---@field revivalWorld? number
---@field tileName string
---@field tileSize number
---@field type string
---@field width number

---@class WorldLoadMatch
---@field id string

---@class WorldListMatch
---@field continents? table
---@field flying? boolean
---@field height? number
---@field id? number
---@field inDoor? boolean
---@field lodestars? table
---@field name? table
---@field pk? boolean
---@field places? table
---@field revivalKey? string
---@field revivalWorld? number
---@field tileName? string
---@field tileSize? number
---@field type? string
---@field width? number

local M = {}

return M
