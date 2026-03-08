import { ChangePasswordForm } from '@features/profile'
import { Heading } from '@shared/ui'

export default function ChangePasswordPage() {
  return (
    <div>
      <Heading level={2}>Сменить пароль</Heading>
      <ChangePasswordForm />
    </div>
  )
}
