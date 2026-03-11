import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { RequestPasswordResetDto } from './dto/request-password-reset.dto'
import { ResetPasswordDto } from './dto/reset-password.dto'
import { AuthAccountService } from './auth-account.service'

@Controller('auth')
export class AuthAccountController {
  constructor(private readonly authAccountService: AuthAccountService) {}

  @HttpCode(HttpStatus.OK)
  @Post('request-password-reset')
  requestPasswordReset(@Body() dto: RequestPasswordResetDto) {
    return this.authAccountService.requestPasswordReset(dto.email)
  }

  @HttpCode(HttpStatus.OK)
  @Post('reset-password')
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authAccountService.resetPassword(dto.token, dto.newPassword)
  }
}
