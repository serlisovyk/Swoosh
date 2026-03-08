class ApiQueryKeys {
  private readonly AUTH = 'auth'

  readonly ME = `${this.AUTH}/me`
}

export const API_QUERY_KEYS = new ApiQueryKeys()
