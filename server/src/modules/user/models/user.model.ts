import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Address } from './user-address.model'
import { ROLES } from '../user.types'

@Schema({ timestamps: true })
export class User {
  _id!: string

  @Prop({ required: true, unique: true, index: true })
  email!: string

  @Prop({ required: true })
  password!: string

  @Prop({ type: String, default: null })
  resetPasswordToken?: string | null

  @Prop({ type: Date, default: null })
  resetPasswordTokenExpiresAt?: Date | null

  @Prop({ default: '' })
  name?: string

  @Prop({ default: '' })
  phone?: string

  @Prop({
    type: String,
    enum: Object.values(ROLES),
    default: ROLES.USER,
    index: true,
  })
  role!: ROLES

  @Prop({ type: Address, default: {} })
  address?: Address
}

export const UserSchema = SchemaFactory.createForClass(User)
