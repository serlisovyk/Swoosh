import { IsOptional, IsString } from 'class-validator'
import {
  ADDRESS_COMPANY_STRING_ERROR,
  ADDRESS_REGION_STRING_ERROR,
  ADDRESS_CITY_STRING_ERROR,
  ADDRESS_STREET_STRING_ERROR,
  ADDRESS_ZIP_STRING_ERROR,
  ADDRESS_BUILDING_NUMBER_STRING_ERROR,
} from '../user.constants'

export class UpdateAddressDto {
  @IsOptional()
  @IsString({ message: ADDRESS_COMPANY_STRING_ERROR })
  company?: string

  @IsOptional()
  @IsString({ message: ADDRESS_REGION_STRING_ERROR })
  region?: string

  @IsOptional()
  @IsString({ message: ADDRESS_CITY_STRING_ERROR })
  city?: string

  @IsOptional()
  @IsString({ message: ADDRESS_STREET_STRING_ERROR })
  street?: string

  @IsOptional()
  @IsString({ message: ADDRESS_ZIP_STRING_ERROR })
  zip?: string

  @IsOptional()
  @IsString({ message: ADDRESS_BUILDING_NUMBER_STRING_ERROR })
  buildingNumber?: string
}
