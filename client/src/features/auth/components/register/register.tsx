import { Heading } from '@shared/ui'
import { RegisterContent } from './register-content'
import { RegisterForm } from './register-form'
import styles from './register.module.css'

export function Register() {
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
