import { ConfigService } from '@nestjs/config'
import { NODE_ENV } from '@shared/constants'

export function isDev(configService: ConfigService) {
  return configService.get<string>('NODE_ENV') === NODE_ENV.DEVELOPMENT
}
