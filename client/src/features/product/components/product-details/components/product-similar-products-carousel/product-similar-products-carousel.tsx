import type { ProductDetailsRecommendationCarouselProps } from '../../../../types'
import { ProductDetailsProductsCarouselSection } from '../product-details-products-carousel-section'

export function ProductSimilarProductsCarousel({
  products,
  isLoading,
  error,
}: ProductDetailsRecommendationCarouselProps) {
  return (
    <ProductDetailsProductsCarouselSection
      title="Похожие кроссовки"
      products={products}
      isLoading={isLoading}
      error={error}
    />
  )
}
