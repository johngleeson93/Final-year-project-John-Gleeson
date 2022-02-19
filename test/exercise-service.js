"use strict";

const axios = require("axios");

class ExerciseService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getUsers() {
    try {
      const response = await axios.get(this.baseUrl + "/api/users");
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async getUser(id) {
    try {
      const response = await axios.get(this.baseUrl + "/api/users/" + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async createUser(newUser) {
    try {
      const response = await axios.post(this.baseUrl + "/api/users", newUser);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async deleteAllUsers() {
    try {
      const response = await axios.delete(this.baseUrl + "/api/users");
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async deleteOneUser(id) {
    try {
      const response = await axios.delete(this.baseUrl + "/api/users/" + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async getCandidates() {
    try {
      const response = await axios.get(this.baseUrl + "/api/contributors");
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async getContributor(id) {
    try {
      const response = await axios.get(this.baseUrl + "/api/contributors/" + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async createContributor(newCandidate) {
    try {
      const response = await axios.post(this.baseUrl + "/api/contributors", newCandidate);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async deleteAllContributors() {
    try {
      const response = await axios.delete(this.baseUrl + "/api/contributors");
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async deleteOneCandidate(id) {
    try {
      const response = await axios.delete(this.baseUrl + "/api/contributors/" + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async makeExercise(id, exercise) {
    try {
      const response = await axios.post(this.baseUrl + "/api/contributors/" + id + "/exercises", exercise);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async getExercises(id) {
    try {
      const response = await axios.get(this.baseUrl + "/api/contributors/" + id + "/exercises");
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async deleteAllExercises() {
    try {
      const response = await axios.delete(this.baseUrl + "/api/exercises");
      return response.data;
    } catch (e) {
      return null;
    }
  }
}

module.exports = ExerciseService;
