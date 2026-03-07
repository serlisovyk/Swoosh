'use client'

import type { PropsWithChildren } from 'react'
import { Toaster } from 'sonner'
import { QueryProvider } from './query-provider'

export function Providers({ children }: PropsWithChildren) {
  return (
    <QueryProvider>
      <Toaster position="top-center" expand={true} />
      {children}
    </QueryProvider>
  )
}
