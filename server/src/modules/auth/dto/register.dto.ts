import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator'
import {
  EMAIL_VALIDATION_ERROR,
  PASSWORD_STRING_ERROR,
  PASSWORD_MIN_LENGTH_ERROR,
  NAME_STRING_ERROR,
  PHONE_STRING_ERROR,
} from '../auth.constants'

export class RegisterDto {
  @IsEmail({}, { message: EMAIL_VALIDATION_ERROR })
  email!: string

  @IsString({ message: PASSWORD_STRING_ERROR })
  @MinLength(6, { message: PASSWORD_MIN_LENGTH_ERROR })
  password!: string

  @IsOptional()
  @IsString({ message: NAME_STRING_ERROR })
  name?: string

  @IsOptional()
  @IsString({ message: PHONE_STRING_ERROR })
  phone?: string
}
