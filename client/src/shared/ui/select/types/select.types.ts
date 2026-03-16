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
