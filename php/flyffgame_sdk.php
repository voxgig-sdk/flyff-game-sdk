<?php
declare(strict_types=1);

// FlyffGame SDK

require_once __DIR__ . '/utility/struct/Struct.php';
require_once __DIR__ . '/core/UtilityType.php';
require_once __DIR__ . '/core/Spec.php';
require_once __DIR__ . '/core/Helpers.php';

// Load utility registration
require_once __DIR__ . '/utility/Register.php';

// Load config and features
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/features.php';

use Voxgig\Struct\Struct;

class FlyffGameSDK
{
    public string $mode;
    public array $features;
    public ?array $options;

    private $_utility;
    private $_rootctx;

    public function __construct(array $options = [])
    {
        $this->mode = "live";
        $this->features = [];
        $this->options = null;

        $utility = new FlyffGameUtility();
        $this->_utility = $utility;

        $config = FlyffGameConfig::make_config();

        $this->_rootctx = ($utility->make_context)([
            "client" => $this,
            "utility" => $utility,
            "config" => $config,
            "options" => $options ?? [],
            "shared" => [],
        ], null);

        $this->options = ($utility->make_options)($this->_rootctx);

        if (Struct::getpath($this->options, "feature.test.active") === true) {
            $this->mode = "test";
        }

        $this->_rootctx->options = $this->options;

        // Add features from config.
        $feature_opts = FlyffGameHelpers::to_map(Struct::getprop($this->options, "feature"));
        if ($feature_opts) {
            $items = Struct::items($feature_opts);
            if ($items) {
                foreach ($items as $item) {
                    $fname = $item[0];
                    $fopts = FlyffGameHelpers::to_map($item[1]);
                    if ($fopts && isset($fopts["active"]) && $fopts["active"] === true) {
                        ($utility->feature_add)($this->_rootctx, FlyffGameFeatures::make_feature($fname));
                    }
                }
            }
        }

        // Add extension features.
        $extend_val = Struct::getprop($this->options, "extend");
        if (is_array($extend_val)) {
            foreach ($extend_val as $f) {
                if (is_object($f) && method_exists($f, 'get_name')) {
                    ($utility->feature_add)($this->_rootctx, $f);
                }
            }
        }

        // Initialize features.
        foreach ($this->features as $f) {
            ($utility->feature_init)($this->_rootctx, $f);
        }

        ($utility->feature_hook)($this->_rootctx, "PostConstruct");
    }

    public function options_map(): array
    {
        $out = Struct::clone($this->options);
        return is_array($out) ? $out : [];
    }

    public function get_utility()
    {
        return FlyffGameUtility::copy($this->_utility);
    }

    public function get_root_ctx()
    {
        return $this->_rootctx;
    }

    public function prepare(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;
        $fetchargs = $fetchargs ?? [];

        $ctrl = FlyffGameHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "prepare",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $opts = $this->options;
        $path = Struct::getprop($fetchargs, "path") ?? "";
        $path = is_string($path) ? $path : "";
        $method_val = Struct::getprop($fetchargs, "method") ?? "GET";
        $method_val = is_string($method_val) ? $method_val : "GET";
        $params = FlyffGameHelpers::to_map(Struct::getprop($fetchargs, "params")) ?? [];
        $query = FlyffGameHelpers::to_map(Struct::getprop($fetchargs, "query")) ?? [];
        $headers = ($utility->prepare_headers)($ctx);

        $base = Struct::getprop($opts, "base") ?? "";
        $base = is_string($base) ? $base : "";
        $prefix = Struct::getprop($opts, "prefix") ?? "";
        $prefix = is_string($prefix) ? $prefix : "";
        $suffix = Struct::getprop($opts, "suffix") ?? "";
        $suffix = is_string($suffix) ? $suffix : "";

        $ctx->spec = new FlyffGameSpec([
            "base" => $base, "prefix" => $prefix, "suffix" => $suffix,
            "path" => $path, "method" => $method_val,
            "params" => $params, "query" => $query, "headers" => $headers,
            "body" => Struct::getprop($fetchargs, "body"),
            "step" => "start",
        ]);

        // Merge user-provided headers.
        $uh = Struct::getprop($fetchargs, "headers");
        if (is_array($uh)) {
            foreach ($uh as $k => $v) {
                $ctx->spec->headers[$k] = $v;
            }
        }

        [$_, $err] = ($utility->prepare_auth)($ctx);
        if ($err) {
            return ($utility->make_error)($ctx, $err);
        }

        [$fetchdef, $fd_err] = ($utility->make_fetch_def)($ctx);
        if ($fd_err) {
            return ($utility->make_error)($ctx, $fd_err);
        }
        return $fetchdef;
    }

