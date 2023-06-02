const express = require("express");
const {
  getTopPlayers,
  updateSinglePlayerScores,
  getPlayerByNameOrCreate,
  catchPokemon,
} = require("../controllers/player");

const api = express.Router();

api.route("/").put(updateSinglePlayerScores);
api.route("/top").get(getTopPlayers);
api.route("/catchedPokes/:playerName").get(getPlayerByNameOrCreate);
api.route("/catchedPokes/:playerName/:pokeId").put(catchPokemon);

module.exports = api;
