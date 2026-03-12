import { type PropsWithChildren } from 'react'
import { Breadcrumbs, Heading } from '@shared/ui'
import { ProfileMenu } from '../profile-menu'
import { ProfileGuardProvider } from '../../providers'
import { PROFILE_BREADCRUMBS } from '../../constants'
import styles from './profile-layout.module.css'

export function ProfileLayout({ children }: PropsWithChildren) {
  return (
    <ProfileGuardProvider>
      <div className="container">
        <Breadcrumbs items={PROFILE_BREADCRUMBS} />

        <Heading as="h1" className={styles.heading}>
          Личный кабинет
        </Heading>

        <div className={styles.content}>
          <ProfileMenu />
          {children}
        </div>
      </div>
    </ProfileGuardProvider>
  )
}
