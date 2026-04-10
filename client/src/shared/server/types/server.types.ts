import type { JWTPayload } from 'jose'
import { ROLE } from '@shared/types'

export interface LoggedInServerAccessState {
  isLoggedIn: true
  userId: string
  role: ROLE
}

export interface LoggedOutServerAccessState {
  isLoggedIn: false
  userId: null
  role: null
}

export type ServerAccessState =
  | LoggedInServerAccessState
  | LoggedOutServerAccessState

export interface AccessTokenPayload extends JWTPayload {
  id: string
  role: ROLE
}
