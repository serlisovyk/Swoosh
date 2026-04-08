'use client'

import { useGetProductsQuery } from '../../../../queries'
import type {
  Product,
  ProductDetailsRecommendationsProps,
} from '../../../../types'
import { ProductRecommendedProductsCarousel } from '../product-recommended-products-carousel'
import { ProductSimilarProductsCarousel } from '../product-similar-products-carousel'
import styles from './product-details-recommendations.module.css'

const DETAILS_RECOMMENDATIONS_LIMIT = 6

export function ProductDetailsRecommendations({
  product,
}: ProductDetailsRecommendationsProps) {
  const similarProductsQuery = useGetProductsQuery(
    {
      category: product.category?._id ? [product.category._id] : undefined,
      excludeIds: [product._id],
      limit: DETAILS_RECOMMENDATIONS_LIMIT,
      sort: 'newest',
    },
    {
      enabled: Boolean(product.category?._id),
    },
  )

  const similarProducts = similarProductsQuery.products.slice(
    0,
    DETAILS_RECOMMENDATIONS_LIMIT,
  )

  const similarProductsIds = similarProducts.map(
    (similarProduct) => similarProduct._id,
  )

  const recommendedProductsQuery = useGetProductsQuery(
    {
      isHit: true,
      excludeIds: [product._id, ...similarProductsIds],
      limit: DETAILS_RECOMMENDATIONS_LIMIT,
      sort: 'newest',
    },
    {
      enabled: !similarProductsQuery.isLoading,
    },
  )

  const shouldLoadRecommendedFallback =
    !similarProductsQuery.isLoading &&
    !recommendedProductsQuery.isLoading &&
    recommendedProductsQuery.products.length < DETAILS_RECOMMENDATIONS_LIMIT

  const recommendedFallbackQuery = useGetProductsQuery(
    {
      excludeIds: [
        product._id,
        ...similarProductsIds,
        ...recommendedProductsQuery.products.map(
          (recommendedProduct) => recommendedProduct._id,
        ),
      ],
      limit: DETAILS_RECOMMENDATIONS_LIMIT,
      sort: 'newest',
    },
    {
      enabled: shouldLoadRecommendedFallback,
    },
  )

  const recommendedProducts = mergeUniqueProducts(
    recommendedProductsQuery.products,
    recommendedFallbackQuery.products,
  ).slice(0, DETAILS_RECOMMENDATIONS_LIMIT)

  const similarProductsError = similarProducts.length
    ? null
    : similarProductsQuery.error

  const recommendedProductsError = recommendedProducts.length
    ? null
    : recommendedProductsQuery.error ?? recommendedFallbackQuery.error

  return (
    <div className={styles.wrapper}>
      <ProductSimilarProductsCarousel
        products={similarProducts}
        isLoading={similarProductsQuery.isLoading}
        error={similarProductsError}
      />

      <ProductRecommendedProductsCarousel
        products={recommendedProducts}
        isLoading={
          recommendedProductsQuery.isLoading || recommendedFallbackQuery.isLoading
        }
        error={recommendedProductsError}
      />
    </div>
  )
}

function mergeUniqueProducts(...groups: Product[][]) {
  const productIds = new Set<string>()

  return groups.flatMap((group) =>
    group.filter((product) => {
      if (productIds.has(product._id)) {
        return false
      }

      productIds.add(product._id)
      return true
    }),
  )
}
