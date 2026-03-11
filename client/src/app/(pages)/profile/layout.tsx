import { type PropsWithChildren } from 'react'
import { ProfileLayout } from '@features/profile'

// TODO: create base guard if user not found or not auth and redirect to login page
export default function ProfileLayoutPage({ children }: PropsWithChildren) {
  return <ProfileLayout>{children}</ProfileLayout>
}
