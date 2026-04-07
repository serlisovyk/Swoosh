import Link from 'next/link'
import cn from 'clsx'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { buildPaginationItems } from './utils/pagination.utils'
import type { PaginationProps } from './types'
import styles from './pagination.module.css'

export function Pagination({
  currentPage,
  totalPages,
  getPageHref,
  className,
  previousLabel = 'Назад',
  nextLabel = 'Далее',
  ariaLabel = 'Пагинация',
}: PaginationProps) {
  if (totalPages <= 1) return null

  const previousPage = currentPage - 1
  const nextPage = currentPage + 1
  const items = buildPaginationItems(currentPage, totalPages)

  return (
    <nav aria-label={ariaLabel} className={cn(styles.root, className)}>
      <div className={styles.content}>
        {currentPage > 1 ? (
          <Link className={styles.navButton} href={getPageHref(previousPage)}>
            <ArrowLeft
              aria-hidden="true"
              className={styles.arrow}
              size={22}
              strokeWidth={1.5}
            />
            <span>{previousLabel}</span>
          </Link>
        ) : (
          <span
            aria-disabled="true"
            className={cn(styles.navButton, styles.navButtonDisabled)}
          >
            <ArrowLeft
              aria-hidden="true"
              className={styles.arrow}
              size={22}
              strokeWidth={1.5}
            />
            <span>{previousLabel}</span>
          </span>
        )}

        <ol className={styles.pages}>
          {items.map((item, index) => (
            <li key={item === 'ellipsis' ? `ellipsis-${index}` : `page-${item}`}>
              {item === 'ellipsis' ? (
                <span aria-hidden="true" className={styles.ellipsis}>
                  ...
                </span>
              ) : item === currentPage ? (
                <span aria-current="page" className={styles.pageCurrent}>
                  {item}
                </span>
              ) : (
                <Link className={styles.pageLink} href={getPageHref(item)}>
                  {item}
                </Link>
              )}
            </li>
          ))}
        </ol>

        {currentPage < totalPages ? (
          <Link className={styles.navButton} href={getPageHref(nextPage)}>
            <span>{nextLabel}</span>
            <ArrowRight
              aria-hidden="true"
              className={styles.arrow}
              size={22}
              strokeWidth={1.5}
            />
          </Link>
        ) : (
          <span
            aria-disabled="true"
            className={cn(styles.navButton, styles.navButtonDisabled)}
          >
            <span>{nextLabel}</span>
            <ArrowRight
              aria-hidden="true"
              className={styles.arrow}
              size={22}
              strokeWidth={1.5}
            />
          </span>
        )}
      </div>
    </nav>
  )
}
