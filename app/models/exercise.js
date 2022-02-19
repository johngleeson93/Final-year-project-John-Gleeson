"use strict";

const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const exerciseSchema = new Schema({
  amount: Number,
  method: String,
  donor: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  candidate: {
    type: Schema.Types.ObjectId,
    ref: "Contributor"
  }
});

module.exports = Mongoose.model("Exercise", exerciseSchema);
