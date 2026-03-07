import cn from 'clsx'
import { ButtonContent } from '../button-content'
import { NativeButtonProps } from '../../types'
import styles from '../../button.module.css'

export function NativeButton(props: NativeButtonProps) {
  const {
    variant = 'primary',
    icon: Icon,
    children,
    className,
    ...buttonProps
  } = props

  const variantClass = styles[variant] || styles.primary

  return (
    <button
      className={cn(styles.button, variantClass, className)}
      {...buttonProps}
    >
      <ButtonContent icon={Icon}>{children}</ButtonContent>
    </button>
  )
}
