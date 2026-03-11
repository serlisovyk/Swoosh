import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { UserModule } from '@modules/user/user.module'
import { EmailModule } from '@common/email/email.module'
import { getJwtConfig } from '@shared/config'
import { JwtStrategy } from './jwt.strategy'
import { AuthAccountService } from './auth-account/auth-account.service'
import { AuthAccountController } from './auth-account/auth-account.controller'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: getJwtConfig,
      inject: [ConfigService],
    }),
    UserModule,
    EmailModule,
  ],
  controllers: [AuthController, AuthAccountController],
  providers: [AuthService, JwtStrategy, AuthAccountService],
})
export class AuthModule {}
