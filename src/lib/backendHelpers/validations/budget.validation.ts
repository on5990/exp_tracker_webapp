import Joi from "joi";

const addSchema = Joi.object({
  sum: Joi.number().greater(0).required(),
  _categoryId: Joi.any().required(),
});
const updateSchema = Joi.object({
  sum: Joi.number().greater(0).required(),
});
export default { addSchema, updateSchema };
