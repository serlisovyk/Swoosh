import { Request } from 'express'

export function extractAccessTokenFromCookie(request: Request): string | null {
  const token = request?.cookies?.accessToken as unknown
  return typeof token === 'string' ? token : null
}
