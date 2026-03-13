import { Type } from 'class-transformer'
import {
  ArrayUnique,
  IsArray,
  IsBoolean,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator'
import { CreateProductColorDto } from './create-product-color.dto'
import {
  PRODUCT_CATEGORY_ID_ERROR,
  PRODUCT_COLORS_ARRAY_ERROR,
  PRODUCT_DESCRIPTION_STRING_ERROR,
  PRODUCT_IMAGES_ARRAY_ERROR,
  PRODUCT_IMAGES_ITEM_STRING_ERROR,
  PRODUCT_IMAGES_UNIQUE_ERROR,
  PRODUCT_IS_HIT_BOOLEAN_ERROR,
  PRODUCT_IS_NEW_BOOLEAN_ERROR,
  PRODUCT_MATERIAL_STRING_ERROR,
  PRODUCT_OLD_PRICE_MIN_ERROR,
  PRODUCT_OLD_PRICE_NUMBER_ERROR,
  PRODUCT_PRICE_MIN_ERROR,
  PRODUCT_PRICE_NUMBER_ERROR,
  PRODUCT_SALE_CF_MIN_ERROR,
  PRODUCT_SALE_CF_NUMBER_ERROR,
  PRODUCT_SIZES_ARRAY_ERROR,
  PRODUCT_SIZES_ITEM_NUMBER_ERROR,
  PRODUCT_SIZES_UNIQUE_ERROR,
  PRODUCT_TITLE_STRING_ERROR,
} from '../products.constants'

export class CreateProductDto {
  @IsString({ message: PRODUCT_TITLE_STRING_ERROR })
  title!: string

  @Type(() => Number)
  @IsNumber({}, { message: PRODUCT_PRICE_NUMBER_ERROR })
  @Min(0, { message: PRODUCT_PRICE_MIN_ERROR })
  price!: number

  @IsString({ message: PRODUCT_DESCRIPTION_STRING_ERROR })
  description!: string

  @IsArray({ message: PRODUCT_IMAGES_ARRAY_ERROR })
  @IsString({ each: true, message: PRODUCT_IMAGES_ITEM_STRING_ERROR })
  @ArrayUnique({ message: PRODUCT_IMAGES_UNIQUE_ERROR })
  images!: string[]

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: PRODUCT_OLD_PRICE_NUMBER_ERROR })
  @Min(0, { message: PRODUCT_OLD_PRICE_MIN_ERROR })
  oldPrice?: number

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: PRODUCT_SALE_CF_NUMBER_ERROR })
  @Min(0, { message: PRODUCT_SALE_CF_MIN_ERROR })
  saleCF?: number

  @IsArray({ message: PRODUCT_SIZES_ARRAY_ERROR })
  @Type(() => Number)
  @IsNumber({}, { each: true, message: PRODUCT_SIZES_ITEM_NUMBER_ERROR })
  @ArrayUnique({ message: PRODUCT_SIZES_UNIQUE_ERROR })
  sizes!: number[]

  @IsOptional()
  @IsString({ message: PRODUCT_MATERIAL_STRING_ERROR })
  material?: string

  @IsOptional()
  @IsBoolean({ message: PRODUCT_IS_HIT_BOOLEAN_ERROR })
  isHit?: boolean

  @IsOptional()
  @IsBoolean({ message: PRODUCT_IS_NEW_BOOLEAN_ERROR })
  isNew?: boolean

  @IsArray({ message: PRODUCT_COLORS_ARRAY_ERROR })
  @ValidateNested({ each: true })
  @Type(() => CreateProductColorDto)
  colors!: CreateProductColorDto[]

  @IsMongoId({ message: PRODUCT_CATEGORY_ID_ERROR })
  categoryId!: string
}
