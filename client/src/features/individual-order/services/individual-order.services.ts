import { API, API_ROUTES } from '@shared/api'
import type {
  CreateIndividualOrderPayload,
  CreateIndividualOrderResponse,
} from '../types'

export async function createIndividualOrder(
  payload: CreateIndividualOrderPayload,
) {
  const { data } = await API.post<CreateIndividualOrderResponse>(
    API_ROUTES.INDIVIDUAL_ORDERS,
    payload,
  )

  return data
}
