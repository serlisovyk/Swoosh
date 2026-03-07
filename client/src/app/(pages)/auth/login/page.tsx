import { LoginContent, LoginForm } from '@features/auth'
import { Heading } from '@shared/ui'
import styles from './login.module.css'

export default function LoginPage() {
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
