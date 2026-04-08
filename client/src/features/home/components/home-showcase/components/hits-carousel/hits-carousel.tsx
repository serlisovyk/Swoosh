import { HomeProductsCarouselSection } from '../home-products-carousel-section'

export function HitsCarousel() {
  return (
    <HomeProductsCarouselSection
      title="Хиты"
      query={{ isHit: true, sort: 'newest', limit: 6 }}
      variant="contained"
    />
  )
}
