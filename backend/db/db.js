import mongoose from "mongoose";

export const connectingTODB = async (uri) => {
  try {
    await mongoose.connect(uri);
    console.log("connected to db");
  } catch (error) {
    console.log(error.message);
  }
};
