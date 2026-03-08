'use client'

import { useGetMeQuery } from '@features/auth'
import { useLogoutMutation } from '@features/auth/queries'
import { Button } from '@shared/ui'

export default function ProfilePage() {
  const { user, isLoading, error } = useGetMeQuery()

  const { logout, isLoading: isLogoutLoading } = useLogoutMutation()

  if (isLoading || isLogoutLoading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error: {error.message}</p>
  }

  console.log('User:', user)

  return (
    <div>
      <h1>Profile Page</h1>
      <p>This is the profile page.</p>
      <Button onClick={() => logout()} disabled={isLogoutLoading}>
        {isLogoutLoading ? 'Logging out...' : 'Logout'}
      </Button>
    </div>
  )
}
