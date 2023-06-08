const express = require("express");
const app = express();
const cors = require("cors");
const rateLimit = require("express-rate-limit");

app.use(cors());
require("colors");
require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({
  windowMs: 6000, // 6 seconds
  max: 1, // Limit each IP to 1 requests per 6 seconds
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use("/players", limiter);

const pokemons = require("./routes/pokemon");
const creators = require("./routes/creator");
const players = require("./routes/player");

const connectDB = require("./dbinit");

const port = process.env.PORT || 5555;
connectDB();

app.use("/pokemons", pokemons);
app.use("/creators", creators);
app.use("/players", players);

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
