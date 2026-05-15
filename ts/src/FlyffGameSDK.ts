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



  Achievement(data?: any) {
    const self = this
    return new AchievementEntity(self,data)
  }


  Awake(data?: any) {
    const self = this
    return new AwakeEntity(self,data)
  }


  Badge(data?: any) {
    const self = this
    return new BadgeEntity(self,data)
  }


  Class(data?: any) {
    const self = this
    return new ClassEntity(self,data)
  }


  Core(data?: any) {
    const self = this
    return new CoreEntity(self,data)
  }


  Couple(data?: any) {
    const self = this
    return new CoupleEntity(self,data)
  }


  Dungeon(data?: any) {
    const self = this
    return new DungeonEntity(self,data)
  }


  Element(data?: any) {
    const self = this
    return new ElementEntity(self,data)
  }


  EquipmentSet(data?: any) {
    const self = this
    return new EquipmentSetEntity(self,data)
  }


  ExchangeMenus(data?: any) {
    const self = this
    return new ExchangeMenusEntity(self,data)
  }


  HousingPack(data?: any) {
    const self = this
    return new HousingPackEntity(self,data)
  }


  HousingTemplate(data?: any) {
    const self = this
    return new HousingTemplateEntity(self,data)
  }


  Item(data?: any) {
    const self = this
    return new ItemEntity(self,data)
  }


  Language(data?: any) {
    const self = this
    return new LanguageEntity(self,data)
  }


  Lifestyle(data?: any) {
    const self = this
    return new LifestyleEntity(self,data)
  }


  Monster(data?: any) {
    const self = this
    return new MonsterEntity(self,data)
  }


  Npc(data?: any) {
    const self = this
    return new NpcEntity(self,data)
  }


  PartySkill(data?: any) {
    const self = this
    return new PartySkillEntity(self,data)
  }


  Pkn(data?: any) {
    const self = this
    return new PknEntity(self,data)
  }


  Place(data?: any) {
    const self = this
    return new PlaceEntity(self,data)
  }


  Quest(data?: any) {
    const self = this
    return new QuestEntity(self,data)
  }


  RaisedPet(data?: any) {
    const self = this
    return new RaisedPetEntity(self,data)
  }


  Recipe(data?: any) {
    const self = this
    return new RecipeEntity(self,data)
  }


  Skill(data?: any) {
    const self = this
    return new SkillEntity(self,data)
  }


  UpgradeLevelBonus(data?: any) {
    const self = this
    return new UpgradeLevelBonusEntity(self,data)
  }


  Version(data?: any) {
    const self = this
    return new VersionEntity(self,data)
  }


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


