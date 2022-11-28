const database = require("../../database");
var cron = require("node-cron");
const CoinModel = require("../coins/model");
const Coin = new CoinModel();

// Not in use
const dbConnection = database
  .connect()
  .then((client) => {
    const db = client.db("CoinCap");
    database.db(db);
    cron.schedule("*/5 * * * *", () => {
      Coin.updateDB();
    });
  })
  .catch((err) => {
    console.log(err);
    console.log("Failed to connect to database");
  });

module.exports = dbConnection;
