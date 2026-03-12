import { ReactNode } from 'react'

export interface DrawerProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  title?: string
  closeLabel?: string
  panelClassName?: string
  contentClassName?: string
}
