import { IsEmail, IsNotEmpty, IsString } from 'class-validator'
import { AuthEmailPropertyDocs } from '../../auth.swagger'
import { EMAIL_VALIDATION_ERROR } from '../../auth.constants'

export class RequestPasswordResetDto {
  @AuthEmailPropertyDocs()
  @IsNotEmpty({ message: EMAIL_VALIDATION_ERROR })
  @IsString({ message: EMAIL_VALIDATION_ERROR })
  @IsEmail({}, { message: EMAIL_VALIDATION_ERROR })
  email!: string
}
