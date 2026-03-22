import { Key, ReactNode } from 'react'

export interface ListProps<T> {
  items: T[]
  getItemKey: (item: T, index: number) => Key
  renderItem: (item: T, index: number) => ReactNode
  className?: string
}
