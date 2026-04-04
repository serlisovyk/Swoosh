'use client'

import { useProfile } from '@features/auth'
import { Heading, Skeleton } from '@shared/ui'
import { AddressHeader } from './address-header'
import { AddAddressButton } from './add-address-button'
import { AddressInfo } from './address-info'
import { AddressActions } from './address-actions'
import styles from './profile-address.module.css'

export function ProfileAddress() {
  const { user, isLoading } = useProfile()

  if (isLoading) return <Skeleton count={6} />

  if (!user) return null

  const { name, address } = user

  const isAddressEmpty =
    !address || Object.values(address).some((value) => !value)

  return (
    <div>
      <Heading as="h2">Мой адрес</Heading>

      <div className={styles.wrapper}>
        <AddressHeader name={name} isAddressEmpty={isAddressEmpty} />

        {isAddressEmpty ? <AddAddressButton /> : <AddressInfo />}

        {!isAddressEmpty && <AddressActions />}
      </div>
    </div>
  )
}
