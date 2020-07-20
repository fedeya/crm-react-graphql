import 'reflect-metadata';
import { initServer } from './app';
import { connectDB } from '@Config/mongoose';
import dotenv from 'dotenv';

dotenv.config();

(async function init() {
  await connectDB();
  await initServer();
})();
