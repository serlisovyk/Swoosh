import { ReactNode } from 'react'

export interface TabsProps {
  items: TabsItem[]
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  className?: string
  listClassName?: string
  panelClassName?: string
}

export interface TabsItem {
  id: string
  label: string
  content: ReactNode
  disabled?: boolean
}

export type UseTabsStateOptions = Pick<
  TabsProps,
  'items' | 'defaultValue' | 'value' | 'onValueChange'
>
