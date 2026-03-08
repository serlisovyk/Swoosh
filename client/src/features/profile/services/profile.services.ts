import { API, API_ROUTES } from '@shared/api'
import { UpdateProfileDto, UpdateProfileResponse } from '../types'

export async function updateProfile(dto: UpdateProfileDto) {
  const { data } = await API.put<UpdateProfileResponse>(API_ROUTES.PROFILE, dto)
  return data
}
