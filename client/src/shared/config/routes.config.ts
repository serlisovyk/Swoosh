class Routes {
  readonly HOME = '/'

  private readonly AUTH = '/auth'

  readonly LOGIN = this.AUTH + '/login'
  readonly REGISTER = this.AUTH + '/register'

  readonly PROFILE = '/profile'
  readonly EDIT_PROFILE = this.PROFILE + '/edit'
  readonly ORDERS = this.PROFILE + '/orders'
  readonly ADDRESS = this.PROFILE + '/address'
  readonly CHANGE_PASSWORD = this.PROFILE + '/change-password'

  readonly WISHLIST = '/wishlist'
}

export const ROUTES = new Routes()
