"use strict";

const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const contributorSchema = Schema({
  firstName: String,
  lastName: String,
  office: String
});

module.exports = Mongoose.model("Contributor", contributorSchema);
