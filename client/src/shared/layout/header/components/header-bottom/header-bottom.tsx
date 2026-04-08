'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart, ListCollapse, Search, ShoppingBasket } from 'lucide-react'
import { useFavoritesCount } from '@features/favorites'
import { useGetProductFiltersQuery } from '@features/filters'
import { createProductFiltersHref } from '@features/filters/utils'
import { ROUTES } from '@shared/config'
import styles from './header-bottom.module.css'

export function HeaderBottom() {
  const favoritesCount = useFavoritesCount()

  const { filterMetadata } = useGetProductFiltersQuery()

  return (
    <div className={styles.headerBottom}>
      <Link href={ROUTES.HOME} className={styles.logo}>
        <Image
          src="/images/logo.svg"
          alt="Логотип Swoosh"
          width={60}
          height={20}
        />
      </Link>

      <div className={styles.links}>
        <Link href={ROUTES.CATALOG} className={styles.catalogLink}>
          <ListCollapse size={20} />
          Каталог
        </Link>

        {!!filterMetadata.categories.length && (
          <nav aria-label="Категории каталога" className={styles.categories}>
            <ul className={styles.categoryList}>
              {filterMetadata.categories.map(({ _id, name }) => (
                <li key={_id}>
                  <Link
                    href={createCatalogHref(_id)}
                    className={styles.categoryLink}
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      <div className={styles.icons}>
        <div className={styles.search}>
          <Search size={20} />
        </div>

        <Link href={ROUTES.CART} className={styles.cart}>
          <ShoppingBasket size={20} />
        </Link>

        <Link href={ROUTES.FAVORITES} className={styles.favorites}>
          <Heart size={20} />

          {!!favoritesCount && (
            <span className={styles.favoritesCount}>{favoritesCount}</span>
          )}
        </Link>
      </div>
    </div>
  )
}

function createCatalogHref(categoryId: string) {
  return createProductFiltersHref(ROUTES.CATALOG, '', {
    category: categoryId,
  })
}
