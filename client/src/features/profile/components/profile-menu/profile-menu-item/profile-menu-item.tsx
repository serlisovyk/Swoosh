'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { match } from 'path-to-regexp'
import cn from 'clsx'
import { ProfileMenuItemProps } from '../../../types'
import styles from './profile-menu-item.module.css'

export function ProfileMenuItem({
  id,
  href,
  text,
  icon: Icon,
  isCompact = false,
  onClick,
}: ProfileMenuItemProps) {
  const pathname = usePathname()

  return (
    <Link
      key={id}
      href={href}
      onClick={onClick}
      className={cn(styles.item, {
        [styles.itemActive]: !!match(href)(pathname),
        [styles.itemCompact]: isCompact,
      })}
    >
      <Icon size={20} className={styles.icon} />
      {text}
    </Link>
  )
}
