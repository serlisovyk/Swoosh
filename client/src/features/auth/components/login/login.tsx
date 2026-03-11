import { Heading } from '@shared/ui'
import { LoginContent } from './login-content'
import { LoginForm } from './login-form'
import styles from './login.module.css'

export function Login() {
  return (
    <div className="container">
      <Heading level={1} className={styles.title}>
        Авторизация
      </Heading>

      <div className={styles.content}>
        <LoginForm />
        <LoginContent />
      </div>
    </div>
  )
}
