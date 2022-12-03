const database = require("../../database");
var cron = require("node-cron");
const CoinModel = require("../coins/model");
const { default: axios } = require("axios");
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
          cron.schedule("*/1 * * * *", async () => {
            // Coin.updateDB();
            const url =
              "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&sparkline=false";
            const res = await axios.get(url, {
              headers: { "accept-encoding": null },
            });
            console.log("result is: ", res.data);
            console.log(typeof res.data);
            console.log(res.data.length);
          });
        })
        .catch((err) => {
          console.log(err);
          console.log("Failed to connect to database");
        });
    }
    next();
  },
};
