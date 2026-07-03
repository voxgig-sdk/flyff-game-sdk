package voxgigflyffgamesdk

import (
	"github.com/voxgig-sdk/flyff-game-sdk/go/core"
	"github.com/voxgig-sdk/flyff-game-sdk/go/entity"
	"github.com/voxgig-sdk/flyff-game-sdk/go/feature"
	_ "github.com/voxgig-sdk/flyff-game-sdk/go/utility"
)

// Type aliases preserve external API.
type FlyffGameSDK = core.FlyffGameSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type FlyffGameEntity = core.FlyffGameEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type FlyffGameError = core.FlyffGameError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewAchievementEntityFunc = func(client *core.FlyffGameSDK, entopts map[string]any) core.FlyffGameEntity {
		return entity.NewAchievementEntity(client, entopts)
	}
	core.NewAwakeEntityFunc = func(client *core.FlyffGameSDK, entopts map[string]any) core.FlyffGameEntity {
		return entity.NewAwakeEntity(client, entopts)
	}
	core.NewBadgeEntityFunc = func(client *core.FlyffGameSDK, entopts map[string]any) core.FlyffGameEntity {
		return entity.NewBadgeEntity(client, entopts)
	}
	core.NewClassEntityFunc = func(client *core.FlyffGameSDK, entopts map[string]any) core.FlyffGameEntity {
		return entity.NewClassEntity(client, entopts)
	}
	core.NewCoreEntityFunc = func(client *core.FlyffGameSDK, entopts map[string]any) core.FlyffGameEntity {
		return entity.NewCoreEntity(client, entopts)
	}
	core.NewCoupleEntityFunc = func(client *core.FlyffGameSDK, entopts map[string]any) core.FlyffGameEntity {
		return entity.NewCoupleEntity(client, entopts)
	}
	core.NewDungeonEntityFunc = func(client *core.FlyffGameSDK, entopts map[string]any) core.FlyffGameEntity {
		return entity.NewDungeonEntity(client, entopts)
	}
	core.NewElementEntityFunc = func(client *core.FlyffGameSDK, entopts map[string]any) core.FlyffGameEntity {
		return entity.NewElementEntity(client, entopts)
	}
	core.NewEquipmentSetEntityFunc = func(client *core.FlyffGameSDK, entopts map[string]any) core.FlyffGameEntity {
		return entity.NewEquipmentSetEntity(client, entopts)
	}
	core.NewExchangeMenusEntityFunc = func(client *core.FlyffGameSDK, entopts map[string]any) core.FlyffGameEntity {
		return entity.NewExchangeMenusEntity(client, entopts)
	}
	core.NewHousingPackEntityFunc = func(client *core.FlyffGameSDK, entopts map[string]any) core.FlyffGameEntity {
		return entity.NewHousingPackEntity(client, entopts)
	}
	core.NewHousingTemplateEntityFunc = func(client *core.FlyffGameSDK, entopts map[string]any) core.FlyffGameEntity {
		return entity.NewHousingTemplateEntity(client, entopts)
	}
	core.NewItemEntityFunc = func(client *core.FlyffGameSDK, entopts map[string]any) core.FlyffGameEntity {
		return entity.NewItemEntity(client, entopts)
	}
	core.NewLanguageEntityFunc = func(client *core.FlyffGameSDK, entopts map[string]any) core.FlyffGameEntity {
		return entity.NewLanguageEntity(client, entopts)
	}
	core.NewLifestyleEntityFunc = func(client *core.FlyffGameSDK, entopts map[string]any) core.FlyffGameEntity {
		return entity.NewLifestyleEntity(client, entopts)
	}
	core.NewMonsterEntityFunc = func(client *core.FlyffGameSDK, entopts map[string]any) core.FlyffGameEntity {
		return entity.NewMonsterEntity(client, entopts)
	}
	core.NewNpcEntityFunc = func(client *core.FlyffGameSDK, entopts map[string]any) core.FlyffGameEntity {
		return entity.NewNpcEntity(client, entopts)
	}
	core.NewPartySkillEntityFunc = func(client *core.FlyffGameSDK, entopts map[string]any) core.FlyffGameEntity {
		return entity.NewPartySkillEntity(client, entopts)
	}
	core.NewPknEntityFunc = func(client *core.FlyffGameSDK, entopts map[string]any) core.FlyffGameEntity {
		return entity.NewPknEntity(client, entopts)
	}
	core.NewPlaceEntityFunc = func(client *core.FlyffGameSDK, entopts map[string]any) core.FlyffGameEntity {
		return entity.NewPlaceEntity(client, entopts)
	}
	core.NewQuestEntityFunc = func(client *core.FlyffGameSDK, entopts map[string]any) core.FlyffGameEntity {
		return entity.NewQuestEntity(client, entopts)
	}
	core.NewRaisedPetEntityFunc = func(client *core.FlyffGameSDK, entopts map[string]any) core.FlyffGameEntity {
		return entity.NewRaisedPetEntity(client, entopts)
	}
	core.NewRecipeEntityFunc = func(client *core.FlyffGameSDK, entopts map[string]any) core.FlyffGameEntity {
		return entity.NewRecipeEntity(client, entopts)
	}
	core.NewSkillEntityFunc = func(client *core.FlyffGameSDK, entopts map[string]any) core.FlyffGameEntity {
		return entity.NewSkillEntity(client, entopts)
	}
	core.NewUpgradeLevelBonusEntityFunc = func(client *core.FlyffGameSDK, entopts map[string]any) core.FlyffGameEntity {
		return entity.NewUpgradeLevelBonusEntity(client, entopts)
	}
	core.NewVersionEntityFunc = func(client *core.FlyffGameSDK, entopts map[string]any) core.FlyffGameEntity {
		return entity.NewVersionEntity(client, entopts)
	}
	core.NewWorldEntityFunc = func(client *core.FlyffGameSDK, entopts map[string]any) core.FlyffGameEntity {
		return entity.NewWorldEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewFlyffGameSDK = core.NewFlyffGameSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewFlyffGameSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *FlyffGameSDK  { return NewFlyffGameSDK(nil) }
func Test() *FlyffGameSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
