import Joi from "joi";

const addSchema = Joi.object({
  name: Joi.string().min(1).max(100).required(),
});
export default { addSchema };
