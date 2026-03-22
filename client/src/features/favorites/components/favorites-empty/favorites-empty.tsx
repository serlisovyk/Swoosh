import { ArrowRight, Heart } from 'lucide-react'
import { ROUTES } from '@shared/config'
import { Button, Heading } from '@shared/ui'
import styles from './favorites-empty.module.css'

export function FavoritesEmpty() {
  return (
    <div className={styles.empty}>
      <Heart size={60} className={styles.icon} />

      <Heading as="h2" className={styles.title}>
        Ваш список желаний пуст
      </Heading>

      <p className={styles.description}>
        У вас пока нет товаров в списке желаний. <br /> В нашем{' '}
        <strong>каталоге</strong> вы найдете много интересных товаров.
      </p>

      <Button href={ROUTES.CATALOG} className={styles.button} icon={ArrowRight}>
        Перейти в каталог
      </Button>
    </div>
  )
}
