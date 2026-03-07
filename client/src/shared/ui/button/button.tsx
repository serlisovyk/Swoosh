'use client'

import { ButtonProps } from './types'
import styles from './button.module.css'
import cn from 'clsx'

export function Button({
  variant = 'primary',
  icon: Icon,
  children,
  className,
  ...props
}: ButtonProps) {
  const variantClass = styles[variant] || styles.primary

  return (
    <button className={cn(styles.button, variantClass, className)} {...props}>
      <span className={styles.content}>{children}</span>
      {Icon && <Icon size={20} className={styles.icon} />}
    </button>
  )
}
