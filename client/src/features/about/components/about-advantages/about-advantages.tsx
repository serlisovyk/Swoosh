import { Shield, ShoppingBag, Stars } from 'lucide-react'
import { Heading } from '@shared/ui'
import styles from './about-advantages.module.css'

export function AboutAdvantages() {
  return (
    <div className={styles.container}>
      <Heading as="h2" className="visuallyHidden">
        Преимущества Swoosh
      </Heading>

      <div className={styles.wrapper}>
        <div className={styles.item}>
          <Shield size={40} className={styles.icon} />
          <div>
            <Heading as="h3" className={styles.heading}>
              Только оригинальные товары
            </Heading>
            <div className={styles.text}>
              Гарантированная подлинность Nike и высокое качество кроссовок.
            </div>
          </div>
        </div>
        <div className={styles.item}>
          <Stars size={40} className={styles.icon} />
          <div>
            <Heading as="h3" className={styles.heading}>
              Профессиональный сервис
            </Heading>
            <div className={styles.text}>
              Команда экспертов, готовых помочь с выбором размера ответить на
              все вопросы.
            </div>
          </div>
        </div>
        <div className={styles.item}>
          <ShoppingBag size={40} className={styles.icon} />
          <div>
            <Heading as="h3" className={styles.heading}>
              Эксклюзивный выбор
            </Heading>
            <div className={styles.text}>
              Богатый ассортимент оригинальных моделей Nike, включая редкие
              выпуски.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
