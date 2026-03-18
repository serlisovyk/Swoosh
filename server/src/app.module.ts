import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
// import { AppThrottlerModule } from '@common/throttler'
import { getMongoConfig } from '@shared/config'
import { UserModule } from './modules/user/user.module'
import { AuthModule } from './modules/auth/auth.module'
import { ProductsModule } from './modules/products/products.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    //TODO : Add throttler module for rate limiting
    // AppThrottlerModule,
    MongooseModule.forRootAsync({
      useFactory: getMongoConfig,
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    ProductsModule,
  ],
})
export class AppModule {}
