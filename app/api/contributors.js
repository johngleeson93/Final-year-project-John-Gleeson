"use strict";

const Contributor = require("../models/contributor");
const Boom = require("@hapi/boom");

const Contributors = {
  find: {
    auth: false,
    handler: async function(request, h) {
      const contributors = await Contributor.find();
      return contributors;
    }
  },

  findOne: {
    auth: false,
    handler: async function(request, h) {
      try {
        const contributor = await Contributor.findOne({ _id: request.params.id });
        if (!contributor) {
          return Boom.notFound("No Contributor with this id");
        }
        return contributor;
      } catch (err) {
        return Boom.notFound("No Contributor with this id");
      }
    }
  },

  create: {
    auth: false,
    handler: async function(request, h) {
      const newContributor = newContributor(request.payload);
      const contributor = await newContributor.save();
      if (contributor) {
        return h.response(contributor).code(201);
      }
      return Boom.badImplementation("error creating contributor");
    }
  },

  deleteAll: {
    auth: false,
    handler: async function(request, h) {
      await Contributor.remove({});
      return { success: true };
    }
  },

  deleteOne: {
    auth: false,
    handler: async function(request, h) {
      const response = await Contributor.deleteOne({ _id: request.params.id });
      if (response.deletedCount == 1) {
        return { success: true };
      }
      return Boom.notFound("id not found");
    }
  }
};

module.exports = Contributors;
