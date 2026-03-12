import { Heading } from '@shared/ui'
import { ProfileEditForm } from './profile-edit-form'

export function ProfileEdit() {
  return (
    <div>
      <Heading as="h2">Редактировать профиль</Heading>
      <ProfileEditForm />
    </div>
  )
}
