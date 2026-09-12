-- FlyffGame SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "FlyffGame",
      slug = "flyff-game",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["transport"] = "base",
      },
    },
    options = {
      base = "https://api.flyff.com",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["achievement"] = {},
        ["awake"] = {},
        ["badge"] = {},
        ["class"] = {},
        ["core"] = {},
        ["couple"] = {},
        ["dungeon"] = {},
        ["element"] = {},
        ["equipment_set"] = {},
        ["exchange_menus"] = {},
        ["housing_pack"] = {},
        ["housing_template"] = {},
        ["item"] = {},
        ["language"] = {},
        ["lifestyle"] = {},
        ["monster"] = {},
        ["npc"] = {},
        ["party_skill"] = {},
        ["pkn"] = {},
        ["place"] = {},
        ["quest"] = {},
        ["raised_pet"] = {},
        ["recipe"] = {},
        ["skill"] = {},
        ["upgrade_level_bonus"] = {},
        ["version"] = {},
        ["world"] = {},
      },
    },
    entity = {
      ["achievement"] = {
        ["fields"] = {
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "achievement",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/achievement",
                ["segments"] = {
                  {
                    ["lit"] = "achievement",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "achievement",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "achievement_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/achievement/{achievementIds}",
                ["rename"] = {
                  ["param"] = {
                    ["achievementIds"] = "id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "achievement",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "achievement",
                  "{id}",
                },
              },
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "achievement_id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/achievement/{achievementId}",
                ["rename"] = {
                  ["param"] = {
                    ["achievementId"] = "id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "achievement",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "achievement",
                  "{id}",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["awake"] = {
        ["fields"] = {},
        ["name"] = "awake",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/awake/skill",
                ["segments"] = {
                  {
                    ["lit"] = "awake",
                  },
                  {
                    ["lit"] = "skill",
                  },
                },
                ["select"] = {
                  ["$action"] = "skill",
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "awake",
                  "skill",
                },
              },
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/awake/stat",
                ["segments"] = {
                  {
                    ["lit"] = "awake",
                  },
                  {
                    ["lit"] = "stat",
                  },
                },
                ["select"] = {
                  ["$action"] = "stat",
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "awake",
                  "stat",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["badge"] = {
        ["fields"] = {
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "badge",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "file_name",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/image/badge/{fileName}",
                ["rename"] = {
                  ["param"] = {
                    ["fileName"] = "id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "image",
                  },
                  {
                    ["lit"] = "badge",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "image",
                  "badge",
                  "{id}",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["class"] = {
        ["fields"] = {
          {
            ["format"] = "float",
            ["name"] = "attackSpeed",
            ["req"] = true,
            ["short"] = "Attack speed constant used in attack speed calculation",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "autoAttackFactors",
            ["req"] = true,
            ["short"] = "Auto attack damage factors used in damage calculation",
            ["type"] = "`$OBJECT`",
          },
          {
            ["format"] = "float",
            ["name"] = "block",
            ["req"] = true,
            ["short"] = "Blocking constant used in block calculation",
            ["type"] = "`$NUMBER`",
          },
          {
            ["format"] = "float",
            ["name"] = "critical",
            ["req"] = true,
            ["short"] = "Critical chance constant used in critical chance calculation",
            ["type"] = "`$NUMBER`",
          },
          {
            ["format"] = "float",
            ["name"] = "defense",
            ["req"] = true,
            ["short"] = "Defense factor use in defensive calculations",
            ["type"] = "`$NUMBER`",
          },
          {
            ["format"] = "float",
            ["name"] = "fp",
            ["req"] = true,
            ["short"] = "FP Factor",
            ["type"] = "`$NUMBER`",
          },
          {
            ["format"] = "float",
            ["name"] = "hp",
            ["req"] = true,
            ["short"] = "HP Factor",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "icon",
            ["req"] = true,
            ["short"] = "Icon of the Class",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["req"] = true,
            ["short"] = "ID of the class",
            ["type"] = "`$INTEGER`",
          },
          {
            ["format"] = "float",
            ["name"] = "magicDefenseIntFactor",
            ["req"] = true,
            ["short"] = "Magic defense factor based on INT used in defensive calculations",
            ["type"] = "`$NUMBER`",
          },
          {
            ["format"] = "float",
            ["name"] = "magicDefenseStaFactor",
            ["req"] = true,
            ["short"] = "Magic defense factor based on STA used in defensive calculations",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "maxFP",
            ["req"] = true,
            ["short"] = "Formula to compute the maximum Fatigue Points of the player",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "maxHP",
            ["req"] = true,
            ["short"] = "Formula to compute the maximum Hit Points of the player",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "maxLevel",
            ["req"] = true,
            ["short"] = "Maximum player level for the Class",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "maxMP",
            ["req"] = true,
            ["short"] = "Formula to compute the maximum Mana Points of the player",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "minLevel",
            ["req"] = true,
            ["short"] = "Minimum player level for the Class",
            ["type"] = "`$INTEGER`",
          },
          {
            ["format"] = "float",
            ["name"] = "mp",
            ["req"] = true,
            ["short"] = "MP Factor",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "name",
            ["req"] = true,
            ["short"] = "Text available in several languages",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "parent",
            ["short"] = "ID of the parent class",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "tree",
            ["req"] = true,
            ["short"] = "Skill tree image for the class",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "type",
            ["req"] = true,
            ["short"] = "Type of the class",
            ["type"] = "`$STRING`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "class",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/class",
                ["segments"] = {
                  {
                    ["lit"] = "class",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "class",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = "vagrant.png",
                      ["kind"] = "param",
                      ["name"] = "file_name",
                      ["orig"] = "file_name",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = "messenger",
                      ["kind"] = "param",
                      ["name"] = "style",
                      ["orig"] = "style",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/image/class/{style}/{fileName}",
                ["rename"] = {
                  ["param"] = {
                    ["fileName"] = "file_name",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "image",
                  },
                  {
                    ["lit"] = "class",
                  },
                  {
                    ["var"] = "style",
                  },
                  {
                    ["var"] = "file_name",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "file_name",
                    "style",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "image",
                  "class",
                  "{style}",
                  "{file_name}",
                },
              },
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = "Vagrant.png",
                      ["kind"] = "param",
                      ["name"] = "file_name",
                      ["orig"] = "file_name",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/image/class/tree/{fileName}",
                ["rename"] = {
                  ["param"] = {
                    ["fileName"] = "file_name",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "image",
                  },
                  {
                    ["lit"] = "class",
                  },
                  {
                    ["lit"] = "tree",
                  },
                  {
                    ["var"] = "file_name",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "file_name",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "image",
                  "class",
                  "tree",
                  "{file_name}",
                },
              },
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = "1689,296,2881",
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "class_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/class/{classIds}",
                ["rename"] = {
                  ["param"] = {
                    ["classIds"] = "id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "class",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "class",
                  "{id}",
                },
              },
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = 1689,
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "class_id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/class/{classId}",
                ["rename"] = {
                  ["param"] = {
                    ["classId"] = "id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "class",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "class",
                  "{id}",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "tree",
            },
            {
              "class",
            },
          },
        },
      },
      ["core"] = {
        ["fields"] = {},
        ["name"] = "core",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "parameter_id",
                      ["orig"] = "parameter_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/parameter/{parameterIds}",
                ["rename"] = {
                  ["param"] = {
                    ["parameterIds"] = "parameter_id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "parameter",
                  },
                  {
                    ["var"] = "parameter_id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "parameter_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "parameter",
                  "{parameter_id}",
                },
              },
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "parameter_id",
                      ["orig"] = "parameter_id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/parameter/{parameterId}",
                ["rename"] = {
                  ["param"] = {
                    ["parameterId"] = "parameter_id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "parameter",
                  },
                  {
                    ["var"] = "parameter_id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "parameter_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "parameter",
                  "{parameter_id}",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "parameter",
            },
          },
        },
      },
      ["couple"] = {
        ["fields"] = {},
        ["name"] = "couple",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/couple",
                ["segments"] = {
                  {
                    ["lit"] = "couple",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "couple",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["dungeon"] = {
        ["fields"] = {},
        ["name"] = "dungeon",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/dungeon",
                ["segments"] = {
                  {
                    ["lit"] = "dungeon",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "dungeon",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["element"] = {
        ["fields"] = {
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "element",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "file_name",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/image/element/{fileName}",
                ["rename"] = {
                  ["param"] = {
                    ["fileName"] = "id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "image",
                  },
                  {
                    ["lit"] = "element",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "image",
                  "element",
                  "{id}",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["equipment_set"] = {
        ["fields"] = {},
        ["name"] = "equipment_set",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/equipmentset",
                ["segments"] = {
                  {
                    ["lit"] = "equipmentset",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "equipmentset",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "equipment_set_id",
                      ["orig"] = "equipment_set_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/equipmentset/{equipmentSetIds}",
                ["rename"] = {
                  ["param"] = {
                    ["equipmentSetIds"] = "equipment_set_id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "equipmentset",
                  },
                  {
                    ["var"] = "equipment_set_id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "equipment_set_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "equipmentset",
                  "{equipment_set_id}",
                },
              },
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "equipment_set_id",
                      ["orig"] = "equipment_set_id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/equipmentset/{equipmentSetId}",
                ["rename"] = {
                  ["param"] = {
                    ["equipmentSetId"] = "equipment_set_id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "equipmentset",
                  },
                  {
                    ["var"] = "equipment_set_id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "equipment_set_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "equipmentset",
                  "{equipment_set_id}",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "equipmentset",
            },
          },
        },
      },
      ["exchange_menus"] = {
        ["fields"] = {},
        ["name"] = "exchange_menus",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/exchangemenu",
                ["segments"] = {
                  {
                    ["lit"] = "exchangemenu",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "exchangemenu",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["housing_pack"] = {
        ["fields"] = {},
        ["name"] = "housing_pack",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/housingpack",
                ["segments"] = {
                  {
                    ["lit"] = "housingpack",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "housingpack",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "housing_pack_id",
                      ["orig"] = "housing_pack_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/housingpack/{housingPackIds}",
                ["rename"] = {
                  ["param"] = {
                    ["housingPackIds"] = "housing_pack_id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "housingpack",
                  },
                  {
                    ["var"] = "housing_pack_id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "housing_pack_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "housingpack",
                  "{housing_pack_id}",
                },
              },
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "housing_pack_id",
                      ["orig"] = "housing_pack_id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/housingpack/{housingPackId}",
                ["rename"] = {
                  ["param"] = {
                    ["housingPackId"] = "housing_pack_id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "housingpack",
                  },
                  {
                    ["var"] = "housing_pack_id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "housing_pack_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "housingpack",
                  "{housing_pack_id}",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "housingpack",
            },
          },
        },
      },
      ["housing_template"] = {
        ["fields"] = {},
        ["name"] = "housing_template",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/housingtemplate",
                ["segments"] = {
                  {
                    ["lit"] = "housingtemplate",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "housingtemplate",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "file_name",
                      ["orig"] = "file_name",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/image/housingtemplate/{fileName}",
                ["rename"] = {
                  ["param"] = {
                    ["fileName"] = "file_name",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "image",
                  },
                  {
                    ["lit"] = "housingtemplate",
                  },
                  {
                    ["var"] = "file_name",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "file_name",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "image",
                  "housingtemplate",
                  "{file_name}",
                },
              },
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "housing_template_id",
                      ["orig"] = "housing_template_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/housingtemplate/{housingTemplateIds}",
                ["rename"] = {
                  ["param"] = {
                    ["housingTemplateIds"] = "housing_template_id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "housingtemplate",
                  },
                  {
                    ["var"] = "housing_template_id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "housing_template_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "housingtemplate",
                  "{housing_template_id}",
                },
              },
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "housing_template_id",
                      ["orig"] = "housing_template_id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/housingtemplate/{housingTemplateId}",
                ["rename"] = {
                  ["param"] = {
                    ["housingTemplateId"] = "housing_template_id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "housingtemplate",
                  },
                  {
                    ["var"] = "housing_template_id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "housing_template_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "housingtemplate",
                  "{housing_template_id}",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "housingtemplate",
            },
          },
        },
      },
      ["item"] = {
        ["fields"] = {
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "item",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/item",
                ["segments"] = {
                  {
                    ["lit"] = "item",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "item",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "file_name",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/image/item/{fileName}",
                ["rename"] = {
                  ["param"] = {
                    ["fileName"] = "id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "image",
                  },
                  {
                    ["lit"] = "item",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "image",
                  "item",
                  "{id}",
                },
              },
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "item_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/item/{itemIds}",
                ["rename"] = {
                  ["param"] = {
                    ["itemIds"] = "id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "item",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "item",
                  "{id}",
                },
              },
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "item_id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/item/{itemId}",
                ["rename"] = {
                  ["param"] = {
                    ["itemId"] = "id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "item",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "item",
                  "{id}",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["language"] = {
        ["fields"] = {},
        ["name"] = "language",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/language",
                ["segments"] = {
                  {
                    ["lit"] = "language",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "language",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "language_code",
                      ["orig"] = "language_code",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/image/language/{languageCode}.png",
                ["segments"] = {
                  {
                    ["lit"] = "image",
                  },
                  {
                    ["lit"] = "language",
                  },
                  {
                    ["lit"] = "{languageCode}.png",
                  },
                },
                ["select"] = {
                  ["$action"] = "language_code",
                  ["exist"] = {
                    "language_code",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "image",
                  "language",
                  "{languageCode}.png",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["lifestyle"] = {
        ["fields"] = {},
        ["name"] = "lifestyle",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/lifestyle",
                ["segments"] = {
                  {
                    ["lit"] = "lifestyle",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "lifestyle",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["monster"] = {
        ["fields"] = {
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "monster",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/monster",
                ["segments"] = {
                  {
                    ["lit"] = "monster",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "monster",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "file_name",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/image/monster/{fileName}",
                ["rename"] = {
                  ["param"] = {
                    ["fileName"] = "id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "image",
                  },
                  {
                    ["lit"] = "monster",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "image",
                  "monster",
                  "{id}",
                },
              },
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "monster_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/monster/{monsterIds}",
                ["rename"] = {
                  ["param"] = {
                    ["monsterIds"] = "id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "monster",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "monster",
                  "{id}",
                },
              },
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "monster_id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/monster/{monsterId}",
                ["rename"] = {
                  ["param"] = {
                    ["monsterId"] = "id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "monster",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "monster",
                  "{id}",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["npc"] = {
        ["fields"] = {
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "npc",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/npc",
                ["segments"] = {
                  {
                    ["lit"] = "npc",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "npc",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "file_name",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/image/npc/{fileName}",
                ["rename"] = {
                  ["param"] = {
                    ["fileName"] = "id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "image",
                  },
                  {
                    ["lit"] = "npc",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "image",
                  "npc",
                  "{id}",
                },
              },
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "npc_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/npc/{npcIds}",
                ["rename"] = {
                  ["param"] = {
                    ["npcIds"] = "id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "npc",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "npc",
                  "{id}",
                },
              },
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "npc_id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/npc/{npcId}",
                ["rename"] = {
                  ["param"] = {
                    ["npcId"] = "id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "npc",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "npc",
                  "{id}",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["party_skill"] = {
        ["fields"] = {},
        ["name"] = "party_skill",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/partyskill",
                ["segments"] = {
                  {
                    ["lit"] = "partyskill",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "partyskill",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "party_skill_id",
                      ["orig"] = "party_skill_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/partyskill/{partySkillIds}",
                ["rename"] = {
                  ["param"] = {
                    ["partySkillIds"] = "party_skill_id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "partyskill",
                  },
                  {
                    ["var"] = "party_skill_id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "party_skill_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "partyskill",
                  "{party_skill_id}",
                },
              },
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "party_skill_id",
                      ["orig"] = "party_skill_id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/partyskill/{partySkillId}",
                ["rename"] = {
                  ["param"] = {
                    ["partySkillId"] = "party_skill_id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "partyskill",
                  },
                  {
                    ["var"] = "party_skill_id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "party_skill_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "partyskill",
                  "{party_skill_id}",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "partyskill",
            },
          },
        },
      },
      ["pkn"] = {
        ["fields"] = {},
        ["name"] = "pkn",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/pk",
                ["segments"] = {
                  {
                    ["lit"] = "pk",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "pk",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["place"] = {
        ["fields"] = {
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "place",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "file_name",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/image/place/{fileName}",
                ["rename"] = {
                  ["param"] = {
                    ["fileName"] = "id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "image",
                  },
                  {
                    ["lit"] = "place",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "image",
                  "place",
                  "{id}",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["quest"] = {
        ["fields"] = {
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "quest",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/quest",
                ["segments"] = {
                  {
                    ["lit"] = "quest",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "quest",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "quest_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/quest/{questIds}",
                ["rename"] = {
                  ["param"] = {
                    ["questIds"] = "id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "quest",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "quest",
                  "{id}",
                },
              },
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "quest_id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/quest/{questId}",
                ["rename"] = {
                  ["param"] = {
                    ["questId"] = "id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "quest",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "quest",
                  "{id}",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["raised_pet"] = {
        ["fields"] = {},
        ["name"] = "raised_pet",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/raisedpet",
                ["segments"] = {
                  {
                    ["lit"] = "raisedpet",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "raisedpet",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["recipe"] = {
        ["fields"] = {
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "recipe",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/recipe",
                ["segments"] = {
                  {
                    ["lit"] = "recipe",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "recipe",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "recipe_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/recipe/{recipeIds}",
                ["rename"] = {
                  ["param"] = {
                    ["recipeIds"] = "id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "recipe",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "recipe",
                  "{id}",
                },
              },
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "recipe_id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/recipe/{recipeId}",
                ["rename"] = {
                  ["param"] = {
                    ["recipeId"] = "id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "recipe",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "recipe",
                  "{id}",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["skill"] = {
        ["fields"] = {
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "skill",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/skill",
                ["segments"] = {
                  {
                    ["lit"] = "skill",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "skill",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "file_name",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/image/skill/{fileName}",
                ["rename"] = {
                  ["param"] = {
                    ["fileName"] = "id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "image",
                  },
                  {
                    ["lit"] = "skill",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "image",
                  "skill",
                  "{id}",
                },
              },
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "skill_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/skill/{skillIds}",
                ["rename"] = {
                  ["param"] = {
                    ["skillIds"] = "id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "skill",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "skill",
                  "{id}",
                },
              },
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "skill_id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/skill/{skillId}",
                ["rename"] = {
                  ["param"] = {
                    ["skillId"] = "id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "skill",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "skill",
                  "{id}",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["upgrade_level_bonus"] = {
        ["fields"] = {},
        ["name"] = "upgrade_level_bonus",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/upgradelevelbonus",
                ["segments"] = {
                  {
                    ["lit"] = "upgradelevelbonus",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "upgradelevelbonus",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["version"] = {
        ["fields"] = {},
        ["name"] = "version",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/version/api",
                ["segments"] = {
                  {
                    ["lit"] = "version",
                  },
                  {
                    ["lit"] = "api",
                  },
                },
                ["select"] = {
                  ["$action"] = "api",
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "version",
                  "api",
                },
              },
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/version/data",
                ["segments"] = {
                  {
                    ["lit"] = "version",
                  },
                  {
                    ["lit"] = "data",
                  },
                },
                ["select"] = {
                  ["$action"] = "data",
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "version",
                  "data",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["world"] = {
        ["fields"] = {
          {
            ["name"] = "continents",
            ["req"] = true,
            ["short"] = "Continents in the World",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "flying",
            ["req"] = true,
            ["short"] = "Whether players can fly in the World or not",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "height",
            ["req"] = true,
            ["short"] = "Height of the World in meters",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "id",
            ["req"] = true,
            ["short"] = "ID of the World",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "inDoor",
            ["req"] = true,
            ["short"] = "Whether the World has a sky or not",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "lodestars",
            ["req"] = true,
            ["short"] = "Revival places in the World",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "name",
            ["req"] = true,
            ["short"] = "Text available in several languages",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "pk",
            ["req"] = true,
            ["short"] = "Whether players can kill other players in the World or not",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "places",
            ["req"] = true,
            ["short"] = "Special Places in the World",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "revivalKey",
            ["short"] = "ID of the Lodestar where players revive when they die in the World",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "revivalWorld",
            ["short"] = "ID of the World where players revive when they die in the World",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "tileName",
            ["req"] = true,
            ["short"] = "Name of the world Tiles for navigator",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "tileSize",
            ["req"] = true,
            ["short"] = "World meters per Tile",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "type",
            ["req"] = true,
            ["short"] = "Type of the World",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "width",
            ["req"] = true,
            ["short"] = "Width of the World in meters",
            ["type"] = "`$INTEGER`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "world",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/world",
                ["segments"] = {
                  {
                    ["lit"] = "world",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "world",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "tile_x",
                      ["orig"] = "tile_x",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["kind"] = "param",
                      ["name"] = "tile_y",
                      ["orig"] = "tile_y",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["example"] = "wdmadrigal",
                      ["kind"] = "param",
                      ["name"] = "world_tile_name",
                      ["orig"] = "world_tile_name",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/image/world/{worldTileName}{tileX}-{tileY}-0.png",
                ["segments"] = {
                  {
                    ["lit"] = "image",
                  },
                  {
                    ["lit"] = "world",
                  },
                  {
                    ["lit"] = "{worldTileName}{tileX}-{tileY}-0.png",
                  },
                },
                ["select"] = {
                  ["$action"] = "world_tile_nametile_x_tile_y_0",
                  ["exist"] = {
                    "tile_x",
                    "tile_y",
                    "world_tile_name",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "image",
                  "world",
                  "{worldTileName}{tileX}-{tileY}-0.png",
                },
              },
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = "4015,4839,6063",
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "world_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/world/{worldIds}",
                ["rename"] = {
                  ["param"] = {
                    ["worldIds"] = "id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "world",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "world",
                  "{id}",
                },
              },
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = 4015,
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "world_id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/world/{worldId}",
                ["rename"] = {
                  ["param"] = {
                    ["worldId"] = "id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "world",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "world",
                  "{id}",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
