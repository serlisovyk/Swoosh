import { applyDecorators, Type } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import {
  SWAGGER_REFRESH_TOKEN_AUTH_NAME,
  createOptionalPropertyDocsDecorator,
  createPropertyDocsDecorator,
} from '@common/swagger'
import { UserResponseDocs } from '../user/user.swagger'
import {
  AUTH_EMAIL_EXAMPLE,
  AUTH_NAME_EXAMPLE,
  AUTH_PASSWORD_EXAMPLE,
  AUTH_PHONE_EXAMPLE,
  AUTH_RESET_TOKEN_EXAMPLE,
} from './auth.constants'

export function AuthTagDocs() {
  return ApiTags('Auth')
}

export const AuthEmailPropertyDocs = createPropertyDocsDecorator({
  description: 'User email address.',
  example: AUTH_EMAIL_EXAMPLE,
})

export const AuthPasswordPropertyDocs = createPropertyDocsDecorator({
  description: 'User password.',
  example: AUTH_PASSWORD_EXAMPLE,
  minLength: 6,
})

export const AuthOptionalNamePropertyDocs = createOptionalPropertyDocsDecorator(
  {
    description: 'User display name.',
    example: AUTH_NAME_EXAMPLE,
  },
)

export const AuthOptionalPhonePropertyDocs =
  createOptionalPropertyDocsDecorator({
    description: 'User phone number.',
    example: AUTH_PHONE_EXAMPLE,
  })

export const AuthResetTokenPropertyDocs = createPropertyDocsDecorator({
  description: 'Password reset token received by email.',
  example: AUTH_RESET_TOKEN_EXAMPLE,
})

export const AuthNewPasswordPropertyDocs = createPropertyDocsDecorator({
  description: 'New password that will replace the current one.',
  example: 'newSecret123',
  minLength: 6,
})

export function AuthUserPropertyDocs(model: Type<unknown>) {
  return ApiProperty({
    description: 'Authenticated user data.',
    type: model,
  })
}

export class AuthSessionResponseDocs {
  @AuthUserPropertyDocs(UserResponseDocs)
  user!: UserResponseDocs
}

export function AuthRegisterDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Register a new user',
      description:
        'Creates a new user account, optionally merges guest favorite ids, and sets access/refresh tokens in HttpOnly cookies.',
      security: [],
    }),
    ApiCreatedResponse({
      description: 'User registered successfully.',
      type: AuthSessionResponseDocs,
    }),
    ApiBadRequestResponse({
      description: 'Request body validation failed.',
    }),
    ApiConflictResponse({
      description: 'User with this email already exists.',
    }),
  )
}

export function AuthLoginDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Log in user',
      description:
        'Authenticates a user, optionally merges guest favorite ids, and sets access/refresh tokens in HttpOnly cookies.',
      security: [],
    }),
    ApiCreatedResponse({
      description: 'User logged in successfully.',
      type: AuthSessionResponseDocs,
    }),
    ApiBadRequestResponse({
      description: 'Request body validation failed.',
    }),
    ApiUnauthorizedResponse({
      description: 'Password is invalid.',
    }),
    ApiNotFoundResponse({
      description: 'User with this email was not found.',
    }),
  )
}

export function AuthNewTokensDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Refresh auth tokens',
      description:
        'Reads the refresh token from cookies, rotates tokens and sets new HttpOnly cookies.',
      security: [{ [SWAGGER_REFRESH_TOKEN_AUTH_NAME]: [] }],
    }),
    ApiCreatedResponse({
      description: 'Tokens refreshed successfully.',
      type: AuthSessionResponseDocs,
    }),
    ApiBadRequestResponse({
      description: 'Refresh token is missing or invalid.',
    }),
    ApiNotFoundResponse({
      description: 'User for the refresh token was not found.',
    }),
  )
}

export function AuthLogoutDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Log out user',
      description: 'Clears auth cookies and invalidates the current session.',
      security: [{ [SWAGGER_REFRESH_TOKEN_AUTH_NAME]: [] }],
    }),
    ApiCreatedResponse({
      description: 'User logged out successfully.',
      schema: { type: 'boolean', example: true },
    }),
    ApiBadRequestResponse({
      description: 'Refresh token is missing.',
    }),
  )
}

export function AuthRequestPasswordResetDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Request password reset',
      description:
        'Always returns true to avoid leaking whether the email exists in the system.',
      security: [],
    }),
    ApiOkResponse({
      description: 'Password reset request processed successfully.',
      schema: { type: 'boolean', example: true },
    }),
    ApiBadRequestResponse({
      description: 'Request body validation failed.',
    }),
  )
}

export function AuthResetPasswordDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Reset password by token',
      security: [],
    }),
    ApiOkResponse({
      description: 'Password reset successfully.',
      schema: { type: 'boolean', example: true },
    }),
    ApiBadRequestResponse({
      description:
        'Reset token is invalid, expired or request body is invalid.',
    }),
  )
}
