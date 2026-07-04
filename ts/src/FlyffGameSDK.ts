// FlyffGame Ts SDK

import { AchievementEntity } from './entity/AchievementEntity'
import { AwakeEntity } from './entity/AwakeEntity'
import { BadgeEntity } from './entity/BadgeEntity'
import { ClassEntity } from './entity/ClassEntity'
import { CoreEntity } from './entity/CoreEntity'
import { CoupleEntity } from './entity/CoupleEntity'
import { DungeonEntity } from './entity/DungeonEntity'
import { ElementEntity } from './entity/ElementEntity'
import { EquipmentSetEntity } from './entity/EquipmentSetEntity'
import { ExchangeMenusEntity } from './entity/ExchangeMenusEntity'
import { HousingPackEntity } from './entity/HousingPackEntity'
import { HousingTemplateEntity } from './entity/HousingTemplateEntity'
import { ItemEntity } from './entity/ItemEntity'
import { LanguageEntity } from './entity/LanguageEntity'
import { LifestyleEntity } from './entity/LifestyleEntity'
import { MonsterEntity } from './entity/MonsterEntity'
import { NpcEntity } from './entity/NpcEntity'
import { PartySkillEntity } from './entity/PartySkillEntity'
import { PknEntity } from './entity/PknEntity'
import { PlaceEntity } from './entity/PlaceEntity'
import { QuestEntity } from './entity/QuestEntity'
import { RaisedPetEntity } from './entity/RaisedPetEntity'
import { RecipeEntity } from './entity/RecipeEntity'
import { SkillEntity } from './entity/SkillEntity'
import { UpgradeLevelBonusEntity } from './entity/UpgradeLevelBonusEntity'
import { VersionEntity } from './entity/VersionEntity'
import { WorldEntity } from './entity/WorldEntity'

export type * from './FlyffGameTypes'


import { inspect } from 'node:util'

import type { Context, Feature } from './types'

import { config } from './Config'
import { FlyffGameEntityBase } from './FlyffGameEntityBase'
import { Utility } from './utility/Utility'


import { BaseFeature } from './feature/base/BaseFeature'


const stdutil = new Utility()


class FlyffGameSDK {
  _mode: string = 'live'
  _options: any
  _utility = new Utility()
  _features: Feature[]
  _rootctx: Context

