import { ConflictException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { hash } from 'argon2'
import { RegisterDto } from '@modules/auth/dto/register.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './models/user.model'
import { USER_ALREADY_EXISTS_ERROR } from './user.constants'
import { ROLES, type UserModel } from './user.types'

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: UserModel) {}

  getById(id: string) {
    return this.userModel.findById(id).lean()
  }

  getByEmail(email: string) {
    return this.userModel.findOne({ email }).lean()
  }

  async create(dto: RegisterDto) {
    const preparedEmail = dto.email.toLowerCase()

    const isExisting = await this.getByEmail(preparedEmail)

    if (isExisting) throw new ConflictException(USER_ALREADY_EXISTS_ERROR)

    const newUser = await this.userModel.create({
      name: dto.name,
      phone: dto.phone,
      email: preparedEmail,
      role: ROLES.USER,
      password: await hash(dto.password),
    })

    return newUser.toObject()
  }

  async update(currentUserId: string, dto: UpdateUserDto) {
    const data: Partial<UpdateUserDto> = { ...dto }

    if (!dto.password || dto.password.trim() === '') {
      delete data.password
    } else {
      data.password = await hash(dto.password)
    }

    const updatedUser = await this.userModel
      .findByIdAndUpdate(currentUserId, data, {
        new: true,
        runValidators: true,
      })
      .select('-password')
      .lean()

    return updatedUser
  }
}
