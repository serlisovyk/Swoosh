import { Heading } from '@shared/ui'
import styles from './about-intro.module.css'

export function AboutIntro() {
  return (
    <div className="container">
      <Heading as="h1" className={styles.heading}>
        Интернет-магазин <br /> Swoosh store
      </Heading>

      <div className={styles.text}>
        Добро пожаловать в <strong>Swoosh Store</strong> – ваш источник
        подлинных кроссовок Nike и непревзойденного стиля! Мы рады представить
        вам уникальную онлайн-платформу, где вы сможете окунуться в мир
        инноваций и моды от легендарного бренда спортивной обуви.
      </div>
    </div>
  )
}
