const database = require("../../database");
var cron = require("node-cron");
const CoinModel = require("../coins/model");
const Coin = new CoinModel();

module.exports = {
  dbConnection: function (req, res, next) {
    if (!database.db()) {
      console.log("aqui");
      database
        .connect()
        .then((client) => {
          const db = client.db("CoinCap");
          database.db(db);
          // cron.schedule("*/5 * * * *", () => {
          //   Coin.updateDB();
          // });
        })
        .catch((err) => {
          console.log(err);
          console.log("Failed to connect to database");
        });
    }
    next();
  },
};
