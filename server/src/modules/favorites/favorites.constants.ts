export const FAVORITES_DEFAULT_LIMIT = 12
export const FAVORITES_MAX_LIMIT = 100

export const FAVORITES_PAGE_NUMBER_ERROR = 'Page must be an integer number.'
export const FAVORITES_PAGE_MIN_ERROR = 'Page must be greater than 0.'
export const FAVORITES_LIMIT_NUMBER_ERROR = 'Limit must be an integer number.'
export const FAVORITES_LIMIT_MIN_ERROR = 'Limit must be greater than 0.'
export const FAVORITES_LIMIT_MAX_ERROR = `Limit must not be greater than ${FAVORITES_MAX_LIMIT}.`

export const FAVORITES_PRODUCT_IDS_ARRAY_ERROR =
  'favoriteProductIds must be an array.'
export const FAVORITES_PRODUCT_ID_FORMAT_ERROR =
  'Each favorite product id must be a valid MongoDB ObjectId.'

export const FAVORITES_PRODUCT_ID_EXAMPLE = '65f1e8d3f9a2b56789c12345'
export const FAVORITES_PRODUCT_IDS_EXAMPLE = [
  '65f1e8d3f9a2b56789c12345',
  '65f1e8d3f9a2b56789c12346',
]
