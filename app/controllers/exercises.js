"use strict";
const Exercise = require("../models/exercise");
const User = require("../models/user");
const Contributor = require("../models/contributor");
const Joi = require("@hapi/joi");

const Exercises = {
  home: {
    handler: async function(request, h) {
      const contributors = await Contributor.find().lean();
      return h.view("home", { title: "Make an Exercise", contributors: contributors });
    }
  },
  report: {
    handler: async function(request, h) {
      const exercises = await Exercise.find().populate("donor").populate("contributor").lean();
      let total = 0;
      exercises.forEach((exercise) => {
        total += exercise.amount;
      });
      return h.view("report", {
        title: "Exercises to Date",
        exercises: exercises,
        total: total
      });
    }
  },
  exercise: {
    validate: {
      payload: {
        amount: Joi.number().required(),
        method: Joi.string().required(),
        contributor: Joi.string().required()
      },
      options: {
        abortEarly: false
      },
      failAction: async function(request, h, error) {
        const contributors = await Contributor.find().lean();
        return h
          .view("home", {
            title: "Invalid Exercise",
            contributors: contributors,
            errors: error.details
          })
          .takeover()
          .code(400);
      }
    },
    handler: async function(request, h) {
      try {
        const id = request.auth.credentials.id;
        const user = await User.findById(id);
        const data = request.payload;

        const rawContributor = request.payload.contributor.split(",");
        const contributor = await Contributor.findOne({
          lastName: rawContributor[0],
          firstName: rawContributor[1]
        });

        const newExercise = new Exercise({
          amount: data.amount,
          method: data.method,
          donor: user._id,
          contributor: contributor._id
        });
        await newExercise.save();
        return h.redirect("/report");
      } catch (err) {
        return h.view("main", { errors: [{ message: err.message }] });
      }
    }
  }
};

module.exports = Exercises;
