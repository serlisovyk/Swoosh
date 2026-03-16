export interface ProductColor {
  name: string
  hex: string
}

export interface ProductBadge {
  text: string
  tone: string
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

export interface GetProductsParams {
  size?: number[]
  price?: number[]
  colorName?: string[]
  material?: string[]
  limit?: number
  sort?: string
}

export interface ProductCardProps {
  product: Product
}
