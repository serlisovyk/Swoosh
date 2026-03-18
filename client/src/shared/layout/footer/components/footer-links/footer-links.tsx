import Link from 'next/link'
import { FOOTER_LINKS } from '../../constants'
import styles from './footer-links.module.css'

export function FooterLinks() {
  return (
    <div className={styles.wrapper}>
      {FOOTER_LINKS.map(({ title, items }) => (
        <div key={title}>
          <h3 className={styles.title}>{title}</h3>

          <ul className={styles.list}>
            {items.map(({ text, link }) => (
              <li key={text} className={styles.listItem}>
                <Link href={link} className={styles.link}>
                  {text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
