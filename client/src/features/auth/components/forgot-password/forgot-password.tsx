import { Heading } from '@shared/ui'
import { ForgotPasswordForm } from './forgot-password-form'
import styles from './forgot-password.module.css'

export function ForgotPassword() {
  return (
    <div className="container">
      <Heading level={1} className={styles.title}>
        Восстановление пароля
      </Heading>

      <ForgotPasswordForm />
    </div>
  )
}
