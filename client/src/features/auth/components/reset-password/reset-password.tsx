import { Heading } from '@shared/ui'
import { ResetPasswordForm } from './reset-password-form'
import styles from './reset-password.module.css'

export function ResetPassword() {
  return (
    <div className="container">
      <Heading as="h1" className={styles.title}>
        Восстановление пароля
      </Heading>

      <ResetPasswordForm />
    </div>
  )
}
