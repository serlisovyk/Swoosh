import Link from 'next/link'
import { HeaderAuth } from '../header-auth'
import { HEADER_TOP_LINKS } from '../../constants'
import styles from './header-top.module.css'

export function HeaderTop() {
  return (
    <div className={styles.headerTop}>
      <ul className={styles.links}>
        {HEADER_TOP_LINKS.map(({ text, link }) => (
          <li key={text}>
            <Link href={link} className={styles.link}>
              {text}
            </Link>
          </li>
        ))}
      </ul>

      <HeaderAuth />
    </div>
  )
}
