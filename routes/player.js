const express = require("express");
const {
  getTopPlayers,
  updateSinglePlayerScores,
  getPlayerByNameOrCreate,
  catchPokemon,
} = require("../controllers/player");

const api = express.Router();

api.route("/").put(updateSinglePlayerScores);
api.route("/:playerName").get(getPlayerByNameOrCreate);
api.route("/:playerName/:pokeId").put(catchPokemon);
api.route("/top").get(getTopPlayers);

module.exports = api;
