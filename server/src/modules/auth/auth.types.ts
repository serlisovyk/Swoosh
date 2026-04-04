import { User } from '@modules/user/models/user.model'
import { ROLES } from '@modules/user/user.types'

export interface JwtValidatePayload {
  id: string
}

export interface AuthTokenData {
  id: string
  role: ROLES
}

export type AuthFavoriteAwareUser = Pick<UserWithoutPassword, '_id' | 'favoriteProductIds'>

export interface PreparedRequest extends Request {
  cookies: Record<string, string | undefined>
  user?: UserWithoutPassword
}

export type UserWithoutPassword = Omit<User, UserPasswordFields>

type UserPasswordFields =
  | 'password'
  | 'resetPasswordToken'
  | 'resetPasswordTokenExpiresAt'
