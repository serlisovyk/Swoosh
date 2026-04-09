import { AboutAdvantages } from '@features/about'
import { HomeShowcase } from '@features/home'
import { NewsletterSubscription } from '@features/newsletter-subscription'

export default function Home() {
  return (
    <div>
      <HomeShowcase />
      <AboutAdvantages />
      <NewsletterSubscription />
    </div>
  )
}
