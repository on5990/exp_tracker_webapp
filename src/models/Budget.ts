import { Schema, model, models } from "mongoose";

const budgetSchema = new Schema(
  {
    sum: { type: Number, required: [true, "sum is required"] },
    state: { type: String, required: [true, "state is required"] },
    _categoryId: {
      type: Schema.Types.ObjectId,
      required: [true, "categoryId is required"],
    },
    _userId: {
      type: Schema.Types.ObjectId,
      required: [true, "userId is required"],
    },
  },
  { timestamps: true }
);
export default models.Budget || model("Budget", budgetSchema);
