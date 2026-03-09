import { ProfileAddress } from '@features/profile'
import { Heading } from '@shared/ui'

export default function AddressProfilePage() {
  return (
    <div>
      <Heading level={2}>Мой адрес</Heading>
      <ProfileAddress />
    </div>
  )
}
