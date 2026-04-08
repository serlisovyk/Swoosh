import { HomeProductsCarouselSection } from '../home-products-carousel-section'

export function DiscountProductsCarousel() {
  return (
    <HomeProductsCarouselSection
      title="Товары со скидкой"
      query={{ hasDiscount: true, sort: 'newest', limit: 6 }}
      variant="contained"
    />
  )
}
