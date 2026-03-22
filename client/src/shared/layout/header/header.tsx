import { HeaderTop } from './components/header-top'
import { HeaderBottom } from './components/header-bottom'

export function Header() {
  return (
    <header>
      <div className="container">
        <HeaderTop />
        <HeaderBottom />
      </div>
    </header>
  )
}