  constructor(options?: any) {

    this._rootctx = this._utility.makeContext({
      client: this,
      utility: this._utility,
      config,
      options,
      shared: new WeakMap()
    })

    this._options = this._utility.makeOptions(this._rootctx)

    const struct = this._utility.struct
    const getpath = struct.getpath
    const items = struct.items

    if (true === getpath(this._options.feature, 'test.active')) {
      this._mode = 'test'
    }

    this._rootctx.options = this._options

    this._features = []

    const featureAdd = this._utility.featureAdd
    const featureInit = this._utility.featureInit

    items(this._options.feature, (fitem: [string, any]) => {
      const fname = fitem[0]
      const fopts = fitem[1]
      if (fopts.active) {
        featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname))
      }
    })

    if (null != this._options.extend) {
      for (let f of this._options.extend) {
        featureAdd(this._rootctx, f)
      }
    }

    for (let f of this._features) {
      featureInit(this._rootctx, f)
    }

    const featureHook = this._utility.featureHook
    featureHook(this._rootctx, 'PostConstruct')
  }


  options() {
    return this._utility.struct.clone(this._options)
  }


  utility() {
    return this._utility.struct.clone(this._utility)
  }


  async prepare(fetchargs?: any) {
    const utility = this._utility
    const struct = utility.struct
    const clone = struct.clone

    const {
      makeContext,
      makeFetchDef,
      prepareHeaders,
      prepareAuth,
    } = utility

    fetchargs = fetchargs || {}

    let ctx: Context = makeContext({
      opname: 'prepare',
      ctrl: fetchargs.ctrl || {},
    }, this._rootctx)

    const options = this._options

    // Build spec directly from SDK options + user-provided fetch args.
    const spec: any = {
      base: options.base,
      prefix: options.prefix,
      suffix: options.suffix,
      path: fetchargs.path || '',
      method: fetchargs.method || 'GET',
      params: fetchargs.params || {},
      query: fetchargs.query || {},
      headers: prepareHeaders(ctx),
      body: fetchargs.body,
      step: 'start',
    }

    ctx.spec = spec

    // Merge user-provided headers over SDK defaults.
    if (fetchargs.headers) {
      const uheaders = fetchargs.headers
      for (let key in uheaders) {
        spec.headers[key] = uheaders[key]
      }
    }

    // Apply SDK auth (apikey, auth prefix, etc.)
    const authResult = prepareAuth(ctx)
    if (authResult instanceof Error) {
      return authResult
    }

    return makeFetchDef(ctx)
  }


  async direct(fetchargs?: any) {
    const utility = this._utility
    const fetcher = utility.fetcher
    const makeContext = utility.makeContext

    const fetchdef = await this.prepare(fetchargs)
    if (fetchdef instanceof Error) {
      return fetchdef
    }

    let ctx: Context = makeContext({
      opname: 'direct',
      ctrl: (fetchargs || {}).ctrl || {},
    }, this._rootctx)

    try {
      const fetched = await fetcher(ctx, fetchdef.url, fetchdef)

      if (null == fetched) {
        return { ok: false, err: ctx.error('direct_no_response', 'response: undefined') }
      }
      else if (fetched instanceof Error) {
        return { ok: false, err: fetched }
      }

      const status = fetched.status

      // No body responses (204 No Content, 304 Not Modified) and explicit
      // zero content-length must skip JSON parsing — fetched.json() would
      // throw `Unexpected end of JSON input` on an empty body.
      const headers = fetched.headers
      const contentLength = headers && 'function' === typeof headers.get
        ? headers.get('content-length')
        : (headers || {})['content-length']
      const noBody = 204 === status || 304 === status || '0' === String(contentLength)

      let json: any = undefined
      if (!noBody) {
        try {
          json = 'function' === typeof fetched.json ? await fetched.json() : fetched.json
        }
        catch (parseErr) {
          // Body wasn't valid JSON — surface the raw response rather than
          // throwing. data stays undefined; callers can inspect status/headers.
          json = undefined
        }
      }

      return {
        ok: status >= 200 && status < 300,
        status,
        headers: fetched.headers,
        data: json,
      }
    }
    catch (err: any) {
      return { ok: false, err }
    }
  }



  _achievement?: AchievementEntity

  // Idiomatic facade: `client.achievement.list()` / `client.achievement.load({ id })`.
  get achievement(): AchievementEntity {
    return (this._achievement ??= new AchievementEntity(this, undefined))
  }

  /** @deprecated Use `client.achievement` instead. */
  Achievement(data?: any) {
    const self = this
    return new AchievementEntity(self,data)
  }


  _awake?: AwakeEntity

  // Idiomatic facade: `client.awake.list()` / `client.awake.load({ id })`.
  get awake(): AwakeEntity {
    return (this._awake ??= new AwakeEntity(this, undefined))
  }

  /** @deprecated Use `client.awake` instead. */
  Awake(data?: any) {
    const self = this
    return new AwakeEntity(self,data)
  }


  _badge?: BadgeEntity

  // Idiomatic facade: `client.badge.list()` / `client.badge.load({ id })`.
  get badge(): BadgeEntity {
    return (this._badge ??= new BadgeEntity(this, undefined))
  }

  /** @deprecated Use `client.badge` instead. */
  Badge(data?: any) {
    const self = this
    return new BadgeEntity(self,data)
  }


  _class?: ClassEntity

  // Idiomatic facade: `client.class.list()` / `client.class.load({ id })`.
  get class(): ClassEntity {
    return (this._class ??= new ClassEntity(this, undefined))
  }

  /** @deprecated Use `client.class` instead. */
  Class(data?: any) {
    const self = this
    return new ClassEntity(self,data)
  }


  _core?: CoreEntity

  // Idiomatic facade: `client.core.list()` / `client.core.load({ id })`.
  get core(): CoreEntity {
    return (this._core ??= new CoreEntity(this, undefined))
  }

  /** @deprecated Use `client.core` instead. */
  Core(data?: any) {
    const self = this
    return new CoreEntity(self,data)
  }


  _couple?: CoupleEntity

  // Idiomatic facade: `client.couple.list()` / `client.couple.load({ id })`.
  get couple(): CoupleEntity {
    return (this._couple ??= new CoupleEntity(this, undefined))
  }

  /** @deprecated Use `client.couple` instead. */
  Couple(data?: any) {
    const self = this
    return new CoupleEntity(self,data)
  }


  _dungeon?: DungeonEntity

  // Idiomatic facade: `client.dungeon.list()` / `client.dungeon.load({ id })`.
  get dungeon(): DungeonEntity {
    return (this._dungeon ??= new DungeonEntity(this, undefined))
  }

  /** @deprecated Use `client.dungeon` instead. */
  Dungeon(data?: any) {
    const self = this
    return new DungeonEntity(self,data)
  }


  _element?: ElementEntity

  // Idiomatic facade: `client.element.list()` / `client.element.load({ id })`.
  get element(): ElementEntity {
    return (this._element ??= new ElementEntity(this, undefined))
  }

  /** @deprecated Use `client.element` instead. */
  Element(data?: any) {
    const self = this
    return new ElementEntity(self,data)
  }


  _equipment_set?: EquipmentSetEntity

  // Idiomatic facade: `client.equipment_set.list()` / `client.equipment_set.load({ id })`.
  get equipment_set(): EquipmentSetEntity {
    return (this._equipment_set ??= new EquipmentSetEntity(this, undefined))
  }

  /** @deprecated Use `client.equipment_set` instead. */
  EquipmentSet(data?: any) {
    const self = this
    return new EquipmentSetEntity(self,data)
  }


  _exchange_menus?: ExchangeMenusEntity

  // Idiomatic facade: `client.exchange_menus.list()` / `client.exchange_menus.load({ id })`.
  get exchange_menus(): ExchangeMenusEntity {
    return (this._exchange_menus ??= new ExchangeMenusEntity(this, undefined))
  }

  /** @deprecated Use `client.exchange_menus` instead. */
  ExchangeMenus(data?: any) {
    const self = this
    return new ExchangeMenusEntity(self,data)
  }


  _housing_pack?: HousingPackEntity

  // Idiomatic facade: `client.housing_pack.list()` / `client.housing_pack.load({ id })`.
  get housing_pack(): HousingPackEntity {
    return (this._housing_pack ??= new HousingPackEntity(this, undefined))
  }

  /** @deprecated Use `client.housing_pack` instead. */
  HousingPack(data?: any) {
    const self = this
    return new HousingPackEntity(self,data)
  }


  _housing_template?: HousingTemplateEntity

  // Idiomatic facade: `client.housing_template.list()` / `client.housing_template.load({ id })`.
  get housing_template(): HousingTemplateEntity {
    return (this._housing_template ??= new HousingTemplateEntity(this, undefined))
  }

  /** @deprecated Use `client.housing_template` instead. */
  HousingTemplate(data?: any) {
    const self = this
    return new HousingTemplateEntity(self,data)
  }


  _item?: ItemEntity

  // Idiomatic facade: `client.item.list()` / `client.item.load({ id })`.
  get item(): ItemEntity {
    return (this._item ??= new ItemEntity(this, undefined))
  }

  /** @deprecated Use `client.item` instead. */
  Item(data?: any) {
    const self = this
    return new ItemEntity(self,data)
  }


  _language?: LanguageEntity

  // Idiomatic facade: `client.language.list()` / `client.language.load({ id })`.
  get language(): LanguageEntity {
    return (this._language ??= new LanguageEntity(this, undefined))
  }

  /** @deprecated Use `client.language` instead. */
  Language(data?: any) {
    const self = this
    return new LanguageEntity(self,data)
  }


  _lifestyle?: LifestyleEntity

  // Idiomatic facade: `client.lifestyle.list()` / `client.lifestyle.load({ id })`.
  get lifestyle(): LifestyleEntity {
    return (this._lifestyle ??= new LifestyleEntity(this, undefined))
  }

  /** @deprecated Use `client.lifestyle` instead. */
  Lifestyle(data?: any) {
    const self = this
    return new LifestyleEntity(self,data)
  }


  _monster?: MonsterEntity

  // Idiomatic facade: `client.monster.list()` / `client.monster.load({ id })`.
  get monster(): MonsterEntity {
    return (this._monster ??= new MonsterEntity(this, undefined))
  }

  /** @deprecated Use `client.monster` instead. */
  Monster(data?: any) {
    const self = this
    return new MonsterEntity(self,data)
  }


  _npc?: NpcEntity

  // Idiomatic facade: `client.npc.list()` / `client.npc.load({ id })`.
  get npc(): NpcEntity {
    return (this._npc ??= new NpcEntity(this, undefined))
  }

  /** @deprecated Use `client.npc` instead. */
  Npc(data?: any) {
    const self = this
    return new NpcEntity(self,data)
  }


  _party_skill?: PartySkillEntity

  // Idiomatic facade: `client.party_skill.list()` / `client.party_skill.load({ id })`.
  get party_skill(): PartySkillEntity {
    return (this._party_skill ??= new PartySkillEntity(this, undefined))
  }

  /** @deprecated Use `client.party_skill` instead. */
  PartySkill(data?: any) {
    const self = this
    return new PartySkillEntity(self,data)
  }


  _pkn?: PknEntity

  // Idiomatic facade: `client.pkn.list()` / `client.pkn.load({ id })`.
  get pkn(): PknEntity {
    return (this._pkn ??= new PknEntity(this, undefined))
  }

  /** @deprecated Use `client.pkn` instead. */
  Pkn(data?: any) {
    const self = this
    return new PknEntity(self,data)
  }


  _place?: PlaceEntity

  // Idiomatic facade: `client.place.list()` / `client.place.load({ id })`.
  get place(): PlaceEntity {
    return (this._place ??= new PlaceEntity(this, undefined))
  }

  /** @deprecated Use `client.place` instead. */
  Place(data?: any) {
    const self = this
    return new PlaceEntity(self,data)
  }


  _quest?: QuestEntity

  // Idiomatic facade: `client.quest.list()` / `client.quest.load({ id })`.
  get quest(): QuestEntity {
    return (this._quest ??= new QuestEntity(this, undefined))
  }

  /** @deprecated Use `client.quest` instead. */
  Quest(data?: any) {
    const self = this
    return new QuestEntity(self,data)
  }


  _raised_pet?: RaisedPetEntity

  // Idiomatic facade: `client.raised_pet.list()` / `client.raised_pet.load({ id })`.
  get raised_pet(): RaisedPetEntity {
    return (this._raised_pet ??= new RaisedPetEntity(this, undefined))
  }

  /** @deprecated Use `client.raised_pet` instead. */
  RaisedPet(data?: any) {
    const self = this
    return new RaisedPetEntity(self,data)
  }


  _recipe?: RecipeEntity

  // Idiomatic facade: `client.recipe.list()` / `client.recipe.load({ id })`.
  get recipe(): RecipeEntity {
    return (this._recipe ??= new RecipeEntity(this, undefined))
  }

  /** @deprecated Use `client.recipe` instead. */
  Recipe(data?: any) {
    const self = this
    return new RecipeEntity(self,data)
  }


  _skill?: SkillEntity

  // Idiomatic facade: `client.skill.list()` / `client.skill.load({ id })`.
  get skill(): SkillEntity {
    return (this._skill ??= new SkillEntity(this, undefined))
  }

  /** @deprecated Use `client.skill` instead. */
  Skill(data?: any) {
    const self = this
    return new SkillEntity(self,data)
  }


  _upgrade_level_bonus?: UpgradeLevelBonusEntity

  // Idiomatic facade: `client.upgrade_level_bonus.list()` / `client.upgrade_level_bonus.load({ id })`.
  get upgrade_level_bonus(): UpgradeLevelBonusEntity {
    return (this._upgrade_level_bonus ??= new UpgradeLevelBonusEntity(this, undefined))
  }

  /** @deprecated Use `client.upgrade_level_bonus` instead. */
  UpgradeLevelBonus(data?: any) {
    const self = this
    return new UpgradeLevelBonusEntity(self,data)
  }


  _version?: VersionEntity

  // Idiomatic facade: `client.version.list()` / `client.version.load({ id })`.
  get version(): VersionEntity {
    return (this._version ??= new VersionEntity(this, undefined))
  }

  /** @deprecated Use `client.version` instead. */
  Version(data?: any) {
    const self = this
    return new VersionEntity(self,data)
  }


  _world?: WorldEntity

  // Idiomatic facade: `client.world.list()` / `client.world.load({ id })`.
  get world(): WorldEntity {
    return (this._world ??= new WorldEntity(this, undefined))
  }

  /** @deprecated Use `client.world` instead. */
  World(data?: any) {
    const self = this
    return new WorldEntity(self,data)
  }




  static test(testoptsarg?: any, sdkoptsarg?: any) {
    const struct = stdutil.struct
    const setpath = struct.setpath
    const getdef = struct.getdef
    const clone = struct.clone
    const setprop = struct.setprop

    const sdkopts = getdef(clone(sdkoptsarg), {})
    const testopts = getdef(clone(testoptsarg), {})
    setprop(testopts, 'active', true)
    setpath(sdkopts, 'feature.test', testopts)

    const testsdk = new FlyffGameSDK(sdkopts)
    testsdk._mode = 'test'

    return testsdk
  }


  tester(testopts?: any, sdkopts?: any) {
    return FlyffGameSDK.test(testopts, sdkopts)
  }


  toJSON() {
    return { name: 'FlyffGame' }
  }

  toString() {
    return 'FlyffGame ' + this._utility.struct.jsonify(this.toJSON())
  }

  [inspect.custom]() {
    return this.toString()
  }

}




const SDK = FlyffGameSDK


export {
  stdutil,

  BaseFeature,
  FlyffGameEntityBase,

  FlyffGameSDK,
  SDK,
}


