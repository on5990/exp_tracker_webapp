import Joi from "joi";

const idSchema = Joi.object({
  _id: Joi.any().required(),
});
export default { idSchema };
