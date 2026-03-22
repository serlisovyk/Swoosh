import { User } from '@modules/user/models/user.model'
import { ROLES } from '@modules/user/user.types'

export interface JwtValidatePayload {
  id: string
}

export interface AuthTokenData {
  id: string
  role: ROLES
}

export type AuthFavoriteAwareUser = Pick<CurrentUser, '_id' | 'favoriteProductIds'>

export interface PreparedRequest extends Request {
  cookies: Record<string, string | undefined>
  user?: CurrentUser
}

export type CurrentUser = Omit<User, UserPasswordFields>

type UserPasswordFields =
  | 'password'
  | 'resetPasswordToken'
  | 'resetPasswordTokenExpiresAt'
