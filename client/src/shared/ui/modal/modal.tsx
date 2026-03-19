'use client'

import { createPortal } from 'react-dom'
import cn from 'clsx'
import { X } from 'lucide-react'
import { IS_CLIENT } from '@shared/constants'
import { useBodyScrollLock, useEscapeKey } from '../../hooks'
import { ModalProps } from './types'
import styles from './modal.module.css'

export function Modal({
  isOpen,
  onClose,
  children,
  title = 'Модальное окно',
  closeLabel = 'Закрыть модальное окно',
  panelClassName,
  contentClassName,
}: ModalProps) {
  useBodyScrollLock(isOpen)

  useEscapeKey(onClose, isOpen)

  if (!IS_CLIENT) return null

  return createPortal(
    <div
      className={cn(styles.root, { [styles.rootOpen]: isOpen })}
      role="presentation"
    >
      <button
        type="button"
        className={cn(styles.overlay, { [styles.overlayVisible]: isOpen })}
        onClick={onClose}
        aria-label={closeLabel}
      />

      <div
        className={cn(styles.panel, panelClassName, {
          [styles.panelVisible]: isOpen,
        })}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className={styles.header}>
          <p className={styles.title}>{title}</p>

          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label={closeLabel}
          >
            <X size={18} />
          </button>
        </div>

        <div className={cn(styles.content, contentClassName)}>{children}</div>
      </div>
    </div>,
    document.body,
  )
}
