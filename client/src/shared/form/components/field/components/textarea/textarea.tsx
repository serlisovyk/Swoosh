import cn from 'clsx'
import { FIELD_APPEARANCES, TextareaProps } from '../../../../types'
import styles from './textarea.module.css'

export function Textarea({
  label,
  required,
  className,
  error,
  id,
  isVisibleLabel = false,
  appearance = FIELD_APPEARANCES.DEFAULT,
  ...props
}: TextareaProps) {
  const isUnderlineAppearance = appearance === FIELD_APPEARANCES.UNDERLINE

  return (
    <div
      className={cn(styles.wrapper, {
        [styles.underlineWrapper]: isUnderlineAppearance,
      })}
    >
      {label && (
        <label
          htmlFor={id}
          className={cn(styles.label, {
            [styles.underlineLabel]: isUnderlineAppearance,
            visuallyHidden: isVisibleLabel,
          })}
        >
          {label}

          {required && <span className={styles.required}>*</span>}
        </label>
      )}

      <textarea
        id={id}
        required={required}
        aria-invalid={!!error}
        className={cn(styles.textarea, className, {
          [styles.underlineTextarea]: isUnderlineAppearance,
        })}
        {...props}
      />

      {error && <p className={styles.error}>{error}</p>}
    </div>
  )
}
