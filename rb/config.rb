# FlyffGame SDK configuration

module FlyffGameConfig
  def self.make_config
    {
      "main" => {
        "name" => "FlyffGame",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "https://api.flyff.com",
        "auth" => {
          "prefix" => "Bearer",
        },
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "achievement" => {},
          "awake" => {},
          "badge" => {},
          "class" => {},
          "core" => {},
          "couple" => {},
          "dungeon" => {},
          "element" => {},
          "equipment_set" => {},
          "exchange_menus" => {},
          "housing_pack" => {},
          "housing_template" => {},
          "item" => {},
          "language" => {},
          "lifestyle" => {},
          "monster" => {},
          "npc" => {},
          "party_skill" => {},
          "pkn" => {},
          "place" => {},
          "quest" => {},
          "raised_pet" => {},
          "recipe" => {},
          "skill" => {},
          "upgrade_level_bonus" => {},
          "version" => {},
          "world" => {},
        },
      },
      "entity" => {
        "achievement" => {
          "fields" => [],
          "name" => "achievement",
          "op" => {
            "list" => {
              "name" => "list",
              "points" => [
                {
                  "method" => "GET",
                  "orig" => "/achievement",
                  "parts" => [
                    "achievement",
                  ],
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "args" => {},
                  "select" => {},
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "list",
            },
            "load" => {
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "achievement_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/achievement/{achievementIds}",
                  "parts" => [
                    "achievement",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "achievementIds" => "id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "achievement_id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/achievement/{achievementId}",
                  "parts" => [
                    "achievement",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "achievementId" => "id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 1,
                },
              ],
              "input" => "data",
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "awake" => {
          "fields" => [],
          "name" => "awake",
          "op" => {
            "load" => {
              "name" => "load",
              "points" => [
                {
                  "method" => "GET",
                  "orig" => "/awake/skill",
                  "parts" => [
                    "awake",
                    "skill",
                  ],
                  "select" => {
                    "$action" => "skill",
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "args" => {},
                  "index$" => 0,
                },
                {
                  "method" => "GET",
                  "orig" => "/awake/stat",
                  "parts" => [
                    "awake",
                    "stat",
                  ],
                  "select" => {
                    "$action" => "stat",
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "args" => {},
                  "index$" => 1,
                },
              ],
              "input" => "data",
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "badge" => {
          "fields" => [],
          "name" => "badge",
          "op" => {
            "load" => {
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "file_name",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/image/badge/{fileName}",
                  "parts" => [
                    "image",
                    "badge",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "fileName" => "id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "class" => {
          "fields" => [
            {
              "name" => "attack_speed",
              "req" => true,
              "type" => "`$NUMBER`",
              "active" => true,
              "index$" => 0,
            },
            {
              "name" => "auto_attack_factor",
              "req" => true,
              "type" => "`$OBJECT`",
              "active" => true,
              "index$" => 1,
            },
            {
              "name" => "block",
              "req" => true,
              "type" => "`$NUMBER`",
              "active" => true,
              "index$" => 2,
            },
            {
              "name" => "critical",
              "req" => true,
              "type" => "`$NUMBER`",
              "active" => true,
              "index$" => 3,
            },
            {
              "name" => "defense",
              "req" => true,
              "type" => "`$NUMBER`",
              "active" => true,
              "index$" => 4,
            },
            {
              "name" => "fp",
              "req" => true,
              "type" => "`$NUMBER`",
              "active" => true,
              "index$" => 5,
            },
            {
              "name" => "hp",
              "req" => true,
              "type" => "`$NUMBER`",
              "active" => true,
              "index$" => 6,
            },
            {
              "name" => "icon",
              "req" => true,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 7,
            },
            {
              "name" => "id",
              "req" => true,
              "type" => "`$INTEGER`",
              "active" => true,
              "index$" => 8,
            },
            {
              "name" => "magic_defense_int_factor",
              "req" => true,
              "type" => "`$NUMBER`",
              "active" => true,
              "index$" => 9,
            },
            {
              "name" => "magic_defense_sta_factor",
              "req" => true,
              "type" => "`$NUMBER`",
              "active" => true,
              "index$" => 10,
            },
            {
              "name" => "max_fp",
              "req" => true,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 11,
            },
            {
              "name" => "max_hp",
              "req" => true,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 12,
            },
            {
              "name" => "max_level",
              "req" => true,
              "type" => "`$INTEGER`",
              "active" => true,
              "index$" => 13,
            },
            {
              "name" => "max_mp",
              "req" => true,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 14,
            },
            {
              "name" => "min_level",
              "req" => true,
              "type" => "`$INTEGER`",
              "active" => true,
              "index$" => 15,
            },
            {
              "name" => "mp",
              "req" => true,
              "type" => "`$NUMBER`",
              "active" => true,
              "index$" => 16,
            },
            {
              "name" => "name",
              "req" => true,
              "type" => "`$OBJECT`",
              "active" => true,
              "index$" => 17,
            },
            {
              "name" => "parent",
              "req" => false,
              "type" => "`$INTEGER`",
              "active" => true,
              "index$" => 18,
            },
            {
              "name" => "tree",
              "req" => true,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 19,
            },
            {
              "name" => "type",
              "req" => true,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 20,
            },
          ],
          "name" => "class",
          "op" => {
            "list" => {
              "name" => "list",
              "points" => [
                {
                  "method" => "GET",
                  "orig" => "/class",
                  "parts" => [
                    "class",
                  ],
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "args" => {},
                  "select" => {},
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "list",
            },
            "load" => {
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "vagrant.png",
                        "kind" => "param",
                        "name" => "file_name",
                        "orig" => "file_name",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "example" => "messenger",
                        "kind" => "param",
                        "name" => "style",
                        "orig" => "style",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/image/class/{style}/{fileName}",
                  "parts" => [
                    "image",
                    "class",
                    "{style}",
                    "{file_name}",
                  ],
                  "rename" => {
                    "param" => {
                      "fileName" => "file_name",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "file_name",
                      "style",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "Vagrant.png",
                        "kind" => "param",
                        "name" => "file_name",
                        "orig" => "file_name",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/image/class/tree/{fileName}",
                  "parts" => [
                    "image",
                    "class",
                    "tree",
                    "{file_name}",
                  ],
                  "rename" => {
                    "param" => {
                      "fileName" => "file_name",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "file_name",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 1,
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "1689,296,2881",
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "class_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/class/{classIds}",
                  "parts" => [
                    "class",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "classIds" => "id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 2,
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => 1689,
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "class_id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/class/{classId}",
                  "parts" => [
                    "class",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "classId" => "id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 3,
                },
              ],
              "input" => "data",
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "tree",
              ],
              [
                "class",
              ],
            ],
          },
        },
        "core" => {
          "fields" => [],
          "name" => "core",
          "op" => {
            "load" => {
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "parameter_id",
                        "orig" => "parameter_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/parameter/{parameterIds}",
                  "parts" => [
                    "parameter",
                    "{parameter_id}",
                  ],
                  "rename" => {
                    "param" => {
                      "parameterIds" => "parameter_id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "parameter_id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "parameter_id",
                        "orig" => "parameter_id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/parameter/{parameterId}",
                  "parts" => [
                    "parameter",
                    "{parameter_id}",
                  ],
                  "rename" => {
                    "param" => {
                      "parameterId" => "parameter_id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "parameter_id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 1,
                },
              ],
              "input" => "data",
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "parameter",
              ],
            ],
          },
        },
        "couple" => {
          "fields" => [],
          "name" => "couple",
          "op" => {
            "load" => {
              "name" => "load",
              "points" => [
                {
                  "method" => "GET",
                  "orig" => "/couple",
                  "parts" => [
                    "couple",
                  ],
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "args" => {},
                  "select" => {},
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "dungeon" => {
          "fields" => [],
          "name" => "dungeon",
          "op" => {
            "load" => {
              "name" => "load",
              "points" => [
                {
                  "method" => "GET",
                  "orig" => "/dungeon",
                  "parts" => [
                    "dungeon",
                  ],
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "args" => {},
                  "select" => {},
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "element" => {
          "fields" => [],
          "name" => "element",
          "op" => {
            "load" => {
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "file_name",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/image/element/{fileName}",
                  "parts" => [
                    "image",
                    "element",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "fileName" => "id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "equipment_set" => {
          "fields" => [],
          "name" => "equipment_set",
          "op" => {
            "list" => {
              "name" => "list",
              "points" => [
                {
                  "method" => "GET",
                  "orig" => "/equipmentset",
                  "parts" => [
                    "equipmentset",
                  ],
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "args" => {},
                  "select" => {},
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "list",
            },
            "load" => {
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "equipment_set_id",
                        "orig" => "equipment_set_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/equipmentset/{equipmentSetIds}",
                  "parts" => [
                    "equipmentset",
                    "{equipment_set_id}",
                  ],
                  "rename" => {
                    "param" => {
                      "equipmentSetIds" => "equipment_set_id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "equipment_set_id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "equipment_set_id",
                        "orig" => "equipment_set_id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/equipmentset/{equipmentSetId}",
                  "parts" => [
                    "equipmentset",
                    "{equipment_set_id}",
                  ],
                  "rename" => {
                    "param" => {
                      "equipmentSetId" => "equipment_set_id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "equipment_set_id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 1,
                },
              ],
              "input" => "data",
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "equipmentset",
              ],
            ],
          },
        },
        "exchange_menus" => {
          "fields" => [],
          "name" => "exchange_menus",
          "op" => {
            "load" => {
              "name" => "load",
              "points" => [
                {
                  "method" => "GET",
                  "orig" => "/exchangemenu",
                  "parts" => [
                    "exchangemenu",
                  ],
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "args" => {},
                  "select" => {},
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "housing_pack" => {
          "fields" => [],
          "name" => "housing_pack",
          "op" => {
            "list" => {
              "name" => "list",
              "points" => [
                {
                  "method" => "GET",
                  "orig" => "/housingpack",
                  "parts" => [
                    "housingpack",
                  ],
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "args" => {},
                  "select" => {},
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "list",
            },
            "load" => {
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "housing_pack_id",
                        "orig" => "housing_pack_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/housingpack/{housingPackIds}",
                  "parts" => [
                    "housingpack",
                    "{housing_pack_id}",
                  ],
                  "rename" => {
                    "param" => {
                      "housingPackIds" => "housing_pack_id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "housing_pack_id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "housing_pack_id",
                        "orig" => "housing_pack_id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/housingpack/{housingPackId}",
                  "parts" => [
                    "housingpack",
                    "{housing_pack_id}",
                  ],
                  "rename" => {
                    "param" => {
                      "housingPackId" => "housing_pack_id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "housing_pack_id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 1,
                },
              ],
              "input" => "data",
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "housingpack",
              ],
            ],
          },
        },
        "housing_template" => {
          "fields" => [],
          "name" => "housing_template",
          "op" => {
            "list" => {
              "name" => "list",
              "points" => [
                {
                  "method" => "GET",
                  "orig" => "/housingtemplate",
                  "parts" => [
                    "housingtemplate",
                  ],
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "args" => {},
                  "select" => {},
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "list",
            },
            "load" => {
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "file_name",
                        "orig" => "file_name",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/image/housingtemplate/{fileName}",
                  "parts" => [
                    "image",
                    "housingtemplate",
                    "{file_name}",
                  ],
                  "rename" => {
                    "param" => {
                      "fileName" => "file_name",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "file_name",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "housing_template_id",
                        "orig" => "housing_template_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/housingtemplate/{housingTemplateIds}",
                  "parts" => [
                    "housingtemplate",
                    "{housing_template_id}",
                  ],
                  "rename" => {
                    "param" => {
                      "housingTemplateIds" => "housing_template_id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "housing_template_id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 1,
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "housing_template_id",
                        "orig" => "housing_template_id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/housingtemplate/{housingTemplateId}",
                  "parts" => [
                    "housingtemplate",
                    "{housing_template_id}",
                  ],
                  "rename" => {
                    "param" => {
                      "housingTemplateId" => "housing_template_id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "housing_template_id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 2,
                },
              ],
              "input" => "data",
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "housingtemplate",
              ],
            ],
          },
        },
        "item" => {
          "fields" => [],
          "name" => "item",
          "op" => {
            "list" => {
              "name" => "list",
              "points" => [
                {
                  "method" => "GET",
                  "orig" => "/item",
                  "parts" => [
                    "item",
                  ],
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "args" => {},
                  "select" => {},
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "list",
            },
            "load" => {
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "file_name",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/image/item/{fileName}",
                  "parts" => [
                    "image",
                    "item",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "fileName" => "id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "item_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/item/{itemIds}",
                  "parts" => [
                    "item",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "itemIds" => "id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 1,
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "item_id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/item/{itemId}",
                  "parts" => [
                    "item",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "itemId" => "id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 2,
                },
              ],
              "input" => "data",
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "language" => {
          "fields" => [],
          "name" => "language",
          "op" => {
            "list" => {
              "name" => "list",
              "points" => [
                {
                  "method" => "GET",
                  "orig" => "/language",
                  "parts" => [
                    "language",
                  ],
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "args" => {},
                  "select" => {},
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "list",
            },
            "load" => {
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "language_code",
                        "orig" => "language_code",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/image/language/{languageCode}.png",
                  "parts" => [
                    "image",
                    "language",
                    "{languageCode}.png",
                  ],
                  "select" => {
                    "$action" => "language_code",
                    "exist" => [
                      "language_code",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "language",
              ],
            ],
          },
        },
        "lifestyle" => {
          "fields" => [],
          "name" => "lifestyle",
          "op" => {
            "load" => {
              "name" => "load",
              "points" => [
                {
                  "method" => "GET",
                  "orig" => "/lifestyle",
                  "parts" => [
                    "lifestyle",
                  ],
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "args" => {},
                  "select" => {},
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "monster" => {
          "fields" => [],
          "name" => "monster",
          "op" => {
            "list" => {
              "name" => "list",
              "points" => [
                {
                  "method" => "GET",
                  "orig" => "/monster",
                  "parts" => [
                    "monster",
                  ],
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "args" => {},
                  "select" => {},
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "list",
            },
            "load" => {
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "file_name",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/image/monster/{fileName}",
                  "parts" => [
                    "image",
                    "monster",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "fileName" => "id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "monster_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/monster/{monsterIds}",
                  "parts" => [
                    "monster",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "monsterIds" => "id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 1,
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "monster_id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/monster/{monsterId}",
                  "parts" => [
                    "monster",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "monsterId" => "id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 2,
                },
              ],
              "input" => "data",
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "npc" => {
          "fields" => [],
          "name" => "npc",
          "op" => {
            "list" => {
              "name" => "list",
              "points" => [
                {
                  "method" => "GET",
                  "orig" => "/npc",
                  "parts" => [
                    "npc",
                  ],
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "args" => {},
                  "select" => {},
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "list",
            },
            "load" => {
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "file_name",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/image/npc/{fileName}",
                  "parts" => [
                    "image",
                    "npc",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "fileName" => "id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "npc_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/npc/{npcIds}",
                  "parts" => [
                    "npc",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "npcIds" => "id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 1,
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "npc_id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/npc/{npcId}",
                  "parts" => [
                    "npc",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "npcId" => "id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 2,
                },
              ],
              "input" => "data",
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "party_skill" => {
          "fields" => [],
          "name" => "party_skill",
          "op" => {
            "list" => {
              "name" => "list",
              "points" => [
                {
                  "method" => "GET",
                  "orig" => "/partyskill",
                  "parts" => [
                    "partyskill",
                  ],
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "args" => {},
                  "select" => {},
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "list",
            },
            "load" => {
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "party_skill_id",
                        "orig" => "party_skill_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/partyskill/{partySkillIds}",
                  "parts" => [
                    "partyskill",
                    "{party_skill_id}",
                  ],
                  "rename" => {
                    "param" => {
                      "partySkillIds" => "party_skill_id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "party_skill_id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "party_skill_id",
                        "orig" => "party_skill_id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/partyskill/{partySkillId}",
                  "parts" => [
                    "partyskill",
                    "{party_skill_id}",
                  ],
                  "rename" => {
                    "param" => {
                      "partySkillId" => "party_skill_id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "party_skill_id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 1,
                },
              ],
              "input" => "data",
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "partyskill",
              ],
            ],
          },
        },
        "pkn" => {
          "fields" => [],
          "name" => "pkn",
          "op" => {
            "load" => {
              "name" => "load",
              "points" => [
                {
                  "method" => "GET",
                  "orig" => "/pk",
                  "parts" => [
                    "pk",
                  ],
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "args" => {},
                  "select" => {},
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "place" => {
          "fields" => [],
          "name" => "place",
          "op" => {
            "load" => {
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "file_name",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/image/place/{fileName}",
                  "parts" => [
                    "image",
                    "place",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "fileName" => "id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "quest" => {
          "fields" => [],
          "name" => "quest",
          "op" => {
            "list" => {
              "name" => "list",
              "points" => [
                {
                  "method" => "GET",
                  "orig" => "/quest",
                  "parts" => [
                    "quest",
                  ],
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "args" => {},
                  "select" => {},
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "list",
            },
            "load" => {
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "quest_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/quest/{questIds}",
                  "parts" => [
                    "quest",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "questIds" => "id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "quest_id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/quest/{questId}",
                  "parts" => [
                    "quest",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "questId" => "id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 1,
                },
              ],
              "input" => "data",
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "raised_pet" => {
          "fields" => [],
          "name" => "raised_pet",
          "op" => {
            "load" => {
              "name" => "load",
              "points" => [
                {
                  "method" => "GET",
                  "orig" => "/raisedpet",
                  "parts" => [
                    "raisedpet",
                  ],
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "args" => {},
                  "select" => {},
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "recipe" => {
          "fields" => [],
          "name" => "recipe",
          "op" => {
            "list" => {
              "name" => "list",
              "points" => [
                {
                  "method" => "GET",
                  "orig" => "/recipe",
                  "parts" => [
                    "recipe",
                  ],
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "args" => {},
                  "select" => {},
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "list",
            },
            "load" => {
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "recipe_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/recipe/{recipeIds}",
                  "parts" => [
                    "recipe",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "recipeIds" => "id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "recipe_id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/recipe/{recipeId}",
                  "parts" => [
                    "recipe",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "recipeId" => "id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 1,
                },
              ],
              "input" => "data",
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "skill" => {
          "fields" => [],
          "name" => "skill",
          "op" => {
            "list" => {
              "name" => "list",
              "points" => [
                {
                  "method" => "GET",
                  "orig" => "/skill",
                  "parts" => [
                    "skill",
                  ],
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "args" => {},
                  "select" => {},
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "list",
            },
            "load" => {
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "file_name",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/image/skill/{fileName}",
                  "parts" => [
                    "image",
                    "skill",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "fileName" => "id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "skill_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/skill/{skillIds}",
                  "parts" => [
                    "skill",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "skillIds" => "id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 1,
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "skill_id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/skill/{skillId}",
                  "parts" => [
                    "skill",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "skillId" => "id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 2,
                },
              ],
              "input" => "data",
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "upgrade_level_bonus" => {
          "fields" => [],
          "name" => "upgrade_level_bonus",
          "op" => {
            "load" => {
              "name" => "load",
              "points" => [
                {
                  "method" => "GET",
                  "orig" => "/upgradelevelbonus",
                  "parts" => [
                    "upgradelevelbonus",
                  ],
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "args" => {},
                  "select" => {},
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "version" => {
          "fields" => [],
          "name" => "version",
          "op" => {
            "load" => {
              "name" => "load",
              "points" => [
                {
                  "method" => "GET",
                  "orig" => "/version/api",
                  "parts" => [
                    "version",
                    "api",
                  ],
                  "select" => {
                    "$action" => "api",
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "args" => {},
                  "index$" => 0,
                },
                {
                  "method" => "GET",
                  "orig" => "/version/data",
                  "parts" => [
                    "version",
                    "data",
                  ],
                  "select" => {
                    "$action" => "data",
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "args" => {},
                  "index$" => 1,
                },
              ],
              "input" => "data",
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "world" => {
          "fields" => [
            {
              "name" => "continent",
              "req" => true,
              "type" => "`$ARRAY`",
              "active" => true,
              "index$" => 0,
            },
            {
              "name" => "flying",
              "req" => true,
              "type" => "`$BOOLEAN`",
              "active" => true,
              "index$" => 1,
            },
            {
              "name" => "height",
              "req" => true,
              "type" => "`$INTEGER`",
              "active" => true,
              "index$" => 2,
            },
            {
              "name" => "id",
              "req" => true,
              "type" => "`$INTEGER`",
              "active" => true,
              "index$" => 3,
            },
            {
              "name" => "in_door",
              "req" => true,
              "type" => "`$BOOLEAN`",
              "active" => true,
              "index$" => 4,
            },
            {
              "name" => "lodestar",
              "req" => true,
              "type" => "`$ARRAY`",
              "active" => true,
              "index$" => 5,
            },
            {
              "name" => "name",
              "req" => true,
              "type" => "`$OBJECT`",
              "active" => true,
              "index$" => 6,
            },
            {
              "name" => "pk",
              "req" => true,
              "type" => "`$BOOLEAN`",
              "active" => true,
              "index$" => 7,
            },
            {
              "name" => "place",
              "req" => true,
              "type" => "`$ARRAY`",
              "active" => true,
              "index$" => 8,
            },
            {
              "name" => "revival_key",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 9,
            },
            {
              "name" => "revival_world",
              "req" => false,
              "type" => "`$INTEGER`",
              "active" => true,
              "index$" => 10,
            },
            {
              "name" => "tile_name",
              "req" => true,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 11,
            },
            {
              "name" => "tile_size",
              "req" => true,
              "type" => "`$INTEGER`",
              "active" => true,
              "index$" => 12,
            },
            {
              "name" => "type",
              "req" => true,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 13,
            },
            {
              "name" => "width",
              "req" => true,
              "type" => "`$INTEGER`",
              "active" => true,
              "index$" => 14,
            },
          ],
          "name" => "world",
          "op" => {
            "list" => {
              "name" => "list",
              "points" => [
                {
                  "method" => "GET",
                  "orig" => "/world",
                  "parts" => [
                    "world",
                  ],
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "args" => {},
                  "select" => {},
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "list",
            },
            "load" => {
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "tile_x",
                        "orig" => "tile_x",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                        "active" => true,
                      },
                      {
                        "kind" => "param",
                        "name" => "tile_y",
                        "orig" => "tile_y",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                        "active" => true,
                      },
                      {
                        "example" => "wdmadrigal",
                        "kind" => "param",
                        "name" => "world_tile_name",
                        "orig" => "world_tile_name",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/image/world/{worldTileName}{tileX}-{tileY}-0.png",
                  "parts" => [
                    "image",
                    "world",
                    "{worldTileName}{tileX}-{tileY}-0.png",
                  ],
                  "select" => {
                    "$action" => "world_tile_nametile_x_tile_y_0",
                    "exist" => [
                      "tile_x",
                      "tile_y",
                      "world_tile_name",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "4015,4839,6063",
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "world_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/world/{worldIds}",
                  "parts" => [
                    "world",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "worldIds" => "id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 1,
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => 4015,
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "world_id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/world/{worldId}",
                  "parts" => [
                    "world",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "worldId" => "id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 2,
                },
              ],
              "input" => "data",
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "world",
              ],
            ],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    FlyffGameFeatures.make_feature(name)
  end
end