    public function direct(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;

        // direct() is the raw-HTTP escape hatch: it never throws, it returns
        // an {ok, err, ...} dict. prepare() now raises on error, so catch it
        // and surface the failure through the dict instead.
        try {
            $fetchdef = $this->prepare($fetchargs);
        } catch (\Throwable $err) {
            return ["ok" => false, "err" => $err];
        }

        $fetchargs = $fetchargs ?? [];
        $ctrl = FlyffGameHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "direct",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $url = $fetchdef["url"] ?? "";
        [$fetched, $fetch_err] = ($utility->fetcher)($ctx, $url, $fetchdef);

        if ($fetch_err) {
            return ["ok" => false, "err" => $fetch_err];
        }

        if ($fetched === null) {
            return [
                "ok" => false,
                "err" => $ctx->make_error("direct_no_response", "response: undefined"),
            ];
        }

        if (is_array($fetched)) {
            $status = FlyffGameHelpers::to_int(Struct::getprop($fetched, "status"));
            $headers = Struct::getprop($fetched, "headers") ?? [];

            // No-body responses (204, 304) and explicit zero content-length
            // must skip JSON parsing — calling json() on an empty body errors.
            $content_length = is_array($headers) ? ($headers["content-length"] ?? null) : null;
            $no_body = $status === 204 || $status === 304 || (string)$content_length === "0";

            $json_data = null;
            if (!$no_body) {
                $jf = Struct::getprop($fetched, "json");
                if (is_callable($jf)) {
                    try {
                        $json_data = $jf();
                    } catch (\Throwable $e) {
                        // Non-JSON body — leave data null but keep status/ok.
                        $json_data = null;
                    }
                }
            }

            return [
                "ok" => $status >= 200 && $status < 300,
                "status" => $status,
                "headers" => Struct::getprop($fetched, "headers"),
                "data" => $json_data,
            ];
        }

        return [
            "ok" => false,
            "err" => $ctx->make_error("direct_invalid", "invalid response type"),
        ];
    }


    private $_achievement = null;

    // Idiomatic facade: $client->achievement()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Achievement() (PHP method
    // names are case-insensitive).
    public function achievement($data = null)
    {
        require_once __DIR__ . '/entity/achievement_entity.php';
        if ($data === null) {
            if ($this->_achievement === null) {
                $this->_achievement = new AchievementEntity($this, null);
            }
            return $this->_achievement;
        }
        return new AchievementEntity($this, $data);
    }


    private $_awake = null;

    // Idiomatic facade: $client->awake()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Awake() (PHP method
    // names are case-insensitive).
    public function awake($data = null)
    {
        require_once __DIR__ . '/entity/awake_entity.php';
        if ($data === null) {
            if ($this->_awake === null) {
                $this->_awake = new AwakeEntity($this, null);
            }
            return $this->_awake;
        }
        return new AwakeEntity($this, $data);
    }


    private $_badge = null;

    // Idiomatic facade: $client->badge()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Badge() (PHP method
    // names are case-insensitive).
    public function badge($data = null)
    {
        require_once __DIR__ . '/entity/badge_entity.php';
        if ($data === null) {
            if ($this->_badge === null) {
                $this->_badge = new BadgeEntity($this, null);
            }
            return $this->_badge;
        }
        return new BadgeEntity($this, $data);
    }


