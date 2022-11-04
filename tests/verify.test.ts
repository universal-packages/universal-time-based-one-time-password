import { verify } from '../src'

describe('time-based-one-time-password', (): void => {
  describe('verify', (): void => {
    it('verifies a password around the time window given', async (): Promise<void> => {
      const secret = Buffer.from('3132333435363738393031323334353637383930', 'hex').toString('utf-8')
      const time = 1111111109
      const password = '07081804'

      expect(verify(password, secret, { codeDigits: 8, time })).toBeTruthy()
      expect(verify(password, secret, { codeDigits: 8, time: time - 30 })).toBeTruthy()
      expect(verify(password, secret, { codeDigits: 8, time: time + 30 })).toBeTruthy()
      expect(verify(password, secret, { codeDigits: 8, time: time + 60 })).toBeFalsy()
      expect(verify(password, secret, { codeDigits: 8, time: time + 60, offsetSteps: 2 })).toBeTruthy()
    })
  })
})
