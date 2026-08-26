-- Typed models for the FlyffGame SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Achievement
---@field id? string

---@class AchievementLoadMatch
---@field id string

---@class AchievementListMatch
---@field id? string

---@class Awake

---@class AwakeLoadMatch

---@class Badge
---@field id? string

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
---@field id? string

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
---@field id? string

---@class ItemLoadMatch
---@field id string

---@class ItemListMatch
---@field id? string

---@class Language

---@class LanguageLoadMatch
---@field language_code string

---@class LanguageListMatch

---@class Lifestyle

---@class LifestyleLoadMatch

---@class Monster
---@field id? string

---@class MonsterLoadMatch
---@field id string

---@class MonsterListMatch
---@field id? string

---@class Npc
---@field id? string

---@class NpcLoadMatch
---@field id string

---@class NpcListMatch
---@field id? string

---@class PartySkill

---@class PartySkillLoadMatch
---@field party_skill_id string

---@class PartySkillListMatch

---@class Pkn

---@class PknLoadMatch

---@class Place
---@field id? string

---@class PlaceLoadMatch
---@field id string

---@class Quest
---@field id? string

---@class QuestLoadMatch
---@field id string

---@class QuestListMatch
---@field id? string

---@class RaisedPet

---@class RaisedPetLoadMatch

---@class Recipe
---@field id? string

---@class RecipeLoadMatch
---@field id string

---@class RecipeListMatch
---@field id? string

---@class Skill
---@field id? string

---@class SkillLoadMatch
---@field id string

---@class SkillListMatch
---@field id? string

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
