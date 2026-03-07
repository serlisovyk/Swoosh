import Link from 'next/link'
import cn from 'clsx'
import { ButtonContent } from '../button-content'
import { LinkButtonProps } from '../../types'
import styles from '../../button.module.css'

export function LinkButton(props: LinkButtonProps) {
  const {
    variant = 'primary',
    icon: Icon,
    children,
    className,
    href,
    ...linkProps
  } = props

  const variantClass = styles[variant] || styles.primary

  return (
    <Link
      href={href}
      className={cn(styles.button, variantClass, className)}
      {...linkProps}
    >
      <ButtonContent icon={Icon}>{children}</ButtonContent>
    </Link>
  )
}
