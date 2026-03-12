import cn from 'clsx'
import { SkeletonProps } from './types'
import styles from './skeleton.module.css'

export function Skeleton({ count = 1, className }: SkeletonProps) {
  return (
    <div>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={cn(styles.skeleton, className)} />
      ))}
    </div>
  )
}
