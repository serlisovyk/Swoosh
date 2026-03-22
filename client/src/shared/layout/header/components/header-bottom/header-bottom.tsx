'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart, ListCollapse, Search, ShoppingBasket } from 'lucide-react'
import { useFavoritesCount } from '@features/favorites'
import { ROUTES } from '@shared/config'
import styles from './header-bottom.module.css'

export function HeaderBottom() {
  const favoritesCount = useFavoritesCount()

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
        <Link href={ROUTES.CATALOG} className={styles.link}>
          <ListCollapse size={20} />
          Каталог
        </Link>
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
