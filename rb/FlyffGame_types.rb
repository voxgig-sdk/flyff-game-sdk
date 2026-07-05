# frozen_string_literal: true

# Typed models for the FlyffGame SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Achievement entity data model.
class Achievement
end

# Request payload for Achievement#load.
#
# @!attribute [rw] id
#   @return [String]
AchievementLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Achievement#list.
class AchievementListMatch
end

# Awake entity data model.
class Awake
end

# Request payload for Awake#load.
class AwakeLoadMatch
end

# Badge entity data model.
class Badge
end

# Request payload for Badge#load.
#
# @!attribute [rw] id
#   @return [String]
BadgeLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Class entity data model.
#
# @!attribute [rw] attack_speed
#   @return [Float]
#
# @!attribute [rw] auto_attack_factor
#   @return [Hash]
#
# @!attribute [rw] block
#   @return [Float]
#
# @!attribute [rw] critical
#   @return [Float]
#
# @!attribute [rw] defense
#   @return [Float]
#
# @!attribute [rw] fp
#   @return [Float]
#
# @!attribute [rw] hp
#   @return [Float]
#
# @!attribute [rw] icon
#   @return [String]
#
# @!attribute [rw] id
#   @return [Integer]
#
# @!attribute [rw] magic_defense_int_factor
#   @return [Float]
#
# @!attribute [rw] magic_defense_sta_factor
#   @return [Float]
#
# @!attribute [rw] max_fp
#   @return [String]
#
# @!attribute [rw] max_hp
#   @return [String]
#
# @!attribute [rw] max_level
#   @return [Integer]
#
# @!attribute [rw] max_mp
#   @return [String]
#
# @!attribute [rw] min_level
#   @return [Integer]
#
# @!attribute [rw] mp
#   @return [Float]
#
# @!attribute [rw] name
#   @return [Hash]
#
# @!attribute [rw] parent
#   @return [Integer, nil]
#
# @!attribute [rw] tree
#   @return [String]
#
# @!attribute [rw] type
#   @return [String]
Class = Struct.new(
  :attack_speed,
  :auto_attack_factor,
  :block,
  :critical,
  :defense,
  :fp,
  :hp,
  :icon,
  :id,
  :magic_defense_int_factor,
  :magic_defense_sta_factor,
  :max_fp,
  :max_hp,
  :max_level,
  :max_mp,
  :min_level,
  :mp,
  :name,
  :parent,
  :tree,
  :type,
  keyword_init: true
)

# Request payload for Class#load.
#
# @!attribute [rw] file_name
#   @return [String]
#
# @!attribute [rw] style
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
ClassLoadMatch = Struct.new(
  :file_name,
  :style,
  :id,
  keyword_init: true
)

# Request payload for Class#list.
#
# @!attribute [rw] attack_speed
#   @return [Float, nil]
#
# @!attribute [rw] auto_attack_factor
#   @return [Hash, nil]
#
# @!attribute [rw] block
#   @return [Float, nil]
#
# @!attribute [rw] critical
#   @return [Float, nil]
#
# @!attribute [rw] defense
#   @return [Float, nil]
#
# @!attribute [rw] fp
#   @return [Float, nil]
#
# @!attribute [rw] hp
#   @return [Float, nil]
#
# @!attribute [rw] icon
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] magic_defense_int_factor
#   @return [Float, nil]
#
# @!attribute [rw] magic_defense_sta_factor
#   @return [Float, nil]
#
# @!attribute [rw] max_fp
#   @return [String, nil]
#
# @!attribute [rw] max_hp
#   @return [String, nil]
#
# @!attribute [rw] max_level
#   @return [Integer, nil]
#
# @!attribute [rw] max_mp
#   @return [String, nil]
#
# @!attribute [rw] min_level
#   @return [Integer, nil]
#
# @!attribute [rw] mp
#   @return [Float, nil]
#
# @!attribute [rw] name
#   @return [Hash, nil]
#
# @!attribute [rw] parent
#   @return [Integer, nil]
#
# @!attribute [rw] tree
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
ClassListMatch = Struct.new(
  :attack_speed,
  :auto_attack_factor,
  :block,
  :critical,
  :defense,
  :fp,
  :hp,
  :icon,
  :id,
  :magic_defense_int_factor,
  :magic_defense_sta_factor,
  :max_fp,
  :max_hp,
  :max_level,
  :max_mp,
  :min_level,
  :mp,
  :name,
  :parent,
  :tree,
  :type,
  keyword_init: true
)

