# FlyffGame SDK configuration


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "FlyffGame",
            "slug": "flyff-game",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://api.flyff.com",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "achievement": {},
                "awake": {},
                "badge": {},
                "class": {},
                "core": {},
                "couple": {},
                "dungeon": {},
                "element": {},
                "equipment_set": {},
                "exchange_menus": {},
                "housing_pack": {},
                "housing_template": {},
                "item": {},
                "language": {},
                "lifestyle": {},
                "monster": {},
                "npc": {},
                "party_skill": {},
                "pkn": {},
                "place": {},
                "quest": {},
                "raised_pet": {},
                "recipe": {},
                "skill": {},
                "upgrade_level_bonus": {},
                "version": {},
                "world": {},
            },
        },
        "entity": {
      "achievement": {
        "fields": [],
        "name": "achievement",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/achievement",
                "parts": [
                  "achievement",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "achievement_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/achievement/{achievementIds}",
                "parts": [
                  "achievement",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "achievementIds": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "achievement_id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/achievement/{achievementId}",
                "parts": [
                  "achievement",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "achievementId": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "awake": {
        "fields": [],
        "name": "awake",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/awake/skill",
                "parts": [
                  "awake",
                  "skill",
                ],
                "select": {
                  "$action": "skill",
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/awake/stat",
                "parts": [
                  "awake",
                  "stat",
                ],
                "select": {
                  "$action": "stat",
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "badge": {
        "fields": [],
        "name": "badge",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "file_name",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/image/badge/{fileName}",
                "parts": [
                  "image",
                  "badge",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "fileName": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "class": {
        "fields": [
          {
            "name": "attackSpeed",
            "req": True,
            "short": "Attack speed constant used in attack speed calculation",
            "type": "`$NUMBER`",
          },
          {
            "name": "autoAttackFactors",
            "req": True,
            "short": "Auto attack damage factors used in damage calculation",
            "type": "`$OBJECT`",
          },
          {
            "name": "block",
            "req": True,
            "short": "Blocking constant used in block calculation",
            "type": "`$NUMBER`",
          },
          {
            "name": "critical",
            "req": True,
            "short": "Critical chance constant used in critical chance calculation",
            "type": "`$NUMBER`",
          },
          {
            "name": "defense",
            "req": True,
            "short": "Defense factor use in defensive calculations",
            "type": "`$NUMBER`",
          },
          {
            "name": "fp",
            "req": True,
            "short": "FP Factor",
            "type": "`$NUMBER`",
          },
          {
            "name": "hp",
            "req": True,
            "short": "HP Factor",
            "type": "`$NUMBER`",
          },
          {
            "name": "icon",
            "req": True,
            "short": "Icon of the Class",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "req": True,
            "short": "ID of the class",
            "type": "`$INTEGER`",
          },
          {
            "name": "magicDefenseIntFactor",
            "req": True,
            "short": "Magic defense factor based on INT used in defensive calculations",
            "type": "`$NUMBER`",
          },
          {
            "name": "magicDefenseStaFactor",
            "req": True,
            "short": "Magic defense factor based on STA used in defensive calculations",
            "type": "`$NUMBER`",
          },
          {
            "name": "maxFP",
            "req": True,
            "short": "Formula to compute the maximum Fatigue Points of the player",
            "type": "`$STRING`",
          },
          {
            "name": "maxHP",
            "req": True,
            "short": "Formula to compute the maximum Hit Points of the player",
            "type": "`$STRING`",
          },
          {
            "name": "maxLevel",
            "req": True,
            "short": "Maximum player level for the Class",
            "type": "`$INTEGER`",
          },
          {
            "name": "maxMP",
            "req": True,
            "short": "Formula to compute the maximum Mana Points of the player",
            "type": "`$STRING`",
          },
          {
            "name": "minLevel",
            "req": True,
            "short": "Minimum player level for the Class",
            "type": "`$INTEGER`",
          },
          {
            "name": "mp",
            "req": True,
            "short": "MP Factor",
            "type": "`$NUMBER`",
          },
          {
            "name": "name",
            "req": True,
            "short": "Text available in several languages",
            "type": "`$OBJECT`",
          },
          {
            "name": "parent",
            "short": "ID of the parent class",
            "type": "`$INTEGER`",
          },
          {
            "name": "tree",
            "req": True,
            "short": "Skill tree image for the class",
            "type": "`$STRING`",
          },
          {
            "name": "type",
            "req": True,
            "short": "Type of the class",
            "type": "`$STRING`",
          },
        ],
        "name": "class",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/class",
                "parts": [
                  "class",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "example": "vagrant.png",
                      "kind": "param",
                      "name": "file_name",
                      "orig": "file_name",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "example": "messenger",
                      "kind": "param",
                      "name": "style",
                      "orig": "style",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/image/class/{style}/{fileName}",
                "parts": [
                  "image",
                  "class",
                  "{style}",
                  "{file_name}",
                ],
                "rename": {
                  "param": {
                    "fileName": "file_name",
                  },
                },
                "select": {
                  "exist": [
                    "file_name",
                    "style",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "example": "Vagrant.png",
                      "kind": "param",
                      "name": "file_name",
                      "orig": "file_name",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/image/class/tree/{fileName}",
                "parts": [
                  "image",
                  "class",
                  "tree",
                  "{file_name}",
                ],
                "rename": {
                  "param": {
                    "fileName": "file_name",
                  },
                },
                "select": {
                  "exist": [
                    "file_name",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "example": "1689,296,2881",
                      "kind": "param",
                      "name": "id",
                      "orig": "class_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/class/{classIds}",
                "parts": [
                  "class",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "classIds": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "example": 1689,
                      "kind": "param",
                      "name": "id",
                      "orig": "class_id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/class/{classId}",
                "parts": [
                  "class",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "classId": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "tree",
            ],
            [
              "class",
            ],
          ],
        },
      },
      "core": {
        "fields": [],
        "name": "core",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "parameter_id",
                      "orig": "parameter_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/parameter/{parameterIds}",
                "parts": [
                  "parameter",
                  "{parameter_id}",
                ],
                "rename": {
                  "param": {
                    "parameterIds": "parameter_id",
                  },
                },
                "select": {
                  "exist": [
                    "parameter_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "parameter_id",
                      "orig": "parameter_id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/parameter/{parameterId}",
                "parts": [
                  "parameter",
                  "{parameter_id}",
                ],
                "rename": {
                  "param": {
                    "parameterId": "parameter_id",
                  },
                },
                "select": {
                  "exist": [
                    "parameter_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "parameter",
            ],
          ],
        },
      },
      "couple": {
        "fields": [],
        "name": "couple",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/couple",
                "parts": [
                  "couple",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "dungeon": {
        "fields": [],
        "name": "dungeon",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/dungeon",
                "parts": [
                  "dungeon",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "element": {
        "fields": [],
        "name": "element",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "file_name",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/image/element/{fileName}",
                "parts": [
                  "image",
                  "element",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "fileName": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "equipment_set": {
        "fields": [],
        "name": "equipment_set",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/equipmentset",
                "parts": [
                  "equipmentset",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "equipment_set_id",
                      "orig": "equipment_set_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/equipmentset/{equipmentSetIds}",
                "parts": [
                  "equipmentset",
                  "{equipment_set_id}",
                ],
                "rename": {
                  "param": {
                    "equipmentSetIds": "equipment_set_id",
                  },
                },
                "select": {
                  "exist": [
                    "equipment_set_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "equipment_set_id",
                      "orig": "equipment_set_id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/equipmentset/{equipmentSetId}",
                "parts": [
                  "equipmentset",
                  "{equipment_set_id}",
                ],
                "rename": {
                  "param": {
                    "equipmentSetId": "equipment_set_id",
                  },
                },
                "select": {
                  "exist": [
                    "equipment_set_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "equipmentset",
            ],
          ],
        },
      },
      "exchange_menus": {
        "fields": [],
        "name": "exchange_menus",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/exchangemenu",
                "parts": [
                  "exchangemenu",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "housing_pack": {
        "fields": [],
        "name": "housing_pack",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/housingpack",
                "parts": [
                  "housingpack",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "housing_pack_id",
                      "orig": "housing_pack_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/housingpack/{housingPackIds}",
                "parts": [
                  "housingpack",
                  "{housing_pack_id}",
                ],
                "rename": {
                  "param": {
                    "housingPackIds": "housing_pack_id",
                  },
                },
                "select": {
                  "exist": [
                    "housing_pack_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "housing_pack_id",
                      "orig": "housing_pack_id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/housingpack/{housingPackId}",
                "parts": [
                  "housingpack",
                  "{housing_pack_id}",
                ],
                "rename": {
                  "param": {
                    "housingPackId": "housing_pack_id",
                  },
                },
                "select": {
                  "exist": [
                    "housing_pack_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "housingpack",
            ],
          ],
        },
      },
      "housing_template": {
        "fields": [],
        "name": "housing_template",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/housingtemplate",
                "parts": [
                  "housingtemplate",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "file_name",
                      "orig": "file_name",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/image/housingtemplate/{fileName}",
                "parts": [
                  "image",
                  "housingtemplate",
                  "{file_name}",
                ],
                "rename": {
                  "param": {
                    "fileName": "file_name",
                  },
                },
                "select": {
                  "exist": [
                    "file_name",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "housing_template_id",
                      "orig": "housing_template_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/housingtemplate/{housingTemplateIds}",
                "parts": [
                  "housingtemplate",
                  "{housing_template_id}",
                ],
                "rename": {
                  "param": {
                    "housingTemplateIds": "housing_template_id",
                  },
                },
                "select": {
                  "exist": [
                    "housing_template_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "housing_template_id",
                      "orig": "housing_template_id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/housingtemplate/{housingTemplateId}",
                "parts": [
                  "housingtemplate",
                  "{housing_template_id}",
                ],
                "rename": {
                  "param": {
                    "housingTemplateId": "housing_template_id",
                  },
                },
                "select": {
                  "exist": [
                    "housing_template_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "housingtemplate",
            ],
          ],
        },
      },
      "item": {
        "fields": [],
        "name": "item",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/item",
                "parts": [
                  "item",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "file_name",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/image/item/{fileName}",
                "parts": [
                  "image",
                  "item",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "fileName": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "item_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/item/{itemIds}",
                "parts": [
                  "item",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "itemIds": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "item_id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/item/{itemId}",
                "parts": [
                  "item",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "itemId": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "language": {
        "fields": [],
        "name": "language",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/language",
                "parts": [
                  "language",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "language_code",
                      "orig": "language_code",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/image/language/{languageCode}.png",
                "parts": [
                  "image",
                  "language",
                  "{languageCode}.png",
                ],
                "select": {
                  "$action": "language_code",
                  "exist": [
                    "language_code",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "language",
            ],
          ],
        },
      },
      "lifestyle": {
        "fields": [],
        "name": "lifestyle",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/lifestyle",
                "parts": [
                  "lifestyle",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "monster": {
        "fields": [],
        "name": "monster",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/monster",
                "parts": [
                  "monster",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "file_name",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/image/monster/{fileName}",
                "parts": [
                  "image",
                  "monster",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "fileName": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "monster_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/monster/{monsterIds}",
                "parts": [
                  "monster",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "monsterIds": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "monster_id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/monster/{monsterId}",
                "parts": [
                  "monster",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "monsterId": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "npc": {
        "fields": [],
        "name": "npc",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/npc",
                "parts": [
                  "npc",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "file_name",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/image/npc/{fileName}",
                "parts": [
                  "image",
                  "npc",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "fileName": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "npc_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/npc/{npcIds}",
                "parts": [
                  "npc",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "npcIds": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "npc_id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/npc/{npcId}",
                "parts": [
                  "npc",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "npcId": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "party_skill": {
        "fields": [],
        "name": "party_skill",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/partyskill",
                "parts": [
                  "partyskill",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "party_skill_id",
                      "orig": "party_skill_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/partyskill/{partySkillIds}",
                "parts": [
                  "partyskill",
                  "{party_skill_id}",
                ],
                "rename": {
                  "param": {
                    "partySkillIds": "party_skill_id",
                  },
                },
                "select": {
                  "exist": [
                    "party_skill_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "party_skill_id",
                      "orig": "party_skill_id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/partyskill/{partySkillId}",
                "parts": [
                  "partyskill",
                  "{party_skill_id}",
                ],
                "rename": {
                  "param": {
                    "partySkillId": "party_skill_id",
                  },
                },
                "select": {
                  "exist": [
                    "party_skill_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "partyskill",
            ],
          ],
        },
      },
      "pkn": {
        "fields": [],
        "name": "pkn",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/pk",
                "parts": [
                  "pk",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "place": {
        "fields": [],
        "name": "place",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "file_name",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/image/place/{fileName}",
                "parts": [
                  "image",
                  "place",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "fileName": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "quest": {
        "fields": [],
        "name": "quest",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/quest",
                "parts": [
                  "quest",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "quest_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/quest/{questIds}",
                "parts": [
                  "quest",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "questIds": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "quest_id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/quest/{questId}",
                "parts": [
                  "quest",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "questId": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "raised_pet": {
        "fields": [],
        "name": "raised_pet",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/raisedpet",
                "parts": [
                  "raisedpet",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "recipe": {
        "fields": [],
        "name": "recipe",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/recipe",
                "parts": [
                  "recipe",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "recipe_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/recipe/{recipeIds}",
                "parts": [
                  "recipe",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "recipeIds": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "recipe_id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/recipe/{recipeId}",
                "parts": [
                  "recipe",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "recipeId": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "skill": {
        "fields": [],
        "name": "skill",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/skill",
                "parts": [
                  "skill",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "file_name",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/image/skill/{fileName}",
                "parts": [
                  "image",
                  "skill",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "fileName": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "skill_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/skill/{skillIds}",
                "parts": [
                  "skill",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "skillIds": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "skill_id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/skill/{skillId}",
                "parts": [
                  "skill",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "skillId": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "upgrade_level_bonus": {
        "fields": [],
        "name": "upgrade_level_bonus",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/upgradelevelbonus",
                "parts": [
                  "upgradelevelbonus",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "version": {
        "fields": [],
        "name": "version",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/version/api",
                "parts": [
                  "version",
                  "api",
                ],
                "select": {
                  "$action": "api",
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/version/data",
                "parts": [
                  "version",
                  "data",
                ],
                "select": {
                  "$action": "data",
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "world": {
        "fields": [
          {
            "name": "continents",
            "req": True,
            "short": "Continents in the World",
            "type": "`$ARRAY`",
          },
          {
            "name": "flying",
            "req": True,
            "short": "Whether players can fly in the World or not",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "height",
            "req": True,
            "short": "Height of the World in meters",
            "type": "`$INTEGER`",
          },
          {
            "name": "id",
            "req": True,
            "short": "ID of the World",
            "type": "`$INTEGER`",
          },
          {
            "name": "inDoor",
            "req": True,
            "short": "Whether the World has a sky or not",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "lodestars",
            "req": True,
            "short": "Revival places in the World",
            "type": "`$ARRAY`",
          },
          {
            "name": "name",
            "req": True,
            "short": "Text available in several languages",
            "type": "`$OBJECT`",
          },
          {
            "name": "pk",
            "req": True,
            "short": "Whether players can kill other players in the World or not",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "places",
            "req": True,
            "short": "Special Places in the World",
            "type": "`$ARRAY`",
          },
          {
            "name": "revivalKey",
            "short": "ID of the Lodestar where players revive when they die in the World",
            "type": "`$STRING`",
          },
          {
            "name": "revivalWorld",
            "short": "ID of the World where players revive when they die in the World",
            "type": "`$INTEGER`",
          },
          {
            "name": "tileName",
            "req": True,
            "short": "Name of the world Tiles for navigator",
            "type": "`$STRING`",
          },
          {
            "name": "tileSize",
            "req": True,
            "short": "World meters per Tile",
            "type": "`$INTEGER`",
          },
          {
            "name": "type",
            "req": True,
            "short": "Type of the World",
            "type": "`$STRING`",
          },
          {
            "name": "width",
            "req": True,
            "short": "Width of the World in meters",
            "type": "`$INTEGER`",
          },
        ],
        "name": "world",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/world",
                "parts": [
                  "world",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "tile_x",
                      "orig": "tile_x",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "param",
                      "name": "tile_y",
                      "orig": "tile_y",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": "wdmadrigal",
                      "kind": "param",
                      "name": "world_tile_name",
                      "orig": "world_tile_name",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/image/world/{worldTileName}{tileX}-{tileY}-0.png",
                "parts": [
                  "image",
                  "world",
                  "{worldTileName}{tileX}-{tileY}-0.png",
                ],
                "select": {
                  "$action": "world_tile_nametile_x_tile_y_0",
                  "exist": [
                    "tile_x",
                    "tile_y",
                    "world_tile_name",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "example": "4015,4839,6063",
                      "kind": "param",
                      "name": "id",
                      "orig": "world_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/world/{worldIds}",
                "parts": [
                  "world",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "worldIds": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "example": 4015,
                      "kind": "param",
                      "name": "id",
                      "orig": "world_id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/world/{worldId}",
                "parts": [
                  "world",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "worldId": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "world",
            ],
          ],
        },
      },
    },
    }
