const express = require("express");
const {
  createCreator,
  getAllCreators,
  getOneCreator,
  updateCreator,
  deleteCreator,
} = require("../controllers/creator");

const api = express.Router();

api.route("/").get(getAllCreators).post(createCreator);

api.route("/:id").get(getOneCreator).put(updateCreator).delete(deleteCreator);

module.exports = api;
