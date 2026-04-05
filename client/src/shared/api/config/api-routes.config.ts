class ApiRoutes {
  private readonly AUTH = '/auth'

  readonly LOGIN = `${this.AUTH}/login`
  readonly REGISTER = `${this.AUTH}/register`
  readonly REQUEST_PASSWORD_RESET = `${this.AUTH}/request-password-reset`
  readonly RESET_PASSWORD = `${this.AUTH}/reset-password`
  readonly REQUEST_EMAIL_VERIFICATION = `${this.AUTH}/request-email-verification`
  readonly VERIFY_EMAIL = `${this.AUTH}/verify-email`
  readonly LOGOUT = `${this.AUTH}/logout`
  readonly REFRESH = `${this.AUTH}/new-tokens`

  readonly PRODUCTS = '/products'
  readonly PRODUCT = (id: string) => `${this.PRODUCTS}/${id}`
  readonly PRODUCT_FILTERS = `${this.PRODUCTS}/filters`

  readonly PROFILE = '/profile'

  readonly FAVORITES = '/favorites'
  readonly FAVORITE = (productId: string) => `${this.FAVORITES}/${productId}`

  private readonly FORMS = '/forms'

  readonly INDIVIDUAL_ORDERS = `${this.FORMS}/individual-orders`
}

export const API_ROUTES = new ApiRoutes()
