import { MapPinHouse } from 'lucide-react'
import { Heading } from '@shared/ui'
import { AddressHeaderProps } from '../../../types'
import styles from './address-header.module.css'

export function AddressHeader({ isAddressEmpty, name }: AddressHeaderProps) {
  return (
    <div className={styles.wrapper}>
      <Heading as="h3" className={styles.title}>
        {isAddressEmpty ? 'Адрес не указан' : name}
      </Heading>

      <div className={styles.subtitle}>
        <MapPinHouse />
        Адрес доставки
      </div>
    </div>
  )
}
