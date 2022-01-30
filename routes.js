const Exercises = require("./app/controllers/exercises");

module.exports = [
  { method: "GET", path: "/", config: Exercises.index },
  {
    method: "GET",
    path: "/{param*}",
    handler: {
      directory: {
        path: "./public",
      },
    },
  },
];
