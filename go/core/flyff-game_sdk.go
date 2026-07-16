package core

import (
	"fmt"

	vs "github.com/voxgig-sdk/flyff-game-sdk/go/utility/struct"
)

type FlyffGameSDK struct {
	Mode     string
	options  map[string]any
	utility  *Utility
	Features []Feature
	rootctx  *Context
}

func NewFlyffGameSDK(options map[string]any) *FlyffGameSDK {
	sdk := &FlyffGameSDK{
		Mode:     "live",
		Features: []Feature{},
	}

	sdk.utility = NewUtility()

	config := MakeConfig()

	sdk.rootctx = sdk.utility.MakeContext(map[string]any{
		"client":  sdk,
		"utility": sdk.utility,
		"config":  config,
		"options": options,
		"shared":  map[string]any{},
	}, nil)

	sdk.options = sdk.utility.MakeOptions(sdk.rootctx)

	if vs.GetPath([]any{"feature", "test", "active"}, sdk.options) == true {
		sdk.Mode = "test"
	}

	sdk.rootctx.Options = sdk.options

	// Add features in the resolved order (MakeOptions puts an explicit array
	// order first, else defaults to test-first). Ordering matters: the `test`
	// feature installs the base mock transport and the transport features
	// (retry/cache/netsim/proxy/ratelimit) wrap whatever is current, so `test`
	// must be added before them to sit at the base of the chain.
	featureOpts := ToMapAny(vs.GetProp(sdk.options, "feature"))
	if featureOpts != nil {
		if fo, ok := vs.GetPath([]any{"__derived__", "featureorder"}, sdk.options).([]any); ok {
			for _, n := range fo {
				fname, _ := n.(string)
				fopts := ToMapAny(featureOpts[fname])
				if fopts != nil {
					if active, ok := fopts["active"]; ok {
						if ab, ok := active.(bool); ok && ab {
							sdk.utility.FeatureAdd(sdk.rootctx, makeFeature(fname))
						}
					}
				}
			}
		}
	}

	// Add extension features.
	if extend := vs.GetProp(sdk.options, "extend"); extend != nil {
		if extList, ok := extend.([]any); ok {
			for _, f := range extList {
				if feat, ok := f.(Feature); ok {
					sdk.utility.FeatureAdd(sdk.rootctx, feat)
				}
			}
		}
	}

	// Initialize features.
	for _, f := range sdk.Features {
		sdk.utility.FeatureInit(sdk.rootctx, f)
	}

	sdk.utility.FeatureHook(sdk.rootctx, "PostConstruct")

	return sdk
}

func (sdk *FlyffGameSDK) OptionsMap() map[string]any {
	out := vs.Clone(sdk.options)
	if om, ok := out.(map[string]any); ok {
		return om
	}
	return map[string]any{}
}

func (sdk *FlyffGameSDK) GetUtility() *Utility {
	return CopyUtility(sdk.utility)
}

func (sdk *FlyffGameSDK) GetRootCtx() *Context {
	return sdk.rootctx
}

