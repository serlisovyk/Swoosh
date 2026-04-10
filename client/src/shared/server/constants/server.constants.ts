import 'server-only'

import { JWT_SECRET } from '@shared/env/index-server'
import type { ServerAccessState } from '../types'

export const ACCESS_TOKEN_COOKIE_NAME = 'accessToken'

export const LOGGED_OUT_ACCESS_STATE: ServerAccessState = {
  isLoggedIn: false,
  userId: null,
  role: null,
}

export const JWT_SECRET_KEY = new TextEncoder().encode(JWT_SECRET)
