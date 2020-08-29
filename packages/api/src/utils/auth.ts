import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

import { User } from '@Entities/user.entity';

interface IPayload {
  user: {
    id: ObjectId;
  };
  iat: number;
  exp: number;
}

export function generateToken(user: User, expiresIn: string) {
  const secret = process.env.JWT_SECRET || 'secretword';
  return jwt.sign({ user: { id: user.id } }, secret, { expiresIn });
}

export function verifyToken(token: string) {
  const secret = process.env.JWT_SECRET || 'secretword';
  const data = jwt.verify(token, secret) as IPayload;
  return data;
}
