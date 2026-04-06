import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { Response } from 'express'
import { verify } from 'argon2'
import { StringValue } from 'ms'
import { isDev, noop } from '@shared/utils'
import { FavoritesService } from '@modules/favorites/favorites.service'
import { UserService } from '../user/user.service'
import { AuthAccountService } from './auth-account/auth-account.service'
import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto'
import {
  ACCESS_TOKEN_COOKIE_NAME,
  FAILED_TO_CREATE_USER_ERROR,
  INVALID_CREDENTIALS_ERROR,
  INVALID_REFRESH_TOKEN_ERROR,
  REFRESH_TOKEN_COOKIE_NAME,
  USER_NOT_FOUND_ERROR,
} from './auth.constants'
import { ONE_DAY_IN_MS, ONE_HOUR_IN_MS } from '@shared/constants'
import {
  AuthFavoriteAwareUser,
  AuthSocialProfile,
  AuthTokenData,
  UserWithoutPassword,
} from './auth.types'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    private readonly userService: UserService,
    private readonly favoritesService: FavoritesService,
    private readonly configService: ConfigService,
    private readonly authAccountService: AuthAccountService,
  ) {}

  async register(dto: RegisterDto) {
    const createdUser = await this.userService.create(dto)

    if (!createdUser) {
      throw new InternalServerErrorException(FAILED_TO_CREATE_USER_ERROR)
    }

    const user = await this.mergeAuthFavorites(
      createdUser,
      dto.favoriteProductIds,
    )

    await this.authAccountService.requestEmailVerification(user)

    return this.createSession(user)
  }

  async login(dto: LoginDto) {
    const validatedUser = await this.validateUser(dto)

    const user = await this.mergeAuthFavorites(
      validatedUser,
      dto.favoriteProductIds,
    )

    return this.createSession(user)
  }

  async socialLogin(profile: AuthSocialProfile) {
    const user = await this.resolveSocialUser(profile)

    if (!user) {
      throw new InternalServerErrorException(FAILED_TO_CREATE_USER_ERROR)
    }

    return user
  }

  setAuthTokens(
    response: Response,
    accessToken: string | null,
    refreshToken: string | null,
  ) {
    const accessTokenExpiresHours = this.configService.getOrThrow<number>(
      'JWT_ACCESS_TOKEN_EXPIRES_HOURS',
    )

    const accessTokenExpires = new Date(
      Date.now() + accessTokenExpiresHours * ONE_HOUR_IN_MS,
    )

    const refreshTokenExpiresDays = this.configService.getOrThrow<number>(
      'JWT_REFRESH_TOKEN_EXPIRES_DAYS',
    )

    const refreshTokenExpires = new Date(
      Date.now() + refreshTokenExpiresDays * ONE_DAY_IN_MS,
    )

    const defaultCookieOptions = {
      httpOnly: true,
      secure: true,
      domain: this.configService.get<string>('COOKIE_DOMAIN'),
      sameSite: isDev(this.configService) ? 'none' : 'strict',
    } as const

    response.cookie(ACCESS_TOKEN_COOKIE_NAME, accessToken, {
      ...defaultCookieOptions,
      expires: accessToken ? accessTokenExpires : new Date(0),
    })

    response.cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, {
      ...defaultCookieOptions,
      expires: refreshToken ? refreshTokenExpires : new Date(0),
    })
  }

  async getNewTokens(refreshToken: string) {
    const verifiedUser = await this.verifyRefreshToken(refreshToken)

    if (!verifiedUser) {
      throw new BadRequestException(INVALID_REFRESH_TOKEN_ERROR)
    }

    const user = await this.userService.getById(verifiedUser.id)

    if (!user) throw new NotFoundException(USER_NOT_FOUND_ERROR)

    return this.createSession(user)
  }

  createSession(user: UserWithoutPassword) {
    const tokens = this.generateTokens({
      id: String(user._id),
      role: user.role,
    })

    return { user, ...tokens }
  }

  private async verifyRefreshToken(refreshToken: string) {
    return this.jwt
      .verifyAsync<Pick<AuthTokenData, 'id'>>(refreshToken, {
        secret: this.configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
      })
      .catch(() => null)
  }

  private async validateUser(data: LoginDto) {
    const { email, password } = data

    const user = await this.userService.getByEmailWithPassword(email)

    if (!user) {
      throw new UnauthorizedException(INVALID_CREDENTIALS_ERROR)
    }

    const isPasswordValid = await verify(user.password, password)

    if (!isPasswordValid) {
      throw new UnauthorizedException(INVALID_CREDENTIALS_ERROR)
    }

    const { password: userPassword, ...safeUser } = user

    noop(userPassword)

    return safeUser
  }

  private async resolveSocialUser(profile: AuthSocialProfile) {
    const userByProvider = await this.userService.getBySocialProvider(
      profile.provider,
      profile.providerId,
    )

    if (userByProvider) return userByProvider

    const existingUser = await this.userService.getByEmail(profile.email)

    if (existingUser) {
      return this.userService.linkSocialProvider(
        existingUser._id,
        profile.provider,
        profile.providerId,
      )
    }

    return this.userService.createSocialUser(profile)
  }

  private async mergeAuthFavorites<TUser extends AuthFavoriteAwareUser>(
    user: TUser,
    favoriteProductIds?: string[],
  ) {
    if (!favoriteProductIds?.length) {
      return {
        ...user,
        favoriteProductIds: user.favoriteProductIds ?? [],
      }
    }

    const mergedFavoriteProductIds =
      await this.favoritesService.mergeFavoriteProductIds(
        String(user._id),
        favoriteProductIds,
      )

    return {
      ...user,
      favoriteProductIds: mergedFavoriteProductIds,
    }
  }

  private generateTokens(data: AuthTokenData) {
    const accessToken = this.jwt.sign(data, {
      expiresIn: this.configService.get<StringValue>(
        'JWT_ACCESS_TOKEN_EXPIRES_IN',
      ),
    })

    const refreshToken = this.jwt.sign(data, {
      secret: this.configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get<StringValue>(
        'JWT_REFRESH_TOKEN_EXPIRES_IN',
      ),
    })

    return { accessToken, refreshToken }
  }
}
