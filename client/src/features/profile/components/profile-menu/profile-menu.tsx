'use client'

import cn from 'clsx'
import { ProfileMenuItem } from '../profile-menu-item'
import { LogoutButton } from '../logout-button'
import { profileMenuItems } from '../../data'
import { ProfileMenuProps } from '../../types'
import styles from './profile-menu.module.css'

export function ProfileMenu({ isCompact = false }: ProfileMenuProps) {
  // TODO: create btn for mobile menu and add toggle logic
  // TODO: create drawer ui component for it

  return (
    <nav className={cn(styles.menu, { [styles.menuCompact]: isCompact })}>
      {profileMenuItems.map((item) => (
        <ProfileMenuItem key={item.id} isCompact={isCompact} {...item} />
      ))}

      <LogoutButton isCompact={isCompact} />
    </nav>
  )
}
