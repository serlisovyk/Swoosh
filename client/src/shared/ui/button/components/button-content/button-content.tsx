import { ButtonContentProps } from '../../types'
import styles from '../../button.module.css'

export function ButtonContent({ children, icon: Icon }: ButtonContentProps) {
  return (
    <>
      <span className={styles.content}>{children}</span>
      {Icon && <Icon size={20} className={styles.icon} />}
    </>
  )
}
