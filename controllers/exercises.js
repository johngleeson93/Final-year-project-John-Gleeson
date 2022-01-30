const Exercises = {
  index: {
    handler: function (request, h) {
      return h.file("./app/views/main.html");
    },
  },
};

module.exports = Exercises;