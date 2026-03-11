import { Heading } from '@shared/ui'
import { ProfileEditForm } from './profile-edit-form'

export function ProfileEdit() {
  return (
    <div>
      <Heading level={2}>Редактировать профиль</Heading>
      <ProfileEditForm />
    </div>
  )
}
