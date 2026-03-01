import { ConfigService } from '@nestjs/config'
import { ThrottlerOptions } from '@nestjs/throttler'

export function getThrottlerConfig(
  configService: ConfigService,
): ThrottlerOptions[] {
  return [
    {
      ttl: configService.getOrThrow<number>('THROTTLE_TTL'),
      limit: configService.getOrThrow<number>('THROTTLE_LIMIT'),
    },
  ]
}
