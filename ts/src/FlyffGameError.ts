
import { Context } from './Context'


class FlyffGameError extends Error {

  isFlyffGameError = true

  sdk = 'FlyffGame'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  FlyffGameError
}

