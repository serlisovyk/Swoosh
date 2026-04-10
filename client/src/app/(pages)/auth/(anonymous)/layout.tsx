import { type PropsWithChildren } from 'react'
import { requireAnonymous } from '@shared/server'

export default async function AnonymousAuthLayout({
  children,
}: PropsWithChildren) {
  await requireAnonymous()

  return children
}
