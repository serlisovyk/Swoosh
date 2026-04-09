import { API_ROUTES, BaseService } from '@shared/api'
import type {
  CreateNewsletterSubscriptionPayload,
  CreateNewsletterSubscriptionResponse,
} from '../types'

class NewsletterSubscriptionService extends BaseService {
  async createNewsletterSubscription(
    payload: CreateNewsletterSubscriptionPayload,
  ): Promise<CreateNewsletterSubscriptionResponse> {
    return this.post(API_ROUTES.NEWSLETTER_SUBSCRIPTIONS, payload)
  }
}

export const newsletterSubscriptionService = new NewsletterSubscriptionService()
