import { connect } from 'mongoose';

export async function connectDB() {
  try {
    const URI = process.env.MONGO_URI || 'mongodb://localhost/crm';
    await connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
    console.log('DB is Connected');
  } catch (err) {
    console.log(err);
  }
}
