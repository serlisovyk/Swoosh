'use client'

import { usePathname } from 'next/navigation'
import { type PropsWithChildren } from 'react'
import { useProfile } from '@features/auth'
import { ProfileEmailVerificationNotice } from '../profile-email-verification-notice'
import { PROFILE_MUTATING_ROUTES } from '../../../config'

export function ProfileLayoutContent({ children }: PropsWithChildren) {
  const pathname = usePathname()

  const { requiresEmailVerification } = useProfile()

  const isBlockedRoute =
    requiresEmailVerification && PROFILE_MUTATING_ROUTES.includes(pathname)

  return (
    <div>
      {requiresEmailVerification && (
        <ProfileEmailVerificationNotice variant="banner" />
      )}

      {isBlockedRoute ? (
        <ProfileEmailVerificationNotice variant="blocked" />
      ) : (
        children
      )}
    </div>
  )
}
