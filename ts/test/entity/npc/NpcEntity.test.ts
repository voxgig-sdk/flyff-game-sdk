

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


describe('NpcEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when FLYFF_GAME_TEST_LIVE=TRUE.
  afterEach(liveDelay('FLYFF_GAME_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = FlyffGameSDK.test()
    const ent = testsdk.Npc()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.FLYFF_GAME_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'npc.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":0}},"id":{"field":"id","name":"id"},"name":"npc","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /npc","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/npc","q":{},"r":{},"s":[{"lit":"npc"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /image/npc/{fileName}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"file_name","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/image/npc/{fileName}","q":{"exist":["id"]},"r":{"param":{"fileName":"id"}},"s":[{"lit":"image"},{"lit":"npc"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /npc/{npcIds}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"npc_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/npc/{npcIds}","q":{"exist":["id"]},"r":{"param":{"npcIds":"id"}},"s":[{"lit":"npc"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"co":{"id":"GET /npc/{npcId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"npc_id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/npc/{npcId}","q":{"exist":["id"]},"r":{"param":{"npcId":"id"}},"s":[{"lit":"npc"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"npc","name__orig":"npc","Name":"Npc","name_":"npc","name-":"npc","NAME":"NPC","index$":16}, {"active":true,"entity":"npc","key$":"BasicNpcFlow","kind":"basic","name":"BasicNpcFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"npc_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"npc_ref01","srcdatavar":"npc_ref01_data","suffix":"_dt0"},"m":{"id":"npc01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-npc_ref01"}}],"index$":1}]}, 'Npc', {"GET /npc":{"protocol":"http","operationId":"getAllNpcIds","responses":{"200":{"description":"Successful operation","content":{"application/json":{"schema":{"type":"array","items":{"type":"integer","key$":"items"}}}}}},"parameters":[],"securitySource":"unspecified"},"GET /image/npc/{fileName}":{"protocol":"http","operationId":"getNpcDialogImage","responses":{"200":{"description":"Successful operation","content":{"image/png":{"schema":{"type":"string","format":"binary"}}}},"404":{"description":"Image not found"}},"parameters":[{"name":"fileName","in":"path","description":"File name of the NPC dialog image","required":true,"schema":{"type":"string"},"index$":0}],"securitySource":"unspecified"},"GET /npc/{npcIds}":{"protocol":"http","operationId":"getNpcsByIds","responses":{"200":{"description":"Successful operation","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","key$":"items"}}}}},"400":{"description":"Invalid list of IDs supplied"},"404":{"description":"NPC not found"}},"parameters":[{"name":"npcIds","in":"path","description":"IDs of NPCs to return separated by comma","required":true,"schema":{"type":"string"},"index$":0}],"securitySource":"unspecified"},"GET /npc/{npcId}":{"protocol":"http","operationId":"getNpcById","responses":{"200":{"description":"Successful operation","content":{"application/json":{"schema":{"type":"object"}}}},"400":{"description":"Invalid ID supplied"},"404":{"description":"NPC not found"}},"parameters":[{"name":"npcId","in":"path","description":"ID of NPC to return","required":true,"schema":{"type":"integer"},"index$":0}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let npc_ref01_data = Object.values(setup.data.existing.npc)[0] as any

    // LIST
    const npc_ref01_ent = client.Npc()
    const npc_ref01_match: any = {}

    const npc_ref01_list = (await npc_ref01_ent.list(npc_ref01_match)).map((e: any) => e.data())


    // LOAD
    const npc_ref01_match_dt0: any = {}
    npc_ref01_match_dt0.id = npc_ref01_data.id
    const npc_ref01_data_dt0 = (await npc_ref01_ent.load(npc_ref01_match_dt0)).data()
    assert(npc_ref01_data_dt0.id === npc_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/npc/NpcTestData.json')

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
    ['npc01','npc02','npc03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'FLYFF_GAME_TEST_NPC_ENTID': idmap,
    'FLYFF_GAME_TEST_LIVE': 'FALSE',
    'FLYFF_GAME_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['FLYFF_GAME_TEST_NPC_ENTID']

  const live = 'TRUE' === env.FLYFF_GAME_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['FLYFF_GAME_TEST_NPC_ENTID']
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
  
