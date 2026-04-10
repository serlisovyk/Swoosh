import 'server-only'

import { cookies } from 'next/headers'
import { cache } from 'react'
import { jwtVerify } from 'jose'
import { ROLE, type ROLE as ROLEType } from '@shared/types'
import {
  ACCESS_TOKEN_COOKIE_NAME,
  JWT_SECRET_KEY,
  LOGGED_OUT_ACCESS_STATE,
} from '../constants'
import {
  type AccessTokenPayload,
  type LoggedInServerAccessState,
  type ServerAccessState,
} from '../types'

export const getServerAccessState = cache(
  async (): Promise<ServerAccessState> => {
    const accessToken = (await cookies()).get(ACCESS_TOKEN_COOKIE_NAME)?.value

    if (!accessToken) return LOGGED_OUT_ACCESS_STATE

    return (await verifyAccessToken(accessToken)) ?? LOGGED_OUT_ACCESS_STATE
  },
)

async function verifyAccessToken(
  token: string,
): Promise<LoggedInServerAccessState | null> {
  try {
    const { payload } = await jwtVerify<AccessTokenPayload>(
      token,
      JWT_SECRET_KEY,
    )

    if (!payload.id || !isRole(payload.role)) return null

    return {
      isLoggedIn: true,
      userId: payload.id,
      role: payload.role,
    }
  } catch {
    return null
  }
}

function isRole(value: unknown): value is ROLEType {
  return Object.values(ROLE).includes(value as ROLEType)
}
