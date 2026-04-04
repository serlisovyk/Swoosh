'use client'

import { PropsWithChildren, useRef, useState } from 'react'
import type { TurnstileInstance } from '@marsidev/react-turnstile'
import { toast } from 'sonner'
import { TURNSTILE_TOKEN_HEADER } from '@shared/constants'
import { CaptchaContext } from '../context'
import { CAPTCHA_REQUIRED_ERROR } from '../constants'

export function CaptchaProvider({ children }: PropsWithChildren) {
  const captchaRef = useRef<TurnstileInstance | null>(null)

  const [captchaToken, setCaptchaToken] = useState<string | null>(null)

  const resetCaptcha = () => {
    captchaRef.current?.reset()
    setCaptchaToken(null)
  }

  const validateCaptcha = () => {
    if (captchaToken) return true

    toast.error(CAPTCHA_REQUIRED_ERROR)

    return false
  }

  const getCaptchaHeader = () => {
    return { [TURNSTILE_TOKEN_HEADER]: captchaToken }
  }

  const value = {
    captchaRef,
    captchaToken,
    setCaptchaToken,
    resetCaptcha,
    validateCaptcha,
    getCaptchaHeader,
  }

  return (
    <CaptchaContext.Provider value={value}>{children}</CaptchaContext.Provider>
  )
}
