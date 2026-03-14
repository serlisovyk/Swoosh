import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator'
import {
  AuthEmailPropertyDocs,
  AuthOptionalNamePropertyDocs,
  AuthOptionalPhonePropertyDocs,
  AuthPasswordPropertyDocs,
} from '../auth.swagger'
import {
  EMAIL_VALIDATION_ERROR,
  PASSWORD_STRING_ERROR,
  PASSWORD_MIN_LENGTH_ERROR,
  NAME_STRING_ERROR,
  PHONE_STRING_ERROR,
} from '../auth.constants'

export class RegisterDto {
  @AuthEmailPropertyDocs()
  @IsEmail({}, { message: EMAIL_VALIDATION_ERROR })
  email!: string

  @AuthPasswordPropertyDocs()
  @IsString({ message: PASSWORD_STRING_ERROR })
  @MinLength(6, { message: PASSWORD_MIN_LENGTH_ERROR })
  password!: string

  @AuthOptionalNamePropertyDocs()
  @IsOptional()
  @IsString({ message: NAME_STRING_ERROR })
  name?: string

  @AuthOptionalPhonePropertyDocs()
  @IsOptional()
  @IsString({ message: PHONE_STRING_ERROR })
  phone?: string
}
