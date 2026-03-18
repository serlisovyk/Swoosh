import { Select } from '@shared/ui'
import { useProductFiltersContext } from '../../../../context'
import { useGetProductFiltersQuery } from '../../../../queries'
import { PRODUCT_FILTER_ALL_VALUE } from '../../../../constants'

export function ProductMaterialFilter() {
  const { filters, setMaterial } = useProductFiltersContext()

  const { filterMetadata } = useGetProductFiltersQuery()

  const materialOptions = [
    { label: 'Все материалы', value: PRODUCT_FILTER_ALL_VALUE },
    ...filterMetadata.materials.map((option) => ({
      label: option,
      value: option,
    })),
  ]

  const handleMaterialChange = (value: string | number) => {
    if (value === PRODUCT_FILTER_ALL_VALUE) {
      setMaterial(undefined)
      return
    }

    setMaterial(String(value))
  }

  const materialValue = filters.material ?? PRODUCT_FILTER_ALL_VALUE

  return (
    <Select
      id="product-material"
      label="Материал:"
      options={materialOptions}
      value={materialValue}
      onValueChange={handleMaterialChange}
    />
  )
}
