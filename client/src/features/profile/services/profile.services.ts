import { API, API_ROUTES } from '@shared/api'
import { ProfileEditFormData, UpdateProfileResponse } from '../types'

export async function updateProfile(dto: ProfileEditFormData) {
  const { data } = await API.put<UpdateProfileResponse>(API_ROUTES.PROFILE, dto)
  return data
}
