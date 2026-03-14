import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { RequestPasswordResetDto } from './dto/request-password-reset.dto'
import { ResetPasswordDto } from './dto/reset-password.dto'
import { AuthAccountService } from './auth-account.service'
import {
  AuthRequestPasswordResetDocs,
  AuthResetPasswordDocs,
  AuthTagDocs,
} from '../auth.swagger'

@AuthTagDocs()
@Controller('auth')
export class AuthAccountController {
  constructor(private readonly authAccountService: AuthAccountService) {}

  @AuthRequestPasswordResetDocs()
  @HttpCode(HttpStatus.OK)
  @Post('request-password-reset')
  requestPasswordReset(@Body() dto: RequestPasswordResetDto) {
    return this.authAccountService.requestPasswordReset(dto.email)
  }

  @AuthResetPasswordDocs()
  @HttpCode(HttpStatus.OK)
  @Post('reset-password')
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authAccountService.resetPassword(dto.token, dto.newPassword)
  }
}
