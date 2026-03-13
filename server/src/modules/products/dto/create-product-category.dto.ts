import { IsString } from 'class-validator'
import { PRODUCT_CATEGORY_NAME_STRING_ERROR } from '../products.constants'

export class CreateProductCategoryDto {
  @IsString({ message: PRODUCT_CATEGORY_NAME_STRING_ERROR })
  name!: string
}
