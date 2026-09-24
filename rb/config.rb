# FlyffGame SDK configuration

module FlyffGameConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "FlyffGame",
        "slug" => "flyff-game",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "ratelimit" => {
          "options" => {
            "active" => false,
            "burst" => 5,
            "rate" => 5,
          },
          "optspec" => {
            "now" => "`$FUNCTION`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "retry" => {
          "options" => {
            "active" => false,
            "factor" => 2,
            "maxDelay" => 2000,
            "minDelay" => 50,
            "retries" => 2,
            "statuses" => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          },
          "optspec" => {
            "jitter" => "`$BOOLEAN`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "test" => {
          "options" => {
            "active" => false,
          },
          "optspec" => {
            "entity" => "`$MAP`",
            "net" => "`$MAP`",
          },
          "strict" => false,
          "transport" => "base",
        },
        "timeout" => {
          "options" => {
            "active" => false,
            "ms" => 30000,
          },
          "optspec" => {
            "clearTimer" => "`$FUNCTION`",
            "setTimer" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
      },
      "options" => {
        "base" => "https://api.flyff.com",
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
          "fields" => [
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$STRING`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "achievement",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/achievement",
                  "segments" => [
                    {
                      "lit" => "achievement",
                    },
                  ],
                  "parts" => [
                    "achievement",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {},
                  "select" => {},
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/achievement/{achievementIds}",
                  "segments" => [
                    {
                      "lit" => "achievement",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "parts" => [
                    "achievement",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "achievementIds" => "id",
                    },
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "id",
                        "orig" => "achievement_id",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/achievement/{achievementId}",
                  "segments" => [
                    {
                      "lit" => "achievement",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "parts" => [
                    "achievement",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "achievementId" => "id",
                    },
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "id",
                        "orig" => "achievement_id",
                        "type" => "`$INTEGER`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                },
              ],
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
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/awake/skill",
                  "segments" => [
                    {
                      "lit" => "awake",
                    },
                    {
                      "lit" => "skill",
                    },
                  ],
                  "parts" => [
                    "awake",
                    "skill",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {},
                  "select" => {
                    "$action" => "skill",
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/awake/stat",
                  "segments" => [
                    {
                      "lit" => "awake",
                    },
                    {
                      "lit" => "stat",
                    },
                  ],
                  "parts" => [
                    "awake",
                    "stat",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {},
                  "select" => {
                    "$action" => "stat",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "badge" => {
          "fields" => [
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$STRING`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "badge",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/image/badge/{fileName}",
                  "segments" => [
                    {
                      "lit" => "image",
                    },
                    {
                      "lit" => "badge",
                    },
                    {
                      "var" => "id",
                    },
                  ],
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
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "id",
                        "orig" => "file_name",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "class" => {
          "fields" => [
            {
              "name" => "attackSpeed",
              "title" => "Attack Speed",
              "type" => "`$NUMBER`",
              "req" => true,
              "short" => "Attack speed constant used in attack speed calculation",
              "format" => "float",
            },
            {
              "name" => "autoAttackFactors",
              "title" => "Auto Attack Factors",
              "type" => "`$OBJECT`",
              "req" => true,
              "short" => "Auto attack damage factors used in damage calculation",
            },
            {
              "name" => "block",
              "title" => "Block",
              "type" => "`$NUMBER`",
              "req" => true,
              "short" => "Blocking constant used in block calculation",
              "format" => "float",
            },
            {
              "name" => "critical",
              "title" => "Critical",
              "type" => "`$NUMBER`",
              "req" => true,
              "short" => "Critical chance constant used in critical chance calculation",
              "format" => "float",
            },
            {
              "name" => "defense",
              "title" => "Defense",
              "type" => "`$NUMBER`",
              "req" => true,
              "short" => "Defense factor use in defensive calculations",
              "format" => "float",
            },
            {
              "name" => "fp",
              "title" => "Fp",
              "type" => "`$NUMBER`",
              "req" => true,
              "short" => "FP Factor",
              "format" => "float",
            },
            {
              "name" => "hp",
              "title" => "Hp",
              "type" => "`$NUMBER`",
              "req" => true,
              "short" => "HP Factor",
              "format" => "float",
            },
            {
              "name" => "icon",
              "title" => "Icon",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "Icon of the Class",
            },
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$INTEGER`",
              "req" => true,
              "short" => "ID of the class",
            },
            {
              "name" => "magicDefenseIntFactor",
              "title" => "Magic Defense Int Factor",
              "type" => "`$NUMBER`",
              "req" => true,
              "short" => "Magic defense factor based on INT used in defensive calculations",
              "format" => "float",
            },
            {
              "name" => "magicDefenseStaFactor",
              "title" => "Magic Defense Sta Factor",
              "type" => "`$NUMBER`",
              "req" => true,
              "short" => "Magic defense factor based on STA used in defensive calculations",
              "format" => "float",
            },
            {
              "name" => "maxFP",
              "title" => "Max Fp",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "Formula to compute the maximum Fatigue Points of the player",
            },
            {
              "name" => "maxHP",
              "title" => "Max Hp",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "Formula to compute the maximum Hit Points of the player",
            },
            {
              "name" => "maxLevel",
              "title" => "Max Level",
              "type" => "`$INTEGER`",
              "req" => true,
              "short" => "Maximum player level for the Class",
            },
            {
              "name" => "maxMP",
              "title" => "Max Mp",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "Formula to compute the maximum Mana Points of the player",
            },
            {
              "name" => "minLevel",
              "title" => "Min Level",
              "type" => "`$INTEGER`",
              "req" => true,
              "short" => "Minimum player level for the Class",
            },
            {
              "name" => "mp",
              "title" => "Mp",
              "type" => "`$NUMBER`",
              "req" => true,
              "short" => "MP Factor",
              "format" => "float",
            },
            {
              "name" => "name",
              "title" => "Name",
              "type" => "`$OBJECT`",
              "req" => true,
              "short" => "Text available in several languages",
            },
            {
              "name" => "parent",
              "title" => "Parent",
              "type" => "`$INTEGER`",
              "short" => "ID of the parent class",
            },
            {
              "name" => "tree",
              "title" => "Tree",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "Skill tree image for the class",
            },
            {
              "name" => "type",
              "title" => "Type",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "Type of the class",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "class",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/class",
                  "segments" => [
                    {
                      "lit" => "class",
                    },
                  ],
                  "parts" => [
                    "class",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {},
                  "select" => {},
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/image/class/{style}/{fileName}",
                  "segments" => [
                    {
                      "lit" => "image",
                    },
                    {
                      "lit" => "class",
                    },
                    {
                      "var" => "style",
                    },
                    {
                      "var" => "file_name",
                    },
                  ],
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
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "file_name",
                        "orig" => "file_name",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                        "example" => "vagrant.png",
                      },
                      {
                        "name" => "style",
                        "orig" => "style",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                        "example" => "messenger",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "file_name",
                      "style",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/image/class/tree/{fileName}",
                  "segments" => [
                    {
                      "lit" => "image",
                    },
                    {
                      "lit" => "class",
                    },
                    {
                      "lit" => "tree",
                    },
                    {
                      "var" => "file_name",
                    },
                  ],
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
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "file_name",
                        "orig" => "file_name",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                        "example" => "Vagrant.png",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "file_name",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/class/{classIds}",
                  "segments" => [
                    {
                      "lit" => "class",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "parts" => [
                    "class",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "classIds" => "id",
                    },
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "id",
                        "orig" => "class_id",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                        "example" => "1689,296,2881",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/class/{classId}",
                  "segments" => [
                    {
                      "lit" => "class",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "parts" => [
                    "class",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "classId" => "id",
                    },
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "id",
                        "orig" => "class_id",
                        "type" => "`$INTEGER`",
                        "kind" => "param",
                        "reqd" => true,
                        "example" => 1689,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "core" => {
          "fields" => [],
          "name" => "core",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/parameter/{parameterIds}",
                  "segments" => [
                    {
                      "lit" => "parameter",
                    },
                    {
                      "var" => "parameter_id",
                    },
                  ],
                  "parts" => [
                    "parameter",
                    "{parameter_id}",
                  ],
                  "rename" => {
                    "param" => {
                      "parameterIds" => "parameter_id",
                    },
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "parameter_id",
                        "orig" => "parameter_id",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "parameter_id",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/parameter/{parameterId}",
                  "segments" => [
                    {
                      "lit" => "parameter",
                    },
                    {
                      "var" => "parameter_id",
                    },
                  ],
                  "parts" => [
                    "parameter",
                    "{parameter_id}",
                  ],
                  "rename" => {
                    "param" => {
                      "parameterId" => "parameter_id",
                    },
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "parameter_id",
                        "orig" => "parameter_id",
                        "type" => "`$INTEGER`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "parameter_id",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "couple" => {
          "fields" => [],
          "name" => "couple",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/couple",
                  "segments" => [
                    {
                      "lit" => "couple",
                    },
                  ],
                  "parts" => [
                    "couple",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {},
                  "select" => {},
                },
              ],
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
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/dungeon",
                  "segments" => [
                    {
                      "lit" => "dungeon",
                    },
                  ],
                  "parts" => [
                    "dungeon",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {},
                  "select" => {},
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "element" => {
          "fields" => [
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$STRING`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "element",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/image/element/{fileName}",
                  "segments" => [
                    {
                      "lit" => "image",
                    },
                    {
                      "lit" => "element",
                    },
                    {
                      "var" => "id",
                    },
                  ],
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
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "id",
                        "orig" => "file_name",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                },
              ],
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
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/equipmentset",
                  "segments" => [
                    {
                      "lit" => "equipmentset",
                    },
                  ],
                  "parts" => [
                    "equipmentset",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {},
                  "select" => {},
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/equipmentset/{equipmentSetIds}",
                  "segments" => [
                    {
                      "lit" => "equipmentset",
                    },
                    {
                      "var" => "equipment_set_id",
                    },
                  ],
                  "parts" => [
                    "equipmentset",
                    "{equipment_set_id}",
                  ],
                  "rename" => {
                    "param" => {
                      "equipmentSetIds" => "equipment_set_id",
                    },
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "equipment_set_id",
                        "orig" => "equipment_set_id",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "equipment_set_id",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/equipmentset/{equipmentSetId}",
                  "segments" => [
                    {
                      "lit" => "equipmentset",
                    },
                    {
                      "var" => "equipment_set_id",
                    },
                  ],
                  "parts" => [
                    "equipmentset",
                    "{equipment_set_id}",
                  ],
                  "rename" => {
                    "param" => {
                      "equipmentSetId" => "equipment_set_id",
                    },
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "equipment_set_id",
                        "orig" => "equipment_set_id",
                        "type" => "`$INTEGER`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "equipment_set_id",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "exchange_menus" => {
          "fields" => [],
          "name" => "exchange_menus",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/exchangemenu",
                  "segments" => [
                    {
                      "lit" => "exchangemenu",
                    },
                  ],
                  "parts" => [
                    "exchangemenu",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {},
                  "select" => {},
                },
              ],
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
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/housingpack",
                  "segments" => [
                    {
                      "lit" => "housingpack",
                    },
                  ],
                  "parts" => [
                    "housingpack",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {},
                  "select" => {},
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/housingpack/{housingPackIds}",
                  "segments" => [
                    {
                      "lit" => "housingpack",
                    },
                    {
                      "var" => "housing_pack_id",
                    },
                  ],
                  "parts" => [
                    "housingpack",
                    "{housing_pack_id}",
                  ],
                  "rename" => {
                    "param" => {
                      "housingPackIds" => "housing_pack_id",
                    },
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "housing_pack_id",
                        "orig" => "housing_pack_id",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "housing_pack_id",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/housingpack/{housingPackId}",
                  "segments" => [
                    {
                      "lit" => "housingpack",
                    },
                    {
                      "var" => "housing_pack_id",
                    },
                  ],
                  "parts" => [
                    "housingpack",
                    "{housing_pack_id}",
                  ],
                  "rename" => {
                    "param" => {
                      "housingPackId" => "housing_pack_id",
                    },
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "housing_pack_id",
                        "orig" => "housing_pack_id",
                        "type" => "`$INTEGER`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "housing_pack_id",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "housing_template" => {
          "fields" => [],
          "name" => "housing_template",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/housingtemplate",
                  "segments" => [
                    {
                      "lit" => "housingtemplate",
                    },
                  ],
                  "parts" => [
                    "housingtemplate",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {},
                  "select" => {},
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/image/housingtemplate/{fileName}",
                  "segments" => [
                    {
                      "lit" => "image",
                    },
                    {
                      "lit" => "housingtemplate",
                    },
                    {
                      "var" => "file_name",
                    },
                  ],
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
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "file_name",
                        "orig" => "file_name",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "file_name",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/housingtemplate/{housingTemplateIds}",
                  "segments" => [
                    {
                      "lit" => "housingtemplate",
                    },
                    {
                      "var" => "housing_template_id",
                    },
                  ],
                  "parts" => [
                    "housingtemplate",
                    "{housing_template_id}",
                  ],
                  "rename" => {
                    "param" => {
                      "housingTemplateIds" => "housing_template_id",
                    },
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "housing_template_id",
                        "orig" => "housing_template_id",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "housing_template_id",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/housingtemplate/{housingTemplateId}",
                  "segments" => [
                    {
                      "lit" => "housingtemplate",
                    },
                    {
                      "var" => "housing_template_id",
                    },
                  ],
                  "parts" => [
                    "housingtemplate",
                    "{housing_template_id}",
                  ],
                  "rename" => {
                    "param" => {
                      "housingTemplateId" => "housing_template_id",
                    },
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "housing_template_id",
                        "orig" => "housing_template_id",
                        "type" => "`$INTEGER`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "housing_template_id",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "item" => {
          "fields" => [
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$STRING`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "item",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/item",
                  "segments" => [
                    {
                      "lit" => "item",
                    },
                  ],
                  "parts" => [
                    "item",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {},
                  "select" => {},
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/image/item/{fileName}",
                  "segments" => [
                    {
                      "lit" => "image",
                    },
                    {
                      "lit" => "item",
                    },
                    {
                      "var" => "id",
                    },
                  ],
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
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "id",
                        "orig" => "file_name",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/item/{itemIds}",
                  "segments" => [
                    {
                      "lit" => "item",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "parts" => [
                    "item",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "itemIds" => "id",
                    },
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "id",
                        "orig" => "item_id",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/item/{itemId}",
                  "segments" => [
                    {
                      "lit" => "item",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "parts" => [
                    "item",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "itemId" => "id",
                    },
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "id",
                        "orig" => "item_id",
                        "type" => "`$INTEGER`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                },
              ],
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
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/language",
                  "segments" => [
                    {
                      "lit" => "language",
                    },
                  ],
                  "parts" => [
                    "language",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {},
                  "select" => {},
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/image/language/{languageCode}.png",
                  "segments" => [
                    {
                      "lit" => "image",
                    },
                    {
                      "lit" => "language",
                    },
                    {
                      "lit" => "{languageCode}.png",
                    },
                  ],
                  "parts" => [
                    "image",
                    "language",
                    "{languageCode}.png",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "language_code",
                        "orig" => "language_code",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "$action" => "language_code",
                    "exist" => [
                      "language_code",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "lifestyle" => {
          "fields" => [],
          "name" => "lifestyle",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/lifestyle",
                  "segments" => [
                    {
                      "lit" => "lifestyle",
                    },
                  ],
                  "parts" => [
                    "lifestyle",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {},
                  "select" => {},
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "monster" => {
          "fields" => [
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$STRING`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "monster",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/monster",
                  "segments" => [
                    {
                      "lit" => "monster",
                    },
                  ],
                  "parts" => [
                    "monster",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {},
                  "select" => {},
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/image/monster/{fileName}",
                  "segments" => [
                    {
                      "lit" => "image",
                    },
                    {
                      "lit" => "monster",
                    },
                    {
                      "var" => "id",
                    },
                  ],
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
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "id",
                        "orig" => "file_name",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/monster/{monsterIds}",
                  "segments" => [
                    {
                      "lit" => "monster",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "parts" => [
                    "monster",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "monsterIds" => "id",
                    },
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "id",
                        "orig" => "monster_id",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/monster/{monsterId}",
                  "segments" => [
                    {
                      "lit" => "monster",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "parts" => [
                    "monster",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "monsterId" => "id",
                    },
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "id",
                        "orig" => "monster_id",
                        "type" => "`$INTEGER`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "npc" => {
          "fields" => [
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$STRING`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "npc",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/npc",
                  "segments" => [
                    {
                      "lit" => "npc",
                    },
                  ],
                  "parts" => [
                    "npc",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {},
                  "select" => {},
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/image/npc/{fileName}",
                  "segments" => [
                    {
                      "lit" => "image",
                    },
                    {
                      "lit" => "npc",
                    },
                    {
                      "var" => "id",
                    },
                  ],
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
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "id",
                        "orig" => "file_name",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/npc/{npcIds}",
                  "segments" => [
                    {
                      "lit" => "npc",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "parts" => [
                    "npc",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "npcIds" => "id",
                    },
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "id",
                        "orig" => "npc_id",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/npc/{npcId}",
                  "segments" => [
                    {
                      "lit" => "npc",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "parts" => [
                    "npc",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "npcId" => "id",
                    },
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "id",
                        "orig" => "npc_id",
                        "type" => "`$INTEGER`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                },
              ],
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
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/partyskill",
                  "segments" => [
                    {
                      "lit" => "partyskill",
                    },
                  ],
                  "parts" => [
                    "partyskill",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {},
                  "select" => {},
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/partyskill/{partySkillIds}",
                  "segments" => [
                    {
                      "lit" => "partyskill",
                    },
                    {
                      "var" => "party_skill_id",
                    },
                  ],
                  "parts" => [
                    "partyskill",
                    "{party_skill_id}",
                  ],
                  "rename" => {
                    "param" => {
                      "partySkillIds" => "party_skill_id",
                    },
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "party_skill_id",
                        "orig" => "party_skill_id",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "party_skill_id",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/partyskill/{partySkillId}",
                  "segments" => [
                    {
                      "lit" => "partyskill",
                    },
                    {
                      "var" => "party_skill_id",
                    },
                  ],
                  "parts" => [
                    "partyskill",
                    "{party_skill_id}",
                  ],
                  "rename" => {
                    "param" => {
                      "partySkillId" => "party_skill_id",
                    },
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "party_skill_id",
                        "orig" => "party_skill_id",
                        "type" => "`$INTEGER`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "party_skill_id",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "pkn" => {
          "fields" => [],
          "name" => "pkn",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/pk",
                  "segments" => [
                    {
                      "lit" => "pk",
                    },
                  ],
                  "parts" => [
                    "pk",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {},
                  "select" => {},
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "place" => {
          "fields" => [
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$STRING`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "place",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/image/place/{fileName}",
                  "segments" => [
                    {
                      "lit" => "image",
                    },
                    {
                      "lit" => "place",
                    },
                    {
                      "var" => "id",
                    },
                  ],
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
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "id",
                        "orig" => "file_name",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "quest" => {
          "fields" => [
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$STRING`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "quest",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/quest",
                  "segments" => [
                    {
                      "lit" => "quest",
                    },
                  ],
                  "parts" => [
                    "quest",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {},
                  "select" => {},
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/quest/{questIds}",
                  "segments" => [
                    {
                      "lit" => "quest",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "parts" => [
                    "quest",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "questIds" => "id",
                    },
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "id",
                        "orig" => "quest_id",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/quest/{questId}",
                  "segments" => [
                    {
                      "lit" => "quest",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "parts" => [
                    "quest",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "questId" => "id",
                    },
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "id",
                        "orig" => "quest_id",
                        "type" => "`$INTEGER`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                },
              ],
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
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/raisedpet",
                  "segments" => [
                    {
                      "lit" => "raisedpet",
                    },
                  ],
                  "parts" => [
                    "raisedpet",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {},
                  "select" => {},
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "recipe" => {
          "fields" => [
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$STRING`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "recipe",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/recipe",
                  "segments" => [
                    {
                      "lit" => "recipe",
                    },
                  ],
                  "parts" => [
                    "recipe",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {},
                  "select" => {},
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/recipe/{recipeIds}",
                  "segments" => [
                    {
                      "lit" => "recipe",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "parts" => [
                    "recipe",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "recipeIds" => "id",
                    },
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "id",
                        "orig" => "recipe_id",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/recipe/{recipeId}",
                  "segments" => [
                    {
                      "lit" => "recipe",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "parts" => [
                    "recipe",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "recipeId" => "id",
                    },
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "id",
                        "orig" => "recipe_id",
                        "type" => "`$INTEGER`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "skill" => {
          "fields" => [
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$STRING`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "skill",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/skill",
                  "segments" => [
                    {
                      "lit" => "skill",
                    },
                  ],
                  "parts" => [
                    "skill",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {},
                  "select" => {},
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/image/skill/{fileName}",
                  "segments" => [
                    {
                      "lit" => "image",
                    },
                    {
                      "lit" => "skill",
                    },
                    {
                      "var" => "id",
                    },
                  ],
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
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "id",
                        "orig" => "file_name",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/skill/{skillIds}",
                  "segments" => [
                    {
                      "lit" => "skill",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "parts" => [
                    "skill",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "skillIds" => "id",
                    },
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "id",
                        "orig" => "skill_id",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/skill/{skillId}",
                  "segments" => [
                    {
                      "lit" => "skill",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "parts" => [
                    "skill",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "skillId" => "id",
                    },
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "id",
                        "orig" => "skill_id",
                        "type" => "`$INTEGER`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                },
              ],
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
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/upgradelevelbonus",
                  "segments" => [
                    {
                      "lit" => "upgradelevelbonus",
                    },
                  ],
                  "parts" => [
                    "upgradelevelbonus",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {},
                  "select" => {},
                },
              ],
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
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/version/api",
                  "segments" => [
                    {
                      "lit" => "version",
                    },
                    {
                      "lit" => "api",
                    },
                  ],
                  "parts" => [
                    "version",
                    "api",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {},
                  "select" => {
                    "$action" => "api",
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/version/data",
                  "segments" => [
                    {
                      "lit" => "version",
                    },
                    {
                      "lit" => "data",
                    },
                  ],
                  "parts" => [
                    "version",
                    "data",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {},
                  "select" => {
                    "$action" => "data",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "world" => {
          "fields" => [
            {
              "name" => "continents",
              "title" => "Continents",
              "type" => "`$ARRAY`",
              "req" => true,
              "short" => "Continents in the World",
            },
            {
              "name" => "flying",
              "title" => "Flying",
              "type" => "`$BOOLEAN`",
              "req" => true,
              "short" => "Whether players can fly in the World or not",
            },
            {
              "name" => "height",
              "title" => "Height",
              "type" => "`$INTEGER`",
              "req" => true,
              "short" => "Height of the World in meters",
            },
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$INTEGER`",
              "req" => true,
              "short" => "ID of the World",
            },
            {
              "name" => "inDoor",
              "title" => "In Door",
              "type" => "`$BOOLEAN`",
              "req" => true,
              "short" => "Whether the World has a sky or not",
            },
            {
              "name" => "lodestars",
              "title" => "Lodestars",
              "type" => "`$ARRAY`",
              "req" => true,
              "short" => "Revival places in the World",
            },
            {
              "name" => "name",
              "title" => "Name",
              "type" => "`$OBJECT`",
              "req" => true,
              "short" => "Text available in several languages",
            },
            {
              "name" => "pk",
              "title" => "Pk",
              "type" => "`$BOOLEAN`",
              "req" => true,
              "short" => "Whether players can kill other players in the World or not",
            },
            {
              "name" => "places",
              "title" => "Places",
              "type" => "`$ARRAY`",
              "req" => true,
              "short" => "Special Places in the World",
            },
            {
              "name" => "revivalKey",
              "title" => "Revival Key",
              "type" => "`$STRING`",
              "short" => "ID of the Lodestar where players revive when they die in the World",
            },
            {
              "name" => "revivalWorld",
              "title" => "Revival World",
              "type" => "`$INTEGER`",
              "short" => "ID of the World where players revive when they die in the World",
            },
            {
              "name" => "tileName",
              "title" => "Tile Name",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "Name of the world Tiles for navigator",
            },
            {
              "name" => "tileSize",
              "title" => "Tile Size",
              "type" => "`$INTEGER`",
              "req" => true,
              "short" => "World meters per Tile",
            },
            {
              "name" => "type",
              "title" => "Type",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "Type of the World",
            },
            {
              "name" => "width",
              "title" => "Width",
              "type" => "`$INTEGER`",
              "req" => true,
              "short" => "Width of the World in meters",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "world",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/world",
                  "segments" => [
                    {
                      "lit" => "world",
                    },
                  ],
                  "parts" => [
                    "world",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {},
                  "select" => {},
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/image/world/{worldTileName}{tileX}-{tileY}-0.png",
                  "segments" => [
                    {
                      "lit" => "image",
                    },
                    {
                      "lit" => "world",
                    },
                    {
                      "lit" => "{worldTileName}{tileX}-{tileY}-0.png",
                    },
                  ],
                  "parts" => [
                    "image",
                    "world",
                    "{worldTileName}{tileX}-{tileY}-0.png",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "tile_x",
                        "orig" => "tile_x",
                        "type" => "`$INTEGER`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                      {
                        "name" => "tile_y",
                        "orig" => "tile_y",
                        "type" => "`$INTEGER`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                      {
                        "name" => "world_tile_name",
                        "orig" => "world_tile_name",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                        "example" => "wdmadrigal",
                      },
                    ],
                  },
                  "select" => {
                    "$action" => "world_tile_nametile_x_tile_y_0",
                    "exist" => [
                      "tile_x",
                      "tile_y",
                      "world_tile_name",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/world/{worldIds}",
                  "segments" => [
                    {
                      "lit" => "world",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "parts" => [
                    "world",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "worldIds" => "id",
                    },
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "id",
                        "orig" => "world_id",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                        "example" => "4015,4839,6063",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/world/{worldId}",
                  "segments" => [
                    {
                      "lit" => "world",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "parts" => [
                    "world",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "worldId" => "id",
                    },
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "id",
                        "orig" => "world_id",
                        "type" => "`$INTEGER`",
                        "kind" => "param",
                        "reqd" => true,
                        "example" => 4015,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
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
