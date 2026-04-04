'use client'

import type { PropsWithChildren } from 'react'
import { Toaster } from 'sonner'
import { CaptchaProvider } from '@features/auth/providers'
import { FavoritesProvider } from '@features/favorites'
import { SuspenseProvider } from './suspense-provider'
import { QueryProvider } from './query-provider'

export function Providers({ children }: PropsWithChildren) {
  return (
    <SuspenseProvider>
      <QueryProvider>
        <CaptchaProvider>
          <FavoritesProvider>
            <Toaster position="top-center" expand={true} />
            {children}
          </FavoritesProvider>
        </CaptchaProvider>
      </QueryProvider>
    </SuspenseProvider>
  )
}
