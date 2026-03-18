class Routes {
  readonly HOME = '/'
  readonly CATALOG = '/catalog'

  private readonly AUTH = '/auth'

  readonly LOGIN = this.AUTH + '/login'
  readonly REGISTER = this.AUTH + '/register'
  readonly FORGOT_PASSWORD = this.AUTH + '/forgot-password'
  readonly RESET_PASSWORD = this.AUTH + '/reset-password'

  readonly PROFILE = '/profile'
  readonly EDIT_PROFILE = this.PROFILE + '/edit'
  readonly ORDERS = this.PROFILE + '/orders'
  readonly CHANGE_PASSWORD = this.PROFILE + '/change-password'

  readonly ADDRESS = this.PROFILE + '/address'
  readonly ADDRESS_EDIT = this.ADDRESS + '/edit'

  readonly WISHLIST = '/wishlist'
  readonly CART = '/cart'

  readonly ABOUT = '/about'
  readonly BLOG = '/blog'
  readonly DELIVERY = '/delivery'
  readonly CONTACT = '/contact'
  readonly PRIVACY_POLICY = '/privacy-policy'
}

export const ROUTES = new Routes()
