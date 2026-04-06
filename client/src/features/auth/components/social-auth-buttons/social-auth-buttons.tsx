'use client'

import { Button } from '@shared/ui'
import { socialAuthButtons } from '../../config'
import { getSocialAuthUrl } from '../../utils'
import styles from './social-auth-buttons.module.css'

export function AuthSocialButtons() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.buttons}>
        {socialAuthButtons.map(({ provider, label }) => (
          <Button
            key={provider}
            href={getSocialAuthUrl(provider)}
            variant="dark"
            className={styles.button}
          >
            {label}
          </Button>
        ))}
      </div>

      <div className={styles.divider}>или</div>
    </div>
  )
}
