import { DiscountProductsCarousel } from './components/discount-products-carousel'
import { HitsCarousel } from './components/hits-carousel'
import { NewArrivalsCarousel } from './components/new-arrivals-carousel'
import styles from './home-showcase.module.css'

export function HomeShowcase() {
  return (
    <section className={styles.showcase}>
      <h1 className="visuallyHidden">Главная страница Swoosh</h1>

      <div className={styles.sections}>
        <NewArrivalsCarousel />
        <HitsCarousel />
        <DiscountProductsCarousel />
      </div>
    </section>
  )
}
