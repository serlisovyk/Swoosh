'use client'

import { useEffect } from 'react'

let activeBodyScrollLocks = 0

let previousBodyOverflow = ''

export function useBodyScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (!isLocked) return

    if (activeBodyScrollLocks === 0) {
      previousBodyOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
    }

    activeBodyScrollLocks += 1

    return () => {
      activeBodyScrollLocks -= 1

      if (activeBodyScrollLocks === 0) {
        document.body.style.overflow = previousBodyOverflow
      }
    }
  }, [isLocked])
}

export function useEscapeKey(onEscape: () => void, isActive: boolean) {
  useEffect(() => {
    if (!isActive) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onEscape()
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isActive, onEscape])
}
