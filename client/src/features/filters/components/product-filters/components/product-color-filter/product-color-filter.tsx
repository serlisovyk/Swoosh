import { Select } from '@shared/form'
import { useProductFiltersContext } from '../../../../context'
import { PRODUCT_FILTER_ALL_VALUE } from '../../../../constants'

export function ProductColorFilter() {
  const {
    filters,
    filterMetadata,
    areMetadataFiltersDisabled,
    setColorName,
  } = useProductFiltersContext()

  const colorOptions = [
    { label: 'Все цвета', value: PRODUCT_FILTER_ALL_VALUE },
    ...filterMetadata.colors.map((option) => ({
      label: option,
      value: option,
    })),
  ]

  const handleColorChange = (value: string | number) => {
    if (value === PRODUCT_FILTER_ALL_VALUE) {
      setColorName(undefined)
      return
    }

    setColorName(String(value))
  }

  const selectedColor = filters.colorName ?? PRODUCT_FILTER_ALL_VALUE

  return (
    <Select
      id="product-color"
      label="Цвет"
      options={colorOptions}
      value={selectedColor}
      disabled={areMetadataFiltersDisabled}
      onValueChange={handleColorChange}
    />
  )
}
