import mongoose from "mongoose";
//connect to mongodb atlass

const connectDB = async () => {
  try {
    const mongodb_URI = `mongodb+srv://${process.env.MONGO_DB_ATLAS_USER}:${process.env.MONGO_DB_ATLAS_PASSWORD}@${process.env.MONGO_DB_ATLAS_IP}/socialMedia?retryWrites=true&w=majority&appName=Cluster0`
    const conn = await mongoose.connect(mongodb_URI,
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }

};
export default connectDB;