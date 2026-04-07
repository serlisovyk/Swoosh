import { normalizeQueryValues, toNumberQueryValues } from '@shared/utils'
import z from 'zod'
import { PRODUCT_SORT_VALUES } from '../constants'
import { isProductLimitOption } from '../utils'
import type { ProductFiltersQueryInput, ProductFiltersState } from '../types'

type ProductFiltersSearchParams = Pick<URLSearchParams, 'get' | 'getAll'>

const queryArrayValueSchema = z.array(z.string()).transform(normalizeQueryValues)

const singleStringQuerySchema = queryArrayValueSchema.transform(
  (values) => values[0],
)

const singleNumberQuerySchema = queryArrayValueSchema.transform(
  (values, context) => {
    const numbers = toNumberQueryValues(values)

    if (numbers.some((value) => !Number.isInteger(value))) {
      context.addIssue({
        code: 'custom',
        message: 'Invalid size query param',
      })

      return z.NEVER
    }

    return [...new Set(numbers)][0]
  },
)

const priceQuerySchema = queryArrayValueSchema.transform((values, context) => {
  const numbers = toNumberQueryValues(values)

  if (numbers.some((value) => !Number.isInteger(value))) {
    context.addIssue({
      code: 'custom',
      message: 'Invalid price query param',
    })

    return z.NEVER
  }

  if (!numbers.length) return undefined

  const [minPrice, maxPrice = numbers[0]] = numbers
    .slice(0, 2)
    .sort((a, b) => a - b)

  return [minPrice, maxPrice] as [number, number]
})

const sortQuerySchema = z.enum(PRODUCT_SORT_VALUES)

const limitQuerySchema = queryArrayValueSchema.transform((values, context) => {
  if (!values.length) return undefined

  const value = Number(values[0])

  if (!isProductLimitOption(value)) {
    context.addIssue({
      code: 'custom',
      message: 'Invalid limit query param',
    })

    return z.NEVER
  }

  return value
})

const pageQuerySchema = queryArrayValueSchema.transform((values, context) => {
  if (!values.length) return undefined

  const value = Number(values[0])

  if (!Number.isInteger(value) || value < 1) {
    context.addIssue({
      code: 'custom',
      message: 'Invalid page query param',
    })

    return z.NEVER
  }

  return value
})

export function parseProductFiltersQuery(
  query: ProductFiltersQueryInput,
): ProductFiltersState {
  const { size, price, colorName, material, sort, limit, page } = query

  const { success: sizeParseSuccess, data: sizeParseData } =
    singleNumberQuerySchema.safeParse(size ?? [])

  const { success: priceParseSuccess, data: priceParseData } =
    priceQuerySchema.safeParse(price ?? [])

  const { success: colorNameParseSuccess, data: colorNameParseData } =
    singleStringQuerySchema.safeParse(colorName ?? [])

  const { success: materialParseSuccess, data: materialParseData } =
    singleStringQuerySchema.safeParse(material ?? [])

  const { success: sortParseSuccess, data: sortParseData } = sortQuerySchema
    .optional()
    .safeParse(sort ?? undefined)

  const { success: limitParseSuccess, data: limitParseData } =
    limitQuerySchema.safeParse(limit ?? [])

  const { success: pageParseSuccess, data: pageParseData } =
    pageQuerySchema.safeParse(page ?? [])

  return {
    size: sizeParseSuccess ? sizeParseData : undefined,
    price: priceParseSuccess ? priceParseData : undefined,
    colorName: colorNameParseSuccess ? colorNameParseData : undefined,
    material: materialParseSuccess ? materialParseData : undefined,
    sort: sortParseSuccess ? sortParseData : undefined,
    limit: limitParseSuccess ? limitParseData : undefined,
    page: pageParseSuccess ? pageParseData : undefined,
  }
}

export function parseProductFiltersSearchParams(
  searchParams: ProductFiltersSearchParams,
) {
  return parseProductFiltersQuery({
    size: searchParams.getAll('size'),
    price: searchParams.getAll('price'),
    colorName: searchParams.getAll('colorName'),
    material: searchParams.getAll('material'),
    sort: searchParams.get('sort'),
    limit: searchParams.getAll('limit'),
    page: searchParams.getAll('page'),
  })
}
