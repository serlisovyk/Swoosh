import { IsString } from 'class-validator'
import {
  PRODUCT_COLOR_HEX_STRING_ERROR,
  PRODUCT_COLOR_NAME_STRING_ERROR,
} from '../products.constants'

export class CreateProductColorDto {
  @IsString({ message: PRODUCT_COLOR_NAME_STRING_ERROR })
  name!: string

  @IsString({ message: PRODUCT_COLOR_HEX_STRING_ERROR })
  hex!: string
}
