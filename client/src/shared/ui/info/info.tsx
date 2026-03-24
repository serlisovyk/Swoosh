import { InfoProps } from './types'
import styles from './info.module.css'

export function Info({ title, description, prefix }: InfoProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.prefix}>{prefix}</div>
      <div className={styles.content}>
        {title && <div className={styles.title}>{title}</div>}
        <div>{description}</div>
      </div>
    </div>
  )
}
