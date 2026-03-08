import { LucideIcon } from 'lucide-react'

export interface ProfileMenuProps {
  isCompact?: boolean
}

export interface LogoutButtonProps {
  isCompact?: boolean
}

export interface ProfileMenuItemProps {
  id: string
  href: string
  text: string
  icon: LucideIcon
  isCompact?: boolean
}
