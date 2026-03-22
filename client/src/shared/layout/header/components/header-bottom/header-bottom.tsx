import Image from 'next/image'
import Link from 'next/link'
import { Heart, ListCollapse, Search, ShoppingBasket } from 'lucide-react'
import { ROUTES } from '@shared/config'
import styles from './header-bottom.module.css'

export function HeaderBottom() {
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
        <div className={styles.cart}>
          <Link href={ROUTES.CART}>
            <ShoppingBasket size={20} />
          </Link>
        </div>
        <div className={styles.favorites}>
          <Link href={ROUTES.FAVORITES}>
            <Heart size={20} />
          </Link>
        </div>
      </div>
    </div>
  )
}
