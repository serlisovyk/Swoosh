import { type PropsWithChildren } from 'react'
import { ProfileLayout } from '@features/profile'

export default function ProfileLayoutPage({ children }: PropsWithChildren) {
  return <ProfileLayout>{children}</ProfileLayout>
}
