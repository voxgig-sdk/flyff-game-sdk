<?php
declare(strict_types=1);

// Typed models for the FlyffGame SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Achievement entity data model. */
class Achievement
{
}

/** Request payload for Achievement#load. */
class AchievementLoadMatch
{
    public string $id;
}

/** Request payload for Achievement#list. */
class AchievementListMatch
{
}

/** Awake entity data model. */
class Awake
{
}

/** Request payload for Awake#load. */
class AwakeLoadMatch
{
}

/** Badge entity data model. */
class Badge
{
}

/** Request payload for Badge#load. */
class BadgeLoadMatch
{
    public string $id;
}

/** Class entity data model. */
class Class
{
    public float $attack_speed;
    public array $auto_attack_factor;
    public float $block;
    public float $critical;
    public float $defense;
    public float $fp;
    public float $hp;
    public string $icon;
    public int $id;
    public float $magic_defense_int_factor;
    public float $magic_defense_sta_factor;
    public string $max_fp;
    public string $max_hp;
    public int $max_level;
    public string $max_mp;
    public int $min_level;
    public float $mp;
    public array $name;
    public ?int $parent = null;
    public string $tree;
    public string $type;
}

/** Request payload for Class#load. */
class ClassLoadMatch
{
    public string $file_name;
    public string $style;
    public string $id;
}

/** Request payload for Class#list. */
class ClassListMatch
{
    public ?float $attack_speed = null;
    public ?array $auto_attack_factor = null;
    public ?float $block = null;
    public ?float $critical = null;
    public ?float $defense = null;
    public ?float $fp = null;
    public ?float $hp = null;
    public ?string $icon = null;
    public ?int $id = null;
    public ?float $magic_defense_int_factor = null;
    public ?float $magic_defense_sta_factor = null;
    public ?string $max_fp = null;
    public ?string $max_hp = null;
    public ?int $max_level = null;
    public ?string $max_mp = null;
    public ?int $min_level = null;
    public ?float $mp = null;
    public ?array $name = null;
    public ?int $parent = null;
    public ?string $tree = null;
    public ?string $type = null;
}

/** Core entity data model. */
class Core
{
}

/** Request payload for Core#load. */
class CoreLoadMatch
{
    public string $parameter_id;
}

/** Couple entity data model. */
class Couple
{
}

/** Request payload for Couple#load. */
class CoupleLoadMatch
{
}

/** Dungeon entity data model. */
class Dungeon
{
}

/** Request payload for Dungeon#load. */
class DungeonLoadMatch
{
}

/** Element entity data model. */
class Element
{
}

/** Request payload for Element#load. */
class ElementLoadMatch
{
    public string $id;
}

/** EquipmentSet entity data model. */
class EquipmentSet
{
}

/** Request payload for EquipmentSet#load. */
class EquipmentSetLoadMatch
{
    public string $equipment_set_id;
}

/** Request payload for EquipmentSet#list. */
class EquipmentSetListMatch
{
}

/** ExchangeMenus entity data model. */
class ExchangeMenus
{
}

/** Request payload for ExchangeMenus#load. */
class ExchangeMenusLoadMatch
{
}

/** HousingPack entity data model. */
class HousingPack
{
}

/** Request payload for HousingPack#load. */
class HousingPackLoadMatch
{
    public string $housing_pack_id;
}

/** Request payload for HousingPack#list. */
class HousingPackListMatch
{
}

/** HousingTemplate entity data model. */
class HousingTemplate
{
}

/** Request payload for HousingTemplate#load. */
class HousingTemplateLoadMatch
{
    public string $file_name;
    public string $housing_template_id;
}

/** Request payload for HousingTemplate#list. */
class HousingTemplateListMatch
{
}

/** Item entity data model. */
class Item
{
}

/** Request payload for Item#load. */
class ItemLoadMatch
{
    public string $id;
}

/** Request payload for Item#list. */
class ItemListMatch
{
}

/** Language entity data model. */
class Language
{
}

/** Request payload for Language#load. */
class LanguageLoadMatch
{
    public string $language_code;
}

/** Request payload for Language#list. */
class LanguageListMatch
{
}

/** Lifestyle entity data model. */
class Lifestyle
{
}

/** Request payload for Lifestyle#load. */
class LifestyleLoadMatch
{
}

/** Monster entity data model. */
class Monster
{
}

/** Request payload for Monster#load. */
class MonsterLoadMatch
{
    public string $id;
}

/** Request payload for Monster#list. */
class MonsterListMatch
{
}

/** Npc entity data model. */
class Npc
{
}

/** Request payload for Npc#load. */
class NpcLoadMatch
{
    public string $id;
}

/** Request payload for Npc#list. */
class NpcListMatch
{
}

/** PartySkill entity data model. */
class PartySkill
{
}

/** Request payload for PartySkill#load. */
class PartySkillLoadMatch
{
    public string $party_skill_id;
}

/** Request payload for PartySkill#list. */
class PartySkillListMatch
{
}

/** Pkn entity data model. */
class Pkn
{
}

/** Request payload for Pkn#load. */
class PknLoadMatch
{
}

/** Place entity data model. */
class Place
{
}

/** Request payload for Place#load. */
class PlaceLoadMatch
{
    public string $id;
}

/** Quest entity data model. */
class Quest
{
}

/** Request payload for Quest#load. */
class QuestLoadMatch
{
    public string $id;
}

/** Request payload for Quest#list. */
class QuestListMatch
{
}

/** RaisedPet entity data model. */
class RaisedPet
{
}

/** Request payload for RaisedPet#load. */
class RaisedPetLoadMatch
{
}

/** Recipe entity data model. */
class Recipe
{
}

/** Request payload for Recipe#load. */
class RecipeLoadMatch
{
    public string $id;
}

/** Request payload for Recipe#list. */
class RecipeListMatch
{
}

/** Skill entity data model. */
class Skill
{
}

/** Request payload for Skill#load. */
class SkillLoadMatch
{
    public string $id;
}

/** Request payload for Skill#list. */
class SkillListMatch
{
}

/** UpgradeLevelBonus entity data model. */
class UpgradeLevelBonus
{
}

/** Request payload for UpgradeLevelBonus#load. */
class UpgradeLevelBonusLoadMatch
{
}

/** Version entity data model. */
class Version
{
}

/** Request payload for Version#load. */
class VersionLoadMatch
{
}

/** World entity data model. */
class World
{
    public array $continent;
    public bool $flying;
    public int $height;
    public int $id;
    public bool $in_door;
    public array $lodestar;
    public array $name;
    public bool $pk;
    public array $place;
    public ?string $revival_key = null;
    public ?int $revival_world = null;
    public string $tile_name;
    public int $tile_size;
    public string $type;
    public int $width;
}

/** Request payload for World#load. */
class WorldLoadMatch
{
    public int $tile_x;
    public int $tile_y;
    public string $world_tile_name;
    public string $id;
}

/** Request payload for World#list. */
class WorldListMatch
{
    public ?array $continent = null;
    public ?bool $flying = null;
    public ?int $height = null;
    public ?int $id = null;
    public ?bool $in_door = null;
    public ?array $lodestar = null;
    public ?array $name = null;
    public ?bool $pk = null;
    public ?array $place = null;
    public ?string $revival_key = null;
    public ?int $revival_world = null;
    public ?string $tile_name = null;
    public ?int $tile_size = null;
    public ?string $type = null;
    public ?int $width = null;
}

