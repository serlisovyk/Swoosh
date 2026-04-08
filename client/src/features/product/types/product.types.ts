export interface ProductColor {
  name: string
  hex: string
}

export interface ProductBadge {
  text: string
  tone: string
}

export interface ProductCharacteristic {
  label: string
  value: string
}

export interface ProductCategory {
  _id: string
  name: string
  createdAt: string
  updatedAt: string
}

export interface Product {
  _id: string
  title: string
  description: string
  images: string[]
  price: number
  oldPrice: number | null
  sizes: number[]
  material: string
  saleCF: number
  isHit: boolean
  isNewArrival: boolean
  colors: ProductColor[]
  category: ProductCategory
  createdAt: string
  updatedAt: string
}

export interface ProductsListResponse {
  products: Product[]
  total: number
}

export type ProductSortOption = 'newest' | 'oldest' | 'priceAsc' | 'priceDesc'

export type ProductPriceRange = [number, number]

export interface GetProductsParams {
  ids?: string[]
  excludeIds?: string[]
  size?: number[]
  price?: ProductPriceRange
  colorName?: string[]
  category?: string[]
  material?: string[]
  isHit?: boolean
  isNewArrival?: boolean
  hasDiscount?: boolean
  limit?: number
  page?: number
  sort?: ProductSortOption
}

export interface ProductCardProps {
  product: Product
}

export interface ProductCardSkeletonProps {
  count?: number
  className?: string
}

export interface ProductDetailsProps {
  productId: string
}

export interface GetProductsQueryOptions {
  enabled?: boolean
}

export interface ProductSizeTableRow {
  footLength: string
  ru: string
  us: string
  eu: string
  uk: string
}

export interface ProductDetailsGalleryProps {
  product: Product
}

export interface ProductDetailsGalleryThumbsProps {
  images: string[]
  activeImageIndex: number
  onImageSelect: (index: number) => void
}

export interface ProductDetailsInfoProps {
  product: Product
}

export interface ProductDescriptionPreviewProps {
  description: string
  onShowFullDescription: () => void
}

export interface ProductDetailsPurchaseProps {
  product: Product
}

export interface ProductDetailsPurchaseColorsProps {
  colors: ProductColor[]
  activeColorHex: string | null
  onSelectColor: (hex: string) => void
}

export interface ProductDetailsPurchaseSizesProps {
  sizes: number[]
  activeSize: number | null
  onSelectSize: (size: number) => void
  onOpenSizeGuide: () => void
}

export interface ProductDetailsPurchasePriceProps {
  price: number
  oldPrice: number | null
}

export interface ProductDetailsPurchaseActionsProps {
  quantity: number
  onDecreaseQuantity: () => void
  onIncreaseQuantity: () => void
}

export interface ProductSizeTableModalProps {
  isOpen: boolean
  onClose: () => void
}

export interface ProductDetailsTabsProps {
  product: Product
}

export interface ProductBadgeProps {
  product: Product
}

export interface ProductDetailsRecommendationsProps {
  product: Product
}

export interface ProductDetailsProductsCarouselSectionProps {
  title: string
  products: Product[]
  isLoading: boolean
  error: unknown
}

export interface ProductDetailsRecommendationCarouselProps {
  products: Product[]
  isLoading: boolean
  error: unknown
}

export interface SingleProductPageProps {
  params: Promise<ProductDetailsPageParams>
}

interface ProductDetailsPageParams {
  id: string
}
