import { ObjectType, Field, ID } from 'type-graphql';
import { Prop, getModelForClass } from '@typegoose/typegoose';

@ObjectType()
export class User {
  @Field(() => ID)
  id!: string;

  @Field()
  @Prop({ trim: true, required: true })
  name!: string;

  @Field()
  @Prop({ trim: true, required: true })
  lastName!: string;

  @Field()
  @Prop({ trim: true, unique: true, required: true })
  email!: string;

  @Prop({ trim: true, required: true })
  password!: string;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}

export const UserModel = getModelForClass(User, {
  schemaOptions: { timestamps: true }
});
