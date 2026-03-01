import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { NestExpressApplication } from '@nestjs/platform-express'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import { setupValidation, setupSwagger } from '@shared/config'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.setGlobalPrefix('api/v1')

  const configService = app.get(ConfigService)

  setupValidation(app)

  setupSwagger(app)

  app.use(cookieParser())

  app.use(helmet())

  app.enableCors({
    origin: configService.get<string>('CORS_DOMAINS')?.split(','),
    credentials: true,
  })

  app.disable('x-powered-by')

  const PORT = configService.getOrThrow<number>('PORT')

  await app.listen(PORT)
}

void bootstrap()
