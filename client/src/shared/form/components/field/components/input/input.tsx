'use client'

import { useState } from 'react'
import cn from 'clsx'
import { Eye, EyeOff } from 'lucide-react'
import { FIELD_APPEARANCES, InputProps } from '../../../../types'
import styles from './input.module.css'

export function Input({
  label,
  required,
  className,
  error,
  id,
  isVisibleLabel = false,
  appearance = FIELD_APPEARANCES.DEFAULT,
  type = 'text',
  ...props
}: InputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const isPassword = type === 'password'
  const inputType = isPassword && isPasswordVisible ? 'text' : type
  const isUnderlineAppearance = appearance === FIELD_APPEARANCES.UNDERLINE

  const togglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev)

  return (
    <div
      className={cn(styles.wrapper, {
        [styles.underlineWrapper]: isUnderlineAppearance,
      })}
    >
      {label && (
        <label
          htmlFor={id}
          className={cn(styles.label, {
            [styles.underlineLabel]: isUnderlineAppearance,
            visuallyHidden: isVisibleLabel,
          })}
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
          aria-invalid={!!error}
          className={cn(styles.input, className, {
            [styles.underlineInput]: isUnderlineAppearance,
          })}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            className={cn(styles.toggleButton, {
              [styles.underlineToggleButton]: isUnderlineAppearance,
            })}
            onClick={togglePasswordVisibility}
            aria-label={isPasswordVisible ? 'Скрыть пароль' : 'Показать пароль'}
          >
            {isPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>

      {error && <p className={styles.error}>{error}</p>}
    </div>
  )
}
