
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { FlyffGameSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = FlyffGameSDK.test()
    equal(testsdk instanceof FlyffGameSDK, true,
      'FlyffGameSDK.test() must return a client synchronously')
  })

})
