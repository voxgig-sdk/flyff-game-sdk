// Typed models for the FlyffGame SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Achievement is the typed data model for the achievement entity.
type Achievement struct {
}

// AchievementLoadMatch is the typed request payload for Achievement.LoadTyped.
type AchievementLoadMatch struct {
	Id string `json:"id"`
}

// AchievementListMatch is the typed request payload for Achievement.ListTyped.
type AchievementListMatch struct {
}

// Awake is the typed data model for the awake entity.
type Awake struct {
}

// AwakeLoadMatch is the typed request payload for Awake.LoadTyped.
type AwakeLoadMatch struct {
}

// Badge is the typed data model for the badge entity.
type Badge struct {
}

// BadgeLoadMatch is the typed request payload for Badge.LoadTyped.
type BadgeLoadMatch struct {
	Id string `json:"id"`
}

// Class is the typed data model for the class entity.
type Class struct {
	AttackSpeed float64 `json:"attack_speed"`
	AutoAttackFactor map[string]any `json:"auto_attack_factor"`
	Block float64 `json:"block"`
	Critical float64 `json:"critical"`
	Defense float64 `json:"defense"`
	Fp float64 `json:"fp"`
	Hp float64 `json:"hp"`
	Icon string `json:"icon"`
	Id int `json:"id"`
	MagicDefenseIntFactor float64 `json:"magic_defense_int_factor"`
	MagicDefenseStaFactor float64 `json:"magic_defense_sta_factor"`
	MaxFp string `json:"max_fp"`
	MaxHp string `json:"max_hp"`
	MaxLevel int `json:"max_level"`
	MaxMp string `json:"max_mp"`
	MinLevel int `json:"min_level"`
	Mp float64 `json:"mp"`
	Name map[string]any `json:"name"`
	Parent *int `json:"parent,omitempty"`
	Tree string `json:"tree"`
	Type string `json:"type"`
}

// ClassLoadMatch is the typed request payload for Class.LoadTyped.
type ClassLoadMatch struct {
	FileName string `json:"file_name"`
	Style string `json:"style"`
	Id string `json:"id"`
}

// ClassListMatch is the typed request payload for Class.ListTyped.
type ClassListMatch struct {
	AttackSpeed *float64 `json:"attack_speed,omitempty"`
	AutoAttackFactor *map[string]any `json:"auto_attack_factor,omitempty"`
	Block *float64 `json:"block,omitempty"`
	Critical *float64 `json:"critical,omitempty"`
	Defense *float64 `json:"defense,omitempty"`
	Fp *float64 `json:"fp,omitempty"`
	Hp *float64 `json:"hp,omitempty"`
	Icon *string `json:"icon,omitempty"`
	Id *int `json:"id,omitempty"`
	MagicDefenseIntFactor *float64 `json:"magic_defense_int_factor,omitempty"`
	MagicDefenseStaFactor *float64 `json:"magic_defense_sta_factor,omitempty"`
	MaxFp *string `json:"max_fp,omitempty"`
	MaxHp *string `json:"max_hp,omitempty"`
	MaxLevel *int `json:"max_level,omitempty"`
	MaxMp *string `json:"max_mp,omitempty"`
	MinLevel *int `json:"min_level,omitempty"`
	Mp *float64 `json:"mp,omitempty"`
	Name *map[string]any `json:"name,omitempty"`
	Parent *int `json:"parent,omitempty"`
	Tree *string `json:"tree,omitempty"`
	Type *string `json:"type,omitempty"`
}

// Core is the typed data model for the core entity.
type Core struct {
}

// CoreLoadMatch is the typed request payload for Core.LoadTyped.
type CoreLoadMatch struct {
	ParameterId string `json:"parameter_id"`
}

// Couple is the typed data model for the couple entity.
type Couple struct {
}

// CoupleLoadMatch is the typed request payload for Couple.LoadTyped.
type CoupleLoadMatch struct {
}

