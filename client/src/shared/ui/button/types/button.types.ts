import { LinkProps } from 'next/link'
import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { LucideIcon } from 'lucide-react'

export type ButtonProps = NativeButtonProps | LinkButtonProps

export interface NativeButtonProps
  extends BaseButtonProps, ButtonHTMLAttributes<HTMLButtonElement> {}

export interface LinkButtonProps
  extends
    BaseButtonProps,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href: LinkProps['href']
}

export interface ButtonContentProps {
  children: ButtonProps['children']
  icon: ButtonProps['icon']
}

interface BaseButtonProps {
  variant?: ButtonVariant
  icon?: LucideIcon
  children?: ReactNode
  className?: string
}

type ButtonVariant = 'primary' | 'dark' | 'darkReverse'
