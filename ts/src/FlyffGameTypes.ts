// Typed models for the FlyffGame SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Achievement {
}

export interface AchievementLoadMatch {
  id: string
}

export interface AchievementListMatch {
}

export interface Awake {
}

export interface AwakeLoadMatch {
}

export interface Badge {
}

export interface BadgeLoadMatch {
  id: string
}

export interface Class {
  attack_speed: number
  auto_attack_factor: Record<string, any>
  block: number
  critical: number
  defense: number
  fp: number
  hp: number
  icon: string
  id: number
  magic_defense_int_factor: number
  magic_defense_sta_factor: number
  max_fp: string
  max_hp: string
  max_level: number
  max_mp: string
  min_level: number
  mp: number
  name: Record<string, any>
  parent?: number
  tree: string
  type: string
}

export interface ClassLoadMatch {
  file_name: string
  style: string
  id: string
}

export interface ClassListMatch {
  attack_speed?: number
  auto_attack_factor?: Record<string, any>
  block?: number
  critical?: number
  defense?: number
  fp?: number
  hp?: number
  icon?: string
  id?: number
  magic_defense_int_factor?: number
  magic_defense_sta_factor?: number
  max_fp?: string
  max_hp?: string
  max_level?: number
  max_mp?: string
  min_level?: number
  mp?: number
  name?: Record<string, any>
  parent?: number
  tree?: string
  type?: string
}

export interface Core {
}

export interface CoreLoadMatch {
  parameter_id: string
}

export interface Couple {
}

export interface CoupleLoadMatch {
}

export interface Dungeon {
}

export interface DungeonLoadMatch {
}

export interface Element {
}

export interface ElementLoadMatch {
  id: string
}

export interface EquipmentSet {
}

export interface EquipmentSetLoadMatch {
  equipment_set_id: string
}

export interface EquipmentSetListMatch {
}

export interface ExchangeMenus {
}

export interface ExchangeMenusLoadMatch {
}

export interface HousingPack {
}

export interface HousingPackLoadMatch {
  housing_pack_id: string
}

export interface HousingPackListMatch {
}

export interface HousingTemplate {
}

export interface HousingTemplateLoadMatch {
  file_name: string
  housing_template_id: string
}

export interface HousingTemplateListMatch {
}

export interface Item {
}

export interface ItemLoadMatch {
  id: string
}

export interface ItemListMatch {
}

export interface Language {
}

export interface LanguageLoadMatch {
  language_code: string
}

export interface LanguageListMatch {
}

export interface Lifestyle {
}

export interface LifestyleLoadMatch {
}

export interface Monster {
}

export interface MonsterLoadMatch {
  id: string
}

export interface MonsterListMatch {
}

export interface Npc {
}

export interface NpcLoadMatch {
  id: string
}

export interface NpcListMatch {
}

export interface PartySkill {
}

export interface PartySkillLoadMatch {
  party_skill_id: string
}

export interface PartySkillListMatch {
}

export interface Pkn {
}

export interface PknLoadMatch {
}

export interface Place {
}

export interface PlaceLoadMatch {
  id: string
}

export interface Quest {
}

export interface QuestLoadMatch {
  id: string
}

export interface QuestListMatch {
}

export interface RaisedPet {
}

export interface RaisedPetLoadMatch {
}

export interface Recipe {
}

export interface RecipeLoadMatch {
  id: string
}

export interface RecipeListMatch {
}

export interface Skill {
}

export interface SkillLoadMatch {
  id: string
}

export interface SkillListMatch {
}

export interface UpgradeLevelBonus {
}

export interface UpgradeLevelBonusLoadMatch {
}

export interface Version {
}

export interface VersionLoadMatch {
}

export interface World {
  continent: any[]
  flying: boolean
  height: number
  id: number
  in_door: boolean
  lodestar: any[]
  name: Record<string, any>
  pk: boolean
  place: any[]
  revival_key?: string
  revival_world?: number
  tile_name: string
  tile_size: number
  type: string
  width: number
}

export interface WorldLoadMatch {
  tile_x: number
  tile_y: number
  world_tile_name: string
  id: string
}

export interface WorldListMatch {
  continent?: any[]
  flying?: boolean
  height?: number
  id?: number
  in_door?: boolean
  lodestar?: any[]
  name?: Record<string, any>
  pk?: boolean
  place?: any[]
  revival_key?: string
  revival_world?: number
  tile_name?: string
  tile_size?: number
  type?: string
  width?: number
}

