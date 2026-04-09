import {
  type HTMLInputTypeAttribute,
  type InputHTMLAttributes,
  type ReactNode,
  type TextareaHTMLAttributes,
} from 'react'

export const FIELD_VARIANTS = {
  INPUT: 'input',
  TEXTAREA: 'textarea',
  CHECKBOX: 'checkbox',
  SELECT: 'select',
  RANGE_SLIDER: 'range-slider',
} as const

export type FieldVariant =
  (typeof FIELD_VARIANTS)[keyof typeof FIELD_VARIANTS]

export const FIELD_APPEARANCES = {
  DEFAULT: 'default',
  UNDERLINE: 'underline',
} as const

export type FieldAppearance =
  (typeof FIELD_APPEARANCES)[keyof typeof FIELD_APPEARANCES]

export interface BaseFormFields {
  id: string
  label?: string
  placeholder?: string
  required: boolean
  variant?: FieldVariant
  appearance?: FieldAppearance
  type?: HTMLInputTypeAttribute
}

export interface MatchPasswordsOptions {
  passwordField: string
  confirmPasswordField?: string
}

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  children?: ReactNode
  error?: string
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  isVisibleLabel?: boolean
  appearance?: FieldAppearance
  error?: string
}

export interface RangeSliderProps {
  id: string
  min: number
  max: number
  step?: number
  label?: string
  className?: string
  disabled?: boolean
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

export interface SelectProps {
  id: string
  label?: string
  options: SelectOption[]
  error?: string
  placeholder?: string
  className?: string
  name?: string
  value?: SelectOption['value']
  defaultValue?: SelectOption['value']
  required?: boolean
  disabled?: boolean
  onValueChange?: (value: SelectOption['value']) => void
  'aria-describedby'?: string
  'aria-label'?: string
}

export interface SelectOption {
  label: string
  value: string | number
  disabled?: boolean
}

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  isVisibleLabel?: boolean
  appearance?: FieldAppearance
  error?: string
}

export interface InputFieldProps extends InputProps {
  variant?: typeof FIELD_VARIANTS.INPUT
}

export interface TextareaFieldProps extends TextareaProps {
  variant: typeof FIELD_VARIANTS.TEXTAREA
}

export interface CheckboxFieldProps extends CheckboxProps {
  variant: typeof FIELD_VARIANTS.CHECKBOX
}

export interface SelectFieldProps extends SelectProps {
  variant: typeof FIELD_VARIANTS.SELECT
}

export interface RangeSliderFieldProps extends RangeSliderProps {
  variant: typeof FIELD_VARIANTS.RANGE_SLIDER
}

export type FieldProps =
  | InputFieldProps
  | TextareaFieldProps
  | CheckboxFieldProps
  | SelectFieldProps
  | RangeSliderFieldProps
