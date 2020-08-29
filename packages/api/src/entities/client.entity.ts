import { ObjectType, Field, ID } from 'type-graphql';
import { Prop, getModelForClass, Ref } from '@typegoose/typegoose';

import { User } from './user.entity';

@ObjectType()
export class Client {
  @Field(() => ID)
  id!: string;

  @Field()
  @Prop({ required: true, trim: true })
  name!: string;

  @Field()
  @Prop({ required: true, trim: true })
  lastName!: string;

  @Field()
  @Prop({ required: true, trim: true })
  company!: string;

  @Field()
  @Prop({ trim: true })
  phone!: string;

  @Field()
  @Prop({ required: true, unique: true })
  email!: string;

  @Field(() => User)
  @Prop({ ref: User, required: true })
  salesman!: Ref<User>;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}

export const ClientModel = getModelForClass(Client, {
  schemaOptions: {
    timestamps: true
  }
});
