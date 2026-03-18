import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { ProductCategory } from './models/product-category.model'
import { Product } from './models/product.model'
import { CreateProductDto } from './dto/create-product.dto'
import { FindAllProductsDto } from './dto/find-all-products.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { buildProductListQueryOptions } from './products.utils'
import {
  PRODUCT_CATEGORY_NOT_FOUND_ERROR,
  PRODUCT_NOT_FOUND_ERROR,
  updateProductOptions,
} from './products.constants'
import type {
  ProductCategoryModel,
  ProductFiltersMetadata,
  ProductModel,
  ProductPriceRangeStats,
} from './products.types'

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: ProductModel,
    @InjectModel(ProductCategory.name)
    private readonly categoryModel: ProductCategoryModel,
  ) {}

  private readonly productSelectFields = '-__v'
  private readonly categorySelectFields = '-__v'

  async findAll(dto: FindAllProductsDto) {
    const { filters, limit, sort } = buildProductListQueryOptions(dto)

    const data = this.productModel
      .find(filters)
      .sort(sort)
      .limit(limit)
      .select(this.productSelectFields)
      .populate('category', this.categorySelectFields)
      .lean()

    const count = this.productModel.countDocuments(filters)

    const [products, total] = await Promise.all([data, count])

    return { products, total }
  }

  async findFiltersMetadata(): Promise<ProductFiltersMetadata> {
    const getSizes = this.productModel.distinct('sizes')

    const getMaterials = this.productModel.distinct('material', {
      material: { $nin: ['', null] },
    })

    const getColors = this.productModel.distinct('colors.name', {
      'colors.name': { $nin: ['', null] },
    })

    const getPriceStats = this.productModel.aggregate<ProductPriceRangeStats>([
      {
        $group: {
          _id: null,
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        },
      },
      {
        $project: {
          _id: 0,
          minPrice: 1,
          maxPrice: 1,
        },
      },
    ])

    const [sizes, materials, colors, [priceStats]] = await Promise.all([
      getSizes,
      getMaterials,
      getColors,
      getPriceStats,
    ])

    const minPrice = priceStats?.minPrice ?? 0
    const maxPrice = priceStats?.maxPrice ?? minPrice

    return {
      sizes,
      materials,
      colors,
      priceRange: [minPrice, maxPrice],
    }
  }

  async findById(id: string) {
    const product = await this.productModel
      .findById(id)
      .select(this.productSelectFields)
      .populate('category', this.categorySelectFields)
      .lean()

    if (!product) throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR)

    return product
  }

  async create(dto: CreateProductDto) {
    const { categoryId, ...data } = dto

    const category = await this.findCategoryById(categoryId)

    if (!category) {
      throw new NotFoundException(PRODUCT_CATEGORY_NOT_FOUND_ERROR)
    }

    const createdProduct = await this.productModel.create({
      ...data,
      category: category._id,
    })

    return this.findById(String(createdProduct._id))
  }

  async update(id: string, dto: UpdateProductDto) {
    const { categoryId, ...data } = dto

    const category = await this.findCategoryById(categoryId)

    const payload = category ? { ...data, category: category._id } : data

    const updatedProduct = await this.productModel
      .findByIdAndUpdate(id, payload, updateProductOptions)
      .select(this.productSelectFields)
      .populate('category', this.categorySelectFields)
      .lean()

    if (!updatedProduct) throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR)

    return updatedProduct
  }

  async remove(id: string) {
    const deletedProduct = await this.productModel.findByIdAndDelete(id).lean()

    if (!deletedProduct) throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR)

    return true
  }

  private async findCategoryById(id: string | undefined) {
    if (!id) return undefined

    const category = await this.categoryModel.findById(id).lean()

    if (!category) {
      throw new NotFoundException(PRODUCT_CATEGORY_NOT_FOUND_ERROR)
    }

    return category
  }
}