func (sdk *FlyffGameSDK) Prepare(fetchargs map[string]any) (map[string]any, error) {
	utility := sdk.utility

	if fetchargs == nil {
		fetchargs = map[string]any{}
	}

	var ctrl map[string]any
	if c := vs.GetProp(fetchargs, "ctrl"); c != nil {
		if cm, ok := c.(map[string]any); ok {
			ctrl = cm
		}
	}
	if ctrl == nil {
		ctrl = map[string]any{}
	}

	ctx := utility.MakeContext(map[string]any{
		"opname": "prepare",
		"ctrl":   ctrl,
	}, sdk.rootctx)

	options := sdk.options

	path, _ := vs.GetProp(fetchargs, "path").(string)
	method, _ := vs.GetProp(fetchargs, "method").(string)
	if method == "" {
		method = "GET"
	}

	params := ToMapAny(vs.GetProp(fetchargs, "params"))
	if params == nil {
		params = map[string]any{}
	}
	query := ToMapAny(vs.GetProp(fetchargs, "query"))
	if query == nil {
		query = map[string]any{}
	}

	headers := utility.PrepareHeaders(ctx)

	base, _ := vs.GetProp(options, "base").(string)
	prefix, _ := vs.GetProp(options, "prefix").(string)
	suffix, _ := vs.GetProp(options, "suffix").(string)

	ctx.Spec = NewSpec(map[string]any{
		"base":    base,
		"prefix":  prefix,
		"suffix":  suffix,
		"path":    path,
		"method":  method,
		"params":  params,
		"query":   query,
		"headers": headers,
		"body":    vs.GetProp(fetchargs, "body"),
		"step":    "start",
	})

	// Merge user-provided headers.
	if uh := vs.GetProp(fetchargs, "headers"); uh != nil {
		if uhm, ok := uh.(map[string]any); ok {
			for k, v := range uhm {
				ctx.Spec.Headers[k] = v
			}
		}
	}

	_, err := utility.PrepareAuth(ctx)
	if err != nil {
		return nil, err
	}

	return utility.MakeFetchDef(ctx)
}

func (sdk *FlyffGameSDK) Direct(fetchargs map[string]any) (map[string]any, error) {
	utility := sdk.utility

	fetchdef, err := sdk.Prepare(fetchargs)
	if err != nil {
		return map[string]any{"ok": false, "err": err}, nil
	}

	if fetchargs == nil {
		fetchargs = map[string]any{}
	}

	var ctrl map[string]any
	if c := vs.GetProp(fetchargs, "ctrl"); c != nil {
		if cm, ok := c.(map[string]any); ok {
			ctrl = cm
		}
	}
	if ctrl == nil {
		ctrl = map[string]any{}
	}

	ctx := utility.MakeContext(map[string]any{
		"opname": "direct",
		"ctrl":   ctrl,
	}, sdk.rootctx)

	url, _ := fetchdef["url"].(string)
	fetched, fetchErr := utility.Fetcher(ctx, url, fetchdef)

	if fetchErr != nil {
		return map[string]any{"ok": false, "err": fetchErr}, nil
	}

	if fetched == nil {
		return map[string]any{
			"ok":  false,
			"err": ctx.MakeError("direct_no_response", "response: undefined"),
		}, nil
	}

	if fm, ok := fetched.(map[string]any); ok {
		status := ToInt(vs.GetProp(fm, "status"))
		headers := vs.GetProp(fm, "headers")

		// No-body responses (204, 304) and explicit zero content-length
		// must skip JSON parsing — calling json() on an empty body errors.
		var contentLength string
		if hm, ok := headers.(map[string]any); ok {
			if cl, ok := hm["content-length"]; ok {
				contentLength = fmt.Sprintf("%v", cl)
			}
		}
		noBody := status == 204 || status == 304 || contentLength == "0"

		var jsonData any
		if !noBody {
			if jf := vs.GetProp(fm, "json"); jf != nil {
				if f, ok := jf.(func() any); ok {
					// f() returns nil on parse error in our fetcher.
					jsonData = f()
				}
			}
		}

		return map[string]any{
			"ok":      status >= 200 && status < 300,
			"status":  status,
			"headers": headers,
			"data":    jsonData,
		}, nil
	}

	return map[string]any{"ok": false, "err": ctx.MakeError("direct_invalid", "invalid response type")}, nil
}


// Achievement returns a Achievement entity bound to this client.
// Idiomatic usage: client.Achievement(nil).List(nil, nil) or
// client.Achievement(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *FlyffGameSDK) Achievement(data map[string]any) FlyffGameEntity {
	return NewAchievementEntityFunc(sdk, data)
}


// Awake returns a Awake entity bound to this client.
// Idiomatic usage: client.Awake(nil).List(nil, nil) or
// client.Awake(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *FlyffGameSDK) Awake(data map[string]any) FlyffGameEntity {
	return NewAwakeEntityFunc(sdk, data)
}