    private $_class = null;

    // Idiomatic facade: $client->class()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Class() (PHP method
    // names are case-insensitive).
    public function class($data = null)
    {
        require_once __DIR__ . '/entity/class_entity.php';
        if ($data === null) {
            if ($this->_class === null) {
                $this->_class = new ClassEntity($this, null);
            }
            return $this->_class;
        }
        return new ClassEntity($this, $data);
    }


    private $_core = null;

    // Idiomatic facade: $client->core()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Core() (PHP method
    // names are case-insensitive).
    public function core($data = null)
    {
        require_once __DIR__ . '/entity/core_entity.php';
        if ($data === null) {
            if ($this->_core === null) {
                $this->_core = new CoreEntity($this, null);
            }
            return $this->_core;
        }
        return new CoreEntity($this, $data);
    }


    private $_couple = null;

    // Idiomatic facade: $client->couple()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Couple() (PHP method
    // names are case-insensitive).
    public function couple($data = null)
    {
        require_once __DIR__ . '/entity/couple_entity.php';
        if ($data === null) {
            if ($this->_couple === null) {
                $this->_couple = new CoupleEntity($this, null);
            }
            return $this->_couple;
        }
        return new CoupleEntity($this, $data);
    }


    private $_dungeon = null;

    // Idiomatic facade: $client->dungeon()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Dungeon() (PHP method
    // names are case-insensitive).
    public function dungeon($data = null)
    {
        require_once __DIR__ . '/entity/dungeon_entity.php';
        if ($data === null) {
            if ($this->_dungeon === null) {
                $this->_dungeon = new DungeonEntity($this, null);
            }
            return $this->_dungeon;
        }
        return new DungeonEntity($this, $data);
    }


    private $_element = null;

    // Idiomatic facade: $client->element()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Element() (PHP method
    // names are case-insensitive).
    public function element($data = null)
    {
        require_once __DIR__ . '/entity/element_entity.php';
        if ($data === null) {
            if ($this->_element === null) {
                $this->_element = new ElementEntity($this, null);
            }
            return $this->_element;
        }
        return new ElementEntity($this, $data);
    }


    private $_equipment_set = null;

    // Idiomatic facade: $client->equipment_set()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias EquipmentSet() (PHP method
    // names are case-insensitive).
    public function equipment_set($data = null)
    {
        require_once __DIR__ . '/entity/equipment_set_entity.php';
        if ($data === null) {
            if ($this->_equipment_set === null) {
                $this->_equipment_set = new EquipmentSetEntity($this, null);
            }
            return $this->_equipment_set;
        }
        return new EquipmentSetEntity($this, $data);
    }


    private $_exchange_menus = null;

    // Idiomatic facade: $client->exchange_menus()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias ExchangeMenus() (PHP method
    // names are case-insensitive).
    public function exchange_menus($data = null)
    {
        require_once __DIR__ . '/entity/exchange_menus_entity.php';
        if ($data === null) {
            if ($this->_exchange_menus === null) {
                $this->_exchange_menus = new ExchangeMenusEntity($this, null);
            }
            return $this->_exchange_menus;
        }
        return new ExchangeMenusEntity($this, $data);
    }


    private $_housing_pack = null;

    // Idiomatic facade: $client->housing_pack()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias HousingPack() (PHP method
    // names are case-insensitive).
    public function housing_pack($data = null)
    {
        require_once __DIR__ . '/entity/housing_pack_entity.php';
        if ($data === null) {
            if ($this->_housing_pack === null) {
                $this->_housing_pack = new HousingPackEntity($this, null);
            }
            return $this->_housing_pack;
        }
        return new HousingPackEntity($this, $data);
    }


    private $_housing_template = null;

