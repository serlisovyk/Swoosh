import { Transform } from 'class-transformer'
import { IsNotEmpty, IsString } from 'class-validator'
import { trimStringValue } from '@shared/utils'
import {
  PRODUCT_COLOR_HEX_EMPTY_ERROR,
  PRODUCT_COLOR_HEX_STRING_ERROR,
  PRODUCT_COLOR_NAME_EMPTY_ERROR,
  PRODUCT_COLOR_NAME_STRING_ERROR,
} from '../products.constants'

export class CreateProductColorDto {
  @Transform(({ value }) => trimStringValue(value))
  @IsString({ message: PRODUCT_COLOR_NAME_STRING_ERROR })
  @IsNotEmpty({ message: PRODUCT_COLOR_NAME_EMPTY_ERROR })
  name!: string

  @Transform(({ value }) => trimStringValue(value))
  @IsString({ message: PRODUCT_COLOR_HEX_STRING_ERROR })
  @IsNotEmpty({ message: PRODUCT_COLOR_HEX_EMPTY_ERROR })
  hex!: string
}