// Badge returns a Badge entity bound to this client.
// Idiomatic usage: client.Badge(nil).List(nil, nil) or
// client.Badge(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *FlyffGameSDK) Badge(data map[string]any) FlyffGameEntity {
	return NewBadgeEntityFunc(sdk, data)
}


// Class returns a Class entity bound to this client.
// Idiomatic usage: client.Class(nil).List(nil, nil) or
// client.Class(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *FlyffGameSDK) Class(data map[string]any) FlyffGameEntity {
	return NewClassEntityFunc(sdk, data)
}


// Core returns a Core entity bound to this client.
// Idiomatic usage: client.Core(nil).List(nil, nil) or
// client.Core(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *FlyffGameSDK) Core(data map[string]any) FlyffGameEntity {
	return NewCoreEntityFunc(sdk, data)
}


// Couple returns a Couple entity bound to this client.
// Idiomatic usage: client.Couple(nil).List(nil, nil) or
// client.Couple(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *FlyffGameSDK) Couple(data map[string]any) FlyffGameEntity {
	return NewCoupleEntityFunc(sdk, data)
}


// Dungeon returns a Dungeon entity bound to this client.
// Idiomatic usage: client.Dungeon(nil).List(nil, nil) or
// client.Dungeon(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *FlyffGameSDK) Dungeon(data map[string]any) FlyffGameEntity {
	return NewDungeonEntityFunc(sdk, data)
}


// Element returns a Element entity bound to this client.
// Idiomatic usage: client.Element(nil).List(nil, nil) or
// client.Element(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *FlyffGameSDK) Element(data map[string]any) FlyffGameEntity {
	return NewElementEntityFunc(sdk, data)
}


// EquipmentSet returns a EquipmentSet entity bound to this client.
// Idiomatic usage: client.EquipmentSet(nil).List(nil, nil) or
// client.EquipmentSet(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *FlyffGameSDK) EquipmentSet(data map[string]any) FlyffGameEntity {
	return NewEquipmentSetEntityFunc(sdk, data)
}


// ExchangeMenus returns a ExchangeMenus entity bound to this client.
// Idiomatic usage: client.ExchangeMenus(nil).List(nil, nil) or
// client.ExchangeMenus(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *FlyffGameSDK) ExchangeMenus(data map[string]any) FlyffGameEntity {
	return NewExchangeMenusEntityFunc(sdk, data)
}


// HousingPack returns a HousingPack entity bound to this client.
// Idiomatic usage: client.HousingPack(nil).List(nil, nil) or
// client.HousingPack(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *FlyffGameSDK) HousingPack(data map[string]any) FlyffGameEntity {
	return NewHousingPackEntityFunc(sdk, data)
}


// HousingTemplate returns a HousingTemplate entity bound to this client.
// Idiomatic usage: client.HousingTemplate(nil).List(nil, nil) or
// client.HousingTemplate(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *FlyffGameSDK) HousingTemplate(data map[string]any) FlyffGameEntity {
	return NewHousingTemplateEntityFunc(sdk, data)
}


// Item returns a Item entity bound to this client.
// Idiomatic usage: client.Item(nil).List(nil, nil) or
// client.Item(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *FlyffGameSDK) Item(data map[string]any) FlyffGameEntity {
	return NewItemEntityFunc(sdk, data)
}


// Language returns a Language entity bound to this client.
// Idiomatic usage: client.Language(nil).List(nil, nil) or
// client.Language(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *FlyffGameSDK) Language(data map[string]any) FlyffGameEntity {
	return NewLanguageEntityFunc(sdk, data)
}


// Lifestyle returns a Lifestyle entity bound to this client.
// Idiomatic usage: client.Lifestyle(nil).List(nil, nil) or
// client.Lifestyle(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *FlyffGameSDK) Lifestyle(data map[string]any) FlyffGameEntity {
	return NewLifestyleEntityFunc(sdk, data)
}


// Monster returns a Monster entity bound to this client.
// Idiomatic usage: client.Monster(nil).List(nil, nil) or
// client.Monster(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *FlyffGameSDK) Monster(data map[string]any) FlyffGameEntity {
	return NewMonsterEntityFunc(sdk, data)
}


