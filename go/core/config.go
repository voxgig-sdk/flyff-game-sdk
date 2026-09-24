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
						"title": "Id",
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
								"kind": "http",
								"method": "GET",
								"orig": "/achievement",
								"segments": []any{
									map[string]any{
										"lit": "achievement",
									},
								},
								"parts": []any{
									"achievement",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/achievement/{achievementIds}",
								"segments": []any{
									map[string]any{
										"lit": "achievement",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"achievement",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"achievementIds": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "achievement_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/achievement/{achievementId}",
								"segments": []any{
									map[string]any{
										"lit": "achievement",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"achievement",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"achievementId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "achievement_id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
								"parts": []any{
									"awake",
									"skill",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{
									"$action": "skill",
								},
							},
							map[string]any{
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
								"parts": []any{
									"awake",
									"stat",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{
									"$action": "stat",
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
						"title": "Id",
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
								"kind": "http",
								"method": "GET",
								"orig": "/image/badge/{fileName}",
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
								"parts": []any{
									"image",
									"badge",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"fileName": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "file_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
						"name": "attackSpeed",
						"title": "Attack Speed",
						"type": "`$NUMBER`",
						"req": true,
						"short": "Attack speed constant used in attack speed calculation",
						"format": "float",
					},
					map[string]any{
						"name": "autoAttackFactors",
						"title": "Auto Attack Factors",
						"type": "`$OBJECT`",
						"req": true,
						"short": "Auto attack damage factors used in damage calculation",
					},
					map[string]any{
						"name": "block",
						"title": "Block",
						"type": "`$NUMBER`",
						"req": true,
						"short": "Blocking constant used in block calculation",
						"format": "float",
					},
					map[string]any{
						"name": "critical",
						"title": "Critical",
						"type": "`$NUMBER`",
						"req": true,
						"short": "Critical chance constant used in critical chance calculation",
						"format": "float",
					},
					map[string]any{
						"name": "defense",
						"title": "Defense",
						"type": "`$NUMBER`",
						"req": true,
						"short": "Defense factor use in defensive calculations",
						"format": "float",
					},
					map[string]any{
						"name": "fp",
						"title": "Fp",
						"type": "`$NUMBER`",
						"req": true,
						"short": "FP Factor",
						"format": "float",
					},
					map[string]any{
						"name": "hp",
						"title": "Hp",
						"type": "`$NUMBER`",
						"req": true,
						"short": "HP Factor",
						"format": "float",
					},
					map[string]any{
						"name": "icon",
						"title": "Icon",
						"type": "`$STRING`",
						"req": true,
						"short": "Icon of the Class",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"req": true,
						"short": "ID of the class",
					},
					map[string]any{
						"name": "magicDefenseIntFactor",
						"title": "Magic Defense Int Factor",
						"type": "`$NUMBER`",
						"req": true,
						"short": "Magic defense factor based on INT used in defensive calculations",
						"format": "float",
					},
					map[string]any{
						"name": "magicDefenseStaFactor",
						"title": "Magic Defense Sta Factor",
						"type": "`$NUMBER`",
						"req": true,
						"short": "Magic defense factor based on STA used in defensive calculations",
						"format": "float",
					},
					map[string]any{
						"name": "maxFP",
						"title": "Max Fp",
						"type": "`$STRING`",
						"req": true,
						"short": "Formula to compute the maximum Fatigue Points of the player",
					},
					map[string]any{
						"name": "maxHP",
						"title": "Max Hp",
						"type": "`$STRING`",
						"req": true,
						"short": "Formula to compute the maximum Hit Points of the player",
					},
					map[string]any{
						"name": "maxLevel",
						"title": "Max Level",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Maximum player level for the Class",
					},
					map[string]any{
						"name": "maxMP",
						"title": "Max Mp",
						"type": "`$STRING`",
						"req": true,
						"short": "Formula to compute the maximum Mana Points of the player",
					},
					map[string]any{
						"name": "minLevel",
						"title": "Min Level",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Minimum player level for the Class",
					},
					map[string]any{
						"name": "mp",
						"title": "Mp",
						"type": "`$NUMBER`",
						"req": true,
						"short": "MP Factor",
						"format": "float",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$OBJECT`",
						"req": true,
						"short": "Text available in several languages",
					},
					map[string]any{
						"name": "parent",
						"title": "Parent",
						"type": "`$INTEGER`",
						"short": "ID of the parent class",
					},
					map[string]any{
						"name": "tree",
						"title": "Tree",
						"type": "`$STRING`",
						"req": true,
						"short": "Skill tree image for the class",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
						"req": true,
						"short": "Type of the class",
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
								"kind": "http",
								"method": "GET",
								"orig": "/class",
								"segments": []any{
									map[string]any{
										"lit": "class",
									},
								},
								"parts": []any{
									"class",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/image/class/{style}/{fileName}",
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
								"parts": []any{
									"image",
									"class",
									"{style}",
									"{file_name}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"fileName": "file_name",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "file_name",
											"orig": "file_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "vagrant.png",
										},
										map[string]any{
											"name": "style",
											"orig": "style",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "messenger",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"file_name",
										"style",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/image/class/tree/{fileName}",
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
								"parts": []any{
									"image",
									"class",
									"tree",
									"{file_name}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"fileName": "file_name",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "file_name",
											"orig": "file_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "Vagrant.png",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"file_name",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/class/{classIds}",
								"segments": []any{
									map[string]any{
										"lit": "class",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"class",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"classIds": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "class_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "1689,296,2881",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/class/{classId}",
								"segments": []any{
									map[string]any{
										"lit": "class",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"class",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"classId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "class_id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
											"example": 1689,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
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
								"kind": "http",
								"method": "GET",
								"orig": "/parameter/{parameterIds}",
								"segments": []any{
									map[string]any{
										"lit": "parameter",
									},
									map[string]any{
										"var": "parameter_id",
									},
								},
								"parts": []any{
									"parameter",
									"{parameter_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"parameterIds": "parameter_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "parameter_id",
											"orig": "parameter_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"parameter_id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/parameter/{parameterId}",
								"segments": []any{
									map[string]any{
										"lit": "parameter",
									},
									map[string]any{
										"var": "parameter_id",
									},
								},
								"parts": []any{
									"parameter",
									"{parameter_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"parameterId": "parameter_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "parameter_id",
											"orig": "parameter_id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"parameter_id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
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
								"kind": "http",
								"method": "GET",
								"orig": "/couple",
								"segments": []any{
									map[string]any{
										"lit": "couple",
									},
								},
								"parts": []any{
									"couple",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
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
								"kind": "http",
								"method": "GET",
								"orig": "/dungeon",
								"segments": []any{
									map[string]any{
										"lit": "dungeon",
									},
								},
								"parts": []any{
									"dungeon",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
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
						"title": "Id",
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
								"kind": "http",
								"method": "GET",
								"orig": "/image/element/{fileName}",
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
								"parts": []any{
									"image",
									"element",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"fileName": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "file_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
								"kind": "http",
								"method": "GET",
								"orig": "/equipmentset",
								"segments": []any{
									map[string]any{
										"lit": "equipmentset",
									},
								},
								"parts": []any{
									"equipmentset",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/equipmentset/{equipmentSetIds}",
								"segments": []any{
									map[string]any{
										"lit": "equipmentset",
									},
									map[string]any{
										"var": "equipment_set_id",
									},
								},
								"parts": []any{
									"equipmentset",
									"{equipment_set_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"equipmentSetIds": "equipment_set_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "equipment_set_id",
											"orig": "equipment_set_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"equipment_set_id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/equipmentset/{equipmentSetId}",
								"segments": []any{
									map[string]any{
										"lit": "equipmentset",
									},
									map[string]any{
										"var": "equipment_set_id",
									},
								},
								"parts": []any{
									"equipmentset",
									"{equipment_set_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"equipmentSetId": "equipment_set_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "equipment_set_id",
											"orig": "equipment_set_id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"equipment_set_id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
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
								"kind": "http",
								"method": "GET",
								"orig": "/exchangemenu",
								"segments": []any{
									map[string]any{
										"lit": "exchangemenu",
									},
								},
								"parts": []any{
									"exchangemenu",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
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
								"kind": "http",
								"method": "GET",
								"orig": "/housingpack",
								"segments": []any{
									map[string]any{
										"lit": "housingpack",
									},
								},
								"parts": []any{
									"housingpack",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/housingpack/{housingPackIds}",
								"segments": []any{
									map[string]any{
										"lit": "housingpack",
									},
									map[string]any{
										"var": "housing_pack_id",
									},
								},
								"parts": []any{
									"housingpack",
									"{housing_pack_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"housingPackIds": "housing_pack_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "housing_pack_id",
											"orig": "housing_pack_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"housing_pack_id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/housingpack/{housingPackId}",
								"segments": []any{
									map[string]any{
										"lit": "housingpack",
									},
									map[string]any{
										"var": "housing_pack_id",
									},
								},
								"parts": []any{
									"housingpack",
									"{housing_pack_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"housingPackId": "housing_pack_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "housing_pack_id",
											"orig": "housing_pack_id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"housing_pack_id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
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
								"kind": "http",
								"method": "GET",
								"orig": "/housingtemplate",
								"segments": []any{
									map[string]any{
										"lit": "housingtemplate",
									},
								},
								"parts": []any{
									"housingtemplate",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/image/housingtemplate/{fileName}",
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
								"parts": []any{
									"image",
									"housingtemplate",
									"{file_name}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"fileName": "file_name",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "file_name",
											"orig": "file_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"file_name",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/housingtemplate/{housingTemplateIds}",
								"segments": []any{
									map[string]any{
										"lit": "housingtemplate",
									},
									map[string]any{
										"var": "housing_template_id",
									},
								},
								"parts": []any{
									"housingtemplate",
									"{housing_template_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"housingTemplateIds": "housing_template_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "housing_template_id",
											"orig": "housing_template_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"housing_template_id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/housingtemplate/{housingTemplateId}",
								"segments": []any{
									map[string]any{
										"lit": "housingtemplate",
									},
									map[string]any{
										"var": "housing_template_id",
									},
								},
								"parts": []any{
									"housingtemplate",
									"{housing_template_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"housingTemplateId": "housing_template_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "housing_template_id",
											"orig": "housing_template_id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"housing_template_id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"item": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"title": "Id",
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
								"kind": "http",
								"method": "GET",
								"orig": "/item",
								"segments": []any{
									map[string]any{
										"lit": "item",
									},
								},
								"parts": []any{
									"item",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/image/item/{fileName}",
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
								"parts": []any{
									"image",
									"item",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"fileName": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "file_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/item/{itemIds}",
								"segments": []any{
									map[string]any{
										"lit": "item",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"item",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"itemIds": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "item_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/item/{itemId}",
								"segments": []any{
									map[string]any{
										"lit": "item",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"item",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"itemId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "item_id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
								"kind": "http",
								"method": "GET",
								"orig": "/language",
								"segments": []any{
									map[string]any{
										"lit": "language",
									},
								},
								"parts": []any{
									"language",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"image",
									"language",
									"{languageCode}.png",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "language_code",
											"orig": "language_code",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "language_code",
									"exist": []any{
										"language_code",
									},
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
								"kind": "http",
								"method": "GET",
								"orig": "/lifestyle",
								"segments": []any{
									map[string]any{
										"lit": "lifestyle",
									},
								},
								"parts": []any{
									"lifestyle",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
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
						"title": "Id",
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
								"kind": "http",
								"method": "GET",
								"orig": "/monster",
								"segments": []any{
									map[string]any{
										"lit": "monster",
									},
								},
								"parts": []any{
									"monster",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/image/monster/{fileName}",
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
								"parts": []any{
									"image",
									"monster",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"fileName": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "file_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/monster/{monsterIds}",
								"segments": []any{
									map[string]any{
										"lit": "monster",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"monster",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"monsterIds": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "monster_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/monster/{monsterId}",
								"segments": []any{
									map[string]any{
										"lit": "monster",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"monster",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"monsterId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "monster_id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
						"title": "Id",
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
								"kind": "http",
								"method": "GET",
								"orig": "/npc",
								"segments": []any{
									map[string]any{
										"lit": "npc",
									},
								},
								"parts": []any{
									"npc",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/image/npc/{fileName}",
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
								"parts": []any{
									"image",
									"npc",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"fileName": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "file_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/npc/{npcIds}",
								"segments": []any{
									map[string]any{
										"lit": "npc",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"npc",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"npcIds": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "npc_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/npc/{npcId}",
								"segments": []any{
									map[string]any{
										"lit": "npc",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"npc",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"npcId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "npc_id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
								"kind": "http",
								"method": "GET",
								"orig": "/partyskill",
								"segments": []any{
									map[string]any{
										"lit": "partyskill",
									},
								},
								"parts": []any{
									"partyskill",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/partyskill/{partySkillIds}",
								"segments": []any{
									map[string]any{
										"lit": "partyskill",
									},
									map[string]any{
										"var": "party_skill_id",
									},
								},
								"parts": []any{
									"partyskill",
									"{party_skill_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"partySkillIds": "party_skill_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "party_skill_id",
											"orig": "party_skill_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"party_skill_id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/partyskill/{partySkillId}",
								"segments": []any{
									map[string]any{
										"lit": "partyskill",
									},
									map[string]any{
										"var": "party_skill_id",
									},
								},
								"parts": []any{
									"partyskill",
									"{party_skill_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"partySkillId": "party_skill_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "party_skill_id",
											"orig": "party_skill_id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"party_skill_id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
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
								"kind": "http",
								"method": "GET",
								"orig": "/pk",
								"segments": []any{
									map[string]any{
										"lit": "pk",
									},
								},
								"parts": []any{
									"pk",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
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
						"title": "Id",
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
								"kind": "http",
								"method": "GET",
								"orig": "/image/place/{fileName}",
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
								"parts": []any{
									"image",
									"place",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"fileName": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "file_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
						"title": "Id",
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
								"kind": "http",
								"method": "GET",
								"orig": "/quest",
								"segments": []any{
									map[string]any{
										"lit": "quest",
									},
								},
								"parts": []any{
									"quest",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/quest/{questIds}",
								"segments": []any{
									map[string]any{
										"lit": "quest",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"quest",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"questIds": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "quest_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/quest/{questId}",
								"segments": []any{
									map[string]any{
										"lit": "quest",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"quest",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"questId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "quest_id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
								"kind": "http",
								"method": "GET",
								"orig": "/raisedpet",
								"segments": []any{
									map[string]any{
										"lit": "raisedpet",
									},
								},
								"parts": []any{
									"raisedpet",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
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
						"title": "Id",
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
								"kind": "http",
								"method": "GET",
								"orig": "/recipe",
								"segments": []any{
									map[string]any{
										"lit": "recipe",
									},
								},
								"parts": []any{
									"recipe",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/recipe/{recipeIds}",
								"segments": []any{
									map[string]any{
										"lit": "recipe",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"recipe",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"recipeIds": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "recipe_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/recipe/{recipeId}",
								"segments": []any{
									map[string]any{
										"lit": "recipe",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"recipe",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"recipeId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "recipe_id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
						"title": "Id",
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
								"kind": "http",
								"method": "GET",
								"orig": "/skill",
								"segments": []any{
									map[string]any{
										"lit": "skill",
									},
								},
								"parts": []any{
									"skill",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/image/skill/{fileName}",
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
								"parts": []any{
									"image",
									"skill",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"fileName": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "file_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/skill/{skillIds}",
								"segments": []any{
									map[string]any{
										"lit": "skill",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"skill",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"skillIds": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "skill_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/skill/{skillId}",
								"segments": []any{
									map[string]any{
										"lit": "skill",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"skill",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"skillId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "skill_id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
								"kind": "http",
								"method": "GET",
								"orig": "/upgradelevelbonus",
								"segments": []any{
									map[string]any{
										"lit": "upgradelevelbonus",
									},
								},
								"parts": []any{
									"upgradelevelbonus",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
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
								"parts": []any{
									"version",
									"api",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{
									"$action": "api",
								},
							},
							map[string]any{
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
								"parts": []any{
									"version",
									"data",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{
									"$action": "data",
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
						"title": "Continents",
						"type": "`$ARRAY`",
						"req": true,
						"short": "Continents in the World",
					},
					map[string]any{
						"name": "flying",
						"title": "Flying",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "Whether players can fly in the World or not",
					},
					map[string]any{
						"name": "height",
						"title": "Height",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Height of the World in meters",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"req": true,
						"short": "ID of the World",
					},
					map[string]any{
						"name": "inDoor",
						"title": "In Door",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "Whether the World has a sky or not",
					},
					map[string]any{
						"name": "lodestars",
						"title": "Lodestars",
						"type": "`$ARRAY`",
						"req": true,
						"short": "Revival places in the World",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$OBJECT`",
						"req": true,
						"short": "Text available in several languages",
					},
					map[string]any{
						"name": "pk",
						"title": "Pk",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "Whether players can kill other players in the World or not",
					},
					map[string]any{
						"name": "places",
						"title": "Places",
						"type": "`$ARRAY`",
						"req": true,
						"short": "Special Places in the World",
					},
					map[string]any{
						"name": "revivalKey",
						"title": "Revival Key",
						"type": "`$STRING`",
						"short": "ID of the Lodestar where players revive when they die in the World",
					},
					map[string]any{
						"name": "revivalWorld",
						"title": "Revival World",
						"type": "`$INTEGER`",
						"short": "ID of the World where players revive when they die in the World",
					},
					map[string]any{
						"name": "tileName",
						"title": "Tile Name",
						"type": "`$STRING`",
						"req": true,
						"short": "Name of the world Tiles for navigator",
					},
					map[string]any{
						"name": "tileSize",
						"title": "Tile Size",
						"type": "`$INTEGER`",
						"req": true,
						"short": "World meters per Tile",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
						"req": true,
						"short": "Type of the World",
					},
					map[string]any{
						"name": "width",
						"title": "Width",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Width of the World in meters",
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
								"kind": "http",
								"method": "GET",
								"orig": "/world",
								"segments": []any{
									map[string]any{
										"lit": "world",
									},
								},
								"parts": []any{
									"world",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"image",
									"world",
									"{worldTileName}{tileX}-{tileY}-0.png",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "tile_x",
											"orig": "tile_x",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "tile_y",
											"orig": "tile_y",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "world_tile_name",
											"orig": "world_tile_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "wdmadrigal",
										},
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
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/world/{worldIds}",
								"segments": []any{
									map[string]any{
										"lit": "world",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"world",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"worldIds": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "world_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "4015,4839,6063",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/world/{worldId}",
								"segments": []any{
									map[string]any{
										"lit": "world",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"world",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"worldId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "world_id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
											"example": 4015,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
