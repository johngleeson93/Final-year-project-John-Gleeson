const Users = require("./app/api/users");
const Exercises = require("./app/api/exercises");

module.exports = [
  { method: "GET", path: "/api/users", config: Users.find },
  { method: "GET", path: "/api/users/{id}", config: Users.findOne },
  { method: "POST", path: "/api/users", config: Users.create },
  { method: "DELETE", path: "/api/users/{id}", config: Users.deleteOne },
  { method: "DELETE", path: "/api/users", config: Users.deleteAll },

  { method: "GET", path: "/api/exercises", config: Exercises.findAll },
  { method: "GET", path: "/api/contributors/{id}/exercises", config: Exercises.findByContributor },
  { method: "POST", path: "/api/contributors/{id}/exercises", config: Exercises.makeExercise },
  { method: "DELETE", path: "/api/exercises", config: Exercises.deleteAll }
];