// Npc returns a Npc entity bound to this client.
// Idiomatic usage: client.Npc(nil).List(nil, nil) or
// client.Npc(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *FlyffGameSDK) Npc(data map[string]any) FlyffGameEntity {
	return NewNpcEntityFunc(sdk, data)
}


// PartySkill returns a PartySkill entity bound to this client.
// Idiomatic usage: client.PartySkill(nil).List(nil, nil) or
// client.PartySkill(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *FlyffGameSDK) PartySkill(data map[string]any) FlyffGameEntity {
	return NewPartySkillEntityFunc(sdk, data)
}


// Pkn returns a Pkn entity bound to this client.
// Idiomatic usage: client.Pkn(nil).List(nil, nil) or
// client.Pkn(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *FlyffGameSDK) Pkn(data map[string]any) FlyffGameEntity {
	return NewPknEntityFunc(sdk, data)
}


// Place returns a Place entity bound to this client.
// Idiomatic usage: client.Place(nil).List(nil, nil) or
// client.Place(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *FlyffGameSDK) Place(data map[string]any) FlyffGameEntity {
	return NewPlaceEntityFunc(sdk, data)
}


// Quest returns a Quest entity bound to this client.
// Idiomatic usage: client.Quest(nil).List(nil, nil) or
// client.Quest(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *FlyffGameSDK) Quest(data map[string]any) FlyffGameEntity {
	return NewQuestEntityFunc(sdk, data)
}


// RaisedPet returns a RaisedPet entity bound to this client.
// Idiomatic usage: client.RaisedPet(nil).List(nil, nil) or
// client.RaisedPet(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *FlyffGameSDK) RaisedPet(data map[string]any) FlyffGameEntity {
	return NewRaisedPetEntityFunc(sdk, data)
}


// Recipe returns a Recipe entity bound to this client.
// Idiomatic usage: client.Recipe(nil).List(nil, nil) or
// client.Recipe(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *FlyffGameSDK) Recipe(data map[string]any) FlyffGameEntity {
	return NewRecipeEntityFunc(sdk, data)
}


// Skill returns a Skill entity bound to this client.
// Idiomatic usage: client.Skill(nil).List(nil, nil) or
// client.Skill(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *FlyffGameSDK) Skill(data map[string]any) FlyffGameEntity {
	return NewSkillEntityFunc(sdk, data)
}


// UpgradeLevelBonus returns a UpgradeLevelBonus entity bound to this client.
// Idiomatic usage: client.UpgradeLevelBonus(nil).List(nil, nil) or
// client.UpgradeLevelBonus(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *FlyffGameSDK) UpgradeLevelBonus(data map[string]any) FlyffGameEntity {
	return NewUpgradeLevelBonusEntityFunc(sdk, data)
}


// Version returns a Version entity bound to this client.
// Idiomatic usage: client.Version(nil).List(nil, nil) or
// client.Version(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *FlyffGameSDK) Version(data map[string]any) FlyffGameEntity {
	return NewVersionEntityFunc(sdk, data)
}


// World returns a World entity bound to this client.
// Idiomatic usage: client.World(nil).List(nil, nil) or
// client.World(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *FlyffGameSDK) World(data map[string]any) FlyffGameEntity {
	return NewWorldEntityFunc(sdk, data)
}



func TestSDK(testopts map[string]any, sdkopts map[string]any) *FlyffGameSDK {
	if sdkopts == nil {
		sdkopts = map[string]any{}
	}
	sdkopts = vs.Clone(sdkopts).(map[string]any)

	if testopts == nil {
		testopts = map[string]any{}
	}
	testopts = vs.Clone(testopts).(map[string]any)
	testopts["active"] = true

	vs.SetPath(sdkopts, []any{"feature", "test"}, testopts)

	sdk := NewFlyffGameSDK(sdkopts)
	sdk.Mode = "test"

	return sdk
}
