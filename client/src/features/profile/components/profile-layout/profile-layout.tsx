import { type PropsWithChildren } from 'react'
import { Heading } from '@shared/ui'
import { ProfileGuardProvider } from '../../providers'
import { ProfileMenu } from '../profile-menu'
import styles from './profile-layout.module.css'

export function ProfileLayout({ children }: PropsWithChildren) {
  return (
    <ProfileGuardProvider>
      <div className="container">
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
