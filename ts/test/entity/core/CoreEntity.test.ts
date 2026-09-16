

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


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('CoreEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when FLYFF_GAME_TEST_LIVE=TRUE.
  afterEach(liveDelay('FLYFF_GAME_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = FlyffGameSDK.test()
    const ent = testsdk.Core()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.FLYFF_GAME_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'core.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[],"name":"core","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"parameter_id","orig":"parameter_id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /parameter/{parameterIds}","json":"{\"operationId\":\"getParameterNames\",\"parameters\":[{\"description\":\"IDs of parameters separated by comma\",\"in\":\"path\",\"name\":\"parameterIds\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful operation\"},\"404\":{\"description\":\"Parameters not found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/parameter/{parameterIds}","rename":{"param":{"parameterIds":"parameter_id"}},"segments":[{"lit":"parameter"},{"var":"parameter_id"}],"select":{"exist":["parameter_id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"parameter_id","orig":"parameter_id","reqd":true,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /parameter/{parameterId}","json":"{\"operationId\":\"getParameterName\",\"parameters\":[{\"description\":\"ID of parameter\",\"in\":\"path\",\"name\":\"parameterId\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"type\":\"object\"}}},\"description\":\"Successful operation\"},\"404\":{\"description\":\"Parameter not found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/parameter/{parameterId}","rename":{"param":{"parameterId":"parameter_id"}},"segments":[{"lit":"parameter"},{"var":"parameter_id"}],"select":{"exist":["parameter_id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[["parameter"]]},"key$":"core","name__orig":"core","Name":"Core","name_":"core","name-":"core","NAME":"CORE","index$":4}, {"active":true,"entity":"core","key$":"BasicCoreFlow","kind":"basic","name":"BasicCoreFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"core_ref01","srcdatavar":"core_ref01_data","suffix":"_dt0"},"match":{"id":"core01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-core_ref01"}}],"index$":0}]}, 'Core')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let core_ref01_data = Object.values(setup.data.existing.core)[0] as any

    // LOAD: skipped — no entity id field and load requires path params.
    // Entity-var is declared here so later flow steps still compile.
    const core_ref01_ent = client.Core()


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/core/CoreTestData.json')

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
    ['core01','core02','core03','parameter01','parameter02','parameter03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'FLYFF_GAME_TEST_CORE_ENTID': idmap,
    'FLYFF_GAME_TEST_LIVE': 'FALSE',
    'FLYFF_GAME_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['FLYFF_GAME_TEST_CORE_ENTID']

  const live = 'TRUE' === env.FLYFF_GAME_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['FLYFF_GAME_TEST_CORE_ENTID']
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
  
