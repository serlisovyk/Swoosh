import { RangeSlider, type RangeSliderValue } from '@shared/form'
import { useProductFiltersContext } from '../../../../context'

export function ProductPriceFilter() {
  const {
    filters,
    filterMetadata,
    areMetadataFiltersDisabled,
    setPrice,
  } = useProductFiltersContext()

  const handleValueChange = (value: RangeSliderValue) => {
    setPrice(value, filterMetadata.priceRange)
  }

  const selectedPrice = filters.price ?? filterMetadata.priceRange

  return (
    <RangeSlider
      id="product-price"
      label="Цена:"
      min={filterMetadata.priceRange[0]}
      max={filterMetadata.priceRange[1]}
      value={selectedPrice}
      disabled={areMetadataFiltersDisabled}
      onValueChange={handleValueChange}
    />
  )
}
