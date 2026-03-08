import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ROLES } from '../user.types'

@Schema({ timestamps: true })
export class User {
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
