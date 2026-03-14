import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Put,
} from '@nestjs/common'
import { Auth } from '@modules/auth/decorators/auth.decorator'
import { CurrentUser } from '@modules/auth/decorators/user.decorator'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserService } from './user.service'
import {
  UserGetProfileDocs,
  UserTagDocs,
  UserUpdateProfileDocs,
} from './user.swagger'
import { USER_NOT_FOUND_ERROR } from './user.constants'

@UserTagDocs()
@Controller('/profile')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @UserGetProfileDocs()
  @Auth()
  @Get()
  async getProfile(@CurrentUser('_id') id: string) {
    const user = await this.usersService.getById(id)
    if (!user) throw new NotFoundException(USER_NOT_FOUND_ERROR)

    return user
  }

  @UserUpdateProfileDocs()
  @HttpCode(HttpStatus.OK)
  @Auth()
  @Put()
  async updateProfile(
    @CurrentUser('_id') id: string,
    @Body() dto: UpdateUserDto,
  ) {
    return this.usersService.update(id, dto)
  }
}
