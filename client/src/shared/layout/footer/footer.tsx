import { FooterInfo } from './components/footer-info'
import { FooterCopyright } from './components/footer-copyright'
import { FooterLinks } from './components/footer-links'
import styles from './footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <h2 className="visuallyHidden">Подвал сайта с ссылками и информацией</h2>

      <div className="container">
        <div className={styles.content}>
          <FooterInfo />
          <FooterLinks />
        </div>

        <FooterCopyright />
      </div>
    </footer>
  )
}
