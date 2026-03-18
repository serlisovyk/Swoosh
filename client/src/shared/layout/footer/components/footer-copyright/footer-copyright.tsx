import Link from 'next/link'
import { ROUTES } from '@shared/config'
import { SITE_NAME } from '@shared/constants'
import styles from './footer-copyright.module.css'

export function FooterCopyright() {
  const currentYear = new Date().getFullYear()

  return (
    <div className={styles.wrapper}>
      <div>
        © {currentYear} - {SITE_NAME} - Интернет-магазин оригинальных кроссовок
      </div>

      <Link href={ROUTES.PRIVACY_POLICY} className={styles.link}>
        Политика конфиденциальности
      </Link>
    </div>
  )
}
