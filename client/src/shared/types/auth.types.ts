export const ROLE = {
  USER: 'USER',
  ADMIN: 'ADMIN',
} as const

export type ROLE = (typeof ROLE)[keyof typeof ROLE]
