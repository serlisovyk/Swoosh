'use client'

import { useState } from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import cn from 'clsx'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { findOptionByValue, toOptionValue } from '../../utils'
import { SelectProps } from '../../types'
import styles from './select.module.css'

export function Select({
  id,
  label,
  options,
  error,
  placeholder,
  className,
  name,
  value,
  defaultValue,
  required,
  disabled,
  onValueChange,
  'aria-describedby': ariaDescribedBy,
  'aria-label': ariaLabel,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false)

  const selectedValue = toOptionValue(value)
  const defaultSelectedValue = toOptionValue(defaultValue)

  const errorId = `${id}-error`

  const describedBy = [ariaDescribedBy, error ? errorId : null]
    .filter(Boolean)
    .join(' ')

  const isDisabled = disabled || !options.some((option) => !option.disabled)

  const handleValueChange = (nextValue: string) => {
    const nextOption = findOptionByValue(options, nextValue)
    onValueChange?.(nextOption?.value ?? nextValue)
  }

  return (
    <div>
      <SelectPrimitive.Root
        open={isOpen}
        onOpenChange={setIsOpen}
        value={selectedValue}
        defaultValue={defaultSelectedValue}
        name={name}
        required={required}
        disabled={isDisabled}
        onValueChange={handleValueChange}
      >
        <div
          className={cn(styles.control, {
            [styles.invalid]: !!error,
            [styles.disabled]: isDisabled,
            [styles.controlOpen]: isOpen,
          })}
        >
          {label && (
            <label htmlFor={id} className={styles.label}>
              {label}
            </label>
          )}

          <SelectPrimitive.Trigger
            id={id}
            aria-label={ariaLabel ?? undefined}
            aria-describedby={describedBy || undefined}
            className={cn(styles.trigger, className)}
          >
            <SelectPrimitive.Value
              className={styles.value}
              placeholder={placeholder}
            />

            <SelectPrimitive.Icon asChild>
              <ChevronDown
                size={18}
                className={cn(styles.icon, {
                  [styles.iconOpen]: isOpen,
                })}
                aria-hidden="true"
              />
            </SelectPrimitive.Icon>
          </SelectPrimitive.Trigger>
        </div>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            position="popper"
            sideOffset={10}
            className={styles.menu}
          >
            <SelectPrimitive.ScrollUpButton className={styles.scrollButton}>
              <ChevronUp size={16} />
            </SelectPrimitive.ScrollUpButton>

            <SelectPrimitive.Viewport className={styles.viewport}>
              {options.map(({ value, label, disabled }) => (
                <SelectPrimitive.Item
                  key={String(value)}
                  value={String(value)}
                  disabled={disabled}
                  className={styles.option}
                >
                  <SelectPrimitive.ItemText>{label}</SelectPrimitive.ItemText>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>

            <SelectPrimitive.ScrollDownButton className={styles.scrollButton}>
              <ChevronDown size={16} />
            </SelectPrimitive.ScrollDownButton>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>

      {error && (
        <p id={errorId} className={styles.error}>
          {error}
        </p>
      )}
    </div>
  )
}
