"use strict";

const Exercise = require("../models/exercise");
const Contributor = require("../models/contributor");
const Boom = require("@hapi/boom");

const Exercises = {
  findAll: {
    auth: false,
    handler: async function(request, h) {
      const exercises = await Exercise.find();
      return exercises;
    }
  },
  findByContributor: {
    auth: false,
    handler: async function(request, h) {
      const exercises = await Exercise.find({ contributor: request.params.id });
      return exercises;
    }
  },
  makeExercise: {
    auth: false,
    handler: async function(request, h) {
      let exercise = new Exercise(request.payload);
      const contributor = await Contributor.findOne({ _id: request.params.id });
      if (!contributor) {
        return Boom.notFound("No Contributor with this id");
      }
      exercise.contributor = contributor._id;
      exercise = await exercise.save();
      return exercise;
    }
  },

  deleteAll: {
    auth: false,
    handler: async function(request, h) {
      await Exercise.deleteMany({});
      return { success: true };
    }
  }
};

module.exports = Exercises;
