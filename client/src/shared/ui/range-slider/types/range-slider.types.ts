export interface RangeSliderProps {
  id: string
  min: number
  max: number
  step?: number
  label?: string
  className?: string
  value?: RangeSliderValue
  defaultValue?: RangeSliderValue
  onValueChange?: (value: RangeSliderValue) => void
}

export type RangeSliderValue = [number, number]

export interface SliderInput {
  field: SliderInputField
  value: string
  ariaLabel: string
}

export type SliderInputField = 'min' | 'max'
