import { prop, getModelForClass } from '@typegoose/typegoose';
import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  id!: string;

  @Field()
  @prop({ trim: true })
  name!: string;

  @Field()
  @prop({ trim: true })
  lastName!: string;

  @Field()
  @prop({ trim: true, unique: true })
  email!: string;

  @prop({ trim: true })
  password!: string;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}

export const UserModel = getModelForClass(User, {
  schemaOptions: { timestamps: true }
});
