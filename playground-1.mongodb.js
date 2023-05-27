use("Pokemons");
db.pokemons.find({
  $and: [
    { type: { $all: ["Dragon"] } },
    { "base.HP": { $gte: 45 } },
    { "base.HP": { $lte: 95 } },
    { "base.Attack": { $gte: 5 } },
    { "base.Attack": { $lte: 95 } },
    { "base.Defense": { $gte: 5 } },
    { "base.Defense": { $lte: 50 } },
    { "base.Speed": { $gte: 5 } },
    { "base.Speed": { $lte: 95 } },
  ],
});
