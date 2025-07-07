
import mongoose from "mongoose";

const connectdb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(" Connected to MongoDB Atlas");
  } catch (error) {
    console.log("Error while connecting DB:", error.message);
  }
};

export default connectdb;
