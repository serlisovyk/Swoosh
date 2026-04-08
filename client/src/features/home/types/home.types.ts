import type { GetProductsParams } from '@features/product'
import type { CarouselVariant } from '@shared/ui/carousel'

export interface HomeProductsCarouselSectionProps {
  title: string
  query: GetProductsParams
  variant: CarouselVariant
}
