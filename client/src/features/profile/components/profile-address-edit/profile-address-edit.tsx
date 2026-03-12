import { Heading } from '@shared/ui'
import { ProfileAddressForm } from './profile-address-form'

export function ProfileAddressEdit() {
  return (
    <div>
      <Heading as="h2">Редактирование адреса</Heading>
      <ProfileAddressForm />
    </div>
  )
}
