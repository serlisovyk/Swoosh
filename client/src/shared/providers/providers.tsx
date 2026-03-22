'use client'

import type { PropsWithChildren } from 'react'
import { Toaster } from 'sonner'
import { FavoritesProvider } from '@features/favorites'
import { SuspenseProvider } from './suspense-provider'
import { QueryProvider } from './query-provider'

export function Providers({ children }: PropsWithChildren) {
  return (
    <SuspenseProvider>
      <QueryProvider>
        <FavoritesProvider>
          <Toaster position="top-center" expand={true} />
          {children}
        </FavoritesProvider>
      </QueryProvider>
    </SuspenseProvider>
  )
}
