
const mongoose = require("mongoose");
const Joi = require('joi');
const { valid } = require("joi");

// Mongoose Schema for storing the entries
const Schema = mongoose.Schema;

// Schema for the favourite people information
const favPersonSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    dateOfBirth: Date,
    phoneNum: String,
    address: String,
    notes: String
  });

const FavPerson = mongoose.model("FavPerson", favPersonSchema);

const joiSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  dateOfBirth: Joi.date().required(),
  phoneNum: Joi.string().required(),
  address: Joi.string().required(),
  notes: Joi.string().allow('').optional() // This field is optional
});

function validateFavPerson(person) {
  return joiSchema.validate(person);
}


module.exports = { FavPerson, validateFavPerson };