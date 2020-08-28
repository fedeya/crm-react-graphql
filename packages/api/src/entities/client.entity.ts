import { ObjectType, Field, ID } from 'type-graphql';
import { prop, getModelForClass, Ref } from '@typegoose/typegoose';

import { User } from './user.entity';

@ObjectType()
export class Client {
  @Field(() => ID)
  id!: string;

  @Field()
  @prop({ required: true, trim: true })
  name!: string;

  @Field()
  @prop({ required: true, trim: true })
  lastName!: string;

  @Field()
  @prop({ required: true, trim: true })
  company!: string;

  @Field()
  @prop({ required: true, trim: true })
  phone!: string;

  @Field()
  @prop({ required: true, unique: true })
  email!: string;

  @Field()
  @prop({ ref: User })
  salesman!: Ref<User>;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}

export default getModelForClass(Client, { 
  schemaOptions: {
    timestamps: true
  }
})