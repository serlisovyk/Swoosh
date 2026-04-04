import { clientEnvSchema } from '../schemas'

const { NODE_ENV, API_URL, TURNSTILE_SITE_KEY } = clientEnvSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  API_URL: process.env.NEXT_PUBLIC_API_URL,
  TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
})

export { NODE_ENV, API_URL, TURNSTILE_SITE_KEY }
