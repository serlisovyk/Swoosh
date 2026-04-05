import { FIELD_VARIANTS, type FieldProps } from '../../types'
import { RangeSlider } from '../range-slider'
import { Select } from '../select'
import { Checkbox } from './components/checkbox'
import { Input } from './components/input'
import { Textarea } from './components/textarea'

export function Field(props: FieldProps) {
  switch (props.variant) {
    case FIELD_VARIANTS.TEXTAREA:
      return <Textarea {...props} />

    case FIELD_VARIANTS.CHECKBOX:
      return <Checkbox {...props} />

    case FIELD_VARIANTS.SELECT:
      return <Select {...props} />

    case FIELD_VARIANTS.RANGE_SLIDER:
      return <RangeSlider {...props} />

    default:
      return <Input {...props} />
  }
}
