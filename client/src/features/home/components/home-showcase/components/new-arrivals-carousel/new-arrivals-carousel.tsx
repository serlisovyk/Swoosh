import { HomeProductsCarouselSection } from '../home-products-carousel-section'

export function NewArrivalsCarousel() {
  return (
    <HomeProductsCarouselSection
      title="Последние поступления"
      query={{
        isNewArrival: true,
        sort: 'newest',
        limit: 6,
      }}
      variant="bleedRight"
    />
  )
}
