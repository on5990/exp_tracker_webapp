import Joi from "joi";

const authSchema = Joi.object({
  encryptedData: Joi.string().required(),
});

export default { authSchema };
