'use client'

import { forwardRef } from 'react'
import { Tabs } from '@shared/ui'
import type { ProductDetailsTabsProps } from '../../../../types'
import { getProductCharacteristics } from '../../../../utils'
import styles from './product-details-tabs.module.css'

export const ProductDetailsTabs = forwardRef<
  HTMLDivElement,
  ProductDetailsTabsProps
>(function ProductDetailsTabs({ product }, ref) {
  const characteristics = getProductCharacteristics(product)

  const tabs = [
    {
      id: 'description',
      label: 'Описание',
      content: <p className={styles.descriptionText}>{product.description}</p>,
    },
    {
      id: 'characteristics',
      label: 'Характеристики',
      content: (
        <dl className={styles.characteristicsList}>
          {characteristics.map(({ label, value }) => (
            <div className={styles.characteristicRow} key={label}>
              <dt className={styles.characteristicKey}>{label}</dt>
              <dd className={styles.characteristicValue}>{value}</dd>
            </div>
          ))}
        </dl>
      ),
    },
  ]

  return (
    <div ref={ref} className={styles.section}>
      <Tabs items={tabs} defaultValue="description" />
    </div>
  )
})
