const Joi = require('joi');
const Boom = require('boom');

const productValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    brand: Joi.string().required(),
    price: Joi.number().required(),
    stock: Joi.number().required()
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const getProductValidation = (data) => {
  const schema = Joi.object({
    id: Joi.number().required()
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

module.exports = { productValidation, getProductValidation };
