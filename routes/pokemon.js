const express = require("express");
const api = express.Router();

const {
  getAllPokemons,
  getOnePokemon,
  getPokesByFilters,
} = require("../controllers/pokemon");

api.route("/").get(getAllPokemons);
api.route("/:id").get(getOnePokemon);
api.route("/filtered").post(getPokesByFilters);

module.exports = api;
