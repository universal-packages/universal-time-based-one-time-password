export interface GenerateOptions {
  algorithm?: 'sha1' | 'sha256' | 'sha512'
  codeDigits?: number
  time?: number
  timeStep?: number
}

export interface VerifyOptions extends GenerateOptions {
  offsetSteps?: number
}
