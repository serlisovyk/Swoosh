'use client'

import { SubmitEventHandler, useEffect, useId, useState } from 'react'
import cn from 'clsx'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import { Field } from '@shared/form'
import type { CatalogSearchFormProps } from '../../types'
import { createCatalogSearchHref, normalizeProductSearch } from '../../utils'
import styles from './catalog-search-form.module.css'

export function CatalogSearchForm({
  autoFocus = false,
  className,
  defaultValue = '',
  placeholder = 'Поиск по каталогу...',
}: CatalogSearchFormProps) {
  const router = useRouter()
  const inputId = useId()
  const [value, setValue] = useState(defaultValue)

  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    router.push(createCatalogSearchHref(value))
  }

  const submitLabel = normalizeProductSearch(value)
    ? 'Искать по каталогу'
    : 'Перейти в каталог'

  return (
    <form className={cn(styles.form, className)} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <Field
          id={inputId}
          label="Поиск по каталогу"
          isVisibleLabel
          type="search"
          value={value}
          autoFocus={autoFocus}
          spellCheck={false}
          enterKeyHint="search"
          placeholder={placeholder}
          className={styles.input}
          onChange={(event) => setValue(event.target.value)}
        />

        <button
          type="submit"
          className={styles.submitButton}
          aria-label={submitLabel}
        >
          <Search size={20} />
        </button>
      </div>
    </form>
  )
}
