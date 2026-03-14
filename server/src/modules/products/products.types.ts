import { Model } from 'mongoose'
import { ProductCategory } from './models/product-category.model'
import { Product } from './models/product.model'

export type ProductModel = Model<Product>
export type ProductCategoryModel = Model<ProductCategory>

export interface ProductListQueryOptions {
  filters: Record<string, unknown>
  limit: number
  sort: Record<string, 1 | -1>
}
