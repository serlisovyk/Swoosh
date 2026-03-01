import { NestExpressApplication } from '@nestjs/platform-express'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

export function setupSwagger(app: NestExpressApplication) {
  const config = new DocumentBuilder()
    .setTitle('Swoosh API')
    .setDescription('REST API documentation for Swoosh store application')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/v1/docs', app, document)
}
