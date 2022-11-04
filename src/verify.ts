import { generate } from './generate'
import { VerifyOptions } from './types'

export function verify(password: string, secret: string, options?: VerifyOptions): boolean {
  const finalOptions: VerifyOptions = { algorithm: 'sha1', codeDigits: 6, offsetSteps: 1, time: Date.now() / 1000.0, timeStep: 30, ...options }

  for (let i = -finalOptions.offsetSteps; i <= finalOptions.offsetSteps; i++) {
    const currentVerificationTime = finalOptions.time + i * finalOptions.timeStep

    if (generate(secret, { ...finalOptions, time: currentVerificationTime }) === password) return true
  }

  return false
}
