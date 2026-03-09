import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { hash, verify } from 'argon2'
import { RegisterDto } from '@modules/auth/dto/register.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './models/user.model'
import {
  USER_ALREADY_EXISTS_ERROR,
  CURRENT_PASSWORD_REQUIRED_ERROR,
  WRONG_CURRENT_PASSWORD_ERROR,
} from './user.constants'
import { ROLES, type UserModel } from './user.types'

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: UserModel) {}

  private readonly selectGetFields = '-createdAt -updatedAt -__v'

  getById(id: string) {
    return this.userModel.findById(id).select(this.selectGetFields).lean()
  }

  getByEmail(email: string) {
    return this.userModel.findOne({ email }).select(this.selectGetFields).lean()
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

  async update(userId: string, dto: UpdateUserDto) {
    const data = await this.prepareUpdateData(userId, dto)

    const updatedUser = await this.userModel
      .findByIdAndUpdate(userId, data, {
        returnDocument: 'after',
        runValidators: true,
      })
      .select('-password')
      .lean()

    return updatedUser
  }

  private async prepareUpdateData(userId: string, dto: UpdateUserDto) {
    const data: Record<string, unknown> = { ...dto }

    const newPassword = dto.newPassword

    if (newPassword && newPassword.trim() !== '') {
      await this.validateCurrentPassword(userId, dto.currentPassword)
      data.password = await hash(newPassword)
    }

    delete data.newPassword
    delete data.currentPassword

    return data
  }

  private async validateCurrentPassword(
    userId: string,
    currentPassword?: string,
  ) {
    if (!currentPassword || currentPassword.trim() === '') {
      throw new BadRequestException(CURRENT_PASSWORD_REQUIRED_ERROR)
    }

    const user = await this.userModel.findById(userId).select('+password')

    if (!user) throw new UnauthorizedException(WRONG_CURRENT_PASSWORD_ERROR)

    const isPasswordValid = await verify(user.password, currentPassword)

    if (!isPasswordValid) {
      throw new UnauthorizedException(WRONG_CURRENT_PASSWORD_ERROR)
    }
  }
}
