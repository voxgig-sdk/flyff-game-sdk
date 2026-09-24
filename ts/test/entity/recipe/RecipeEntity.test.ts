

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { FlyffGameSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('RecipeEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when FLYFF_GAME_TEST_LIVE=TRUE.
  afterEach(liveDelay('FLYFF_GAME_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = FlyffGameSDK.test()
    const ent = testsdk.Recipe()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.FLYFF_GAME_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'recipe.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":0}},"id":{"field":"id","name":"id"},"name":"recipe","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /recipe","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/recipe","q":{},"r":{},"s":[{"lit":"recipe"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /recipe/{recipeIds}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"recipe_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/recipe/{recipeIds}","q":{"exist":["id"]},"r":{"param":{"recipeIds":"id"}},"s":[{"lit":"recipe"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /recipe/{recipeId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"recipe_id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/recipe/{recipeId}","q":{"exist":["id"]},"r":{"param":{"recipeId":"id"}},"s":[{"lit":"recipe"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"recipe","name__orig":"recipe","Name":"Recipe","name_":"recipe","name-":"recipe","NAME":"RECIPE","index$":22}, {"active":true,"entity":"recipe","key$":"BasicRecipeFlow","kind":"basic","name":"BasicRecipeFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"recipe_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"recipe_ref01","srcdatavar":"recipe_ref01_data","suffix":"_dt0"},"m":{"id":"recipe01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-recipe_ref01"}}],"index$":1}]}, 'Recipe', {"GET /recipe":{"protocol":"http","operationId":"getAllRecipeIds","responses":{"200":{"description":"Successful operation","content":{"application/json":{"schema":{"type":"array","items":{"type":"integer","key$":"items"}}}}}},"parameters":[],"securitySource":"unspecified"},"GET /recipe/{recipeIds}":{"protocol":"http","operationId":"getRecipesByIds","responses":{"200":{"description":"Successful operation","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","key$":"items"}}}}},"400":{"description":"Invalid list of IDs supplied"},"404":{"description":"Recipe not found"}},"parameters":[{"name":"recipeIds","in":"path","description":"IDs of recipes to return separated by comma","required":true,"schema":{"type":"string"},"index$":0}],"securitySource":"unspecified"},"GET /recipe/{recipeId}":{"protocol":"http","operationId":"getRecipeById","responses":{"200":{"description":"Successful operation","content":{"application/json":{"schema":{"type":"object"}}}},"400":{"description":"Invalid ID supplied"},"404":{"description":"Recipe not found"}},"parameters":[{"name":"recipeId","in":"path","description":"ID of recipe to return","required":true,"schema":{"type":"integer"},"index$":0}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let recipe_ref01_data = Object.values(setup.data.existing.recipe)[0] as any

    // LIST
    const recipe_ref01_ent = client.Recipe()
    const recipe_ref01_match: any = {}

    const recipe_ref01_list = (await recipe_ref01_ent.list(recipe_ref01_match)).map((e: any) => e.data())


    // LOAD
    const recipe_ref01_match_dt0: any = {}
    recipe_ref01_match_dt0.id = recipe_ref01_data.id
    const recipe_ref01_data_dt0 = (await recipe_ref01_ent.load(recipe_ref01_match_dt0)).data()
    assert(recipe_ref01_data_dt0.id === recipe_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/recipe/RecipeTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = FlyffGameSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['recipe01','recipe02','recipe03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'FLYFF_GAME_TEST_RECIPE_ENTID': idmap,
    'FLYFF_GAME_TEST_LIVE': 'FALSE',
    'FLYFF_GAME_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['FLYFF_GAME_TEST_RECIPE_ENTID']

  const live = 'TRUE' === env.FLYFF_GAME_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['FLYFF_GAME_TEST_RECIPE_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new FlyffGameSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.FLYFF_GAME_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
