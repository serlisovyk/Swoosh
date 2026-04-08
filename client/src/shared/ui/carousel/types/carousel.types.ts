import { ReactNode } from 'react'

export type CarouselVariant = 'contained' | 'bleedRight'

export interface CarouselProps<T> {
  title: string
  items: T[]
  getItemKey: (item: T, index: number) => string
  renderItem: (item: T, index: number) => ReactNode
  ariaLabel?: string
  variant?: CarouselVariant
  isInteractive?: boolean
  emptyContent?: ReactNode
}
