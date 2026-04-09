'use client'

import { FormEvent, KeyboardEvent, useEffect, useId, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation'
import { Heart, ListCollapse, Search, ShoppingBasket } from 'lucide-react'
import { useFavoritesCount } from '@features/favorites'
import { useGetProductFiltersQuery } from '@features/filters'
import { createProductFiltersHref } from '@features/filters/utils'
import {
  createCatalogSearchHref,
  normalizeProductSearch,
} from '@features/product/utils'
import { ROUTES } from '@shared/config'
import { Field } from '@shared/form'
import styles from './header-bottom.module.css'

export function HeaderBottom() {
  const favoritesCount = useFavoritesCount()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const searchFormId = useId()
  const rawSearchParams = searchParams.toString()
  const currentSearch = normalizeProductSearch(searchParams.get('search')) ?? ''
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchValue, setSearchValue] = useState(currentSearch)

  const { filterMetadata } = useGetProductFiltersQuery()

  useEffect(() => {
    setSearchValue(currentSearch)
  }, [currentSearch])

  useEffect(() => {
    setIsSearchOpen(false)
  }, [pathname, rawSearchParams])

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    router.push(createCatalogSearchHref(searchValue))
  }

  const closeSearch = () => {
    setSearchValue(currentSearch)
    setIsSearchOpen(false)
  }

  const handleSearchEscape = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Escape') return

    closeSearch()
  }

  const toggleSearch = () => {
    if (isSearchOpen) {
      closeSearch()
      return
    }

    setIsSearchOpen(true)
  }

  return (
    <div className={styles.headerBottom}>
      <Link href={ROUTES.HOME} className={styles.logo}>
        <Image src="/images/logo.svg" alt="Логотип Swoosh" width={60} height={20} />
      </Link>

      {isSearchOpen ? (
        <form
          id={searchFormId}
          className={styles.searchForm}
          onSubmit={handleSearchSubmit}
        >
          <Field
            id={`${searchFormId}-input`}
            label="Поиск по каталогу"
            isVisibleLabel
            type="search"
            value={searchValue}
            autoFocus
            spellCheck={false}
            enterKeyHint="search"
            placeholder="Поиск по каталогу товаров..."
            className={styles.searchInput}
            onKeyDown={handleSearchEscape}
            onChange={(event) => setSearchValue(event.target.value)}
          />
        </form>
      ) : (
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
      )}

      <div className={styles.icons}>
        <button
          type="button"
          className={`${styles.searchButton} ${isSearchOpen ? styles.searchButtonActive : ''}`}
          aria-expanded={isSearchOpen}
          aria-label={isSearchOpen ? 'Закрыть поиск по каталогу' : 'Открыть поиск по каталогу'}
          onClick={toggleSearch}
        >
          <Search size={20} />
        </button>

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
