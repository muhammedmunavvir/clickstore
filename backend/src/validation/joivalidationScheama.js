import Joi from "joi";

export const registerUserjoi = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  age: Joi.number().integer().min(1).optional(),
  role: Joi.string().valid("user", "admin").optional(),
});

export const loginUserjoi = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});
 