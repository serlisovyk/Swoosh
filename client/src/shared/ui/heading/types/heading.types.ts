import { HTMLAttributes } from 'react'

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: HeadingVariant
}

type HeadingVariant = 'h1' | 'h2' | 'h3' | 'h4'
