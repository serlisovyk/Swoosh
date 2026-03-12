import { Heading } from '@shared/ui'
import { ChangePasswordForm } from './change-password-form'

export function ProfileChangePassword() {
  return (
    <div>
      <Heading as="h2">Сменить пароль</Heading>
      <ChangePasswordForm />
    </div>
  )
}
