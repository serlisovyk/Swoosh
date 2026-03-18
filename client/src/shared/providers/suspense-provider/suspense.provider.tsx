import { PropsWithChildren, Suspense } from 'react'
import { SuspenseSkeleton } from './components/suspense-skeleton'

export function SuspenseProvider({ children }: PropsWithChildren) {
  return <Suspense fallback={<SuspenseSkeleton />}>{children}</Suspense>
}
