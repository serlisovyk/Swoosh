import type { NextConfig } from 'next'

function getSocialAuthDestination(provider: 'google' | 'github') {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  if (!apiUrl) {
    throw new Error('NEXT_PUBLIC_API_URL is required for social auth rewrites')
  }

  return `${apiUrl}/auth/${provider}`
}

const nextConfig: NextConfig = {
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: '/auth/google',
        destination: getSocialAuthDestination('google'),
      },
      {
        source: '/auth/github',
        destination: getSocialAuthDestination('github'),
      },
    ]
  },
}

export default nextConfig