# Core entity data model.
class Core
end

# Request payload for Core#load.
#
# @!attribute [rw] parameter_id
#   @return [String]
CoreLoadMatch = Struct.new(
  :parameter_id,
  keyword_init: true
)

# Couple entity data model.
class Couple
end

# Request payload for Couple#load.
class CoupleLoadMatch
end

# Dungeon entity data model.
class Dungeon
end

# Request payload for Dungeon#load.
class DungeonLoadMatch
end

# Element entity data model.
class Element
end

# Request payload for Element#load.
#
# @!attribute [rw] id
#   @return [String]
ElementLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# EquipmentSet entity data model.
class EquipmentSet
end

# Request payload for EquipmentSet#load.
#
# @!attribute [rw] equipment_set_id
#   @return [String]
EquipmentSetLoadMatch = Struct.new(
  :equipment_set_id,
  keyword_init: true
)

# Request payload for EquipmentSet#list.
class EquipmentSetListMatch
end

# ExchangeMenus entity data model.
class ExchangeMenus
end

# Request payload for ExchangeMenus#load.
class ExchangeMenusLoadMatch
end

# HousingPack entity data model.
class HousingPack
end

# Request payload for HousingPack#load.
#
# @!attribute [rw] housing_pack_id
#   @return [String]
HousingPackLoadMatch = Struct.new(
  :housing_pack_id,
  keyword_init: true
)

# Request payload for HousingPack#list.
class HousingPackListMatch
end

# HousingTemplate entity data model.
class HousingTemplate
end

# Request payload for HousingTemplate#load.
#
# @!attribute [rw] file_name
#   @return [String]
#
# @!attribute [rw] housing_template_id
#   @return [String]
HousingTemplateLoadMatch = Struct.new(
  :file_name,
  :housing_template_id,
  keyword_init: true
)

# Request payload for HousingTemplate#list.
class HousingTemplateListMatch
end

# Item entity data model.
class Item
end

# Request payload for Item#load.
#
# @!attribute [rw] id
#   @return [String]
ItemLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Item#list.
class ItemListMatch
end

# Language entity data model.
class Language
end

# Request payload for Language#load.
#
# @!attribute [rw] language_code
#   @return [String]
LanguageLoadMatch = Struct.new(
  :language_code,
  keyword_init: true
)

# Request payload for Language#list.
class LanguageListMatch
end

# Lifestyle entity data model.
class Lifestyle
end

# Request payload for Lifestyle#load.
class LifestyleLoadMatch
end

# Monster entity data model.
class Monster
end

# Request payload for Monster#load.
#
# @!attribute [rw] id
#   @return [String]
MonsterLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Monster#list.
class MonsterListMatch
end

# Npc entity data model.
class Npc
end

# Request payload for Npc#load.
#
# @!attribute [rw] id
#   @return [String]
NpcLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Npc#list.
class NpcListMatch
end

# PartySkill entity data model.
class PartySkill
end

# Request payload for PartySkill#load.
#
# @!attribute [rw] party_skill_id
#   @return [String]
PartySkillLoadMatch = Struct.new(
  :party_skill_id,
  keyword_init: true
)

# Request payload for PartySkill#list.
class PartySkillListMatch
end

# Pkn entity data model.
class Pkn
end

# Request payload for Pkn#load.
class PknLoadMatch
end

# Place entity data model.
class Place
end