    // Idiomatic facade: $client->housing_template()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias HousingTemplate() (PHP method
    // names are case-insensitive).
    public function housing_template($data = null)
    {
        require_once __DIR__ . '/entity/housing_template_entity.php';
        if ($data === null) {
            if ($this->_housing_template === null) {
                $this->_housing_template = new HousingTemplateEntity($this, null);
            }
            return $this->_housing_template;
        }
        return new HousingTemplateEntity($this, $data);
    }


    private $_item = null;

    // Idiomatic facade: $client->item()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Item() (PHP method
    // names are case-insensitive).
    public function item($data = null)
    {
        require_once __DIR__ . '/entity/item_entity.php';
        if ($data === null) {
            if ($this->_item === null) {
                $this->_item = new ItemEntity($this, null);
            }
            return $this->_item;
        }
        return new ItemEntity($this, $data);
    }


    private $_language = null;

    // Idiomatic facade: $client->language()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Language() (PHP method
    // names are case-insensitive).
    public function language($data = null)
    {
        require_once __DIR__ . '/entity/language_entity.php';
        if ($data === null) {
            if ($this->_language === null) {
                $this->_language = new LanguageEntity($this, null);
            }
            return $this->_language;
        }
        return new LanguageEntity($this, $data);
    }


    private $_lifestyle = null;

    // Idiomatic facade: $client->lifestyle()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Lifestyle() (PHP method
    // names are case-insensitive).
    public function lifestyle($data = null)
    {
        require_once __DIR__ . '/entity/lifestyle_entity.php';
        if ($data === null) {
            if ($this->_lifestyle === null) {
                $this->_lifestyle = new LifestyleEntity($this, null);
            }
            return $this->_lifestyle;
        }
        return new LifestyleEntity($this, $data);
    }


    private $_monster = null;

    // Idiomatic facade: $client->monster()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Monster() (PHP method
    // names are case-insensitive).
    public function monster($data = null)
    {
        require_once __DIR__ . '/entity/monster_entity.php';
        if ($data === null) {
            if ($this->_monster === null) {
                $this->_monster = new MonsterEntity($this, null);
            }
            return $this->_monster;
        }
        return new MonsterEntity($this, $data);
    }


    private $_npc = null;

    // Idiomatic facade: $client->npc()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Npc() (PHP method
    // names are case-insensitive).
    public function npc($data = null)
    {
        require_once __DIR__ . '/entity/npc_entity.php';
        if ($data === null) {
            if ($this->_npc === null) {
                $this->_npc = new NpcEntity($this, null);
            }
            return $this->_npc;
        }
        return new NpcEntity($this, $data);
    }


    private $_party_skill = null;

    // Idiomatic facade: $client->party_skill()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias PartySkill() (PHP method
    // names are case-insensitive).
    public function party_skill($data = null)
    {
        require_once __DIR__ . '/entity/party_skill_entity.php';
        if ($data === null) {
            if ($this->_party_skill === null) {
                $this->_party_skill = new PartySkillEntity($this, null);
            }
            return $this->_party_skill;
        }
        return new PartySkillEntity($this, $data);
    }


    private $_pkn = null;

    // Idiomatic facade: $client->pkn()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Pkn() (PHP method
    // names are case-insensitive).
    public function pkn($data = null)
    {
        require_once __DIR__ . '/entity/pkn_entity.php';
        if ($data === null) {
            if ($this->_pkn === null) {
                $this->_pkn = new PknEntity($this, null);
            }
            return $this->_pkn;
        }
        return new PknEntity($this, $data);
    }


    private $_place = null;

    // Idiomatic facade: $client->place()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Place() (PHP method
    // names are case-insensitive).
    public function place($data = null)
    {
        require_once __DIR__ . '/entity/place_entity.php';
        if ($data === null) {
            if ($this->_place === null) {
                $this->_place = new PlaceEntity($this, null);
            }
            return $this->_place;
        }
        return new PlaceEntity($this, $data);
    }


    private $_quest = null;

