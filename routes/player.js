const express = require("express");
const {
  getTopPlayers,
  updateSinglePlayerScores,
} = require("../controllers/player");

const api = express.Router();

api.route("/").get(getTopPlayers).put(updateSinglePlayerScores);

module.exports = api;
