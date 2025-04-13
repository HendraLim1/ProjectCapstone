import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB Atlas...');
    console.log('Connection string:', process.env.MONGO_URI.replace(/:[^:@]*@/, ':****@')); // Hide password in logs

    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected successfully to: ${conn.connection.host}`);

    // List all collections in the database
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log(
      'Available collections:',
      collections.map((c) => c.name)
    );

    // Check if users collection exists
    const hasUsersCollection = collections.some((c) => c.name === 'users');
    console.log('Users collection exists:', hasUsersCollection);

    if (hasUsersCollection) {
      // Count users in the collection
      const userCount = await mongoose.connection.db.collection('users').countDocuments();
      console.log(`Number of users in the database: ${userCount}`);
    }
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
