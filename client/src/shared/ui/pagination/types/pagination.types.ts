export interface PaginationProps {
  currentPage: number
  totalPages: number
  getPageHref: (page: number) => string
  className?: string
  previousLabel?: string
  nextLabel?: string
  ariaLabel?: string
}

export type PaginationItem = number | 'ellipsis'
