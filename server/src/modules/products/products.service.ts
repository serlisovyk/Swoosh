import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
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
  PRODUCT_OLD_PRICE_LOWER_THAN_PRICE_ERROR,
  PRODUCT_SALE_CF_REQUIRES_OLD_PRICE_ERROR,
  updateProductOptions,
} from './products.constants'
import type {
  ProductCategoryModel,
  ProductFiltersMetadata,
  ProductModel,
  ProductPricingState,
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
    const { filters, ids, limit, sort } = buildProductListQueryOptions(dto)

    if (ids?.length) {
      return this.findAllByIds(ids, filters)
    }

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

    this.validatePricingState({
      price: data.price,
      oldPrice: data.oldPrice,
      saleCF: data.saleCF ?? 0,
    })

    const createdProduct = await this.productModel.create({
      ...data,
      category: category._id,
    })

    return this.findById(String(createdProduct._id))
  }

  async update(id: string, dto: UpdateProductDto) {
    const { categoryId, ...data } = dto

    const category = await this.findCategoryById(categoryId)
    const currentPricingState = await this.findPricingStateById(id)

    this.validatePricingState({
      price: data.price ?? currentPricingState.price,
      oldPrice:
        data.oldPrice !== undefined
          ? data.oldPrice
          : currentPricingState.oldPrice,
      saleCF: data.saleCF ?? currentPricingState.saleCF,
    })

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

  private async findPricingStateById(id: string): Promise<ProductPricingState> {
    const product = await this.productModel
      .findById(id)
      .select('price oldPrice saleCF')
      .lean()

    if (!product) {
      throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR)
    }

    return {
      price: product.price,
      oldPrice: product.oldPrice,
      saleCF: product.saleCF ?? 0,
    }
  }

  private validatePricingState({
    oldPrice,
    price,
    saleCF,
  }: ProductPricingState) {
    if (oldPrice !== undefined && oldPrice !== null && oldPrice < price) {
      throw new BadRequestException(PRODUCT_OLD_PRICE_LOWER_THAN_PRICE_ERROR)
    }

    if (
      saleCF > 0 &&
      (oldPrice === undefined || oldPrice === null || oldPrice <= price)
    ) {
      throw new BadRequestException(PRODUCT_SALE_CF_REQUIRES_OLD_PRICE_ERROR)
    }
  }

  private async findAllByIds(
    productIds: string[],
    filters: Record<string, unknown>,
  ) {
    const products = await this.productModel
      .find({
        ...filters,
        _id: { $in: productIds },
      })
      .select(this.productSelectFields)
      .populate('category', this.categorySelectFields)
      .lean()

    const productsMap = new Map(
      products.map((product) => [String(product._id), product]),
    )

    const orderedProducts = productIds.flatMap((productId) => {
      const product = productsMap.get(productId)
      return product ? [product] : []
    })

    return {
      products: orderedProducts,
      total: orderedProducts.length,
    }
  }
}
