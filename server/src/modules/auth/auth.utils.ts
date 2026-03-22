import { createHash, createHmac, randomBytes } from 'crypto'
import { Request } from 'express'

export function extractAccessTokenFromCookie(request: Request): string | null {
  const token = request?.cookies?.accessToken as unknown
  return typeof token === 'string' ? token : null
}

export const generateToken = (): string => randomBytes(32).toString('hex')

export const hashToken = (value: string): string =>
  createHash('sha256').update(value).digest('hex')

export const hashTokenWithSecret = (value: string, secret: string): string =>
  createHmac('sha256', secret).update(value).digest('hex')
