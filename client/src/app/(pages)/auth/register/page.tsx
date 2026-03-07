import { RegisterForm, RegisterContent } from '@features/auth'
import { Heading } from '@shared/ui'
import styles from './register.module.css'

export default function RegisterPage() {
  return (
    <div className="container">
      <Heading level={1} className={styles.title}>
        Регистрация
      </Heading>

      <div className={styles.content}>
        <RegisterForm />
        <RegisterContent />
      </div>
    </div>
  )
}
