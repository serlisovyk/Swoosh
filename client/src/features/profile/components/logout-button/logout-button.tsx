import cn from 'clsx'
import { MouseEvent } from 'react'
import { LogOut } from 'lucide-react'
import { useLogoutMutation } from '@features/auth/queries'
import { LogoutButtonProps } from '../../types'
import styles from '../profile-menu/profile-menu-item/profile-menu-item.module.css'

export function LogoutButton({
  isCompact = false,
  onClick,
}: LogoutButtonProps) {
  const { logout, isLoading } = useLogoutMutation()

  const handleLogout = async (event: MouseEvent<HTMLButtonElement>) => {
    onClick?.(event)
    await logout()
  }

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className={cn(styles.item, { [styles.itemCompact]: isCompact })}
    >
      <LogOut size={20} className={styles.icon} />
      Выйти из аккаунта
    </button>
  )
}
