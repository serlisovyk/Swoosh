import { IsEmail, IsString, MinLength } from 'class-validator'
import {
  EMAIL_VALIDATION_ERROR,
  PASSWORD_STRING_ERROR,
  PASSWORD_MIN_LENGTH_ERROR,
} from '../auth.constants'

export class LoginDto {
  @IsEmail({}, { message: EMAIL_VALIDATION_ERROR })
  email!: string

  @IsString({ message: PASSWORD_STRING_ERROR })
  @MinLength(6, { message: PASSWORD_MIN_LENGTH_ERROR })
  password!: string
}
