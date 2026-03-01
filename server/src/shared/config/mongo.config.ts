import { ConfigService } from '@nestjs/config'
import { MongooseModuleOptions } from '@nestjs/mongoose'
import { getMongoString } from '../utils'

export function getMongoConfig(config: ConfigService): MongooseModuleOptions {
  return {
    uri: getMongoString(config),
  }
}
