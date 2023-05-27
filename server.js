const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
require("colors");
require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const pokemons = require("./routes/pokemon");
const creators = require("./routes/creator");

const connectDB = require("./dbinit");

const port = process.env.PORT || 5555;
connectDB();

app.use("/pokemons", pokemons);
app.use("/creators", creators);

app.get("/", (req, res) => {
  res.send("Fetch 'em all!");
});

// app.post("/filtered", (req, res) => {
//   console.log(req.body);
//   res.send(200).json({ mgs: "received" });
// });

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`.random);
});
