class ApiQueryKeys {
  private readonly AUTH = 'auth'

  readonly ME = `${this.AUTH}/me`
  readonly PRODUCTS = 'products'
}

export const API_QUERY_KEYS = new ApiQueryKeys()
