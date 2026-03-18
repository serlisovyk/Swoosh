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
        {FOOTER_SOCIALS.map(({ name, link, icon }) => (
          <Link
            key={name}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            <Image src={icon} alt={name} width={40} height={40} />
          </Link>
        ))}
      </div>
    </div>
  )
}
