import mongoose from 'mongoose';

// Create a connection function that uses the MONGODB_URI from .env
export async function connectDB() {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('MONGODB_URI is not defined in the environment variables');
    }
    await mongoose.connect(mongoUri);
    console.log('Connected successfully to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}

