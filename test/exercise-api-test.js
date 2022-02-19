"use strict";

const assert = require("chai").assert;
const ExerciseService = require("./exercise-service");
const fixtures = require("./fixtures.json");
const _ = require("lodash");

suite("Exercise API tests", function() {
  let exercises = fixtures.exercises;
  let newContributor = fixtures.newContributor;

  const exerciseService = new ExerciseService(fixtures.exerciseService);

  setup(async function() {
    exerciseService.deleteAllContributors();
    exerciseService.deleteAllExercises();
  });

  teardown(async function() {
  });

  test("create an exercise", async function() {
    const returnedContributor = await exerciseService.createContributor(newContributor);
    await exerciseService.makeExercise(returnedContributor._id, exercises[0]);
    const returnedExercises = await exerciseService.getExercises(returnedContributor._id);
    assert.equal(returnedExercises.length, 1);
    assert(_.some([returnedExercises[0]], exercises[0]), "returned exercise must be a superset of exercise");
  });

  test("create multiple exercises", async function() {
    const returnedContributor = await exerciseService.createContributor(newContributor);
    for (var i = 0; i < exercises.length; i++) {
      await exerciseService.makeExercise(returnedContributor._id, exercises[i]);
    }

    const returnedExercises = await exerciseService.getExercises(returnedContributor._id);
    assert.equal(returnedExercises.length, exercises.length);
    for (var i = 0; i < exercises.length; i++) {
      assert(_.some([returnedExercises[i]], exercises[i]), "returned exercise must be a superset of exercise");
    }
  });

  test("delete all exercises", async function() {
    const returnedContributor = await exerciseService.createContributor(newContributor);
    for (var i = 0; i < exercises.length; i++) {
      await exerciseService.makeExercise(returnedContributor._id, exercises[i]);
    }

    const d1 = await exerciseService.getExercises(returnedContributor._id);
    assert.equal(d1.length, exercises.length);
    await exerciseService.deleteAllExercises();
    const d2 = await exerciseService.getExercises(returnedContributor._id);
    assert.equal(d2.length, 0);
  });
});
