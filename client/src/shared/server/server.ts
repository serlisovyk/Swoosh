import 'server-only'

import { notFound, redirect } from 'next/navigation'
import { ROUTES } from '@shared/config'
import { ROLE, type ROLE as ROLEType } from '@shared/types'
import { getServerAccessState } from './utils'

export async function requireAuth() {
  const accessState = await getServerAccessState()

  if (!accessState.isLoggedIn) redirect(ROUTES.LOGIN)

  return accessState
}

export async function requireAnonymous() {
  const { isLoggedIn } = await getServerAccessState()

  if (isLoggedIn) redirect(ROUTES.PROFILE)
}

export async function requireRole(roles: readonly ROLEType[]) {
  const accessState = await requireAuth()

  if (accessState.role === ROLE.ADMIN || roles.includes(accessState.role)) {
    return accessState
  }

  notFound()
}
