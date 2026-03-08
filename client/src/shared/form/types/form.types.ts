export interface BaseFormFields {
  id: string
  type: string
  label: string
  placeholder: string
  required: boolean
}

export interface MatchPasswordsOptions {
  passwordField: string
  confirmPasswordField?: string
}
