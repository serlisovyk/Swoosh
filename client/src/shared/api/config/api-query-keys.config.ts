class ApiQueryKeys {
  private readonly AUTH = 'auth'

  readonly ME = `${this.AUTH}/me`

  readonly PRODUCTS = 'products'
  readonly PRODUCT = 'product'
  readonly PRODUCT_FILTERS = 'product-filters'
  readonly FAVORITES = 'favorites'
}

export const API_QUERY_KEYS = new ApiQueryKeys()
