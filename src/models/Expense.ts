import { Schema, model, models } from "mongoose";

const expenseSchema = new Schema(
  {
    description: {
      type: String,
      trim: true,
      required: [true, "description is required"],
    },
    sum: {
      type: Number,
      required: [true, "sum is required"],
    },
    spentAt: {
      type: Date,
      default: new Date(),
      required: [true, "spentAt is required"],
    },
    _userId: {
      type: Schema.Types.ObjectId,
      required: [true, "userId is required"],
    },
    // Not required if the expense is not associated to a bill
    _billId: { type: Schema.Types.ObjectId, required: false },
    // Not required to avoid problems if the category is deleted
    _categoryId: { type: Schema.Types.ObjectId, required: false },
  },
  {
    timestamps: true,
  }
);
export default models.Expense || model("Expense", expenseSchema);
