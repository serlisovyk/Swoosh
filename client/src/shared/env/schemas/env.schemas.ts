import z from 'zod'

export const clientEnvSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .optional()
    .default('development'),
  API_URL: z
    .string({ error: 'NEXT_PUBLIC_API_URL is required' })
    .url('Invalid NEXT_PUBLIC_API_URL format'),
  TURNSTILE_SITE_KEY: z
    .string({ error: 'NEXT_PUBLIC_TURNSTILE_SITE_KEY is required' })
    .min(1, 'NEXT_PUBLIC_TURNSTILE_SITE_KEY is required'),
})

export const serverEnvSchema = z.object({
  JWT_SECRET: z
    .string({ error: 'JWT_SECRET is required' })
    .min(1, 'JWT_SECRET is required'),
})
