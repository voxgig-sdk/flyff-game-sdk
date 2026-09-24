

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


describe('WorldEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when FLYFF_GAME_TEST_LIVE=TRUE.
  afterEach(liveDelay('FLYFF_GAME_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = FlyffGameSDK.test()
    const ent = testsdk.World()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.FLYFF_GAME_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'world.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"continents":{"a":true,"h":"Continents","n":"continents","r":true,"sh":"Continents in the World","t":"`$ARRAY`","key$":"continents","index$":0},"flying":{"a":true,"h":"Flying","n":"flying","r":true,"sh":"Whether players can fly in the World or not","t":"`$BOOLEAN`","key$":"flying","index$":1},"height":{"a":true,"h":"Height","n":"height","r":true,"sh":"Height of the World in meters","t":"`$INTEGER`","key$":"height","index$":2},"id":{"a":true,"h":"Id","n":"id","r":true,"sh":"ID of the World","t":"`$INTEGER`","key$":"id","index$":3},"inDoor":{"a":true,"h":"In Door","n":"inDoor","r":true,"sh":"Whether the World has a sky or not","t":"`$BOOLEAN`","key$":"inDoor","index$":4},"lodestars":{"a":true,"h":"Lodestars","n":"lodestars","r":true,"sh":"Revival places in the World","t":"`$ARRAY`","key$":"lodestars","index$":5},"name":{"a":true,"h":"Name","n":"name","r":true,"sh":"Text available in several languages","t":"`$OBJECT`","key$":"name","index$":6},"pk":{"a":true,"h":"Pk","n":"pk","r":true,"sh":"Whether players can kill other players in the World or not","t":"`$BOOLEAN`","key$":"pk","index$":7},"places":{"a":true,"h":"Places","n":"places","r":true,"sh":"Special Places in the World","t":"`$ARRAY`","key$":"places","index$":8},"revivalKey":{"a":true,"h":"Revival Key","n":"revivalKey","r":false,"sh":"ID of the Lodestar where players revive when they die in the World","t":"`$STRING`","key$":"revivalKey","index$":9},"revivalWorld":{"a":true,"h":"Revival World","n":"revivalWorld","r":false,"sh":"ID of the World where players revive when they die in the World","t":"`$INTEGER`","key$":"revivalWorld","index$":10},"tileName":{"a":true,"h":"Tile Name","n":"tileName","r":true,"sh":"Name of the world Tiles for navigator","t":"`$STRING`","key$":"tileName","index$":11},"tileSize":{"a":true,"h":"Tile Size","n":"tileSize","r":true,"sh":"World meters per Tile","t":"`$INTEGER`","key$":"tileSize","index$":12},"type":{"a":true,"h":"Type","n":"type","r":true,"sh":"Type of the World","t":"`$STRING`","key$":"type","index$":13},"width":{"a":true,"h":"Width","n":"width","r":true,"sh":"Width of the World in meters","t":"`$INTEGER`","key$":"width","index$":14}},"id":{"field":"id","name":"id"},"name":"world","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /world","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/world","q":{},"r":{},"s":[{"lit":"world"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /image/world/{worldTileName}{tileX}-{tileY}-0.png","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"tile_x","or":"tile_x","r":true,"t":"`$INTEGER`","index$":0},{"a":true,"k":"param","n":"tile_y","or":"tile_y","r":true,"t":"`$INTEGER`","index$":1},{"a":true,"ex":"wdmadrigal","k":"param","n":"world_tile_name","or":"world_tile_name","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/image/world/{worldTileName}{tileX}-{tileY}-0.png","q":{"$action":"world_tile_nametile_x_tile_y_0","exist":["tile_x","tile_y","world_tile_name"]},"r":{},"s":[{"lit":"image"},{"lit":"world"},{"lit":"{worldTileName}{tileX}-{tileY}-0.png"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /world/{worldIds}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"4015,4839,6063","k":"param","n":"id","or":"world_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/world/{worldIds}","q":{"exist":["id"]},"r":{"param":{"worldIds":"id"}},"s":[{"lit":"world"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"co":{"id":"GET /world/{worldId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":4015,"k":"param","n":"id","or":"world_id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/world/{worldId}","q":{"exist":["id"]},"r":{"param":{"worldId":"id"}},"s":[{"lit":"world"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"world","name__orig":"world","Name":"World","name_":"world","name-":"world","NAME":"WORLD","index$":26}, {"active":true,"entity":"world","key$":"BasicWorldFlow","kind":"basic","name":"BasicWorldFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"world_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"world_ref01","srcdatavar":"world_ref01_data","suffix":"_dt0"},"m":{"id":"world01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-world_ref01"}}],"index$":1}]}, 'World', {"GET /world":{"protocol":"http","operationId":"getAllWorldIds","responses":{"200":{"description":"Successful operation","content":{"application/json":{"schema":{"type":"array","items":{"type":"integer","key$":"items"},"example":[4015,4839,6063]}}}}},"parameters":[],"securitySource":"unspecified"},"GET /image/world/{worldTileName}{tileX}-{tileY}-0.png":{"protocol":"http","operationId":"getWorldTile","responses":{"200":{"description":"Successful operation","content":{"image/png":{"schema":{"type":"string","format":"binary"}}}},"404":{"description":"Tile not found"}},"parameters":[{"name":"worldTileName","in":"path","description":"Tile name of the world","required":true,"schema":{"type":"string","example":"wdmadrigal"},"index$":0},{"name":"tileX","in":"path","description":"X position of the tile","required":true,"schema":{"type":"integer"},"index$":1},{"name":"tileY","in":"path","description":"Y position of the tile","required":true,"schema":{"type":"integer"},"index$":2}],"securitySource":"unspecified"},"GET /world/{worldIds}":{"protocol":"http","operationId":"getWorldsByIds","responses":{"200":{"description":"Successful operation","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","required":["id","name","type","width","height","tileName","tileSize","flying","pk","inDoor","places","lodestars","continents"],"properties":{"id":{"type":"integer","description":"ID of the World","key$":"id"},"name":{"type":"object","description":"Text available in several languages","properties":{"en":{"type":"string","description":"English text"},"fr":{"type":"string","description":"French text"},"kr":{"type":"string","description":"Korean text"}},"example":{"en":"Julia","fr":"[Intendante de Flarine] Julia","kr":"쥬리아"},"x-ref":"#/components/schemas/LocalizedText","key$":"name"},"type":{"type":"string","enum":["main","prison","dungeon","instance","event"],"description":"Type of the World","key$":"type"},"width":{"type":"integer","description":"Width of the World in meters","key$":"width"},"height":{"type":"integer","description":"Height of the World in meters","key$":"height"},"tileName":{"type":"string","description":"Name of the world Tiles for navigator","key$":"tileName"},"tileSize":{"type":"integer","description":"World meters per Tile","key$":"tileSize"},"flying":{"type":"boolean","description":"Whether players can fly in the World or not","key$":"flying"},"pk":{"type":"boolean","description":"Whether players can kill other players in the World or not","key$":"pk"},"inDoor":{"type":"boolean","description":"Whether the World has a sky or not","key$":"inDoor"},"revivalWorld":{"type":"integer","description":"ID of the World where players revive when they die in the World","key$":"revivalWorld"},"revivalKey":{"type":"string","description":"ID of the Lodestar where players revive when they die in the World","key$":"revivalKey"},"places":{"type":"array","description":"Special Places in the World","items":{"type":"object","properties":{"type":{"type":"string","description":"Type of place"},"location":{"type":"object","properties":{"world":{"type":"integer","description":"World ID"},"x":{"type":"number","format":"float","description":"X coordinate"},"y":{"type":"number","format":"float","description":"Y coordinate"},"z":{"type":"number","format":"float","description":"Z coordinate"},"continent":{"type":"integer","description":"Continent ID"}},"x-ref":"#/components/schemas/Location"}},"x-ref":"#/components/schemas/Place"},"key$":"places"},"lodestars":{"type":"array","description":"Revival places in the World","items":{"type":"object","properties":{"key":{"type":"string","description":"Lodestar key"},"location":{"type":"object","properties":{"world":{"type":"integer","description":"World ID"},"x":{"type":"number","format":"float","description":"X coordinate"},"y":{"type":"number","format":"float","description":"Y coordinate"},"z":{"type":"number","format":"float","description":"Z coordinate"},"continent":{"type":"integer","description":"Continent ID"}},"x-ref":"#/components/schemas/Location"}},"x-ref":"#/components/schemas/Lodestar"},"key$":"lodestars"},"continents":{"type":"array","description":"Continents in the World","items":{"type":"object","properties":{"id":{"type":"integer","description":"Continent ID"},"name":{"type":"object","description":"Text available in several languages","properties":{"en":{"type":"string","description":"English text"},"fr":{"type":"string","description":"French text"},"kr":{"type":"string","description":"Korean text"}},"example":{"en":"Julia","fr":"[Intendante de Flarine] Julia","kr":"쥬리아"},"x-ref":"#/components/schemas/LocalizedText"},"town":{"type":"boolean","description":"Whether the continent is a town"},"polygon":{"type":"array","items":{"type":"object","properties":{"x":{"type":"number"},"z":{"type":"number"}}}}},"x-ref":"#/components/schemas/Continent"},"key$":"continents"}},"x-ref":"#/components/schemas/World","key$":"items"}}}}},"400":{"description":"Invalid list of IDs supplied"},"404":{"description":"World not found"}},"parameters":[{"name":"worldIds","in":"path","description":"IDs of worlds to return separated by comma","required":true,"schema":{"type":"string","example":"4015,4839,6063"},"index$":0}],"securitySource":"unspecified"},"GET /world/{worldId}":{"protocol":"http","operationId":"getWorldById","responses":{"200":{"description":"Successful operation","content":{"application/json":{"schema":{"type":"object","required":["id","name","type","width","height","tileName","tileSize","flying","pk","inDoor","places","lodestars","continents"],"properties":{"id":{"type":"integer","description":"ID of the World","key$":"id"},"name":{"type":"object","description":"Text available in several languages","properties":{"en":{"type":"string","description":"English text"},"fr":{"type":"string","description":"French text"},"kr":{"type":"string","description":"Korean text"}},"example":{"en":"Julia","fr":"[Intendante de Flarine] Julia","kr":"쥬리아"},"x-ref":"#/components/schemas/LocalizedText","key$":"name"},"type":{"type":"string","enum":["main","prison","dungeon","instance","event"],"description":"Type of the World","key$":"type"},"width":{"type":"integer","description":"Width of the World in meters","key$":"width"},"height":{"type":"integer","description":"Height of the World in meters","key$":"height"},"tileName":{"type":"string","description":"Name of the world Tiles for navigator","key$":"tileName"},"tileSize":{"type":"integer","description":"World meters per Tile","key$":"tileSize"},"flying":{"type":"boolean","description":"Whether players can fly in the World or not","key$":"flying"},"pk":{"type":"boolean","description":"Whether players can kill other players in the World or not","key$":"pk"},"inDoor":{"type":"boolean","description":"Whether the World has a sky or not","key$":"inDoor"},"revivalWorld":{"type":"integer","description":"ID of the World where players revive when they die in the World","key$":"revivalWorld"},"revivalKey":{"type":"string","description":"ID of the Lodestar where players revive when they die in the World","key$":"revivalKey"},"places":{"type":"array","description":"Special Places in the World","items":{"type":"object","properties":{"type":{"type":"string","description":"Type of place"},"location":{"type":"object","properties":{"world":{"type":"integer","description":"World ID"},"x":{"type":"number","format":"float","description":"X coordinate"},"y":{"type":"number","format":"float","description":"Y coordinate"},"z":{"type":"number","format":"float","description":"Z coordinate"},"continent":{"type":"integer","description":"Continent ID"}},"x-ref":"#/components/schemas/Location"}},"x-ref":"#/components/schemas/Place"},"key$":"places"},"lodestars":{"type":"array","description":"Revival places in the World","items":{"type":"object","properties":{"key":{"type":"string","description":"Lodestar key"},"location":{"type":"object","properties":{"world":{"type":"integer","description":"World ID"},"x":{"type":"number","format":"float","description":"X coordinate"},"y":{"type":"number","format":"float","description":"Y coordinate"},"z":{"type":"number","format":"float","description":"Z coordinate"},"continent":{"type":"integer","description":"Continent ID"}},"x-ref":"#/components/schemas/Location"}},"x-ref":"#/components/schemas/Lodestar"},"key$":"lodestars"},"continents":{"type":"array","description":"Continents in the World","items":{"type":"object","properties":{"id":{"type":"integer","description":"Continent ID"},"name":{"type":"object","description":"Text available in several languages","properties":{"en":{"type":"string","description":"English text"},"fr":{"type":"string","description":"French text"},"kr":{"type":"string","description":"Korean text"}},"example":{"en":"Julia","fr":"[Intendante de Flarine] Julia","kr":"쥬리아"},"x-ref":"#/components/schemas/LocalizedText"},"town":{"type":"boolean","description":"Whether the continent is a town"},"polygon":{"type":"array","items":{"type":"object","properties":{"x":{"type":"number"},"z":{"type":"number"}}}}},"x-ref":"#/components/schemas/Continent"},"key$":"continents"}},"x-ref":"#/components/schemas/World","index$":0}}}},"400":{"description":"Invalid ID supplied"},"404":{"description":"World not found"}},"parameters":[{"name":"worldId","in":"path","description":"ID of world to return","required":true,"schema":{"type":"integer","example":4015},"index$":0}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let world_ref01_data = Object.values(setup.data.existing.world)[0] as any

    // LIST
    const world_ref01_ent = client.World()
    const world_ref01_match: any = {}

    const world_ref01_list = (await world_ref01_ent.list(world_ref01_match)).map((e: any) => e.data())


    // LOAD
    const world_ref01_match_dt0: any = {}
    world_ref01_match_dt0.id = world_ref01_data.id
    const world_ref01_data_dt0 = (await world_ref01_ent.load(world_ref01_match_dt0)).data()
    assert(world_ref01_data_dt0.id === world_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/world/WorldTestData.json')

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
    ['world01','world02','world03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'FLYFF_GAME_TEST_WORLD_ENTID': idmap,
    'FLYFF_GAME_TEST_LIVE': 'FALSE',
    'FLYFF_GAME_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['FLYFF_GAME_TEST_WORLD_ENTID']

  const live = 'TRUE' === env.FLYFF_GAME_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['FLYFF_GAME_TEST_WORLD_ENTID']
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
  
