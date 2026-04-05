import cn from 'clsx'
import { TextareaProps } from '../../../../types'
import styles from './textarea.module.css'

export function Textarea({
  label,
  required,
  className,
  error,
  id,
  isVisibleLabel = false,
  ...props
}: TextareaProps) {
  return (
    <div className={styles.wrapper}>
      {label && (
        <label
          htmlFor={id}
          className={cn(styles.label, { visuallyHidden: isVisibleLabel })}
        >
          {label}

          {required && <span className={styles.required}>*</span>}
        </label>
      )}

      <textarea
        id={id}
        required={required}
        aria-invalid={!!error}
        className={cn(styles.textarea, className)}
        {...props}
      />

      {error && <p className={styles.error}>{error}</p>}
    </div>
  )
}
