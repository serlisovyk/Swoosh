import { ReactNode } from 'react'

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  title?: string
  closeLabel?: string
  headerClassName?: string
  titleClassName?: string
  closeButtonClassName?: string
  panelClassName?: string
  contentClassName?: string
}