    // Idiomatic facade: $client->quest()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Quest() (PHP method
    // names are case-insensitive).
    public function quest($data = null)
    {
        require_once __DIR__ . '/entity/quest_entity.php';
        if ($data === null) {
            if ($this->_quest === null) {
                $this->_quest = new QuestEntity($this, null);
            }
            return $this->_quest;
        }
        return new QuestEntity($this, $data);
    }


    private $_raised_pet = null;

    // Idiomatic facade: $client->raised_pet()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias RaisedPet() (PHP method
    // names are case-insensitive).
    public function raised_pet($data = null)
    {
        require_once __DIR__ . '/entity/raised_pet_entity.php';
        if ($data === null) {
            if ($this->_raised_pet === null) {
                $this->_raised_pet = new RaisedPetEntity($this, null);
            }
            return $this->_raised_pet;
        }
        return new RaisedPetEntity($this, $data);
    }


    private $_recipe = null;

    // Idiomatic facade: $client->recipe()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Recipe() (PHP method
    // names are case-insensitive).
    public function recipe($data = null)
    {
        require_once __DIR__ . '/entity/recipe_entity.php';
        if ($data === null) {
            if ($this->_recipe === null) {
                $this->_recipe = new RecipeEntity($this, null);
            }
            return $this->_recipe;
        }
        return new RecipeEntity($this, $data);
    }


    private $_skill = null;

    // Idiomatic facade: $client->skill()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Skill() (PHP method
    // names are case-insensitive).
    public function skill($data = null)
    {
        require_once __DIR__ . '/entity/skill_entity.php';
        if ($data === null) {
            if ($this->_skill === null) {
                $this->_skill = new SkillEntity($this, null);
            }
            return $this->_skill;
        }
        return new SkillEntity($this, $data);
    }


    private $_upgrade_level_bonus = null;

    // Idiomatic facade: $client->upgrade_level_bonus()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias UpgradeLevelBonus() (PHP method
    // names are case-insensitive).
    public function upgrade_level_bonus($data = null)
    {
        require_once __DIR__ . '/entity/upgrade_level_bonus_entity.php';
        if ($data === null) {
            if ($this->_upgrade_level_bonus === null) {
                $this->_upgrade_level_bonus = new UpgradeLevelBonusEntity($this, null);
            }
            return $this->_upgrade_level_bonus;
        }
        return new UpgradeLevelBonusEntity($this, $data);
    }


    private $_version = null;

    // Idiomatic facade: $client->version()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Version() (PHP method
    // names are case-insensitive).
    public function version($data = null)
    {
        require_once __DIR__ . '/entity/version_entity.php';
        if ($data === null) {
            if ($this->_version === null) {
                $this->_version = new VersionEntity($this, null);
            }
            return $this->_version;
        }
        return new VersionEntity($this, $data);
    }


    private $_world = null;

    // Idiomatic facade: $client->world()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias World() (PHP method
    // names are case-insensitive).
    public function world($data = null)
    {
        require_once __DIR__ . '/entity/world_entity.php';
        if ($data === null) {
            if ($this->_world === null) {
                $this->_world = new WorldEntity($this, null);
            }
            return $this->_world;
        }
        return new WorldEntity($this, $data);
    }



    public static function test(?array $testopts = null, ?array $sdkopts = null): self
    {
        $sdkopts = $sdkopts ?? [];
        $sdkopts = Struct::clone($sdkopts);
        $sdkopts = is_array($sdkopts) ? $sdkopts : [];

        $testopts = $testopts ?? [];
        $testopts = Struct::clone($testopts);
        $testopts = is_array($testopts) ? $testopts : [];
        $testopts["active"] = true;

        if (!isset($sdkopts["feature"])) {
            $sdkopts["feature"] = [];
        }
        $sdkopts["feature"]["test"] = $testopts;

        $sdk = new FlyffGameSDK($sdkopts);
        $sdk->mode = "test";
        return $sdk;
    }
}
