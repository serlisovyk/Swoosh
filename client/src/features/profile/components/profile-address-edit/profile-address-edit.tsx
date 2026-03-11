import { Heading } from '@shared/ui'
import { ProfileAddressForm } from './profile-address-form'

export function ProfileAddressEdit() {
  return (
    <div>
      <Heading level={2}>Редактирование адреса</Heading>
      <ProfileAddressForm />
    </div>
  )
}
