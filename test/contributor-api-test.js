"use strict";

const assert = require("chai").assert;
const ExerciseService = require("./exercise-service");
const fixtures = require("./fixtures.json");
const _ = require("lodash");

suite("Contributor API tests", function() {
  let contributors = fixtures.contributors;
  let newContributor = fixtures.newContributor;

  const exerciseService = new ExerciseService("http://localhost:3000");

  setup(async function() {
    await exerciseService.deleteAllContributors();
  });

  teardown(async function() {
    await exerciseService.deleteAllContributors();
  });

  test("create a Contributor", async function() {
    const returnedContributor = await exerciseService.createContributor(newContributor);
    assert(_.some([returnedContributor], newContributor), "returnedContributor must be a superset of newContributor");
    assert.isDefined(returnedContributor._id);
  });

  test("get contributor", async function() {
    const c1 = await exerciseService.createContributor(newContributor);
    const c2 = await exerciseService.getContributor(c1._id);
    assert.deepEqual(c1, c2);
  });

  test("get invalid contributor", async function() {
    const c1 = await exerciseService.getContributor("1234");
    assert.isNull(c1);
    const c2 = await exerciseService.getContributor("012345678901234567890123");
    assert.isNull(c2);
  });

  test("delete a Contributor", async function() {
    let c = await exerciseService.createContributor(newContributor);
    assert(c._id != null);
    await exerciseService.deleteOneContributor(c._id);
    c = await exerciseService.getContributor(c._id);
    assert(c == null);
  });

  test("get all contributors", async function() {
    for (let c of contributors) {
      await exerciseService.createContributor(c);
    }

    const allContributors = await exerciseService.getContributors();
    assert.equal(allContributors.length, contributors.length);
  });

  test("get contributors detail", async function() {
    for (let c of contributors) {
      await exerciseService.createContributor(c);
    }

    const allContributors = await exerciseService.getContributors();
    for (var i = 0; i < contributors.length; i++) {
      assert(_.some([allContributors[i]], contributors[i]), "returnedCandidate must be a superset of newCandidate");
    }
  });

  test("get all contributors empty", async function() {
    const allContributors = await exerciseService.getContributors();
    assert.equal(allContributors.length, 0);
  });
});
