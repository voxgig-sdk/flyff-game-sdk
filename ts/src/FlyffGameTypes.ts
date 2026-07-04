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

export type AchievementListMatch = Partial<Achievement>

export interface Awake {
}

export type AwakeLoadMatch = Partial<Awake>

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

export type ClassListMatch = Partial<Class>

export interface Core {
}

export interface CoreLoadMatch {
  parameter_id: string
}

export interface Couple {
}

export type CoupleLoadMatch = Partial<Couple>

export interface Dungeon {
}

export type DungeonLoadMatch = Partial<Dungeon>

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

export type EquipmentSetListMatch = Partial<EquipmentSet>

export interface ExchangeMenus {
}

export type ExchangeMenusLoadMatch = Partial<ExchangeMenus>

export interface HousingPack {
}

export interface HousingPackLoadMatch {
  housing_pack_id: string
}

export type HousingPackListMatch = Partial<HousingPack>

export interface HousingTemplate {
}

export interface HousingTemplateLoadMatch {
  file_name: string
  housing_template_id: string
}

export type HousingTemplateListMatch = Partial<HousingTemplate>

export interface Item {
}

export interface ItemLoadMatch {
  id: string
}

export type ItemListMatch = Partial<Item>

export interface Language {
}

export interface LanguageLoadMatch {
  language_code: string
}

export type LanguageListMatch = Partial<Language>

export interface Lifestyle {
}

export type LifestyleLoadMatch = Partial<Lifestyle>

export interface Monster {
}

export interface MonsterLoadMatch {
  id: string
}

export type MonsterListMatch = Partial<Monster>

export interface Npc {
}

export interface NpcLoadMatch {
  id: string
}

export type NpcListMatch = Partial<Npc>

export interface PartySkill {
}

export interface PartySkillLoadMatch {
  party_skill_id: string
}

export type PartySkillListMatch = Partial<PartySkill>

export interface Pkn {
}

export type PknLoadMatch = Partial<Pkn>

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

export type QuestListMatch = Partial<Quest>

export interface RaisedPet {
}

export type RaisedPetLoadMatch = Partial<RaisedPet>

export interface Recipe {
}

export interface RecipeLoadMatch {
  id: string
}

export type RecipeListMatch = Partial<Recipe>

export interface Skill {
}

export interface SkillLoadMatch {
  id: string
}

export type SkillListMatch = Partial<Skill>

export interface UpgradeLevelBonus {
}

export type UpgradeLevelBonusLoadMatch = Partial<UpgradeLevelBonus>

export interface Version {
}

export type VersionLoadMatch = Partial<Version>

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

export type WorldListMatch = Partial<World>

