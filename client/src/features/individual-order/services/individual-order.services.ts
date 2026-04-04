import { API_ROUTES, BaseService } from '@shared/api'
import type {
  CreateIndividualOrderPayload,
  CreateIndividualOrderResponse,
} from '../types'

class IndividualOrderService extends BaseService {
  async createIndividualOrder(
    payload: CreateIndividualOrderPayload,
  ): Promise<CreateIndividualOrderResponse> {
    return this.post(API_ROUTES.INDIVIDUAL_ORDERS, payload)
  }
}

export const individualOrderService = new IndividualOrderService()
