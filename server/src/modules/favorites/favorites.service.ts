import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Product } from '@modules/products/models/product.model'
import { PRODUCT_NOT_FOUND_ERROR } from '@modules/products/products.constants'
import { User } from '@modules/user/models/user.model'
import { USER_NOT_FOUND_ERROR } from '@modules/user/user.constants'
import type { ProductModel } from '@modules/products/products.types'
import type { UserModel } from '@modules/user/user.types'
import { FindAllFavoritesDto } from './dto/find-all-favorites.dto'
import {
  areFavoriteProductIdsEqual,
  deduplicateFavoriteProductIds,
  normalizeFavoriteProductIds,
  orderProductsByIds,
  paginateFavoriteProductIds,
} from './favorites.utils'
import { FAVORITES_DEFAULT_LIMIT } from './favorites.constants'
import {
  FavoritesListResponse,
  FavoritesStateResponse,
} from './favorites.types'

@Injectable()
export class FavoritesService {
  constructor(
    @InjectModel(User.name) private readonly userModel: UserModel,
    @InjectModel(Product.name) private readonly productModel: ProductModel,
  ) {}

  private readonly productSelectFields = '-__v'
  private readonly categorySelectFields = '-__v'

  async findAll(
    userId: string,
    dto: FindAllFavoritesDto,
  ): Promise<FavoritesListResponse> {
    const page = dto.page ?? 1
    const limit = dto.limit ?? FAVORITES_DEFAULT_LIMIT

    const favoriteProductIds = await this.getSanitizedFavoriteProductIds(userId)
    const total = favoriteProductIds.length

    const pageFavoriteProductIds = paginateFavoriteProductIds(
      favoriteProductIds,
      page,
      limit,
    )

    if (!pageFavoriteProductIds.length) return { products: [], total }

    const products = await this.productModel
      .find({ _id: { $in: pageFavoriteProductIds } })
      .select(this.productSelectFields)
      .populate('category', this.categorySelectFields)
      .lean()

    return {
      products: orderProductsByIds(pageFavoriteProductIds, products),
      total,
    }
  }

  async add(
    userId: string,
    productId: string,
  ): Promise<FavoritesStateResponse> {
    const normalizedProductId = String(productId)

    await this.ensureProductExists(normalizedProductId)

    const currentFavoriteProductIds =
      await this.getSanitizedFavoriteProductIds(userId)

    const favoriteProductIds = deduplicateFavoriteProductIds([
      ...currentFavoriteProductIds,
      normalizedProductId,
    ])

    await this.setFavoriteProductIds(userId, favoriteProductIds)

    return this.toStateResponse(favoriteProductIds)
  }

  async remove(
    userId: string,
    productId: string,
  ): Promise<FavoritesStateResponse> {
    const normalizedProductId = String(productId)

    const currentFavoriteProductIds =
      await this.getSanitizedFavoriteProductIds(userId)

    const favoriteProductIds = currentFavoriteProductIds.filter(
      (currentProductId) => currentProductId !== normalizedProductId,
    )

    if (favoriteProductIds.length !== currentFavoriteProductIds.length) {
      await this.setFavoriteProductIds(userId, favoriteProductIds)
    }

    return this.toStateResponse(favoriteProductIds)
  }

  async mergeFavoriteProductIds(
    userId: string,
    incomingProductIds: string[] = [],
  ): Promise<string[]> {
    const currentFavoriteProductIds =
      await this.findUserFavoriteProductIdsOrThrow(userId)

    const mergedFavoriteProductIds = deduplicateFavoriteProductIds([
      ...currentFavoriteProductIds,
      ...incomingProductIds,
    ])

    const favoriteProductIds = await this.filterExistingFavoriteProductIds(
      mergedFavoriteProductIds,
    )

    await this.setFavoriteProductIds(userId, favoriteProductIds)

    return favoriteProductIds
  }

  private async getSanitizedFavoriteProductIds(userId: string) {
    const currentFavoriteProductIds =
      await this.findUserFavoriteProductIdsOrThrow(userId)

    const favoriteProductIds = await this.filterExistingFavoriteProductIds(
      currentFavoriteProductIds,
    )

    if (
      !areFavoriteProductIdsEqual(favoriteProductIds, currentFavoriteProductIds)
    ) {
      await this.setFavoriteProductIds(userId, favoriteProductIds)
    }

    return favoriteProductIds
  }

  private async findUserFavoriteProductIdsOrThrow(userId: string) {
    const user = await this.userModel
      .findById(userId)
      .select('favoriteProductIds')
      .lean()

    if (!user) throw new NotFoundException(USER_NOT_FOUND_ERROR)

    return deduplicateFavoriteProductIds(
      normalizeFavoriteProductIds(user.favoriteProductIds),
    )
  }

  private async filterExistingFavoriteProductIds(productIds: string[]) {
    const normalizedProductIds = deduplicateFavoriteProductIds(productIds)

    if (!normalizedProductIds.length) return []

    const existenceChecks = await Promise.all(
      normalizedProductIds.map(async (productId) => ({
        productId,
        exists: await this.productModel.exists({ _id: productId }),
      })),
    )

    return existenceChecks.flatMap(({ productId, exists }) =>
      exists ? [productId] : [],
    )
  }

  private async ensureProductExists(productId: string) {
    const isExisting = await this.productModel.exists({ _id: productId })

    if (!isExisting) throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR)
  }

  private async setFavoriteProductIds(
    userId: string,
    favoriteProductIds: string[],
  ) {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      { favoriteProductIds },
      { returnDocument: 'after' },
    )

    if (!updatedUser) throw new NotFoundException(USER_NOT_FOUND_ERROR)
  }

  private toStateResponse(
    favoriteProductIds: string[],
  ): FavoritesStateResponse {
    return {
      favoriteProductIds,
      total: favoriteProductIds.length,
    }
  }
}
