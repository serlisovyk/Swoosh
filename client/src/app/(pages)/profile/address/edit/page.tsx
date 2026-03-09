import { ProfileAddressForm } from '@features/profile'
import { Heading } from '@shared/ui'

export default function EditAddressProfilePage() {
  return (
    <div>
      <Heading level={2}>Редактирование адреса</Heading>
      <ProfileAddressForm />
    </div>
  )
}
