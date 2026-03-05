import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { CurrentUser as ICurrentUser, PreparedRequest } from '../auth.types'

export const CurrentUser = createParamDecorator(
  (data: keyof ICurrentUser, context: ExecutionContext) => {
    const user = context.switchToHttp().getRequest<PreparedRequest>().user
    if (!user) return null

    return data ? user[data] : user
  },
)
