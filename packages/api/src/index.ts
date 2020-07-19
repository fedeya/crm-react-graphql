import 'reflect-metadata';
import { initServer } from './app';
import { connectDB } from '@config/mongoose';

(async function init() {
  await connectDB();
  await initServer();
})();
