package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewAchievementEntityFunc func(client *FlyffGameSDK, entopts map[string]any) FlyffGameEntity

var NewAwakeEntityFunc func(client *FlyffGameSDK, entopts map[string]any) FlyffGameEntity

var NewBadgeEntityFunc func(client *FlyffGameSDK, entopts map[string]any) FlyffGameEntity

var NewClassEntityFunc func(client *FlyffGameSDK, entopts map[string]any) FlyffGameEntity

var NewCoreEntityFunc func(client *FlyffGameSDK, entopts map[string]any) FlyffGameEntity

var NewCoupleEntityFunc func(client *FlyffGameSDK, entopts map[string]any) FlyffGameEntity

var NewDungeonEntityFunc func(client *FlyffGameSDK, entopts map[string]any) FlyffGameEntity

var NewElementEntityFunc func(client *FlyffGameSDK, entopts map[string]any) FlyffGameEntity

var NewEquipmentSetEntityFunc func(client *FlyffGameSDK, entopts map[string]any) FlyffGameEntity

var NewExchangeMenusEntityFunc func(client *FlyffGameSDK, entopts map[string]any) FlyffGameEntity

var NewHousingPackEntityFunc func(client *FlyffGameSDK, entopts map[string]any) FlyffGameEntity

var NewHousingTemplateEntityFunc func(client *FlyffGameSDK, entopts map[string]any) FlyffGameEntity

var NewItemEntityFunc func(client *FlyffGameSDK, entopts map[string]any) FlyffGameEntity

var NewLanguageEntityFunc func(client *FlyffGameSDK, entopts map[string]any) FlyffGameEntity

var NewLifestyleEntityFunc func(client *FlyffGameSDK, entopts map[string]any) FlyffGameEntity

var NewMonsterEntityFunc func(client *FlyffGameSDK, entopts map[string]any) FlyffGameEntity

var NewNpcEntityFunc func(client *FlyffGameSDK, entopts map[string]any) FlyffGameEntity

var NewPartySkillEntityFunc func(client *FlyffGameSDK, entopts map[string]any) FlyffGameEntity

var NewPknEntityFunc func(client *FlyffGameSDK, entopts map[string]any) FlyffGameEntity

var NewPlaceEntityFunc func(client *FlyffGameSDK, entopts map[string]any) FlyffGameEntity

var NewQuestEntityFunc func(client *FlyffGameSDK, entopts map[string]any) FlyffGameEntity

var NewRaisedPetEntityFunc func(client *FlyffGameSDK, entopts map[string]any) FlyffGameEntity

var NewRecipeEntityFunc func(client *FlyffGameSDK, entopts map[string]any) FlyffGameEntity

var NewSkillEntityFunc func(client *FlyffGameSDK, entopts map[string]any) FlyffGameEntity

var NewUpgradeLevelBonusEntityFunc func(client *FlyffGameSDK, entopts map[string]any) FlyffGameEntity

var NewVersionEntityFunc func(client *FlyffGameSDK, entopts map[string]any) FlyffGameEntity

var NewWorldEntityFunc func(client *FlyffGameSDK, entopts map[string]any) FlyffGameEntity

