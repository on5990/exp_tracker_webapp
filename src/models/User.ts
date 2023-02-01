import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      trim: true,
      required: [true, "email is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    monthlyAvg: {
      type: Number,
      required: [true, "monthlyAvg is required"],
      default: 0,
    },
    yearlyAvg: {
      type: Number,
      required: [true, "yearlyAvg is required"],
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
export default models.User || model("User", userSchema);
