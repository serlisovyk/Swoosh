import { createContext } from 'react'
import { CaptchaContextValue } from '../types'

export const CaptchaContext = createContext<CaptchaContextValue | null>(null)
