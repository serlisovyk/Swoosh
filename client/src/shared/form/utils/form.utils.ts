import z from 'zod'
import { MatchPasswordsOptions, RangeSliderValue, SelectOption } from '../types'

export function withMatchingPasswords<T extends z.ZodObject>(
  schema: T,
  fields: MatchPasswordsOptions,
): T {
  const { passwordField, confirmPasswordField = 'confirmPassword' } = fields

  return schema.refine(
    (data) => data[passwordField] === data[confirmPasswordField],
    {
      message: 'Пароли не совпадают',
      path: [confirmPasswordField],
    },
  )
}

export function toOptionValue(value: SelectOption['value'] | undefined) {
  return value === undefined ? undefined : String(value)
}

export function findOptionByValue(
  options: SelectOption[],
  value: string | undefined,
) {
  return options.find((option) => String(option.value) === value)
}

export function clampValue(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

export function normalizeRange(
  value: RangeSliderValue,
  min: number,
  max: number,
): RangeSliderValue {
  const normalizedStart = clampValue(value[0], min, max)
  const normalizedEnd = clampValue(value[1], min, max)

  return normalizedStart <= normalizedEnd
    ? [normalizedStart, normalizedEnd]
    : [normalizedEnd, normalizedStart]
}

export function toInputState(value: RangeSliderValue) {
  return {
    min: String(value[0]),
    max: String(value[1]),
  }
}
