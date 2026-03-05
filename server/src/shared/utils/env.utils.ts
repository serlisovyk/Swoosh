import { ConfigService } from '@nestjs/config'

export function isDev(configService: ConfigService) {
  return configService.get<string>('NODE_ENV') === 'development'
}
