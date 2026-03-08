import { PropsWithChildren } from 'react'
import { ProfileMenu } from '@features/profile'
import { Heading } from '@shared/ui'
import styles from './layout.module.css'

// TODO: create base guard if user not found or not auth and redirect to login page
export default function ProfileLayout({ children }: PropsWithChildren) {
  return (
    <div className="container">
      <Heading level={1} className={styles.heading}>
        Личный кабинет
      </Heading>
      <div className={styles.content}>
        <ProfileMenu />
        {children}
      </div>
    </div>
  )
}
