import { createDollarPriceFormatter } from '@shared/utils'
import { Product, ProductBadge } from '../types'

export function getProductBadge(product: Product): ProductBadge | null {
  if (product.saleCF > 0) {
    return {
      text: `-${normalizeSalePercent(product.saleCF)}%`,
      tone: 'sale',
    }
  }

  if (product.isNew) {
    return {
      text: 'Новинка',
      tone: 'neutral',
    }
  }

  if (product.isHit) {
    return {
      text: 'Хит',
      tone: 'hit',
    }
  }

  return null
}

export function formatProductPrice(price: number) {
  return createDollarPriceFormatter().format(price)
}

function normalizeSalePercent(value: number) {
  if (value > 0 && value < 1) return Math.round(value * 100)
  return Math.round(value)
}
