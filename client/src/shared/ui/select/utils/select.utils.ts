import { SelectOption } from '../types'

export function toOptionValue(value: SelectOption['value'] | undefined) {
  return value === undefined ? undefined : String(value)
}

export function findOptionByValue(
  options: SelectOption[],
  value: string | undefined,
) {
  return options.find((option) => String(option.value) === value)
}
