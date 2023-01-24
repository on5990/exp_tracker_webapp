import mongoose from "mongoose";

let connection = {
  isConnected: 0,
};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }
  const db = await mongoose.connect(process.env.MONGODB_URL as string);
  connection.isConnected = db.connections[0].readyState;
}
export default dbConnect;
