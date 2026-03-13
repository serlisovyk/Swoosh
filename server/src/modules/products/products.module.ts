import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import {
  ProductCategory,
  ProductCategorySchema,
} from './models/product-category.model'
import { Product, ProductSchema } from './models/product.model'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: ProductCategory.name, schema: ProductCategorySchema },
    ]),
  ],
})
export class ProductsModule {}
