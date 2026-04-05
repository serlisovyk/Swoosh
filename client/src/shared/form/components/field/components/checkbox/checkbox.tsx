'use client'

import { useState, ChangeEvent } from 'react'
import { Check } from 'lucide-react'
import cn from 'clsx'
import { CheckboxProps } from '../../../../types'
import styles from './checkbox.module.css'

export function Checkbox({
  children,
  error,
  className,
  id,
  onChange,
  ...props
}: CheckboxProps) {
  const isControlled = props.checked !== undefined
  const [internalChecked, setInternalChecked] = useState(
    props.defaultChecked || false,
  )

  const isChecked = isControlled ? Boolean(props.checked) : internalChecked

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setInternalChecked(event.target.checked)
    }

    onChange?.(event)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.checkboxContainer}>
        <input
          id={id}
          type="checkbox"
          className={cn(styles.input, className)}
          onChange={handleChange}
          {...props}
        />

        {isChecked && <Check size={16} className={styles.checkmark} />}
      </div>

      {children && (
        <label htmlFor={id} className={styles.label}>
          {children}
        </label>
      )}

      {error && <span className={styles.error}>{error}</span>}
    </div>
  )
}
