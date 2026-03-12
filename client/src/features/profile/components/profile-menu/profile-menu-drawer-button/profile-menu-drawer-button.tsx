import cn from 'clsx'
import { Menu } from 'lucide-react'
import { ProfileMenuDrawerButtonProps } from '../../../types'
import styles from '../profile-menu.module.css'

export function ProfileMenuDrawerButton({
  isCompact,
  openDrawer,
}: ProfileMenuDrawerButtonProps) {
  return (
    <button
      type="button"
      onClick={openDrawer}
      className={cn(styles.mobileMenuButton, {
        [styles.mobileMenuButtonHidden]: isCompact,
      })}
    >
      <Menu size={20} />
      Открыть меню кабинета
    </button>
  )
}
