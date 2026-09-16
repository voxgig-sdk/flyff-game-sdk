package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "FlyffGame",
			"slug": "flyff-game",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://api.flyff.com",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"achievement": map[string]any{},
				"awake": map[string]any{},
				"badge": map[string]any{},
				"class": map[string]any{},
				"core": map[string]any{},
				"couple": map[string]any{},
				"dungeon": map[string]any{},
				"element": map[string]any{},
				"equipment_set": map[string]any{},
				"exchange_menus": map[string]any{},
				"housing_pack": map[string]any{},
				"housing_template": map[string]any{},
				"item": map[string]any{},
				"language": map[string]any{},
				"lifestyle": map[string]any{},
				"monster": map[string]any{},
				"npc": map[string]any{},
				"party_skill": map[string]any{},
				"pkn": map[string]any{},
				"place": map[string]any{},
				"quest": map[string]any{},
				"raised_pet": map[string]any{},
				"recipe": map[string]any{},
				"skill": map[string]any{},
				"upgrade_level_bonus": map[string]any{},
				"version": map[string]any{},
				"world": map[string]any{},
			},
		},
		"entity": map[string]any{
			"achievement": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "achievement",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/achievement",
								"segments": []any{
									map[string]any{
										"lit": "achievement",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"achievement",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "achievement_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/achievement/{achievementIds}",
								"rename": map[string]any{
									"param": map[string]any{
										"achievementIds": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "achievement",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"achievement",
									"{id}",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "achievement_id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/achievement/{achievementId}",
								"rename": map[string]any{
									"param": map[string]any{
										"achievementId": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "achievement",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"achievement",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"awake": map[string]any{
				"fields": []any{},
				"name": "awake",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/awake/skill",
								"segments": []any{
									map[string]any{
										"lit": "awake",
									},
									map[string]any{
										"lit": "skill",
									},
								},
								"select": map[string]any{
									"$action": "skill",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"awake",
									"skill",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/awake/stat",
								"segments": []any{
									map[string]any{
										"lit": "awake",
									},
									map[string]any{
										"lit": "stat",
									},
								},
								"select": map[string]any{
									"$action": "stat",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"awake",
									"stat",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"badge": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "badge",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "file_name",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/image/badge/{fileName}",
								"rename": map[string]any{
									"param": map[string]any{
										"fileName": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "image",
									},
									map[string]any{
										"lit": "badge",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"image",
									"badge",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"class": map[string]any{
				"fields": []any{
					map[string]any{
						"format": "float",
						"name": "attackSpeed",
						"req": true,
						"short": "Attack speed constant used in attack speed calculation",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "autoAttackFactors",
						"req": true,
						"short": "Auto attack damage factors used in damage calculation",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"format": "float",
						"name": "block",
						"req": true,
						"short": "Blocking constant used in block calculation",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"format": "float",
						"name": "critical",
						"req": true,
						"short": "Critical chance constant used in critical chance calculation",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"format": "float",
						"name": "defense",
						"req": true,
						"short": "Defense factor use in defensive calculations",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"format": "float",
						"name": "fp",
						"req": true,
						"short": "FP Factor",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"format": "float",
						"name": "hp",
						"req": true,
						"short": "HP Factor",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "icon",
						"req": true,
						"short": "Icon of the Class",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"req": true,
						"short": "ID of the class",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"format": "float",
						"name": "magicDefenseIntFactor",
						"req": true,
						"short": "Magic defense factor based on INT used in defensive calculations",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"format": "float",
						"name": "magicDefenseStaFactor",
						"req": true,
						"short": "Magic defense factor based on STA used in defensive calculations",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "maxFP",
						"req": true,
						"short": "Formula to compute the maximum Fatigue Points of the player",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "maxHP",
						"req": true,
						"short": "Formula to compute the maximum Hit Points of the player",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "maxLevel",
						"req": true,
						"short": "Maximum player level for the Class",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "maxMP",
						"req": true,
						"short": "Formula to compute the maximum Mana Points of the player",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "minLevel",
						"req": true,
						"short": "Minimum player level for the Class",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"format": "float",
						"name": "mp",
						"req": true,
						"short": "MP Factor",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "name",
						"req": true,
						"short": "Text available in several languages",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "parent",
						"short": "ID of the parent class",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "tree",
						"req": true,
						"short": "Skill tree image for the class",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "type",
						"req": true,
						"short": "Type of the class",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "class",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/class",
								"segments": []any{
									map[string]any{
										"lit": "class",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"class",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "vagrant.png",
											"kind": "param",
											"name": "file_name",
											"orig": "file_name",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "messenger",
											"kind": "param",
											"name": "style",
											"orig": "style",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/image/class/{style}/{fileName}",
								"rename": map[string]any{
									"param": map[string]any{
										"fileName": "file_name",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "image",
									},
									map[string]any{
										"lit": "class",
									},
									map[string]any{
										"var": "style",
									},
									map[string]any{
										"var": "file_name",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"file_name",
										"style",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"image",
									"class",
									"{style}",
									"{file_name}",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "Vagrant.png",
											"kind": "param",
											"name": "file_name",
											"orig": "file_name",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/image/class/tree/{fileName}",
								"rename": map[string]any{
									"param": map[string]any{
										"fileName": "file_name",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "image",
									},
									map[string]any{
										"lit": "class",
									},
									map[string]any{
										"lit": "tree",
									},
									map[string]any{
										"var": "file_name",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"file_name",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"image",
									"class",
									"tree",
									"{file_name}",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "1689,296,2881",
											"kind": "param",
											"name": "id",
											"orig": "class_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/class/{classIds}",
								"rename": map[string]any{
									"param": map[string]any{
										"classIds": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "class",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"class",
									"{id}",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": 1689,
											"kind": "param",
											"name": "id",
											"orig": "class_id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/class/{classId}",
								"rename": map[string]any{
									"param": map[string]any{
										"classId": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "class",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"class",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"tree",
						},
						[]any{
							"class",
						},
					},
				},
			},
			"core": map[string]any{
				"fields": []any{},
				"name": "core",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "parameter_id",
											"orig": "parameter_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/parameter/{parameterIds}",
								"rename": map[string]any{
									"param": map[string]any{
										"parameterIds": "parameter_id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "parameter",
									},
									map[string]any{
										"var": "parameter_id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"parameter_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"parameter",
									"{parameter_id}",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "parameter_id",
											"orig": "parameter_id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/parameter/{parameterId}",
								"rename": map[string]any{
									"param": map[string]any{
										"parameterId": "parameter_id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "parameter",
									},
									map[string]any{
										"var": "parameter_id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"parameter_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"parameter",
									"{parameter_id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"parameter",
						},
					},
				},
			},
			"couple": map[string]any{
				"fields": []any{},
				"name": "couple",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/couple",
								"segments": []any{
									map[string]any{
										"lit": "couple",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"couple",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"dungeon": map[string]any{
				"fields": []any{},
				"name": "dungeon",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/dungeon",
								"segments": []any{
									map[string]any{
										"lit": "dungeon",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"dungeon",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"element": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "element",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "file_name",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/image/element/{fileName}",
								"rename": map[string]any{
									"param": map[string]any{
										"fileName": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "image",
									},
									map[string]any{
										"lit": "element",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"image",
									"element",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"equipment_set": map[string]any{
				"fields": []any{},
				"name": "equipment_set",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/equipmentset",
								"segments": []any{
									map[string]any{
										"lit": "equipmentset",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"equipmentset",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "equipment_set_id",
											"orig": "equipment_set_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/equipmentset/{equipmentSetIds}",
								"rename": map[string]any{
									"param": map[string]any{
										"equipmentSetIds": "equipment_set_id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "equipmentset",
									},
									map[string]any{
										"var": "equipment_set_id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"equipment_set_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"equipmentset",
									"{equipment_set_id}",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "equipment_set_id",
											"orig": "equipment_set_id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/equipmentset/{equipmentSetId}",
								"rename": map[string]any{
									"param": map[string]any{
										"equipmentSetId": "equipment_set_id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "equipmentset",
									},
									map[string]any{
										"var": "equipment_set_id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"equipment_set_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"equipmentset",
									"{equipment_set_id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"equipmentset",
						},
					},
				},
			},
			"exchange_menus": map[string]any{
				"fields": []any{},
				"name": "exchange_menus",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/exchangemenu",
								"segments": []any{
									map[string]any{
										"lit": "exchangemenu",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"exchangemenu",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"housing_pack": map[string]any{
				"fields": []any{},
				"name": "housing_pack",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/housingpack",
								"segments": []any{
									map[string]any{
										"lit": "housingpack",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"housingpack",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "housing_pack_id",
											"orig": "housing_pack_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/housingpack/{housingPackIds}",
								"rename": map[string]any{
									"param": map[string]any{
										"housingPackIds": "housing_pack_id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "housingpack",
									},
									map[string]any{
										"var": "housing_pack_id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"housing_pack_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"housingpack",
									"{housing_pack_id}",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "housing_pack_id",
											"orig": "housing_pack_id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/housingpack/{housingPackId}",
								"rename": map[string]any{
									"param": map[string]any{
										"housingPackId": "housing_pack_id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "housingpack",
									},
									map[string]any{
										"var": "housing_pack_id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"housing_pack_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"housingpack",
									"{housing_pack_id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"housingpack",
						},
					},
				},
			},
			"housing_template": map[string]any{
				"fields": []any{},
				"name": "housing_template",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/housingtemplate",
								"segments": []any{
									map[string]any{
										"lit": "housingtemplate",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"housingtemplate",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "file_name",
											"orig": "file_name",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/image/housingtemplate/{fileName}",
								"rename": map[string]any{
									"param": map[string]any{
										"fileName": "file_name",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "image",
									},
									map[string]any{
										"lit": "housingtemplate",
									},
									map[string]any{
										"var": "file_name",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"file_name",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"image",
									"housingtemplate",
									"{file_name}",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "housing_template_id",
											"orig": "housing_template_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/housingtemplate/{housingTemplateIds}",
								"rename": map[string]any{
									"param": map[string]any{
										"housingTemplateIds": "housing_template_id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "housingtemplate",
									},
									map[string]any{
										"var": "housing_template_id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"housing_template_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"housingtemplate",
									"{housing_template_id}",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "housing_template_id",
											"orig": "housing_template_id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/housingtemplate/{housingTemplateId}",
								"rename": map[string]any{
									"param": map[string]any{
										"housingTemplateId": "housing_template_id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "housingtemplate",
									},
									map[string]any{
										"var": "housing_template_id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"housing_template_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"housingtemplate",
									"{housing_template_id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"housingtemplate",
						},
					},
				},
			},
			"item": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "item",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/item",
								"segments": []any{
									map[string]any{
										"lit": "item",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"item",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "file_name",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/image/item/{fileName}",
								"rename": map[string]any{
									"param": map[string]any{
										"fileName": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "image",
									},
									map[string]any{
										"lit": "item",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"image",
									"item",
									"{id}",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "item_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/item/{itemIds}",
								"rename": map[string]any{
									"param": map[string]any{
										"itemIds": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "item",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"item",
									"{id}",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "item_id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/item/{itemId}",
								"rename": map[string]any{
									"param": map[string]any{
										"itemId": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "item",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"item",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"language": map[string]any{
				"fields": []any{},
				"name": "language",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/language",
								"segments": []any{
									map[string]any{
										"lit": "language",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"language",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "language_code",
											"orig": "language_code",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/image/language/{languageCode}.png",
								"segments": []any{
									map[string]any{
										"lit": "image",
									},
									map[string]any{
										"lit": "language",
									},
									map[string]any{
										"lit": "{languageCode}.png",
									},
								},
								"select": map[string]any{
									"$action": "language_code",
									"exist": []any{
										"language_code",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"image",
									"language",
									"{languageCode}.png",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"lifestyle": map[string]any{
				"fields": []any{},
				"name": "lifestyle",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/lifestyle",
								"segments": []any{
									map[string]any{
										"lit": "lifestyle",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"lifestyle",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"monster": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "monster",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/monster",
								"segments": []any{
									map[string]any{
										"lit": "monster",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"monster",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "file_name",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/image/monster/{fileName}",
								"rename": map[string]any{
									"param": map[string]any{
										"fileName": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "image",
									},
									map[string]any{
										"lit": "monster",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"image",
									"monster",
									"{id}",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "monster_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/monster/{monsterIds}",
								"rename": map[string]any{
									"param": map[string]any{
										"monsterIds": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "monster",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"monster",
									"{id}",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "monster_id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/monster/{monsterId}",
								"rename": map[string]any{
									"param": map[string]any{
										"monsterId": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "monster",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"monster",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"npc": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "npc",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/npc",
								"segments": []any{
									map[string]any{
										"lit": "npc",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"npc",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "file_name",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/image/npc/{fileName}",
								"rename": map[string]any{
									"param": map[string]any{
										"fileName": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "image",
									},
									map[string]any{
										"lit": "npc",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"image",
									"npc",
									"{id}",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "npc_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/npc/{npcIds}",
								"rename": map[string]any{
									"param": map[string]any{
										"npcIds": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "npc",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"npc",
									"{id}",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "npc_id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/npc/{npcId}",
								"rename": map[string]any{
									"param": map[string]any{
										"npcId": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "npc",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"npc",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"party_skill": map[string]any{
				"fields": []any{},
				"name": "party_skill",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/partyskill",
								"segments": []any{
									map[string]any{
										"lit": "partyskill",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"partyskill",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "party_skill_id",
											"orig": "party_skill_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/partyskill/{partySkillIds}",
								"rename": map[string]any{
									"param": map[string]any{
										"partySkillIds": "party_skill_id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "partyskill",
									},
									map[string]any{
										"var": "party_skill_id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"party_skill_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"partyskill",
									"{party_skill_id}",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "party_skill_id",
											"orig": "party_skill_id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/partyskill/{partySkillId}",
								"rename": map[string]any{
									"param": map[string]any{
										"partySkillId": "party_skill_id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "partyskill",
									},
									map[string]any{
										"var": "party_skill_id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"party_skill_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"partyskill",
									"{party_skill_id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"partyskill",
						},
					},
				},
			},
			"pkn": map[string]any{
				"fields": []any{},
				"name": "pkn",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/pk",
								"segments": []any{
									map[string]any{
										"lit": "pk",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"pk",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"place": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "place",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "file_name",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/image/place/{fileName}",
								"rename": map[string]any{
									"param": map[string]any{
										"fileName": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "image",
									},
									map[string]any{
										"lit": "place",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"image",
									"place",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"quest": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "quest",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/quest",
								"segments": []any{
									map[string]any{
										"lit": "quest",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"quest",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "quest_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/quest/{questIds}",
								"rename": map[string]any{
									"param": map[string]any{
										"questIds": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "quest",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"quest",
									"{id}",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "quest_id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/quest/{questId}",
								"rename": map[string]any{
									"param": map[string]any{
										"questId": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "quest",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"quest",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"raised_pet": map[string]any{
				"fields": []any{},
				"name": "raised_pet",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/raisedpet",
								"segments": []any{
									map[string]any{
										"lit": "raisedpet",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"raisedpet",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"recipe": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "recipe",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/recipe",
								"segments": []any{
									map[string]any{
										"lit": "recipe",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"recipe",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "recipe_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/recipe/{recipeIds}",
								"rename": map[string]any{
									"param": map[string]any{
										"recipeIds": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "recipe",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"recipe",
									"{id}",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "recipe_id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/recipe/{recipeId}",
								"rename": map[string]any{
									"param": map[string]any{
										"recipeId": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "recipe",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"recipe",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"skill": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "skill",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/skill",
								"segments": []any{
									map[string]any{
										"lit": "skill",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"skill",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "file_name",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/image/skill/{fileName}",
								"rename": map[string]any{
									"param": map[string]any{
										"fileName": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "image",
									},
									map[string]any{
										"lit": "skill",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"image",
									"skill",
									"{id}",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "skill_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/skill/{skillIds}",
								"rename": map[string]any{
									"param": map[string]any{
										"skillIds": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "skill",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"skill",
									"{id}",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "skill_id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/skill/{skillId}",
								"rename": map[string]any{
									"param": map[string]any{
										"skillId": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "skill",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"skill",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"upgrade_level_bonus": map[string]any{
				"fields": []any{},
				"name": "upgrade_level_bonus",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/upgradelevelbonus",
								"segments": []any{
									map[string]any{
										"lit": "upgradelevelbonus",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"upgradelevelbonus",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"version": map[string]any{
				"fields": []any{},
				"name": "version",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/version/api",
								"segments": []any{
									map[string]any{
										"lit": "version",
									},
									map[string]any{
										"lit": "api",
									},
								},
								"select": map[string]any{
									"$action": "api",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"version",
									"api",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/version/data",
								"segments": []any{
									map[string]any{
										"lit": "version",
									},
									map[string]any{
										"lit": "data",
									},
								},
								"select": map[string]any{
									"$action": "data",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"version",
									"data",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"world": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "continents",
						"req": true,
						"short": "Continents in the World",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "flying",
						"req": true,
						"short": "Whether players can fly in the World or not",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "height",
						"req": true,
						"short": "Height of the World in meters",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "id",
						"req": true,
						"short": "ID of the World",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "inDoor",
						"req": true,
						"short": "Whether the World has a sky or not",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "lodestars",
						"req": true,
						"short": "Revival places in the World",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "name",
						"req": true,
						"short": "Text available in several languages",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "pk",
						"req": true,
						"short": "Whether players can kill other players in the World or not",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "places",
						"req": true,
						"short": "Special Places in the World",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "revivalKey",
						"short": "ID of the Lodestar where players revive when they die in the World",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "revivalWorld",
						"short": "ID of the World where players revive when they die in the World",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "tileName",
						"req": true,
						"short": "Name of the world Tiles for navigator",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "tileSize",
						"req": true,
						"short": "World meters per Tile",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "type",
						"req": true,
						"short": "Type of the World",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "width",
						"req": true,
						"short": "Width of the World in meters",
						"type": "`$INTEGER`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "world",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/world",
								"segments": []any{
									map[string]any{
										"lit": "world",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"world",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "tile_x",
											"orig": "tile_x",
											"reqd": true,
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "param",
											"name": "tile_y",
											"orig": "tile_y",
											"reqd": true,
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": "wdmadrigal",
											"kind": "param",
											"name": "world_tile_name",
											"orig": "world_tile_name",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/image/world/{worldTileName}{tileX}-{tileY}-0.png",
								"segments": []any{
									map[string]any{
										"lit": "image",
									},
									map[string]any{
										"lit": "world",
									},
									map[string]any{
										"lit": "{worldTileName}{tileX}-{tileY}-0.png",
									},
								},
								"select": map[string]any{
									"$action": "world_tile_nametile_x_tile_y_0",
									"exist": []any{
										"tile_x",
										"tile_y",
										"world_tile_name",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"image",
									"world",
									"{worldTileName}{tileX}-{tileY}-0.png",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "4015,4839,6063",
											"kind": "param",
											"name": "id",
											"orig": "world_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/world/{worldIds}",
								"rename": map[string]any{
									"param": map[string]any{
										"worldIds": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "world",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"world",
									"{id}",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": 4015,
											"kind": "param",
											"name": "id",
											"orig": "world_id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/world/{worldId}",
								"rename": map[string]any{
									"param": map[string]any{
										"worldId": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "world",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"world",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
