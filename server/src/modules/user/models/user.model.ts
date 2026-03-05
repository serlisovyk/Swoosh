import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ROLES } from '../user.types'
import { Types } from 'mongoose'

@Schema({ timestamps: true })
export class User {
  @Prop({ type: Types.ObjectId, required: true })
  _id!: string

  @Prop({ required: true, unique: true, index: true })
  email!: string

  @Prop({ required: true })
  password!: string

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
}

export const UserSchema = SchemaFactory.createForClass(User)
