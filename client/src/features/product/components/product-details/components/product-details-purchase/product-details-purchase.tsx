'use client'

import { useState } from 'react'
import { ProductDetailsPurchaseColors } from './components/product-details-purchase-colors'
import { ProductDetailsPurchaseSizes } from './components/product-details-purchase-sizes'
import { ProductDetailsPurchasePrice } from './components/product-details-purchase-price'
import { ProductDetailsPurchaseActions } from './components/product-details-purchase-actions'
import { ProductSizeTableModal } from '../product-size-table-modal'
import type { ProductDetailsPurchaseProps } from '../../../../types'

export function ProductDetailsPurchase({
  product,
}: ProductDetailsPurchaseProps) {
  const colors = Array.isArray(product.colors) ? product.colors : []
  const sizes = Array.isArray(product.sizes) ? product.sizes : []

  const [activeColorHex, setActiveColorHex] = useState<string | null>(
    colors[0]?.hex ?? null,
  )

  const [activeSize, setActiveSize] = useState<number | null>(sizes[0] ?? null)

  const [quantity, setQuantity] = useState(1)

  const [isSizeTableOpen, setIsSizeTableOpen] = useState(false)

  const increaseQuantity = () => {
    setQuantity((currentQuantity) => currentQuantity + 1)
  }

  const decreaseQuantity = () => {
    setQuantity((currentQuantity) => Math.max(1, currentQuantity - 1))
  }

  return (
    <>
      <ProductDetailsPurchaseColors
        colors={colors}
        activeColorHex={activeColorHex}
        onSelectColor={setActiveColorHex}
      />

      <ProductDetailsPurchaseSizes
        sizes={sizes}
        activeSize={activeSize}
        onSelectSize={setActiveSize}
        onOpenSizeGuide={() => setIsSizeTableOpen(true)}
      />

      <ProductDetailsPurchasePrice
        price={product.price}
        oldPrice={product.oldPrice}
      />

      <ProductDetailsPurchaseActions
        quantity={quantity}
        onDecreaseQuantity={decreaseQuantity}
        onIncreaseQuantity={increaseQuantity}
      />

      <ProductSizeTableModal
        isOpen={isSizeTableOpen}
        onClose={() => setIsSizeTableOpen(false)}
      />
    </>
  )
}
