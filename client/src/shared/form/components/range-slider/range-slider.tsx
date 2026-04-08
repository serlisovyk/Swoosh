'use client'

import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'
import cn from 'clsx'
import { clampValue, normalizeRange, toInputState } from '../../utils'
import {
  RangeSliderProps,
  RangeSliderValue,
  SliderInputField,
  SliderInput,
} from '../../types'
import styles from './range-slider.module.css'

export function RangeSlider({
  id,
  min,
  max,
  step = 1,
  label,
  className,
  disabled = false,
  value,
  defaultValue,
  onValueChange,
}: RangeSliderProps) {
  const initialValue = normalizeRange(defaultValue ?? [min, max], min, max)
  const isControlled = value !== undefined

  const [internalValue, setInternalValue] =
    useState<RangeSliderValue>(initialValue)
  const [inputValues, setInputValues] = useState(toInputState(initialValue))

  const selectedValue = isControlled
    ? normalizeRange(value, min, max)
    : internalValue

  useEffect(() => {
    setInputValues(toInputState(selectedValue))
  }, [selectedValue])

  const commitValue = (nextValue: RangeSliderValue) => {
    const normalizedValue = normalizeRange(nextValue, min, max)

    if (!isControlled) {
      setInternalValue(normalizedValue)
    }

    setInputValues(toInputState(normalizedValue))
    onValueChange?.(normalizedValue)
  }

  const handleSliderChange = (nextValue: number[]) => {
    if (nextValue.length !== 2) return

    commitValue([nextValue[0], nextValue[1]])
  }

  const handleInputChange =
    (field: SliderInputField) => (event: ChangeEvent<HTMLInputElement>) => {
      const nextRawValue = event.target.value.replace(/[^\d]/g, '')

      setInputValues((currentValues) => ({
        ...currentValues,
        [field]: nextRawValue,
      }))

      if (!nextRawValue) return

      const numericValue = clampValue(Number(nextRawValue), min, max)

      if (field === 'min') {
        commitValue([
          Math.min(numericValue, selectedValue[1]),
          selectedValue[1],
        ])
        return
      }

      commitValue([selectedValue[0], Math.max(numericValue, selectedValue[0])])
    }

  const handleInputBlur = (field: SliderInputField) => () => {
    if (!inputValues[field]) {
      setInputValues(toInputState(selectedValue))
      return
    }

    const numericValue = clampValue(Number(inputValues[field]), min, max)

    if (field === 'min') {
      commitValue([Math.min(numericValue, selectedValue[1]), selectedValue[1]])
      return
    }

    commitValue([selectedValue[0], Math.max(numericValue, selectedValue[0])])
  }

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const { blur } = event.currentTarget

    if (event.key === 'Enter') {
      blur()
    }

    if (event.key === 'Escape') {
      setInputValues(toInputState(selectedValue))
      blur()
    }
  }

  const sliderInputs: SliderInput[] = [
    {
      field: 'min',
      value: inputValues.min,
      ariaLabel: 'Минимальная цена',
    },
    {
      field: 'max',
      value: inputValues.max,
      ariaLabel: 'Максимальная цена',
    },
  ]

  return (
    <div className={cn(styles.wrapper, className)}>
      <div className={styles.layout}>
        {label && <span className={styles.label}>{label}</span>}

        <SliderPrimitive.Root
          id={id}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          minStepsBetweenThumbs={0}
          value={selectedValue}
          className={cn(styles.slider, {
            [styles.sliderDisabled]: disabled,
          })}
          onValueChange={handleSliderChange}
        >
          <SliderPrimitive.Track className={styles.track}>
            <SliderPrimitive.Range className={styles.range} />
          </SliderPrimitive.Track>

          <SliderPrimitive.Thumb
            className={cn(styles.thumb, {
              [styles.thumbDisabled]: disabled,
            })}
            aria-label="Минимальная цена"
          />
          <SliderPrimitive.Thumb
            className={cn(styles.thumb, {
              [styles.thumbDisabled]: disabled,
            })}
            aria-label="Максимальная цена"
          />
        </SliderPrimitive.Root>

        <div className={styles.inputs}>
          {sliderInputs.map(({ field, value, ariaLabel }) => {
            const inputId = `${id}-${field}`

            return (
              <label
                key={inputId}
                htmlFor={inputId}
                className={cn(styles.inputWrapper, {
                  [styles.inputWrapperDisabled]: disabled,
                })}
              >
                <input
                  key={field}
                  id={inputId}
                  type="text"
                  inputMode="numeric"
                  disabled={disabled}
                  value={value}
                  aria-label={ariaLabel}
                  className={cn(styles.input, {
                    [styles.inputDisabled]: disabled,
                  })}
                  onChange={handleInputChange(field)}
                  onBlur={handleInputBlur(field)}
                  onKeyDown={handleInputKeyDown}
                />
                <span className={styles.currency}>$</span>
              </label>
            )
          })}
        </div>
      </div>
    </div>
  )
}
