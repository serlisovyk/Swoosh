import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator'
import {
  EMAIL_STRING_ERROR,
  EMAIL_FORMAT_ERROR,
  PASSWORD_STRING_ERROR,
  PASSWORD_LENGTH_ERROR,
  NAME_STRING_ERROR,
  PHONE_STRING_ERROR,
} from '../user.constants'

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: NAME_STRING_ERROR })
  name?: string

  @IsOptional()
  @IsString({ message: EMAIL_STRING_ERROR })
  @IsEmail({}, { message: EMAIL_FORMAT_ERROR })
  email?: string

  @IsOptional()
  @IsString({ message: PASSWORD_STRING_ERROR })
  @MinLength(6, { message: PASSWORD_LENGTH_ERROR })
  password?: string

  @IsOptional()
  @IsString({ message: PHONE_STRING_ERROR })
  phone?: string
}
