import {
  appendQueryArrayParam,
  createDollarPriceFormatter,
} from '@shared/utils'
import type { GetProductsParams, Product, ProductBadge } from '../types'

export function getProductBadge(product: Product): ProductBadge | null {
  if (product.saleCF > 0) {
    return {
      text: `-${normalizeSalePercent(product.saleCF)}%`,
      tone: 'sale',
    }
  }

  if (product.isNewArrival) {
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

export function createProductsSearchParams(params?: GetProductsParams) {
  const searchParams = new URLSearchParams()

  if (!params) return searchParams

  appendQueryArrayParam(searchParams, 'size', params.size)
  appendQueryArrayParam(searchParams, 'price', params.price)
  appendQueryArrayParam(searchParams, 'colorName', params.colorName)
  appendQueryArrayParam(searchParams, 'material', params.material)

  if (params.limit !== undefined) {
    searchParams.set('limit', String(params.limit))
  }

  if (params.sort) {
    searchParams.set('sort', params.sort)
  }

  return searchParams
}

export function serializeProductsParams(params?: GetProductsParams) {
  return createProductsSearchParams(params).toString()
}

function normalizeSalePercent(value: number) {
  if (value > 0 && value < 1) return Math.round(value * 100)
  return Math.round(value)
}
