import { generate } from '../src'

describe(generate, (): void => {
  it('generates the right codes for the given times', async (): Promise<void> => {
    const secret = Buffer.from('3132333435363738393031323334353637383930', 'hex').toString('utf-8')
    const secret32 = Buffer.from('3132333435363738393031323334353637383930313233343536373839303132', 'hex').toString('utf-8')
    const secret64 = Buffer.from(
      '31323334353637383930313233343536373839303132333435363738393031323334353637383930313233343536373839303132333435363738393031323334',
      'hex'
    ).toString('utf-8')

    expect(generate(secret, { algorithm: 'sha1', codeDigits: 8, time: 59 })).toEqual('94287082')
    expect(generate(secret32, { algorithm: 'sha256', codeDigits: 8, time: 59 })).toEqual('46119246')
    expect(generate(secret64, { algorithm: 'sha512', codeDigits: 8, time: 59 })).toEqual('90693936')

    expect(generate(secret, { algorithm: 'sha1', codeDigits: 8, time: 1111111109 })).toEqual('07081804')
    expect(generate(secret32, { algorithm: 'sha256', codeDigits: 8, time: 1111111109 })).toEqual('68084774')
    expect(generate(secret64, { algorithm: 'sha512', codeDigits: 8, time: 1111111109 })).toEqual('25091201')

    expect(generate(secret, { algorithm: 'sha1', codeDigits: 8, time: 1111111111 })).toEqual('14050471')
    expect(generate(secret32, { algorithm: 'sha256', codeDigits: 8, time: 1111111111 })).toEqual('67062674')
    expect(generate(secret64, { algorithm: 'sha512', codeDigits: 8, time: 1111111111 })).toEqual('99943326')

    expect(generate(secret, { algorithm: 'sha1', codeDigits: 8, time: 1234567890 })).toEqual('89005924')
    expect(generate(secret32, { algorithm: 'sha256', codeDigits: 8, time: 1234567890 })).toEqual('91819424')
    expect(generate(secret64, { algorithm: 'sha512', codeDigits: 8, time: 1234567890 })).toEqual('93441116')

    expect(generate(secret, { algorithm: 'sha1', codeDigits: 8, time: 2000000000 })).toEqual('69279037')
    expect(generate(secret32, { algorithm: 'sha256', codeDigits: 8, time: 2000000000 })).toEqual('90698825')
    expect(generate(secret64, { algorithm: 'sha512', codeDigits: 8, time: 2000000000 })).toEqual('38618901')

    expect(generate(secret, { algorithm: 'sha1', codeDigits: 8, time: 20000000000 })).toEqual('65353130')
    expect(generate(secret32, { algorithm: 'sha256', codeDigits: 8, time: 20000000000 })).toEqual('77737706')
    expect(generate(secret64, { algorithm: 'sha512', codeDigits: 8, time: 20000000000 })).toEqual('47863826')
  })
})
