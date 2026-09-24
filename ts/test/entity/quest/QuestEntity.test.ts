

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


describe('QuestEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when FLYFF_GAME_TEST_LIVE=TRUE.
  afterEach(liveDelay('FLYFF_GAME_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = FlyffGameSDK.test()
    const ent = testsdk.Quest()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.FLYFF_GAME_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'quest.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":0}},"id":{"field":"id","name":"id"},"name":"quest","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /quest","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/quest","q":{},"r":{},"s":[{"lit":"quest"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /quest/{questIds}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"quest_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/quest/{questIds}","q":{"exist":["id"]},"r":{"param":{"questIds":"id"}},"s":[{"lit":"quest"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /quest/{questId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"quest_id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/quest/{questId}","q":{"exist":["id"]},"r":{"param":{"questId":"id"}},"s":[{"lit":"quest"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"quest","name__orig":"quest","Name":"Quest","name_":"quest","name-":"quest","NAME":"QUEST","index$":20}, {"active":true,"entity":"quest","key$":"BasicQuestFlow","kind":"basic","name":"BasicQuestFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"quest_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"quest_ref01","srcdatavar":"quest_ref01_data","suffix":"_dt0"},"m":{"id":"quest01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-quest_ref01"}}],"index$":1}]}, 'Quest', {"GET /quest":{"protocol":"http","operationId":"getAllQuestIds","responses":{"200":{"description":"Successful operation","content":{"application/json":{"schema":{"type":"array","items":{"type":"integer","key$":"items"}}}}}},"parameters":[],"securitySource":"unspecified"},"GET /quest/{questIds}":{"protocol":"http","operationId":"getQuestsByIds","responses":{"200":{"description":"Successful operation","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","key$":"items"}}}}},"400":{"description":"Invalid list of IDs supplied"},"404":{"description":"Quest not found"}},"parameters":[{"name":"questIds","in":"path","description":"IDs of quests to return separated by comma","required":true,"schema":{"type":"string"},"index$":0}],"securitySource":"unspecified"},"GET /quest/{questId}":{"protocol":"http","operationId":"getQuestById","responses":{"200":{"description":"Successful operation","content":{"application/json":{"schema":{"type":"object"}}}},"400":{"description":"Invalid ID supplied"},"404":{"description":"Quest not found"}},"parameters":[{"name":"questId","in":"path","description":"ID of quest to return","required":true,"schema":{"type":"integer"},"index$":0}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let quest_ref01_data = Object.values(setup.data.existing.quest)[0] as any

    // LIST
    const quest_ref01_ent = client.Quest()
    const quest_ref01_match: any = {}

    const quest_ref01_list = (await quest_ref01_ent.list(quest_ref01_match)).map((e: any) => e.data())


    // LOAD
    const quest_ref01_match_dt0: any = {}
    quest_ref01_match_dt0.id = quest_ref01_data.id
    const quest_ref01_data_dt0 = (await quest_ref01_ent.load(quest_ref01_match_dt0)).data()
    assert(quest_ref01_data_dt0.id === quest_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/quest/QuestTestData.json')

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
    ['quest01','quest02','quest03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'FLYFF_GAME_TEST_QUEST_ENTID': idmap,
    'FLYFF_GAME_TEST_LIVE': 'FALSE',
    'FLYFF_GAME_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['FLYFF_GAME_TEST_QUEST_ENTID']

  const live = 'TRUE' === env.FLYFF_GAME_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['FLYFF_GAME_TEST_QUEST_ENTID']
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
  
