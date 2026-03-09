'use client'

import cn from 'clsx'
import { ArrowRight } from 'lucide-react'
import { Button, Input } from '@shared/ui'
import { ROUTES } from '@shared/config'
import { useUpdateProfileMutation } from '../../queries'
import { useProfileAddressForm } from '../../hooks'
import { profileAddressFormFields } from '../../config'
import { ProfileAddressFormData } from '../../types'
import styles from './profile-address-form.module.css'

export function ProfileAddressForm() {
  const { register, handleSubmit, errors } = useProfileAddressForm()

  const { updateProfile, isLoading } = useUpdateProfileMutation({
    toastMessage: 'Адрес успешно сохранен!',
    route: ROUTES.ADDRESS,
  })

  const onSubmit = async (data: ProfileAddressFormData) => {
    const { name, ...profileAddress } = data
    await updateProfile({ name, address: profileAddress })
  }

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.grid}>
          {profileAddressFormFields.map(({ name, isFullWidth, ...field }) => (
            <div
              key={name}
              className={cn({ [styles.fullWidth]: Boolean(isFullWidth) })}
            >
              <Input
                {...field}
                error={errors[name]?.message}
                {...register(name)}
              />
            </div>
          ))}
        </div>

        <Button
          type="submit"
          variant="darkReverse"
          icon={ArrowRight}
          className={styles.button}
          disabled={isLoading}
        >
          {isLoading ? 'Сохраняем...' : 'Сохранить'}
        </Button>
      </form>
    </div>
  )
}
