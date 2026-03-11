import { Heading } from '@shared/ui'
import { ChangePasswordForm } from './change-password-form'

export function ProfileChangePassword() {
  return (
    <div>
      <Heading level={2}>Сменить пароль</Heading>
      <ChangePasswordForm />
    </div>
  )
}
