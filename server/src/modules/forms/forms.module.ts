import { Module } from '@nestjs/common'
import { IndividualOrderModule } from './individual-order/individual-order.module'
import { NewsletterSubscriptionModule } from './newsletter-subscription/newsletter-subscription.module'

@Module({
  imports: [IndividualOrderModule, NewsletterSubscriptionModule],
})
export class FormsModule {}
