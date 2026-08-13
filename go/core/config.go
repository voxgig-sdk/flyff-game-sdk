package core

func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "FlyffGame",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
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
				"fields": []any{},
				"name": "achievement",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/achievement",
								"parts": []any{
									"achievement",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"index$": 0,
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "id",
											"orig": "achievement_id",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/achievement/{achievementIds}",
								"parts": []any{
									"achievement",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"achievementIds": "id",
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
								"index$": 0,
							},
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "id",
											"orig": "achievement_id",
											"reqd": true,
											"type": "`$INTEGER`",
											"index$": 0,
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/achievement/{achievementId}",
								"parts": []any{
									"achievement",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"achievementId": "id",
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
								"index$": 1,
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
								"active": true,
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/awake/skill",
								"parts": []any{
									"awake",
									"skill",
								},
								"select": map[string]any{
									"$action": "skill",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"index$": 0,
							},
							map[string]any{
								"active": true,
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/awake/stat",
								"parts": []any{
									"awake",
									"stat",
								},
								"select": map[string]any{
									"$action": "stat",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"index$": 1,
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"badge": map[string]any{
				"fields": []any{},
				"name": "badge",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "id",
											"orig": "file_name",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/image/badge/{fileName}",
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
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"index$": 0,
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
						"active": true,
						"name": "attackSpeed",
						"req": true,
						"type": "`$NUMBER`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "autoAttackFactors",
						"req": true,
						"type": "`$OBJECT`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "block",
						"req": true,
						"type": "`$NUMBER`",
						"index$": 2,
					},
					map[string]any{
						"active": true,
						"name": "critical",
						"req": true,
						"type": "`$NUMBER`",
						"index$": 3,
					},
					map[string]any{
						"active": true,
						"name": "defense",
						"req": true,
						"type": "`$NUMBER`",
						"index$": 4,
					},
					map[string]any{
						"active": true,
						"name": "fp",
						"req": true,
						"type": "`$NUMBER`",
						"index$": 5,
					},
					map[string]any{
						"active": true,
						"name": "hp",
						"req": true,
						"type": "`$NUMBER`",
						"index$": 6,
					},
					map[string]any{
						"active": true,
						"name": "icon",
						"req": true,
						"type": "`$STRING`",
						"index$": 7,
					},
					map[string]any{
						"active": true,
						"name": "id",
						"req": true,
						"type": "`$INTEGER`",
						"index$": 8,
					},
					map[string]any{
						"active": true,
						"name": "magicDefenseIntFactor",
						"req": true,
						"type": "`$NUMBER`",
						"index$": 9,
					},
					map[string]any{
						"active": true,
						"name": "magicDefenseStaFactor",
						"req": true,
						"type": "`$NUMBER`",
						"index$": 10,
					},
					map[string]any{
						"active": true,
						"name": "maxFP",
						"req": true,
						"type": "`$STRING`",
						"index$": 11,
					},
					map[string]any{
						"active": true,
						"name": "maxHP",
						"req": true,
						"type": "`$STRING`",
						"index$": 12,
					},
					map[string]any{
						"active": true,
						"name": "maxLevel",
						"req": true,
						"type": "`$INTEGER`",
						"index$": 13,
					},
					map[string]any{
						"active": true,
						"name": "maxMP",
						"req": true,
						"type": "`$STRING`",
						"index$": 14,
					},
					map[string]any{
						"active": true,
						"name": "minLevel",
						"req": true,
						"type": "`$INTEGER`",
						"index$": 15,
					},
					map[string]any{
						"active": true,
						"name": "mp",
						"req": true,
						"type": "`$NUMBER`",
						"index$": 16,
					},
					map[string]any{
						"active": true,
						"name": "name",
						"req": true,
						"type": "`$OBJECT`",
						"index$": 17,
					},
					map[string]any{
						"active": true,
						"name": "parent",
						"req": false,
						"type": "`$INTEGER`",
						"index$": 18,
					},
					map[string]any{
						"active": true,
						"name": "tree",
						"req": true,
						"type": "`$STRING`",
						"index$": 19,
					},
					map[string]any{
						"active": true,
						"name": "type",
						"req": true,
						"type": "`$STRING`",
						"index$": 20,
					},
				},
				"name": "class",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/class",
								"parts": []any{
									"class",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"index$": 0,
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"example": "vagrant.png",
											"kind": "param",
											"name": "file_name",
											"orig": "file_name",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
										map[string]any{
											"active": true,
											"example": "messenger",
											"kind": "param",
											"name": "style",
											"orig": "style",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 1,
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/image/class/{style}/{fileName}",
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
								"index$": 0,
							},
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"example": "Vagrant.png",
											"kind": "param",
											"name": "file_name",
											"orig": "file_name",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/image/class/tree/{fileName}",
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
								"select": map[string]any{
									"exist": []any{
										"file_name",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"index$": 1,
							},
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"example": "1689,296,2881",
											"kind": "param",
											"name": "id",
											"orig": "class_id",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/class/{classIds}",
								"parts": []any{
									"class",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"classIds": "id",
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
								"index$": 2,
							},
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"example": 1689,
											"kind": "param",
											"name": "id",
											"orig": "class_id",
											"reqd": true,
											"type": "`$INTEGER`",
											"index$": 0,
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/class/{classId}",
								"parts": []any{
									"class",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"classId": "id",
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
								"index$": 3,
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
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "parameter_id",
											"orig": "parameter_id",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/parameter/{parameterIds}",
								"parts": []any{
									"parameter",
									"{parameter_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"parameterIds": "parameter_id",
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
								"index$": 0,
							},
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "parameter_id",
											"orig": "parameter_id",
											"reqd": true,
											"type": "`$INTEGER`",
											"index$": 0,
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/parameter/{parameterId}",
								"parts": []any{
									"parameter",
									"{parameter_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"parameterId": "parameter_id",
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
								"index$": 1,
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
								"active": true,
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/couple",
								"parts": []any{
									"couple",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"index$": 0,
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
								"active": true,
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/dungeon",
								"parts": []any{
									"dungeon",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"index$": 0,
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"element": map[string]any{
				"fields": []any{},
				"name": "element",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "id",
											"orig": "file_name",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/image/element/{fileName}",
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
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"index$": 0,
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
								"active": true,
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/equipmentset",
								"parts": []any{
									"equipmentset",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"index$": 0,
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "equipment_set_id",
											"orig": "equipment_set_id",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/equipmentset/{equipmentSetIds}",
								"parts": []any{
									"equipmentset",
									"{equipment_set_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"equipmentSetIds": "equipment_set_id",
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
								"index$": 0,
							},
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "equipment_set_id",
											"orig": "equipment_set_id",
											"reqd": true,
											"type": "`$INTEGER`",
											"index$": 0,
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/equipmentset/{equipmentSetId}",
								"parts": []any{
									"equipmentset",
									"{equipment_set_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"equipmentSetId": "equipment_set_id",
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
								"index$": 1,
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
								"active": true,
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/exchangemenu",
								"parts": []any{
									"exchangemenu",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"index$": 0,
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
								"active": true,
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/housingpack",
								"parts": []any{
									"housingpack",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"index$": 0,
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "housing_pack_id",
											"orig": "housing_pack_id",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/housingpack/{housingPackIds}",
								"parts": []any{
									"housingpack",
									"{housing_pack_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"housingPackIds": "housing_pack_id",
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
								"index$": 0,
							},
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "housing_pack_id",
											"orig": "housing_pack_id",
											"reqd": true,
											"type": "`$INTEGER`",
											"index$": 0,
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/housingpack/{housingPackId}",
								"parts": []any{
									"housingpack",
									"{housing_pack_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"housingPackId": "housing_pack_id",
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
								"index$": 1,
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
								"active": true,
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/housingtemplate",
								"parts": []any{
									"housingtemplate",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"index$": 0,
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "file_name",
											"orig": "file_name",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/image/housingtemplate/{fileName}",
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
								"select": map[string]any{
									"exist": []any{
										"file_name",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"index$": 0,
							},
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "housing_template_id",
											"orig": "housing_template_id",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/housingtemplate/{housingTemplateIds}",
								"parts": []any{
									"housingtemplate",
									"{housing_template_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"housingTemplateIds": "housing_template_id",
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
								"index$": 1,
							},
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "housing_template_id",
											"orig": "housing_template_id",
											"reqd": true,
											"type": "`$INTEGER`",
											"index$": 0,
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/housingtemplate/{housingTemplateId}",
								"parts": []any{
									"housingtemplate",
									"{housing_template_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"housingTemplateId": "housing_template_id",
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
								"index$": 2,
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
				"fields": []any{},
				"name": "item",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/item",
								"parts": []any{
									"item",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"index$": 0,
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "id",
											"orig": "file_name",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/image/item/{fileName}",
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
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"index$": 0,
							},
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "id",
											"orig": "item_id",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/item/{itemIds}",
								"parts": []any{
									"item",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"itemIds": "id",
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
								"index$": 1,
							},
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "id",
											"orig": "item_id",
											"reqd": true,
											"type": "`$INTEGER`",
											"index$": 0,
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/item/{itemId}",
								"parts": []any{
									"item",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"itemId": "id",
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
								"index$": 2,
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
								"active": true,
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/language",
								"parts": []any{
									"language",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"index$": 0,
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "language_code",
											"orig": "language_code",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/image/language/{languageCode}.png",
								"parts": []any{
									"image",
									"language",
									"{languageCode}.png",
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
								"index$": 0,
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"language",
						},
					},
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
								"active": true,
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/lifestyle",
								"parts": []any{
									"lifestyle",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"index$": 0,
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"monster": map[string]any{
				"fields": []any{},
				"name": "monster",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/monster",
								"parts": []any{
									"monster",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"index$": 0,
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "id",
											"orig": "file_name",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/image/monster/{fileName}",
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
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"index$": 0,
							},
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "id",
											"orig": "monster_id",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/monster/{monsterIds}",
								"parts": []any{
									"monster",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"monsterIds": "id",
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
								"index$": 1,
							},
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "id",
											"orig": "monster_id",
											"reqd": true,
											"type": "`$INTEGER`",
											"index$": 0,
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/monster/{monsterId}",
								"parts": []any{
									"monster",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"monsterId": "id",
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
								"index$": 2,
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"npc": map[string]any{
				"fields": []any{},
				"name": "npc",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/npc",
								"parts": []any{
									"npc",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"index$": 0,
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "id",
											"orig": "file_name",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/image/npc/{fileName}",
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
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"index$": 0,
							},
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "id",
											"orig": "npc_id",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/npc/{npcIds}",
								"parts": []any{
									"npc",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"npcIds": "id",
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
								"index$": 1,
							},
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "id",
											"orig": "npc_id",
											"reqd": true,
											"type": "`$INTEGER`",
											"index$": 0,
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/npc/{npcId}",
								"parts": []any{
									"npc",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"npcId": "id",
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
								"index$": 2,
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
								"active": true,
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/partyskill",
								"parts": []any{
									"partyskill",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"index$": 0,
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "party_skill_id",
											"orig": "party_skill_id",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/partyskill/{partySkillIds}",
								"parts": []any{
									"partyskill",
									"{party_skill_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"partySkillIds": "party_skill_id",
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
								"index$": 0,
							},
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "party_skill_id",
											"orig": "party_skill_id",
											"reqd": true,
											"type": "`$INTEGER`",
											"index$": 0,
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/partyskill/{partySkillId}",
								"parts": []any{
									"partyskill",
									"{party_skill_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"partySkillId": "party_skill_id",
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
								"index$": 1,
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
								"active": true,
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/pk",
								"parts": []any{
									"pk",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"index$": 0,
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"place": map[string]any{
				"fields": []any{},
				"name": "place",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "id",
											"orig": "file_name",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/image/place/{fileName}",
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
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"index$": 0,
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"quest": map[string]any{
				"fields": []any{},
				"name": "quest",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/quest",
								"parts": []any{
									"quest",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"index$": 0,
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "id",
											"orig": "quest_id",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/quest/{questIds}",
								"parts": []any{
									"quest",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"questIds": "id",
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
								"index$": 0,
							},
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "id",
											"orig": "quest_id",
											"reqd": true,
											"type": "`$INTEGER`",
											"index$": 0,
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/quest/{questId}",
								"parts": []any{
									"quest",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"questId": "id",
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
								"index$": 1,
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
								"active": true,
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/raisedpet",
								"parts": []any{
									"raisedpet",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"index$": 0,
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"recipe": map[string]any{
				"fields": []any{},
				"name": "recipe",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/recipe",
								"parts": []any{
									"recipe",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"index$": 0,
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "id",
											"orig": "recipe_id",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/recipe/{recipeIds}",
								"parts": []any{
									"recipe",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"recipeIds": "id",
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
								"index$": 0,
							},
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "id",
											"orig": "recipe_id",
											"reqd": true,
											"type": "`$INTEGER`",
											"index$": 0,
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/recipe/{recipeId}",
								"parts": []any{
									"recipe",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"recipeId": "id",
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
								"index$": 1,
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"skill": map[string]any{
				"fields": []any{},
				"name": "skill",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/skill",
								"parts": []any{
									"skill",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"index$": 0,
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "id",
											"orig": "file_name",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/image/skill/{fileName}",
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
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"index$": 0,
							},
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "id",
											"orig": "skill_id",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/skill/{skillIds}",
								"parts": []any{
									"skill",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"skillIds": "id",
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
								"index$": 1,
							},
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "id",
											"orig": "skill_id",
											"reqd": true,
											"type": "`$INTEGER`",
											"index$": 0,
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/skill/{skillId}",
								"parts": []any{
									"skill",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"skillId": "id",
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
								"index$": 2,
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
								"active": true,
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/upgradelevelbonus",
								"parts": []any{
									"upgradelevelbonus",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"index$": 0,
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
								"active": true,
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/version/api",
								"parts": []any{
									"version",
									"api",
								},
								"select": map[string]any{
									"$action": "api",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"index$": 0,
							},
							map[string]any{
								"active": true,
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/version/data",
								"parts": []any{
									"version",
									"data",
								},
								"select": map[string]any{
									"$action": "data",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"index$": 1,
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
						"active": true,
						"name": "continents",
						"req": true,
						"type": "`$ARRAY`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "flying",
						"req": true,
						"type": "`$BOOLEAN`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "height",
						"req": true,
						"type": "`$INTEGER`",
						"index$": 2,
					},
					map[string]any{
						"active": true,
						"name": "id",
						"req": true,
						"type": "`$INTEGER`",
						"index$": 3,
					},
					map[string]any{
						"active": true,
						"name": "inDoor",
						"req": true,
						"type": "`$BOOLEAN`",
						"index$": 4,
					},
					map[string]any{
						"active": true,
						"name": "lodestars",
						"req": true,
						"type": "`$ARRAY`",
						"index$": 5,
					},
					map[string]any{
						"active": true,
						"name": "name",
						"req": true,
						"type": "`$OBJECT`",
						"index$": 6,
					},
					map[string]any{
						"active": true,
						"name": "pk",
						"req": true,
						"type": "`$BOOLEAN`",
						"index$": 7,
					},
					map[string]any{
						"active": true,
						"name": "places",
						"req": true,
						"type": "`$ARRAY`",
						"index$": 8,
					},
					map[string]any{
						"active": true,
						"name": "revivalKey",
						"req": false,
						"type": "`$STRING`",
						"index$": 9,
					},
					map[string]any{
						"active": true,
						"name": "revivalWorld",
						"req": false,
						"type": "`$INTEGER`",
						"index$": 10,
					},
					map[string]any{
						"active": true,
						"name": "tileName",
						"req": true,
						"type": "`$STRING`",
						"index$": 11,
					},
					map[string]any{
						"active": true,
						"name": "tileSize",
						"req": true,
						"type": "`$INTEGER`",
						"index$": 12,
					},
					map[string]any{
						"active": true,
						"name": "type",
						"req": true,
						"type": "`$STRING`",
						"index$": 13,
					},
					map[string]any{
						"active": true,
						"name": "width",
						"req": true,
						"type": "`$INTEGER`",
						"index$": 14,
					},
				},
				"name": "world",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/world",
								"parts": []any{
									"world",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"index$": 0,
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "tile_x",
											"orig": "tile_x",
											"reqd": true,
											"type": "`$INTEGER`",
										},
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "tile_y",
											"orig": "tile_y",
											"reqd": true,
											"type": "`$INTEGER`",
										},
										map[string]any{
											"active": true,
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
								"parts": []any{
									"image",
									"world",
									"{worldTileName}{tileX}-{tileY}-0.png",
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
								"index$": 0,
							},
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"example": "4015,4839,6063",
											"kind": "param",
											"name": "id",
											"orig": "world_id",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/world/{worldIds}",
								"parts": []any{
									"world",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"worldIds": "id",
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
								"index$": 1,
							},
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"example": 4015,
											"kind": "param",
											"name": "id",
											"orig": "world_id",
											"reqd": true,
											"type": "`$INTEGER`",
											"index$": 0,
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/world/{worldId}",
								"parts": []any{
									"world",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"worldId": "id",
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
								"index$": 2,
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"world",
						},
					},
				},
			},
		},
	}
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
