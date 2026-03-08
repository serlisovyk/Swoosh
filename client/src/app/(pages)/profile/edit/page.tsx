import { ProfileEditForm } from '@features/profile'
import { Heading } from '@shared/ui'

export default function EditProfilePage() {
  return (
    <div>
      <Heading level={2}>Редактировать профиль</Heading>
      <ProfileEditForm />
    </div>
  )
}
