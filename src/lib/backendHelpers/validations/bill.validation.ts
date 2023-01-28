import {
  MONTHLY_FIXED,
  MONTHLY_UND,
  YEARLY_FIXED,
  YEARLY_UND,
} from "@/global/constants";
import Joi from "joi";

const addSchema = Joi.object({
  description: Joi.string().min(1).max(200).required(),
  sum: Joi.number().greater(0),
  type: Joi.string()
    .valid(MONTHLY_UND, MONTHLY_FIXED, YEARLY_FIXED, YEARLY_UND)
    .required(),
  firstPayment: Joi.date(),
  amount: Joi.number().greater(0),
  payments: Joi.number().min(0),
});
const paySchema = Joi.object({
  sum: Joi.number().greater(0).required(),
  periods: Joi.number().greater(0).required(),
  date: Joi.date().required(),
});
const monthSchema = Joi.object({
  month: Joi.number().integer().min(1).max(12).required(),
  year: Joi.number().integer().min(1900).max(2100).required(),
});
export default { addSchema, paySchema, monthSchema };
