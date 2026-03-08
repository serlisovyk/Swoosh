import cn from 'clsx'
import { LogOut } from 'lucide-react'
import { useLogoutMutation } from '@features/auth/queries'
import { LogoutButtonProps } from '../../types'
import styles from '../profile-menu-item/profile-menu-item.module.css'

export function LogoutButton({ isCompact = false }: LogoutButtonProps) {
  const { logout, isLoading } = useLogoutMutation()

  const handleLogout = async () => await logout()

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
