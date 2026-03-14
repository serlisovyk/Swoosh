import { FindAllProductsDto } from './dto/find-all-products.dto'
import {
  DEFAULT_PRODUCTS_LIMIT,
  PRODUCT_SORT_MAP,
  PRODUCT_SORT_OPTIONS,
  REGEX_SPECIAL_CHARACTERS,
} from './products.constants'
import type { ProductListQueryOptions } from './products.types'

export function buildProductListQueryOptions(
  dto: FindAllProductsDto,
): ProductListQueryOptions {
  const { size, price, colorName, material, sort, limit } = dto

  const filters: Record<string, unknown> = {}

  if (price?.length) {
    if (price.length === 1) {
      filters.price = price[0]
    } else {
      const [minPrice, maxPrice] = [...price].sort((a, b) => a - b)

      filters.price = {
        $gte: minPrice,
        $lte: maxPrice,
      }
    }
  }

  if (size?.length) {
    filters.sizes = { $in: size }
  }

  if (colorName?.length) {
    filters['colors.name'] = {
      $in: colorName.map((value) => createExactRegex(value)),
    }
  }

  if (material?.length) {
    filters.material = {
      $in: material.map((value) => createExactRegex(value)),
    }
  }

  const sortOption = sort
    ? PRODUCT_SORT_MAP[sort]
    : PRODUCT_SORT_MAP[PRODUCT_SORT_OPTIONS.NEWEST]

  const limitOption = limit ?? DEFAULT_PRODUCTS_LIMIT

  return { filters, sort: sortOption, limit: limitOption }
}

function createExactRegex(value: string): RegExp {
  return new RegExp(`^${escapeRegExp(value)}$`, 'i')
}

function escapeRegExp(value: string): string {
  return value.replace(REGEX_SPECIAL_CHARACTERS, '\\$&')
}
