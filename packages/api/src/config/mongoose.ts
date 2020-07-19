import { connect } from 'mongoose';

export async function connectDB() {
  try {
    await connect('mongodb://localhost/crm', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('DB is Connected');
  } catch (err) {
    console.log(err);
  }
}
