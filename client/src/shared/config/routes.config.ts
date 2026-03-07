class Routes {
  readonly HOME = '/'

  private readonly AUTH = '/auth'

  readonly LOGIN = this.AUTH + '/login'
  readonly REGISTER = this.AUTH + '/register'
}

export const ROUTES = new Routes()
