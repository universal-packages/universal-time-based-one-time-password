import crypto from 'crypto'

import { GenerateOptions } from './types'

/**
 *
 * IMPLEMENTATION DETAILS AT
 *
 * https://www.rfc-editor.org/rfc/rfc6238
 *
 *
 * */

export function generate(secret: string, options?: GenerateOptions): string {
  const finalOptions: GenerateOptions = { algorithm: 'sha1', codeDigits: 6, time: Date.now() / 1000.0, timeStep: 30, ...options }

  const hexSecret = Buffer.from(secret, 'utf8').toString('hex')
  const T0 = 0
  const time = Math.floor(finalOptions.time)
  const X = finalOptions.timeStep
  const T = Math.floor((time - T0) / X)
  const codeDigits = finalOptions.codeDigits

  let steps = T.toString(16)
  while (steps.length < 16) steps = '0' + steps

  const hmac = crypto.createHmac(finalOptions.algorithm, new Uint8Array(Buffer.from(hexSecret, 'hex')))
  hmac.update(steps, 'hex')
  const hash = hmac.digest('hex')

  const offset = parseInt(hash.substring(hash.length - 1), 16)
  const otp = (parseInt(hash.substring(offset * 2, offset * 2 + 8), 16) & 2147483647).toString()
  const finalLength = Math.max(otp.length - codeDigits, 0)

  return otp.substring(finalLength, finalLength + codeDigits)
}
