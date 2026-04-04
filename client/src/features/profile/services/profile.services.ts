import { API_ROUTES, BaseService } from '@shared/api'
import type { UpdateProfileDto, UpdateProfileResponse } from '../types'

class ProfileService extends BaseService {
  async updateProfile(dto: UpdateProfileDto): Promise<UpdateProfileResponse> {
    return this.put(API_ROUTES.PROFILE, dto)
  }
}

export const profileService = new ProfileService()
