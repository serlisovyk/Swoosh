class Routes {
  readonly HOME = '/'

  readonly CATALOG = '/catalog'
  readonly PRODUCT = (id: string = ':id') => `/catalog/${id}`

  private readonly AUTH = '/auth'

  readonly LOGIN = this.AUTH + '/login'
  readonly REGISTER = this.AUTH + '/register'
  readonly FORGOT_PASSWORD = this.AUTH + '/forgot-password'
  readonly RESET_PASSWORD = this.AUTH + '/reset-password'
  readonly VERIFY_EMAIL = this.AUTH + '/verify-email'

  readonly PROFILE = '/profile'
  readonly EDIT_PROFILE = this.PROFILE + '/edit'
  readonly ORDERS = this.PROFILE + '/orders'
  readonly CHANGE_PASSWORD = this.PROFILE + '/change-password'

  readonly ADDRESS = this.PROFILE + '/address'
  readonly ADDRESS_EDIT = this.ADDRESS + '/edit'

  readonly FAVORITES = '/favorites'
  readonly CART = '/cart'

  readonly ABOUT = '/about'
  readonly BLOG = '/blog'
  readonly DELIVERY = '/delivery'
  readonly CONTACT = '/contact'
  readonly INDIVIDUAL_ORDER = '/individual-order'
  readonly PRIVACY_POLICY = '/privacy-policy'
}

export const ROUTES = new Routes()
