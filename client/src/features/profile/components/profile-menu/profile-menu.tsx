'use client'

import cn from 'clsx'
import { Drawer, useDrawer } from '@shared/ui'
import { LogoutButton } from '../logout-button'
import { ProfileMenuDrawerButton } from './profile-menu-drawer-button'
import { ProfileMenuItem } from './profile-menu-item'
import { profileMenuItems } from '../../data'
import { ProfileMenuProps } from '../../types'
import styles from './profile-menu.module.css'

export function ProfileMenu({ isCompact = false }: ProfileMenuProps) {
  const { isDrawerOpen, openDrawer, closeDrawer } = useDrawer()

  return (
    <>
      <nav className={cn(styles.menu, { [styles.menuCompact]: isCompact })}>
        {profileMenuItems.map((item) => (
          <ProfileMenuItem key={item.id} isCompact={isCompact} {...item} />
        ))}

        <LogoutButton isCompact={isCompact} />
      </nav>

      <ProfileMenuDrawerButton isCompact={isCompact} openDrawer={openDrawer} />

      <Drawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        title="Меню кабинета"
        closeLabel="Закрыть меню кабинета"
        contentClassName={styles.drawerContent}
      >
        <nav className={styles.mobileMenu}>
          {profileMenuItems.map((item) => (
            <ProfileMenuItem key={item.id} {...item} onClick={closeDrawer} />
          ))}

          <LogoutButton onClick={closeDrawer} />
        </nav>
      </Drawer>
    </>
  )
}
