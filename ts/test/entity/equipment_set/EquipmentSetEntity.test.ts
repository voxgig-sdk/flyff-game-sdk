

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


describe('EquipmentSetEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when FLYFF_GAME_TEST_LIVE=TRUE.
  afterEach(liveDelay('FLYFF_GAME_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = FlyffGameSDK.test()
    const ent = testsdk.EquipmentSet()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.FLYFF_GAME_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'equipment_set.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"equipment_set","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /equipmentset","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/equipmentset","q":{},"r":{},"s":[{"lit":"equipmentset"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /equipmentset/{equipmentSetIds}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"equipment_set_id","or":"equipment_set_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/equipmentset/{equipmentSetIds}","q":{"exist":["equipment_set_id"]},"r":{"param":{"equipmentSetIds":"equipment_set_id"}},"s":[{"lit":"equipmentset"},{"var":"equipment_set_id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /equipmentset/{equipmentSetId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"equipment_set_id","or":"equipment_set_id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/equipmentset/{equipmentSetId}","q":{"exist":["equipment_set_id"]},"r":{"param":{"equipmentSetId":"equipment_set_id"}},"s":[{"lit":"equipmentset"},{"var":"equipment_set_id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"equipment_set","name__orig":"equipment_set","Name":"EquipmentSet","name_":"equipment_set","name-":"equipment-set","NAME":"EQUIPMENT_SET","index$":8}, {"active":true,"entity":"equipment_set","key$":"BasicEquipmentSetFlow","kind":"basic","name":"BasicEquipmentSetFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"equipment_set_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"equipment_set_ref01","srcdatavar":"equipment_set_ref01_data","suffix":"_dt0"},"m":{"id":"equipment_set01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-equipment_set_ref01"}}],"index$":1}]}, 'EquipmentSet', {"GET /equipmentset":{"protocol":"http","operationId":"getAllEquipmentSetIds","responses":{"200":{"description":"Successful operation","content":{"application/json":{"schema":{"type":"array","items":{"type":"integer","key$":"items"}}}}}},"parameters":[],"securitySource":"unspecified"},"GET /equipmentset/{equipmentSetIds}":{"protocol":"http","operationId":"getEquipmentSetsByIds","responses":{"200":{"description":"Successful operation","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","key$":"items"}}}}},"400":{"description":"Invalid list of IDs supplied"},"404":{"description":"Equipment set not found"}},"parameters":[{"name":"equipmentSetIds","in":"path","description":"IDs of equipment sets to return separated by comma","required":true,"schema":{"type":"string"},"index$":0}],"securitySource":"unspecified"},"GET /equipmentset/{equipmentSetId}":{"protocol":"http","operationId":"getEquipmentSetById","responses":{"200":{"description":"Successful operation","content":{"application/json":{"schema":{"type":"object"}}}},"400":{"description":"Invalid ID supplied"},"404":{"description":"Equipment set not found"}},"parameters":[{"name":"equipmentSetId","in":"path","description":"ID of equipment set to return","required":true,"schema":{"type":"integer"},"index$":0}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let equipment_set_ref01_data = Object.values(setup.data.existing.equipment_set)[0] as any

    // LIST
    const equipment_set_ref01_ent = client.EquipmentSet()
    const equipment_set_ref01_match: any = {}

    const equipment_set_ref01_list = (await equipment_set_ref01_ent.list(equipment_set_ref01_match)).map((e: any) => e.data())



  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/equipment_set/EquipmentSetTestData.json')

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
    ['equipment_set01','equipment_set02','equipment_set03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'FLYFF_GAME_TEST_EQUIPMENT_SET_ENTID': idmap,
    'FLYFF_GAME_TEST_LIVE': 'FALSE',
    'FLYFF_GAME_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['FLYFF_GAME_TEST_EQUIPMENT_SET_ENTID']

  const live = 'TRUE' === env.FLYFF_GAME_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['FLYFF_GAME_TEST_EQUIPMENT_SET_ENTID']
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
  
