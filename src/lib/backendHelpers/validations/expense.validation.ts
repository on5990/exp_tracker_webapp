import Joi from "joi";

const addSchema = Joi.object({
  description: Joi.string().min(1).max(200).required(),
  sum: Joi.number().greater(0).required(),
  spentAt: Joi.date().required(),
  _categoryId: Joi.any(),
});

export default { addSchema };
