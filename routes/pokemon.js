const express = require("express");
const api = express.Router();

const { getAllPokemons, getOnePokemon } = require("../controllers/pokemon");

api.route("/").get(getAllPokemons);
api.route("/:id").get(getOnePokemon);

module.exports = api;
