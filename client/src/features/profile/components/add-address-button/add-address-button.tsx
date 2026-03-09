import Link from 'next/link'
import { Plus } from 'lucide-react'
import { ROUTES } from '@shared/config'
import styles from './add-address-button.module.css'

export function AddAddressButton() {
  return (
    <>
      <Link href={ROUTES.ADDRESS_EDIT} className={styles.link}>
        <Plus />
        Добавить адрес
      </Link>
    </>
  )
}
