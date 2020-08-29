import { ObjectId } from 'mongodb';

export interface Context {
  user?: {
    id: ObjectId;
  };
}
