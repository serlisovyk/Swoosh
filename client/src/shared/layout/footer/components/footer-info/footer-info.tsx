import Image from 'next/image'
import Link from 'next/link'
import { FOOTER_SOCIALS } from '../../constants'
import styles from './footer-info.module.css'

export function FooterInfo() {
  return (
    <div>
      <Image
        src="/images/logo-big.svg"
        alt="Logo"
        width={214}
        height={44}
        className={styles.logo}
      />

      <div className={styles.socials}>
        {FOOTER_SOCIALS.map(({ name, link, icon: Icon }) => (
          <Link
            key={name}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
            aria-label={name}
            title={name}
          >
            <Icon size={24} className={styles.icon} aria-hidden="true" />
          </Link>
        ))}
      </div>
    </div>
  )
}
