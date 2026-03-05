import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { Response } from 'express'
import { verify } from 'argon2'
import { UserService } from '../user/user.service'
import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto'
import { StringValue } from 'ms'
import {
  ACCESS_TOKEN_COOKIE_NAME,
  INVALID_PASSWORD_ERROR,
  INVALID_REFRESH_TOKEN_ERROR,
  REFRESH_TOKEN_COOKIE_NAME,
  USER_NOT_FOUND_ERROR,
} from './auth.constants'
import { isDev } from '@shared/utils'
import { ONE_DAY_IN_MS, ONE_HOUR_IN_MS } from '@shared/constants'
import { AuthTokenData } from './auth.types'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    const createdUser = await this.userService.create(dto)

    const tokens = this.generateTokens({
      id: String(createdUser._id),
      role: createdUser.role,
    })

    return { user: createdUser, ...tokens }
  }

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto)

    const tokens = this.generateTokens({
      id: String(user._id),
      role: user.role,
    })

    return { user, ...tokens }
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
    const verifiedUser =
      await this.jwt.verifyAsync<Pick<AuthTokenData, 'id'>>(refreshToken)

    if (!verifiedUser) {
      throw new BadRequestException(INVALID_REFRESH_TOKEN_ERROR)
    }

    const user = await this.userService.getById(verifiedUser.id)

    if (!user) throw new NotFoundException(USER_NOT_FOUND_ERROR)

    const tokens = this.generateTokens({
      id: String(user._id),
      role: user.role,
    })

    return { user, ...tokens }
  }

  private async validateUser(data: LoginDto) {
    const { email, password } = data

    const user = await this.userService.getByEmail(email)
    if (!user) throw new NotFoundException(USER_NOT_FOUND_ERROR)

    const isPasswordValid = await verify(user.password, password)

    if (!isPasswordValid) {
      throw new UnauthorizedException(INVALID_PASSWORD_ERROR)
    }

    return user
  }

  private generateTokens(data: AuthTokenData) {
    const accessToken = this.jwt.sign(data, {
      expiresIn: this.configService.get<StringValue>(
        'JWT_ACCESS_TOKEN_EXPIRES_IN',
      ),
    })

    const refreshToken = this.jwt.sign(data, {
      expiresIn: this.configService.get<StringValue>(
        'JWT_REFRESH_TOKEN_EXPIRES_IN',
      ),
    })

    return { accessToken, refreshToken }
  }
}
