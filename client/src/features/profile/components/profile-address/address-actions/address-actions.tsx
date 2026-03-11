'use client'

import Link from 'next/link'
import { Edit2, Trash2 } from 'lucide-react'
import { useGetMeQuery } from '@features/auth'
import { ROUTES } from '@shared/config'
import { useUpdateProfileMutation } from '../../../queries'
import { ADDRESS_PROFILE_FORM_DEFAULT_VALUES } from '../../../constants'
import styles from './address-actions.module.css'

export function AddressActions() {
  const { user } = useGetMeQuery()

  const { updateProfile, isLoading } = useUpdateProfileMutation({
    toastMessage: 'Адрес успешно удален!',
  })

  if (!user) return null

  const handleDelete = () => {
    updateProfile({
      name: user.name,
      address: ADDRESS_PROFILE_FORM_DEFAULT_VALUES,
    })
  }

  return (
    <div className={styles.actions}>
      <Link href={ROUTES.ADDRESS_EDIT} className={styles.button}>
        <Edit2 size={20} />
        <span>редактировать</span>
      </Link>

      <div className={styles.divider} />

      <button
        type="button"
        className={styles.button}
        onClick={handleDelete}
        disabled={isLoading}
      >
        <Trash2 size={20} />
        <span>удалить</span>
      </button>
    </div>
  )
}
