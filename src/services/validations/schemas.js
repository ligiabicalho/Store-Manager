const Joi = require('joi');

const idSchema = Joi.object({
  id: Joi.number().integer().min(1).required(),
});

const nameSchema = Joi.object({
  name: Joi.string().min(5).required(),
});

const quantSchema = Joi.object({
  quantity: Joi.number().integer().min(1).required(),
}); 
  
module.exports = { idSchema, nameSchema, quantSchema };