// Dungeon is the typed data model for the dungeon entity.
type Dungeon struct {
}

// DungeonLoadMatch is the typed request payload for Dungeon.LoadTyped.
type DungeonLoadMatch struct {
}

// Element is the typed data model for the element entity.
type Element struct {
}

// ElementLoadMatch is the typed request payload for Element.LoadTyped.
type ElementLoadMatch struct {
	Id string `json:"id"`
}

// EquipmentSet is the typed data model for the equipment_set entity.
type EquipmentSet struct {
}

// EquipmentSetLoadMatch is the typed request payload for EquipmentSet.LoadTyped.
type EquipmentSetLoadMatch struct {
	EquipmentSetId string `json:"equipment_set_id"`
}

// EquipmentSetListMatch is the typed request payload for EquipmentSet.ListTyped.
type EquipmentSetListMatch struct {
}

// ExchangeMenus is the typed data model for the exchange_menus entity.
type ExchangeMenus struct {
}

// ExchangeMenusLoadMatch is the typed request payload for ExchangeMenus.LoadTyped.
type ExchangeMenusLoadMatch struct {
}

// HousingPack is the typed data model for the housing_pack entity.
type HousingPack struct {
}

// HousingPackLoadMatch is the typed request payload for HousingPack.LoadTyped.
type HousingPackLoadMatch struct {
	HousingPackId string `json:"housing_pack_id"`
}

// HousingPackListMatch is the typed request payload for HousingPack.ListTyped.
type HousingPackListMatch struct {
}

// HousingTemplate is the typed data model for the housing_template entity.
type HousingTemplate struct {
}

// HousingTemplateLoadMatch is the typed request payload for HousingTemplate.LoadTyped.
type HousingTemplateLoadMatch struct {
	FileName string `json:"file_name"`
	HousingTemplateId string `json:"housing_template_id"`
}

// HousingTemplateListMatch is the typed request payload for HousingTemplate.ListTyped.
type HousingTemplateListMatch struct {
}

// Item is the typed data model for the item entity.
type Item struct {
}

// ItemLoadMatch is the typed request payload for Item.LoadTyped.
type ItemLoadMatch struct {
	Id string `json:"id"`
}

// ItemListMatch is the typed request payload for Item.ListTyped.
type ItemListMatch struct {
}

// Language is the typed data model for the language entity.
type Language struct {
}

// LanguageLoadMatch is the typed request payload for Language.LoadTyped.
type LanguageLoadMatch struct {
	LanguageCode string `json:"language_code"`
}

// LanguageListMatch is the typed request payload for Language.ListTyped.
type LanguageListMatch struct {
}

// Lifestyle is the typed data model for the lifestyle entity.
type Lifestyle struct {
}

// LifestyleLoadMatch is the typed request payload for Lifestyle.LoadTyped.
type LifestyleLoadMatch struct {
}

// Monster is the typed data model for the monster entity.
type Monster struct {
}

// MonsterLoadMatch is the typed request payload for Monster.LoadTyped.
type MonsterLoadMatch struct {
	Id string `json:"id"`
}

// MonsterListMatch is the typed request payload for Monster.ListTyped.
type MonsterListMatch struct {
}

// Npc is the typed data model for the npc entity.
type Npc struct {
}

// NpcLoadMatch is the typed request payload for Npc.LoadTyped.
type NpcLoadMatch struct {
	Id string `json:"id"`
}

// NpcListMatch is the typed request payload for Npc.ListTyped.
type NpcListMatch struct {
}

// PartySkill is the typed data model for the party_skill entity.
type PartySkill struct {
}

// PartySkillLoadMatch is the typed request payload for PartySkill.LoadTyped.
type PartySkillLoadMatch struct {
	PartySkillId string `json:"party_skill_id"`
}

// PartySkillListMatch is the typed request payload for PartySkill.ListTyped.
type PartySkillListMatch struct {
}

