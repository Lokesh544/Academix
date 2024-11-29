import mongoose from "mongoose";

const connection = {
  isConnected: 0,
};

/**
 * Connects to the Database
 */
export default async function dbConnect() {
  if (connection.isConnected) {
    return;
  }
  const db = await mongoose.connect(process.env.MONGODB_URI);
  connection.isConnected = db.connections[0].readyState;
}
