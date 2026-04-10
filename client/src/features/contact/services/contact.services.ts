import { API_ROUTES, BaseService } from '@shared/api'
import type {
  CreateContactRequestPayload,
  CreateContactRequestResponse,
} from '../types'

class ContactService extends BaseService {
  async createContactRequest(
    payload: CreateContactRequestPayload,
  ): Promise<CreateContactRequestResponse> {
    return this.post(API_ROUTES.CONTACT_REQUESTS, payload)
  }
}

export const contactService = new ContactService()
