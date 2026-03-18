'use client'

import type { PropsWithChildren } from 'react'
import { Toaster } from 'sonner'
import { SuspenseProvider } from './suspense-provider'
import { QueryProvider } from './query-provider'

export function Providers({ children }: PropsWithChildren) {
  return (
    <SuspenseProvider>
      <QueryProvider>
        <Toaster position="top-center" expand={true} />
        {children}
      </QueryProvider>
    </SuspenseProvider>
  )
}
