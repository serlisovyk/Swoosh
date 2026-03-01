import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { AppThrottlerModule } from '@common/throttler'
import { getMongoConfig } from '@shared/config'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AppThrottlerModule,
    MongooseModule.forRootAsync({
      useFactory: getMongoConfig,
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
