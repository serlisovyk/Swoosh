import Link from 'next/link'
import cn from 'clsx'
import { MoveRight } from 'lucide-react'
import { ROOT_ITEM } from './constants'
import { BreadcrumbsProps } from './types'
import styles from './breadcrumbs.module.css'

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  const allItems = [ROOT_ITEM, ...items]

  return (
    <nav
      aria-label="Хлебные крошки"
      className={cn(styles.breadcrumbs, className)}
    >
      <ol className={styles.list}>
        {allItems.map(({ label, href }, index) => {
          const isLastItem = index === allItems.length - 1

          return (
            <li key={href} className={styles.item}>
              <Link href={href} className={styles.link}>
                {label}
              </Link>

              {!isLastItem && (
                <MoveRight
                  size={16}
                  className={styles.separator}
                  aria-hidden="true"
                />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
