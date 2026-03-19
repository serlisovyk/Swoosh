'use client'

import { useId, useState } from 'react'
import { UseTabsStateOptions, TabsItem } from '../types'

export function useTabsState({
  items,
  defaultValue,
  value,
  onValueChange,
}: UseTabsStateOptions) {
  const tabsId = useId()

  const firstAvailableItem = items.find(({ disabled }) => !disabled) ?? null

  const fallbackValue = defaultValue ?? firstAvailableItem?.id ?? ''

  const [internalValue, setInternalValue] = useState(fallbackValue)

  const activeValue = value ?? internalValue

  const activeItem =
    items.find(({ id }) => id === activeValue) ?? firstAvailableItem

  const handleSelect = (nextValue: TabsItem['id']) => {
    if (value === undefined) setInternalValue(nextValue)
    onValueChange?.(nextValue)
  }

  return {
    activeItem,
    handleSelect,
    tabsId,
  }
}
