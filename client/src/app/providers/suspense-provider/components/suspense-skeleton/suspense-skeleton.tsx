import { Skeleton } from '@shared/ui'

export function SuspenseSkeleton() {
  return (
    <div className="container">
      <Skeleton count={3} />
    </div>
  )
}
