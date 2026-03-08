import {
  Body,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Put,
} from '@nestjs/common'
import { Auth } from '@modules/auth/decorators/auth.decorator'
import { CurrentUser } from '@modules/auth/decorators/user.decorator'
import { noop } from '@shared/utils'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserService } from './user.service'
import { USER_NOT_FOUND_ERROR } from './user.constants'

@Controller('/profile')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Auth()
  @Get()
  async getProfile(@CurrentUser('_id') id: string) {
    const user = await this.usersService.getById(id)

    if (!user) throw new NotFoundException(USER_NOT_FOUND_ERROR)

    const { password, ...safe } = user

    noop(password)

    return safe
  }

  @HttpCode(200)
  @Auth()
  @Put()
  async updateProfile(
    @CurrentUser('_id') id: string,
    @Body() dto: UpdateUserDto,
  ) {
    return this.usersService.update(id, dto)
  }
}
