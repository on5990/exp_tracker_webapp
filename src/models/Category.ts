import { Schema, model, models } from "mongoose";
const categorySchema = new Schema(
  {
    name: { type: String, unique: true, required: [true, "name is required"] },
    // Value false if it is a category created by a user
    isDefault: { type: Boolean, required: [true, "isDefault is required"] },
    // Not required if it is a category defined by the system
    _userId: { type: Schema.Types.ObjectId, required: [false] },
  },
  {
    timestamps: true,
  }
);
export default models.Category || model("Category", categorySchema);
