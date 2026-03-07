import { ButtonHTMLAttributes } from 'react'
import { LucideIcon } from 'lucide-react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  icon?: LucideIcon
}

type ButtonVariant = 'primary' | 'dark' | 'darkReverse'
