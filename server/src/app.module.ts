import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppMongoModule } from '@common/mongo'
import { AppThrottlerModule } from '@common/throttler'
import { UserModule } from './modules/user/user.module'
import { AuthModule } from './modules/auth/auth.module'
import { ProductsModule } from './modules/products/products.module'
import { FavoritesModule } from './modules/favorites/favorites.module'
import { FormsModule } from './modules/forms/forms.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AppMongoModule,
    AppThrottlerModule,
    UserModule,
    AuthModule,
    ProductsModule,
    FavoritesModule,
    FormsModule,
  ],
})
export class AppModule {}
