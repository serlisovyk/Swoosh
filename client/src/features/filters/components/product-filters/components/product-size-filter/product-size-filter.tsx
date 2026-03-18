import { Select, SelectOption } from '@shared/ui'
import { useProductFiltersContext } from '../../../../context'
import { useGetProductFiltersQuery } from '../../../../queries'
import { PRODUCT_FILTER_ALL_VALUE } from '../../../../constants'

export function ProductSizeFilter() {
  const { filters, setSize } = useProductFiltersContext()

  const { filterMetadata } = useGetProductFiltersQuery()

  const sizeOptions = [
    { label: 'Все размеры', value: PRODUCT_FILTER_ALL_VALUE },
    ...filterMetadata.sizes.map((option) => ({
      label: `${option} (EU)`,
      value: option,
    })),
  ]

  const handleValueChange = (value: SelectOption['value']) => {
    if (value === PRODUCT_FILTER_ALL_VALUE) {
      setSize(undefined)
      return
    }

    setSize(Number(value))
  }

  const sizeValue = filters.size ?? PRODUCT_FILTER_ALL_VALUE

  return (
    <Select
      id="product-size"
      label="Размер"
      options={sizeOptions}
      value={sizeValue}
      onValueChange={handleValueChange}
    />
  )
}
