'use client'

import { useState } from 'react'
import cn from 'clsx'
import { Eye, EyeOff } from 'lucide-react'
import { InputProps } from './types'
import styles from './input.module.css'

export function Input({
  label,
  required,
  className,
  id,
  isVisibleLabel = false,
  type = 'text',
  ...props
}: InputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const isPassword = type === 'password'
  const inputType = isPassword && isPasswordVisible ? 'text' : type

  const togglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev)

  return (
    <div className={styles.wrapper}>
      {label && (
        <label
          htmlFor={id}
          className={cn(styles.label, { visuallyHidden: isVisibleLabel })}
        >
          {label}

          {required && <span className={styles.required}>*</span>}
        </label>
      )}

      <div className={styles.inputWrapper}>
        <input
          id={id}
          type={inputType}
          required={required}
          className={cn(styles.input, className)}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            className={styles.toggleButton}
            onClick={togglePasswordVisibility}
            aria-label={isPasswordVisible ? 'Скрыть пароль' : 'Показать пароль'}
          >
            {isPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
    </div>
  )
}
