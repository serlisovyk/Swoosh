import Image from 'next/image'
import { MoveRight } from 'lucide-react'
import { ROUTES } from '@shared/config'
import { Button, Heading } from '@shared/ui'
import { CatalogSearchForm } from '../catalog-search-form'
import styles from './catalog-not-found.module.css'

export function CatalogNotFound() {
  return (
    <div className="container">
      <section className={styles.wrapper}>
        <div className={styles.content}>
          <Heading as="h1" className={styles.title}>
            <span className={styles.titleLabel}>Ошибка</span>
            <span className={styles.titleText}>Такая страница не найдена</span>
          </Heading>

          <p className={styles.description}>
            Запрашиваемая страница не найдена. Возможно, она была удалена или вы
            перешли по неверной ссылке. Попробуйте воспользоваться поиском по
            каталогу.
          </p>

          <CatalogSearchForm className={styles.search} />

          <Button href={ROUTES.HOME} variant="dark" icon={MoveRight}>
            На главную
          </Button>
        </div>

        <div className={styles.media}>
          <Image
            src="/images/not-found/not-found.png"
            alt="Кроссовок на фоне числа 404"
            width={792}
            height={646}
            priority
            className={styles.image}
          />
        </div>
      </section>
    </div>
  )
}
