import 'server-only'

import { serverEnvSchema } from '../schemas'

export const { JWT_SECRET } = serverEnvSchema.parse({
  JWT_SECRET: process.env.JWT_SECRET,
})
