

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


describe('PartySkillEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when FLYFF_GAME_TEST_LIVE=TRUE.
  afterEach(liveDelay('FLYFF_GAME_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = FlyffGameSDK.test()
    const ent = testsdk.PartySkill()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.FLYFF_GAME_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'party_skill.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[],"name":"party_skill","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /partyskill","json":"{\"operationId\":\"getAllPartySkillIds\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"type\":\"integer\"},\"type\":\"array\"}}},\"description\":\"Successful operation\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/partyskill","segments":[{"lit":"partyskill"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"party_skill_id","orig":"party_skill_id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /partyskill/{partySkillIds}","json":"{\"operationId\":\"getPartySkillsByIds\",\"parameters\":[{\"description\":\"IDs of party skills to return separated by comma\",\"in\":\"path\",\"name\":\"partySkillIds\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful operation\"},\"400\":{\"description\":\"Invalid list of IDs supplied\"},\"404\":{\"description\":\"Party skill not found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/partyskill/{partySkillIds}","rename":{"param":{"partySkillIds":"party_skill_id"}},"segments":[{"lit":"partyskill"},{"var":"party_skill_id"}],"select":{"exist":["party_skill_id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"party_skill_id","orig":"party_skill_id","reqd":true,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /partyskill/{partySkillId}","json":"{\"operationId\":\"getPartySkillById\",\"parameters\":[{\"description\":\"ID of party skill to return\",\"in\":\"path\",\"name\":\"partySkillId\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"type\":\"object\"}}},\"description\":\"Successful operation\"},\"400\":{\"description\":\"Invalid ID supplied\"},\"404\":{\"description\":\"Party skill not found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/partyskill/{partySkillId}","rename":{"param":{"partySkillId":"party_skill_id"}},"segments":[{"lit":"partyskill"},{"var":"party_skill_id"}],"select":{"exist":["party_skill_id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[["partyskill"]]},"key$":"party_skill","name__orig":"party_skill","Name":"PartySkill","name_":"party_skill","name-":"party-skill","NAME":"PARTY_SKILL","index$":17}, {"active":true,"entity":"party_skill","key$":"BasicPartySkillFlow","kind":"basic","name":"BasicPartySkillFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"party_skill_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"party_skill_ref01","srcdatavar":"party_skill_ref01_data","suffix":"_dt0"},"match":{"id":"party_skill01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-party_skill_ref01"}}],"index$":1}]}, 'PartySkill')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let party_skill_ref01_data = Object.values(setup.data.existing.party_skill)[0] as any

    // LIST
    const party_skill_ref01_ent = client.PartySkill()
    const party_skill_ref01_match: any = {}

    const party_skill_ref01_list = (await party_skill_ref01_ent.list(party_skill_ref01_match)).map((e: any) => e.data())



  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/party_skill/PartySkillTestData.json')

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
    ['party_skill01','party_skill02','party_skill03','partyskill01','partyskill02','partyskill03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'FLYFF_GAME_TEST_PARTY_SKILL_ENTID': idmap,
    'FLYFF_GAME_TEST_LIVE': 'FALSE',
    'FLYFF_GAME_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['FLYFF_GAME_TEST_PARTY_SKILL_ENTID']

  const live = 'TRUE' === env.FLYFF_GAME_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['FLYFF_GAME_TEST_PARTY_SKILL_ENTID']
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
  
