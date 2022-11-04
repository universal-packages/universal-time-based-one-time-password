# Time-based one-time password

[![npm version](https://badge.fury.io/js/@universal-packages%2Ftime-based-one-time-password.svg)](https://www.npmjs.com/package/@universal-packages/time-based-one-time-password)
[![Testing](https://github.com/universal-packages/universal-time-based-one-time-password/actions/workflows/testing.yml/badge.svg)](https://github.com/universal-packages/universal-time-based-one-time-password/actions/workflows/testing.yml)
[![codecov](https://codecov.io/gh/universal-packages/universal-time-based-one-time-password/branch/main/graph/badge.svg?token=CXPJSN8IGL)](https://codecov.io/gh/universal-packages/universal-time-based-one-time-password)

implementation from [RFC6238](https://www.rfc-editor.org/rfc/rfc6238)

## Install

```shell
npm install @universal-packages/time-based-one-time-password
```

## generate()

Generates the current otp password for the current time.

```js
import { generate } from '@universal-packages/time-based-one-time-password'

const password = generate('secret', options?)

console.log(password)

// > 123654
```

### Options

- **`algorithm`** `'sha1' | 'sha256' | 'sha512'` `default: sha1`
  Algorithm to use when generating the hmac hash.
- **`codeDigits`** `number` `default: 6`
  How many digits to take for the final password.
- **`time`** `number` `default: Date.now() / 10000.0`
  Time in seconds for which the password will be generated
- **`timeStep`** `number` `default: 30`
  The time window in seconds in which the password should be valid (the same).

## verify()

Verify if the given password is valid for the time window, in will verify the specified steps around the specified time window, basically:

```
|------------------|------------------|------------------|
    previous             current               next
```

It will verify the current time window (or time given) and the surroundings by the given `offsetSteps` in the example above the offset is one. Make sure to verify password using the same options used for generating them.

```js
import { verify } from '@universal-packages/time-based-one-time-password'

const isValid = verify('456789', 'secret', options?)

console.log(isValid)

// > true
```

### Options

Verify uses the same options as generate and additionally:

- **`offsetSteps`** `number` `default: 1`
  Number of steps around the given time should be tested for the verification.

### Base32

Some verificators require you to pass the secret in base32 format (for some reason), you can use packages like [Base32 Encode](https://www.npmjs.com/package/base32-encode), for example for the google authenticator you can do:

```js
import base32Encode from 'base32-encode'

const base32Secret = base32Encode('secret', 'RFC4648').replace('=', '')

console.log(base32Secret)

// > Some base32 string
```

## Typescript

This library is developed in TypeScript and shipped fully typed.

## Contributing

The development of this library in the open on GitHub, and we are grateful to the community for contributing bugfixes and improvements. Read below to learn how you can take part in improving this library.

- [Code of Conduct](./CODE_OF_CONDUCT.md)
- [Contributing Guide](./CONTRIBUTING.md)

### License

[MIT licensed](./LICENSE).
