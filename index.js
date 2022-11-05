const express = require("express");
require("dotenv").config();
const database = require("./database");
const apiRoutes = require("./src/api");
const app = express();
const CoinModel = require("./src/coins/model");
const Coin = new CoinModel();
var cron = require("node-cron");

const port = process.env.PORT || 3000;
app.use(express.json());
app.use("/api", apiRoutes);

app.get("", (req, res) => {
  res.send("api works!");
});

database
  .connect()
  .then((client) => {
    const db = client.db("CoinCap");
    database.db(db);
    cron.schedule("*/10 * * * *", () => {
      Coin.updateDB();
    });
    app.listen(port, () => {
      console.log("app is running in port " + port);
    });
  })
  .catch((err) => {
    console.log("Failed to connect to database");
  });
