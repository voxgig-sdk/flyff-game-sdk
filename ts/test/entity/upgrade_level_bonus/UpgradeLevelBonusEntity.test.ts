

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


describe('UpgradeLevelBonusEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when FLYFF_GAME_TEST_LIVE=TRUE.
  afterEach(liveDelay('FLYFF_GAME_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = FlyffGameSDK.test()
    const ent = testsdk.UpgradeLevelBonus()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.FLYFF_GAME_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'upgrade_level_bonus.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"upgrade_level_bonus","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /upgradelevelbonus","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/upgradelevelbonus","q":{},"r":{},"s":[{"lit":"upgradelevelbonus"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"upgrade_level_bonus","name__orig":"upgrade_level_bonus","Name":"UpgradeLevelBonus","name_":"upgrade_level_bonus","name-":"upgrade-level-bonus","NAME":"UPGRADE_LEVEL_BONUS","index$":24}, {"active":true,"entity":"upgrade_level_bonus","key$":"BasicUpgradeLevelBonusFlow","kind":"basic","name":"BasicUpgradeLevelBonusFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"upgrade_level_bonus_ref01","srcdatavar":"upgrade_level_bonus_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-upgrade_level_bonus_ref01"}}],"index$":0}]}, 'UpgradeLevelBonus', {"GET /upgradelevelbonus":{"protocol":"http","operationId":"getUpgradeLevelBonus","responses":{"200":{"description":"Successful operation","content":{"application/json":{"schema":{"type":"object"}}}}},"parameters":[],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let upgrade_level_bonus_ref01_data = Object.values(setup.data.existing.upgrade_level_bonus)[0] as any

    // LOAD
    const upgrade_level_bonus_ref01_ent = client.UpgradeLevelBonus()
    const upgrade_level_bonus_ref01_match_dt0: any = {}
    const upgrade_level_bonus_ref01_data_dt0 = (await upgrade_level_bonus_ref01_ent.load(upgrade_level_bonus_ref01_match_dt0)).data()
    assert(null != upgrade_level_bonus_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/upgrade_level_bonus/UpgradeLevelBonusTestData.json')

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
    ['upgrade_level_bonus01','upgrade_level_bonus02','upgrade_level_bonus03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'FLYFF_GAME_TEST_UPGRADE_LEVEL_BONUS_ENTID': idmap,
    'FLYFF_GAME_TEST_LIVE': 'FALSE',
    'FLYFF_GAME_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['FLYFF_GAME_TEST_UPGRADE_LEVEL_BONUS_ENTID']

  const live = 'TRUE' === env.FLYFF_GAME_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['FLYFF_GAME_TEST_UPGRADE_LEVEL_BONUS_ENTID']
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
  
