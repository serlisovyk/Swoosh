import { randomBytes } from 'crypto'

export const noop = (..._args: unknown[]): void => {}

export const generateToken = (): string => randomBytes(32).toString('hex')
