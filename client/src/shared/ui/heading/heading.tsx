'use client'

import cn from 'clsx'
import { HeadingProps } from './types'
import styles from './heading.module.css'

export function Heading({
  as: Tag = 'h1',
  children,
  className,
  ...props
}: HeadingProps) {
  const headingClassName = cn(styles.heading, styles[Tag], className)

  return (
    <Tag className={headingClassName} {...props}>
      {children}
    </Tag>
  )
}
