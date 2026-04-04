'use client'

import { useState } from 'react'
import { Turnstile } from '@marsidev/react-turnstile'
import { Skeleton } from '@shared/ui'
import { TURNSTILE_SITE_KEY } from '@shared/env'
import { useCaptcha } from '../../hooks'
import styles from './captcha.module.css'

export function Captcha() {
  const { captchaRef, setCaptchaToken } = useCaptcha()

  const [isWidgetLoaded, setIsWidgetLoaded] = useState(false)

  if (!TURNSTILE_SITE_KEY) return null

  return (
    <div className={styles.wrapper}>
      {!isWidgetLoaded && <Skeleton className={styles.placeholder} />}

      <Turnstile
        ref={captchaRef}
        siteKey={TURNSTILE_SITE_KEY}
        onWidgetLoad={() => setIsWidgetLoaded(true)}
        onSuccess={(token) => setCaptchaToken(token)}
        onExpire={() => setCaptchaToken(null)}
        onError={() => {
          setCaptchaToken(null)
          setIsWidgetLoaded(false)
        }}
        options={{ size: 'normal' }}
      />
    </div>
  )
}
