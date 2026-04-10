import { type PropsWithChildren } from 'react'
import { ProfileLayout } from '@features/profile'
import { requireAuth } from '@shared/server'

export default async function ProfileLayoutPage({
  children,
}: PropsWithChildren) {
  await requireAuth()

  return <ProfileLayout>{children}</ProfileLayout>
}
