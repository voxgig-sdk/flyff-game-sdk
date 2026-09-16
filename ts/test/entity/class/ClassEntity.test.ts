

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


describe('ClassEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when FLYFF_GAME_TEST_LIVE=TRUE.
  afterEach(liveDelay('FLYFF_GAME_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = FlyffGameSDK.test()
    const ent = testsdk.Class()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.FLYFF_GAME_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'class.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"format":"float","name":"attackSpeed","req":true,"short":"Attack speed constant used in attack speed calculation","type":"`$NUMBER`","index$":0},{"active":true,"name":"autoAttackFactors","req":true,"short":"Auto attack damage factors used in damage calculation","type":"`$OBJECT`","index$":1},{"active":true,"format":"float","name":"block","req":true,"short":"Blocking constant used in block calculation","type":"`$NUMBER`","index$":2},{"active":true,"format":"float","name":"critical","req":true,"short":"Critical chance constant used in critical chance calculation","type":"`$NUMBER`","index$":3},{"active":true,"format":"float","name":"defense","req":true,"short":"Defense factor use in defensive calculations","type":"`$NUMBER`","index$":4},{"active":true,"format":"float","name":"fp","req":true,"short":"FP Factor","type":"`$NUMBER`","index$":5},{"active":true,"format":"float","name":"hp","req":true,"short":"HP Factor","type":"`$NUMBER`","index$":6},{"active":true,"name":"icon","req":true,"short":"Icon of the Class","type":"`$STRING`","index$":7},{"active":true,"name":"id","req":true,"short":"ID of the class","type":"`$INTEGER`","index$":8},{"active":true,"format":"float","name":"magicDefenseIntFactor","req":true,"short":"Magic defense factor based on INT used in defensive calculations","type":"`$NUMBER`","index$":9},{"active":true,"format":"float","name":"magicDefenseStaFactor","req":true,"short":"Magic defense factor based on STA used in defensive calculations","type":"`$NUMBER`","index$":10},{"active":true,"name":"maxFP","req":true,"short":"Formula to compute the maximum Fatigue Points of the player","type":"`$STRING`","index$":11},{"active":true,"name":"maxHP","req":true,"short":"Formula to compute the maximum Hit Points of the player","type":"`$STRING`","index$":12},{"active":true,"name":"maxLevel","req":true,"short":"Maximum player level for the Class","type":"`$INTEGER`","index$":13},{"active":true,"name":"maxMP","req":true,"short":"Formula to compute the maximum Mana Points of the player","type":"`$STRING`","index$":14},{"active":true,"name":"minLevel","req":true,"short":"Minimum player level for the Class","type":"`$INTEGER`","index$":15},{"active":true,"format":"float","name":"mp","req":true,"short":"MP Factor","type":"`$NUMBER`","index$":16},{"active":true,"name":"name","req":true,"short":"Text available in several languages","type":"`$OBJECT`","index$":17},{"active":true,"name":"parent","req":false,"short":"ID of the parent class","type":"`$INTEGER`","index$":18},{"active":true,"name":"tree","req":true,"short":"Skill tree image for the class","type":"`$STRING`","index$":19},{"active":true,"name":"type","req":true,"short":"Type of the class","type":"`$STRING`","index$":20}],"id":{"field":"id","name":"id"},"name":"class","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /class","json":"{\"operationId\":\"getAllClassIds\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"example\":[1689,296,2881],\"items\":{\"type\":\"integer\"},\"type\":\"array\"}}},\"description\":\"Successful operation\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/class","segments":[{"lit":"class"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"example":"vagrant.png","kind":"param","name":"file_name","orig":"file_name","reqd":true,"type":"`$STRING`","index$":0},{"active":true,"example":"messenger","kind":"param","name":"style","orig":"style","reqd":true,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /image/class/{style}/{fileName}","json":"{\"operationId\":\"getClassIcon\",\"parameters\":[{\"description\":\"Style of the icon. Accepted values: messenger, old_female, old_male, target\",\"in\":\"path\",\"name\":\"style\",\"required\":true,\"schema\":{\"enum\":[\"messenger\",\"old_female\",\"old_male\",\"target\"],\"example\":\"messenger\",\"type\":\"string\"}},{\"description\":\"File name of the icon\",\"in\":\"path\",\"name\":\"fileName\",\"required\":true,\"schema\":{\"example\":\"vagrant.png\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"image/png\":{\"schema\":{\"format\":\"binary\",\"type\":\"string\"}}},\"description\":\"Successful operation\"},\"404\":{\"description\":\"Icon not found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/image/class/{style}/{fileName}","rename":{"param":{"fileName":"file_name"}},"segments":[{"lit":"image"},{"lit":"class"},{"var":"style"},{"var":"file_name"}],"select":{"exist":["file_name","style"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{"params":[{"active":true,"example":"Vagrant.png","kind":"param","name":"file_name","orig":"file_name","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /image/class/tree/{fileName}","json":"{\"operationId\":\"getClassSkillTree\",\"parameters\":[{\"description\":\"File name of the skill tree\",\"in\":\"path\",\"name\":\"fileName\",\"required\":true,\"schema\":{\"example\":\"Vagrant.png\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"image/png\":{\"schema\":{\"format\":\"binary\",\"type\":\"string\"}}},\"description\":\"Successful operation\"},\"404\":{\"description\":\"Tree not found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/image/class/tree/{fileName}","rename":{"param":{"fileName":"file_name"}},"segments":[{"lit":"image"},{"lit":"class"},{"lit":"tree"},{"var":"file_name"}],"select":{"exist":["file_name"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":1},{"active":true,"args":{"params":[{"active":true,"example":"1689,296,2881","kind":"param","name":"id","orig":"class_id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /class/{classIds}","json":"{\"operationId\":\"getClassesByIds\",\"parameters\":[{\"description\":\"IDs of classes to return separated by comma\",\"in\":\"path\",\"name\":\"classIds\",\"required\":true,\"schema\":{\"example\":\"1689,296,2881\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"attackSpeed\":{\"description\":\"Attack speed constant used in attack speed calculation\",\"format\":\"float\",\"type\":\"number\"},\"autoAttackFactors\":{\"description\":\"Auto attack damage factors used in damage calculation\",\"properties\":{\"axe\":{\"format\":\"float\",\"type\":\"number\"},\"bow\":{\"format\":\"float\",\"type\":\"number\"},\"knuckle\":{\"format\":\"float\",\"type\":\"number\"},\"staff\":{\"format\":\"float\",\"type\":\"number\"},\"stick\":{\"format\":\"float\",\"type\":\"number\"},\"sword\":{\"format\":\"float\",\"type\":\"number\"},\"wand\":{\"format\":\"float\",\"type\":\"number\"},\"yoyo\":{\"format\":\"float\",\"type\":\"number\"}},\"type\":\"object\"},\"block\":{\"description\":\"Blocking constant used in block calculation\",\"format\":\"float\",\"type\":\"number\"},\"critical\":{\"description\":\"Critical chance constant used in critical chance calculation\",\"format\":\"float\",\"type\":\"number\"},\"defense\":{\"description\":\"Defense factor use in defensive calculations\",\"format\":\"float\",\"type\":\"number\"},\"fp\":{\"description\":\"FP Factor\",\"format\":\"float\",\"type\":\"number\"},\"hp\":{\"description\":\"HP Factor\",\"format\":\"float\",\"type\":\"number\"},\"icon\":{\"description\":\"Icon of the Class\",\"type\":\"string\"},\"id\":{\"description\":\"ID of the class\",\"type\":\"integer\"},\"magicDefenseIntFactor\":{\"description\":\"Magic defense factor based on INT used in defensive calculations\",\"format\":\"float\",\"type\":\"number\"},\"magicDefenseStaFactor\":{\"description\":\"Magic defense factor based on STA used in defensive calculations\",\"format\":\"float\",\"type\":\"number\"},\"maxFP\":{\"description\":\"Formula to compute the maximum Fatigue Points of the player\",\"type\":\"string\"},\"maxHP\":{\"description\":\"Formula to compute the maximum Hit Points of the player\",\"type\":\"string\"},\"maxLevel\":{\"description\":\"Maximum player level for the Class\",\"type\":\"integer\"},\"maxMP\":{\"description\":\"Formula to compute the maximum Mana Points of the player\",\"type\":\"string\"},\"minLevel\":{\"description\":\"Minimum player level for the Class\",\"type\":\"integer\"},\"mp\":{\"description\":\"MP Factor\",\"format\":\"float\",\"type\":\"number\"},\"name\":{\"description\":\"Text available in several languages\",\"example\":{\"en\":\"Julia\",\"fr\":\"[Intendante de Flarine] Julia\",\"kr\":\"쥬리아\"},\"properties\":{\"en\":{\"description\":\"English text\",\"type\":\"string\"},\"fr\":{\"description\":\"French text\",\"type\":\"string\"},\"kr\":{\"description\":\"Korean text\",\"type\":\"string\"}},\"type\":\"object\"},\"parent\":{\"description\":\"ID of the parent class\",\"type\":\"integer\"},\"tree\":{\"description\":\"Skill tree image for the class\",\"type\":\"string\"},\"type\":{\"description\":\"Type of the class\",\"enum\":[\"beginner\",\"expert\",\"professional\"],\"type\":\"string\"}},\"required\":[\"id\",\"name\",\"type\",\"icon\",\"tree\",\"minLevel\",\"maxLevel\",\"maxHP\",\"maxFP\",\"maxMP\",\"hp\",\"mp\",\"fp\",\"attackSpeed\",\"block\",\"critical\",\"autoAttackFactors\",\"defense\",\"magicDefenseStaFactor\",\"magicDefenseIntFactor\"],\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful operation\"},\"400\":{\"description\":\"Invalid list of IDs supplied\"},\"404\":{\"description\":\"Class not found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/class/{classIds}","rename":{"param":{"classIds":"id"}},"segments":[{"lit":"class"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{"params":[{"active":true,"example":1689,"kind":"param","name":"id","orig":"class_id","reqd":true,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /class/{classId}","json":"{\"operationId\":\"getClassById\",\"parameters\":[{\"description\":\"ID of class to return\",\"in\":\"path\",\"name\":\"classId\",\"required\":true,\"schema\":{\"example\":1689,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"attackSpeed\":{\"description\":\"Attack speed constant used in attack speed calculation\",\"format\":\"float\",\"type\":\"number\"},\"autoAttackFactors\":{\"description\":\"Auto attack damage factors used in damage calculation\",\"properties\":{\"axe\":{\"format\":\"float\",\"type\":\"number\"},\"bow\":{\"format\":\"float\",\"type\":\"number\"},\"knuckle\":{\"format\":\"float\",\"type\":\"number\"},\"staff\":{\"format\":\"float\",\"type\":\"number\"},\"stick\":{\"format\":\"float\",\"type\":\"number\"},\"sword\":{\"format\":\"float\",\"type\":\"number\"},\"wand\":{\"format\":\"float\",\"type\":\"number\"},\"yoyo\":{\"format\":\"float\",\"type\":\"number\"}},\"type\":\"object\"},\"block\":{\"description\":\"Blocking constant used in block calculation\",\"format\":\"float\",\"type\":\"number\"},\"critical\":{\"description\":\"Critical chance constant used in critical chance calculation\",\"format\":\"float\",\"type\":\"number\"},\"defense\":{\"description\":\"Defense factor use in defensive calculations\",\"format\":\"float\",\"type\":\"number\"},\"fp\":{\"description\":\"FP Factor\",\"format\":\"float\",\"type\":\"number\"},\"hp\":{\"description\":\"HP Factor\",\"format\":\"float\",\"type\":\"number\"},\"icon\":{\"description\":\"Icon of the Class\",\"type\":\"string\"},\"id\":{\"description\":\"ID of the class\",\"type\":\"integer\"},\"magicDefenseIntFactor\":{\"description\":\"Magic defense factor based on INT used in defensive calculations\",\"format\":\"float\",\"type\":\"number\"},\"magicDefenseStaFactor\":{\"description\":\"Magic defense factor based on STA used in defensive calculations\",\"format\":\"float\",\"type\":\"number\"},\"maxFP\":{\"description\":\"Formula to compute the maximum Fatigue Points of the player\",\"type\":\"string\"},\"maxHP\":{\"description\":\"Formula to compute the maximum Hit Points of the player\",\"type\":\"string\"},\"maxLevel\":{\"description\":\"Maximum player level for the Class\",\"type\":\"integer\"},\"maxMP\":{\"description\":\"Formula to compute the maximum Mana Points of the player\",\"type\":\"string\"},\"minLevel\":{\"description\":\"Minimum player level for the Class\",\"type\":\"integer\"},\"mp\":{\"description\":\"MP Factor\",\"format\":\"float\",\"type\":\"number\"},\"name\":{\"description\":\"Text available in several languages\",\"example\":{\"en\":\"Julia\",\"fr\":\"[Intendante de Flarine] Julia\",\"kr\":\"쥬리아\"},\"properties\":{\"en\":{\"description\":\"English text\",\"type\":\"string\"},\"fr\":{\"description\":\"French text\",\"type\":\"string\"},\"kr\":{\"description\":\"Korean text\",\"type\":\"string\"}},\"type\":\"object\"},\"parent\":{\"description\":\"ID of the parent class\",\"type\":\"integer\"},\"tree\":{\"description\":\"Skill tree image for the class\",\"type\":\"string\"},\"type\":{\"description\":\"Type of the class\",\"enum\":[\"beginner\",\"expert\",\"professional\"],\"type\":\"string\"}},\"required\":[\"id\",\"name\",\"type\",\"icon\",\"tree\",\"minLevel\",\"maxLevel\",\"maxHP\",\"maxFP\",\"maxMP\",\"hp\",\"mp\",\"fp\",\"attackSpeed\",\"block\",\"critical\",\"autoAttackFactors\",\"defense\",\"magicDefenseStaFactor\",\"magicDefenseIntFactor\"],\"type\":\"object\"}}},\"description\":\"Successful operation\"},\"400\":{\"description\":\"Invalid ID supplied\"},\"404\":{\"description\":\"Class not found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/class/{classId}","rename":{"param":{"classId":"id"}},"segments":[{"lit":"class"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":3}],"key$":"load"}},"relations":{"ancestors":[["tree"],["class"]]},"key$":"class","name__orig":"class","Name":"Class","name_":"class","name-":"class","NAME":"CLASS","index$":3}, {"active":true,"entity":"class","key$":"BasicClassFlow","kind":"basic","name":"BasicClassFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"class_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"class_ref01","srcdatavar":"class_ref01_data","suffix":"_dt0"},"match":{"id":"class01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-class_ref01"}}],"index$":1}]}, 'Class')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let class_ref01_data = Object.values(setup.data.existing.class)[0] as any

    // LIST
    const class_ref01_ent = client.Class()
    const class_ref01_match: any = {}

    const class_ref01_list = (await class_ref01_ent.list(class_ref01_match)).map((e: any) => e.data())


    // LOAD
    const class_ref01_match_dt0: any = {}
    class_ref01_match_dt0.id = class_ref01_data.id
    const class_ref01_data_dt0 = (await class_ref01_ent.load(class_ref01_match_dt0)).data()
    assert(class_ref01_data_dt0.id === class_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/class/ClassTestData.json')

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
    ['class01','class02','class03','tree01','tree02','tree03','class01','class02','class03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'FLYFF_GAME_TEST_CLASS_ENTID': idmap,
    'FLYFF_GAME_TEST_LIVE': 'FALSE',
    'FLYFF_GAME_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['FLYFF_GAME_TEST_CLASS_ENTID']

  const live = 'TRUE' === env.FLYFF_GAME_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['FLYFF_GAME_TEST_CLASS_ENTID']
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
  
