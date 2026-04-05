import Image from 'next/image'
import { Breadcrumbs } from '@shared/ui'
import { AboutIntro } from './components/about-intro'
import { AboutLegacy } from './components/about-legacy'
import { AboutAdvantages } from '../about-advantages'
import { AboutCompany } from '../about-company'
import { ABOUT_BREADCRUMBS } from '../../constants'
import styles from './about.module.css'

export function About() {
  return (
    <>
      <div className="container">
        <Breadcrumbs items={ABOUT_BREADCRUMBS} />
        <AboutIntro />
      </div>

      <div className={styles.heroImage}>
        <Image
          src="/images/about/about-hero.jpg"
          alt="About hero image"
          width={1500}
          height={510}
        />
      </div>

      <AboutLegacy />
      <AboutAdvantages />
      <AboutCompany />
    </>
  )
}
