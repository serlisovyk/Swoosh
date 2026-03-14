import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common'
import type { Response } from 'express'
import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto'
import { AuthService } from './auth.service'
import {
  AuthLoginDocs,
  AuthLogoutDocs,
  AuthNewTokensDocs,
  AuthRegisterDocs,
  AuthTagDocs,
} from './auth.swagger'
import {
  REFRESH_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_MISSING_ERROR,
} from './auth.constants'
import type { PreparedRequest } from './auth.types'

@AuthTagDocs()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @AuthRegisterDocs()
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(
    @Body() dto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { refreshToken, accessToken, ...response } =
      await this.authService.register(dto)

    this.authService.setAuthTokens(res, accessToken, refreshToken)

    return response
  }

  @AuthLoginDocs()
  @HttpCode(HttpStatus.CREATED)
  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { refreshToken, accessToken, ...response } =
      await this.authService.login(dto)

    this.authService.setAuthTokens(res, accessToken, refreshToken)

    return response
  }

  @AuthNewTokensDocs()
  @Post('new-tokens')
  async newTokens(
    @Req() req: PreparedRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    const initialRefreshToken = req.cookies?.[REFRESH_TOKEN_COOKIE_NAME]

    if (!initialRefreshToken) {
      this.authService.setAuthTokens(res, null, null)

      throw new BadRequestException(REFRESH_TOKEN_MISSING_ERROR)
    }

    const { refreshToken, accessToken, ...response } =
      await this.authService.getNewTokens(initialRefreshToken)

    this.authService.setAuthTokens(res, accessToken, refreshToken)

    return response
  }

  @AuthLogoutDocs()
  @Post('logout')
  logout(
    @Req() req: PreparedRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    const initialRefreshToken = req.cookies?.[REFRESH_TOKEN_COOKIE_NAME]

    this.authService.setAuthTokens(res, null, null)

    if (!initialRefreshToken) {
      throw new BadRequestException(REFRESH_TOKEN_MISSING_ERROR)
    }

    return true
  }
}