# Request payload for Place#load.
#
# @!attribute [rw] id
#   @return [String]
PlaceLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Quest entity data model.
class Quest
end

# Request payload for Quest#load.
#
# @!attribute [rw] id
#   @return [String]
QuestLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Quest#list.
class QuestListMatch
end

# RaisedPet entity data model.
class RaisedPet
end

# Request payload for RaisedPet#load.
class RaisedPetLoadMatch
end

# Recipe entity data model.
class Recipe
end

# Request payload for Recipe#load.
#
# @!attribute [rw] id
#   @return [String]
RecipeLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Recipe#list.
class RecipeListMatch
end

# Skill entity data model.
class Skill
end

# Request payload for Skill#load.
#
# @!attribute [rw] id
#   @return [String]
SkillLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Skill#list.
class SkillListMatch
end

# UpgradeLevelBonus entity data model.
class UpgradeLevelBonus
end

# Request payload for UpgradeLevelBonus#load.
class UpgradeLevelBonusLoadMatch
end

# Version entity data model.
class Version
end

# Request payload for Version#load.
class VersionLoadMatch
end

# World entity data model.
#
# @!attribute [rw] continent
#   @return [Array]
#
# @!attribute [rw] flying
#   @return [Boolean]
#
# @!attribute [rw] height
#   @return [Integer]
#
# @!attribute [rw] id
#   @return [Integer]
#
# @!attribute [rw] in_door
#   @return [Boolean]
#
# @!attribute [rw] lodestar
#   @return [Array]
#
# @!attribute [rw] name
#   @return [Hash]
#
# @!attribute [rw] pk
#   @return [Boolean]
#
# @!attribute [rw] place
#   @return [Array]
#
# @!attribute [rw] revival_key
#   @return [String, nil]
#
# @!attribute [rw] revival_world
#   @return [Integer, nil]
#
# @!attribute [rw] tile_name
#   @return [String]
#
# @!attribute [rw] tile_size
#   @return [Integer]
#
# @!attribute [rw] type
#   @return [String]
#
# @!attribute [rw] width
#   @return [Integer]
World = Struct.new(
  :continent,
  :flying,
  :height,
  :id,
  :in_door,
  :lodestar,
  :name,
  :pk,
  :place,
  :revival_key,
  :revival_world,
  :tile_name,
  :tile_size,
  :type,
  :width,
  keyword_init: true
)

# Request payload for World#load.
#
# @!attribute [rw] tile_x
#   @return [Integer]
#
# @!attribute [rw] tile_y
#   @return [Integer]
#
# @!attribute [rw] world_tile_name
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
WorldLoadMatch = Struct.new(
  :tile_x,
  :tile_y,
  :world_tile_name,
  :id,
  keyword_init: true
)

# Request payload for World#list.
#
# @!attribute [rw] continent
#   @return [Array, nil]
#
# @!attribute [rw] flying
#   @return [Boolean, nil]
#
# @!attribute [rw] height
#   @return [Integer, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] in_door
#   @return [Boolean, nil]
#
# @!attribute [rw] lodestar
#   @return [Array, nil]
#
# @!attribute [rw] name
#   @return [Hash, nil]
#
# @!attribute [rw] pk
#   @return [Boolean, nil]
#
# @!attribute [rw] place
#   @return [Array, nil]
#
# @!attribute [rw] revival_key
#   @return [String, nil]
#
# @!attribute [rw] revival_world
#   @return [Integer, nil]
#
# @!attribute [rw] tile_name
#   @return [String, nil]
#
# @!attribute [rw] tile_size
#   @return [Integer, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] width
#   @return [Integer, nil]
WorldListMatch = Struct.new(
  :continent,
  :flying,
  :height,
  :id,
  :in_door,
  :lodestar,
  :name,
  :pk,
  :place,
  :revival_key,
  :revival_world,
  :tile_name,
  :tile_size,
  :type,
  :width,
  keyword_init: true
)

