import { LinkButton } from './components/link-button'
import { NativeButton } from './components/native-button'
import { ButtonProps } from './types'

export function Button(props: ButtonProps) {
  if ('href' in props) return <LinkButton {...props} />
  return <NativeButton {...props} />
}
