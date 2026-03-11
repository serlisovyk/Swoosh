class ApiRoutes {
  private readonly AUTH = '/auth'

  readonly LOGIN = `${this.AUTH}/login`
  readonly REGISTER = `${this.AUTH}/register`
  readonly REQUEST_PASSWORD_RESET = `${this.AUTH}/request-password-reset`
  readonly RESET_PASSWORD = `${this.AUTH}/reset-password`
  readonly LOGOUT = `${this.AUTH}/logout`
  readonly REFRESH = `${this.AUTH}/new-tokens`

  readonly PROFILE = '/profile'
}

export const API_ROUTES = new ApiRoutes()
