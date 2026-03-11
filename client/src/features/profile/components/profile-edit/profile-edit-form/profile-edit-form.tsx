'use client'

import { ArrowRight } from 'lucide-react'
import { Button, Input } from '@shared/ui'
import { useUpdateProfileMutation } from '../../../queries'
import { useProfileEditForm } from '../../../hooks'
import { profileEditFormFields } from '../../../config'
import { ProfileEditFormData } from '../../../types'
import styles from './profile-edit-form.module.css'

export function ProfileEditForm() {
  const { register, handleSubmit, errors } = useProfileEditForm()

  const { updateProfile, isLoading } = useUpdateProfileMutation({
    toastMessage: 'Профиль успешно обновлен!',
  })

  const onSubmit = async (data: ProfileEditFormData) => {
    await updateProfile(data)
  }

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        {profileEditFormFields.map(({ name, ...field }) => (
          <Input
            key={name}
            {...field}
            error={errors[name]?.message}
            {...register(name)}
          />
        ))}

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
