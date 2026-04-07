import {
  appendQueryArrayParam,
  createDollarPriceFormatter,
} from '@shared/utils'
import { DESCRIPTION_PREVIEW_LIMIT } from '../constants'
import type {
  GetProductsParams,
  Product,
  ProductBadge,
  ProductCharacteristic,
} from '../types'

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

export function formatProductSize(size: number) {
  return new Intl.NumberFormat('ru-RU', {
    maximumFractionDigits: 1,
  }).format(size)
}

export function getProductCharacteristics(
  product: Product,
): ProductCharacteristic[] {
  const colors = product.colors.map(({ name }) => name).join(', ')
  const sizes = product.sizes.map((size) => formatProductSize(size)).join(', ')

  return [
    {
      label: 'Категория',
      value: product.category?.name || 'Не указано',
    },
    {
      label: 'Материал',
      value: product.material || 'Не указано',
    },
    {
      label: 'Цвета',
      value: colors || 'Не указано',
    },
    {
      label: 'Размеры',
      value: sizes || 'Не указано',
    },
    {
      label: 'Новинка',
      value: product.isNewArrival ? 'Да' : 'Нет',
    },
    {
      label: 'Хит продаж',
      value: product.isHit ? 'Да' : 'Нет',
    },
  ]
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

  const normalizedPage = normalizeProductsPage(params.page)

  if (normalizedPage !== undefined) {
    searchParams.set('page', String(normalizedPage))
  }

  if (params.sort) {
    searchParams.set('sort', params.sort)
  }

  return searchParams
}

export function serializeProductsParams(params?: GetProductsParams) {
  return createProductsSearchParams(params).toString()
}

export function normalizeProductsPage(page?: number) {
  if (!page || page <= 1) return undefined
  return page
}

export function createProductsPaginationHref(
  pathname: string,
  rawSearchParams: string,
  page?: number,
) {
  const nextSearchParams = new URLSearchParams(rawSearchParams)
  const normalizedPage = normalizeProductsPage(page)

  if (normalizedPage === undefined) {
    nextSearchParams.delete('page')
  } else {
    nextSearchParams.set('page', String(normalizedPage))
  }

  const nextQueryString = nextSearchParams.toString()

  return nextQueryString ? `${pathname}?${nextQueryString}` : pathname
}

export function getProductsPaginationCorrectionHref(
  pathname: string,
  rawSearchParams: string,
  currentPage: number,
  totalPages: number,
) {
  const lastAvailablePage = totalPages > 0 ? totalPages : 1

  if (currentPage <= lastAvailablePage) {
    return null
  }

  return createProductsPaginationHref(
    pathname,
    rawSearchParams,
    lastAvailablePage,
  )
}

function normalizeSalePercent(value: number) {
  if (value > 0 && value < 1) return Math.round(value * 100)
  return Math.round(value)
}

export function prepareDescriptionText(description: string) {
  const shouldShowFullDescription =
    description.length > DESCRIPTION_PREVIEW_LIMIT

  const previewText = shouldShowFullDescription
    ? `${description.slice(0, DESCRIPTION_PREVIEW_LIMIT).trimEnd()}...`
    : description

  return { previewText, shouldShowFullDescription }
}
