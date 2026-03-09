'use client'

import { useGetMeQuery } from '@features/auth'
import { AddressHeader } from '../address-header'
import { AddAddressButton } from '../add-address-button'
import { AddressInfo } from '../address-info'
import { AddressActions } from '../address-actions'
import styles from './profile-address.module.css'

export function ProfileAddress() {
  const { user } = useGetMeQuery()

  if (!user) return null

  const { name, address } = user

  const isAddressEmpty =
    !address || Object.values(address).some((value) => !value)

  return (
    <div className={styles.wrapper}>
      <AddressHeader name={name} isAddressEmpty={isAddressEmpty} />

      {isAddressEmpty ? <AddAddressButton /> : <AddressInfo />}

      {!isAddressEmpty && <AddressActions />}
    </div>
  )
}
