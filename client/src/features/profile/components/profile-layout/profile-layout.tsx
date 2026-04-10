import { type PropsWithChildren } from 'react'
import { Breadcrumbs, Heading } from '@shared/ui'
import { ProfileMenu } from '../profile-menu'
import { ProfileLayoutContent } from './profile-layout-content'
import { PROFILE_BREADCRUMBS } from '../../constants'
import styles from './profile-layout.module.css'

export function ProfileLayout({ children }: PropsWithChildren) {
  return (
    <div className="container">
      <Breadcrumbs items={PROFILE_BREADCRUMBS} />

      <Heading as="h1" className={styles.heading}>
        Личный кабинет
      </Heading>

      <div className={styles.content}>
        <ProfileMenu />
        <ProfileLayoutContent>{children}</ProfileLayoutContent>
      </div>
    </div>
  )
}
