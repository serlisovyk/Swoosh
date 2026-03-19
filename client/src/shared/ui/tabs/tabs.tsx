'use client'

import cn from 'clsx'
import { useTabsState } from './hooks'
import { TabsProps } from './types'
import styles from './tabs.module.css'

export function Tabs({
  items,
  defaultValue,
  value,
  onValueChange,
  className,
  listClassName,
  panelClassName,
}: TabsProps) {
  const { tabsId, activeItem, handleSelect } = useTabsState({
    items,
    defaultValue,
    value,
    onValueChange,
  })

  if (!items.length || !activeItem) return null

  return (
    <div className={cn(styles.root, className)}>
      <div className={cn(styles.list, listClassName)} role="tablist">
        {items.map(({ id, label, disabled }) => {
          const isActive = id === activeItem.id

          const tabId = `${tabsId}-${id}-tab`
          const panelId = `${tabsId}-${id}-panel`

          return (
            <button
              key={id}
              id={tabId}
              type="button"
              role="tab"
              disabled={disabled}
              aria-selected={isActive}
              aria-controls={panelId}
              className={cn(styles.trigger, {
                [styles.triggerActive]: isActive,
                [styles.triggerDisabled]: disabled,
              })}
              onClick={() => handleSelect(id)}
            >
              {label}
            </button>
          )
        })}
      </div>

      <div
        id={`${tabsId}-${activeItem.id}-panel`}
        role="tabpanel"
        aria-labelledby={`${tabsId}-${activeItem.id}-tab`}
        className={cn(styles.panel, panelClassName)}
      >
        {activeItem.content}
      </div>
    </div>
  )
}
