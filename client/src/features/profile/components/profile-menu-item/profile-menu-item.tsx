'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { match } from 'path-to-regexp'
import cn from 'clsx'
import { ProfileMenuItemProps } from '../../types'
import styles from './profile-menu-item.module.css'

export function ProfileMenuItem({
  id,
  href,
  text,
  icon: Icon,
  isCompact = false,
}: ProfileMenuItemProps) {
  const pathname = usePathname()

  const matchItemActive = (href: string) => !!match(href)(pathname)

  return (
    <Link
      key={id}
      href={href}
      className={cn(styles.item, {
        [styles.itemActive]: matchItemActive(href),
        [styles.itemCompact]: isCompact,
      })}
    >
      <Icon size={20} className={styles.icon} />
      {text}
    </Link>
  )
}
