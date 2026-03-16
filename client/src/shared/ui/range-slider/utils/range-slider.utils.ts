import { RangeSliderValue } from '../types'

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
