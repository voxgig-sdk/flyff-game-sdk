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

  // Selects a custom action instead of the plain load:
  //   'skill' | 'stat'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface Badge {
}

export interface BadgeLoadMatch {
  id: string
}

export interface Class {
  attackSpeed: number
  autoAttackFactors: Record<string, any>
  block: number
  critical: number
  defense: number
  fp: number
  hp: number
  icon: string
  id: number
  magicDefenseIntFactor: number
  magicDefenseStaFactor: number
  maxFP: string
  maxHP: string
  maxLevel: number
  maxMP: string
  minLevel: number
  mp: number
  name: Record<string, any>
  parent?: number
  tree: string
  type: string
}

export interface ClassLoadMatch {
  file_name?: string
  style?: string
  id?: string
}

export interface ClassListMatch {
  attackSpeed?: number
  autoAttackFactors?: Record<string, any>
  block?: number
  critical?: number
  defense?: number
  fp?: number
  hp?: number
  icon?: string
  id?: number
  magicDefenseIntFactor?: number
  magicDefenseStaFactor?: number
  maxFP?: string
  maxHP?: string
  maxLevel?: number
  maxMP?: string
  minLevel?: number
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
  file_name?: string
  housing_template_id?: string
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

  // Selects a custom action instead of the plain load:
  //   'language_code'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
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

  // Selects a custom action instead of the plain load:
  //   'api' | 'data'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface World {
  continents: any[]
  flying: boolean
  height: number
  id: number
  inDoor: boolean
  lodestars: any[]
  name: Record<string, any>
  pk: boolean
  places: any[]
  revivalKey?: string
  revivalWorld?: number
  tileName: string
  tileSize: number
  type: string
  width: number
}

export interface WorldLoadMatch {
  id: string

  // Selects a custom action instead of the plain load:
  //   'world_tile_nametile_x_tile_y_0'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface WorldListMatch {
  continents?: any[]
  flying?: boolean
  height?: number
  id?: number
  inDoor?: boolean
  lodestars?: any[]
  name?: Record<string, any>
  pk?: boolean
  places?: any[]
  revivalKey?: string
  revivalWorld?: number
  tileName?: string
  tileSize?: number
  type?: string
  width?: number
}

