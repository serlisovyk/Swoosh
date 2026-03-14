import { Transform, Type } from 'class-transformer'
import {
  ArrayMaxSize,
  ArrayUnique,
  IsArray,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator'
import { toNumberArrayQueryParam, toStringArrayQueryParam } from '@shared/utils'
import {
  PRODUCT_QUERY_COLOR_NAME_ARRAY_ERROR,
  PRODUCT_QUERY_COLOR_NAME_STRING_ERROR,
  PRODUCT_QUERY_LIMIT_MAX_ERROR,
  PRODUCT_QUERY_LIMIT_MIN_ERROR,
  PRODUCT_QUERY_LIMIT_NUMBER_ERROR,
  PRODUCT_QUERY_MATERIAL_ARRAY_ERROR,
  PRODUCT_QUERY_MATERIAL_STRING_ERROR,
  PRODUCT_QUERY_PRICE_ARRAY_ERROR,
  PRODUCT_QUERY_PRICE_MAX_SIZE_ERROR,
  PRODUCT_QUERY_PRICE_NUMBER_ERROR,
  PRODUCT_QUERY_SIZE_ARRAY_ERROR,
  PRODUCT_QUERY_SIZE_NUMBER_ERROR,
  PRODUCT_QUERY_SORT_ERROR,
  PRODUCT_SORT_OPTIONS,
} from '../products.constants'

export class FindAllProductsDto {
  @IsOptional()
  @Transform(({ value }) => toNumberArrayQueryParam(value))
  @IsArray({ message: PRODUCT_QUERY_SIZE_ARRAY_ERROR })
  @IsInt({ each: true, message: PRODUCT_QUERY_SIZE_NUMBER_ERROR })
  @ArrayUnique()
  size?: number[]

  @IsOptional()
  @Transform(({ value }) => toNumberArrayQueryParam(value))
  @IsArray({ message: PRODUCT_QUERY_PRICE_ARRAY_ERROR })
  @IsInt({ each: true, message: PRODUCT_QUERY_PRICE_NUMBER_ERROR })
  @ArrayMaxSize(2, { message: PRODUCT_QUERY_PRICE_MAX_SIZE_ERROR })
  price?: number[]

  @IsOptional()
  @Transform(({ value }) => toStringArrayQueryParam(value))
  @IsArray({ message: PRODUCT_QUERY_COLOR_NAME_ARRAY_ERROR })
  @IsString({ each: true, message: PRODUCT_QUERY_COLOR_NAME_STRING_ERROR })
  @ArrayUnique()
  colorName?: string[]

  @IsOptional()
  @Transform(({ value }) => toStringArrayQueryParam(value))
  @IsArray({ message: PRODUCT_QUERY_MATERIAL_ARRAY_ERROR })
  @IsString({ each: true, message: PRODUCT_QUERY_MATERIAL_STRING_ERROR })
  @ArrayUnique()
  material?: string[]

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: PRODUCT_QUERY_LIMIT_NUMBER_ERROR })
  @Min(1, { message: PRODUCT_QUERY_LIMIT_MIN_ERROR })
  @Max(100, { message: PRODUCT_QUERY_LIMIT_MAX_ERROR })
  limit?: number

  @IsOptional()
  @IsEnum(PRODUCT_SORT_OPTIONS, { message: PRODUCT_QUERY_SORT_ERROR })
  sort?: PRODUCT_SORT_OPTIONS
}
