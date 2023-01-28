import { string } from "joi";
import { Schema, model, models } from "mongoose";
const billSchema = new Schema(
  {
    description: { type: String, required: [true, "description is required"] },
    // Not required if the bills has an undefined amount of payments, ej: electricity bill
    amount: { type: Number, required: false },
    type: { type: String, required: [true, "type is required"] },
    // Not required if the debt is finished
    nextPayment: { type: Date, required: false },
    // Not required if the amount of payments is undefined, ej: electricity bill
    firstPayment: { type: Date, required: false },
    // Not required if the sum is not be fixed
    sum: { type: Number, required: false },
    state: { type: String, required: [true, "state is required"] },
    // Not required if this bill has never been paid before
    lastPayment: { type: Date, required: false },
    // Not required if the amount of payments is undefined
    payments: { type: Number, required: false },
    _userId: {
      type: Schema.Types.ObjectId,
      required: [true, "userId is required"],
    },
  },
  { timestamps: true }
);
export default models.Bill || model("Bill", billSchema);
