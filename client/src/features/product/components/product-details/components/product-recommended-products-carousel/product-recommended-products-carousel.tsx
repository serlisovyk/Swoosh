import type { ProductDetailsRecommendationCarouselProps } from '../../../../types'
import { ProductDetailsProductsCarouselSection } from '../product-details-products-carousel-section'

export function ProductRecommendedProductsCarousel({
  products,
  isLoading,
  error,
}: ProductDetailsRecommendationCarouselProps) {
  return (
    <ProductDetailsProductsCarouselSection
      title="Возможно вас заинтересует"
      products={products}
      isLoading={isLoading}
      error={error}
    />
  )
}
