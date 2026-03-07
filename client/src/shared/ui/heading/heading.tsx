'use client'

import { ElementType } from 'react'
import cn from 'clsx'
import { HeadingProps } from './types'
import styles from './heading.module.css'

// TODO: fix `h${level}` duplicate
export function Heading({
  level = 1,
  children,
  className,
  ...props
}: HeadingProps) {
  const Tag = `h${level}` as ElementType

  return (
    <Tag
      className={cn(styles.heading, styles[`h${level}`], className)}
      {...props}
    >
      {children}
    </Tag>
  )
}
