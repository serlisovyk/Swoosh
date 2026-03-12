'use client'

import { useState, useEffect } from 'react'

export function useDrawer() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const openDrawer = () => setIsDrawerOpen(true)
  const closeDrawer = () => setIsDrawerOpen(false)

  return { isDrawerOpen, openDrawer, closeDrawer }
}

export function useBodyScrollLock(isLocked: boolean) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow

    if (isLocked) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = previousOverflow
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
