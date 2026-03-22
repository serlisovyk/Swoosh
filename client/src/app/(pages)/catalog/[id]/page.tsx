import { ProductDetails, SingleProductPageProps } from '@features/product'

export default async function SingleProductPage({
  params,
}: SingleProductPageProps) {
  const { id } = await params

  return <ProductDetails productId={id} />
}
