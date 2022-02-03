const Exercises = require("./app/controllers/exercises");

module.exports = [
  { method: "GET", path: "/", config: Exercises.index },
  { method: "GET", path: "/signup", config: Exercises.signup },
  { method: "GET", path: "/login", config: Exercises.login },
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
