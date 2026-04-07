import type { PaginationItem } from '../types'

export function buildPaginationItems(
  currentPage: number,
  totalPages: number,
): PaginationItem[] {
  if (totalPages <= 7) {
    return createPageRange(1, totalPages)
  }

  if (currentPage <= 4) {
    return [...createPageRange(1, 5), 'ellipsis', totalPages]
  }

  if (currentPage >= totalPages - 3) {
    return [1, 'ellipsis', ...createPageRange(totalPages - 4, totalPages)]
  }

  return [
    1,
    'ellipsis',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    'ellipsis',
    totalPages,
  ]
}

function createPageRange(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, index) => start + index)
}
