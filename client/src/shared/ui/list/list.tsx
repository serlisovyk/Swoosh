import { Fragment } from 'react'
import { ListProps } from './types'

export function List<T>({
  items,
  getItemKey,
  renderItem,
  className,
}: ListProps<T>) {
  return (
    <div className={className}>
      {items.map((item, index) => (
        <Fragment key={getItemKey(item, index)}>
          {renderItem(item, index)}
        </Fragment>
      ))}
    </div>
  )
}