// Pkn is the typed data model for the pkn entity.
type Pkn struct {
}

// PknLoadMatch is the typed request payload for Pkn.LoadTyped.
type PknLoadMatch struct {
}

// Place is the typed data model for the place entity.
type Place struct {
}

// PlaceLoadMatch is the typed request payload for Place.LoadTyped.
type PlaceLoadMatch struct {
	Id string `json:"id"`
}

// Quest is the typed data model for the quest entity.
type Quest struct {
}

// QuestLoadMatch is the typed request payload for Quest.LoadTyped.
type QuestLoadMatch struct {
	Id string `json:"id"`
}

// QuestListMatch is the typed request payload for Quest.ListTyped.
type QuestListMatch struct {
}

// RaisedPet is the typed data model for the raised_pet entity.
type RaisedPet struct {
}

// RaisedPetLoadMatch is the typed request payload for RaisedPet.LoadTyped.
type RaisedPetLoadMatch struct {
}

// Recipe is the typed data model for the recipe entity.
type Recipe struct {
}

// RecipeLoadMatch is the typed request payload for Recipe.LoadTyped.
type RecipeLoadMatch struct {
	Id string `json:"id"`
}

// RecipeListMatch is the typed request payload for Recipe.ListTyped.
type RecipeListMatch struct {
}

// Skill is the typed data model for the skill entity.
type Skill struct {
}

// SkillLoadMatch is the typed request payload for Skill.LoadTyped.
type SkillLoadMatch struct {
	Id string `json:"id"`
}

// SkillListMatch is the typed request payload for Skill.ListTyped.
type SkillListMatch struct {
}

// UpgradeLevelBonus is the typed data model for the upgrade_level_bonus entity.
type UpgradeLevelBonus struct {
}

// UpgradeLevelBonusLoadMatch is the typed request payload for UpgradeLevelBonus.LoadTyped.
type UpgradeLevelBonusLoadMatch struct {
}

// Version is the typed data model for the version entity.
type Version struct {
}

// VersionLoadMatch is the typed request payload for Version.LoadTyped.
type VersionLoadMatch struct {
}

// World is the typed data model for the world entity.
type World struct {
	Continent []any `json:"continent"`
	Flying bool `json:"flying"`
	Height int `json:"height"`
	Id int `json:"id"`
	InDoor bool `json:"in_door"`
	Lodestar []any `json:"lodestar"`
	Name map[string]any `json:"name"`
	Pk bool `json:"pk"`
	Place []any `json:"place"`
	RevivalKey *string `json:"revival_key,omitempty"`
	RevivalWorld *int `json:"revival_world,omitempty"`
	TileName string `json:"tile_name"`
	TileSize int `json:"tile_size"`
	Type string `json:"type"`
	Width int `json:"width"`
}

// WorldLoadMatch is the typed request payload for World.LoadTyped.
type WorldLoadMatch struct {
	TileX int `json:"tile_x"`
	TileY int `json:"tile_y"`
	WorldTileName string `json:"world_tile_name"`
	Id string `json:"id"`
}

// WorldListMatch is the typed request payload for World.ListTyped.
type WorldListMatch struct {
	Continent *[]any `json:"continent,omitempty"`
	Flying *bool `json:"flying,omitempty"`
	Height *int `json:"height,omitempty"`
	Id *int `json:"id,omitempty"`
	InDoor *bool `json:"in_door,omitempty"`
	Lodestar *[]any `json:"lodestar,omitempty"`
	Name *map[string]any `json:"name,omitempty"`
	Pk *bool `json:"pk,omitempty"`
	Place *[]any `json:"place,omitempty"`
	RevivalKey *string `json:"revival_key,omitempty"`
	RevivalWorld *int `json:"revival_world,omitempty"`
	TileName *string `json:"tile_name,omitempty"`
	TileSize *int `json:"tile_size,omitempty"`
	Type *string `json:"type,omitempty"`
	Width *int `json:"width,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
