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
          cron.schedule("*/5 * * * *", async () => {
            // Coin.updateDB();
            try {
              const url =
                "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&sparkline=false";
              const res = await axios.get(url, {
                headers: { "accept-encoding": null },
              });

              const collection = db.collection("coins");
              if (res.data && res.data.length > 0) {
                const bulk = collection.initializeUnorderedBulkOp();
                res.data.map((coin) => {
                  bulk
                    .find({ id: coin.id })
                    .upsert()
                    .updateOne({
                      $set: {
                        id: coin.id,
                        symbol: coin.symbol,
                        name: coin.name,
                        image: coin.image,
                        current_price: coin.current_price,
                        market_cap: coin.market_cap,
                        market_cap_rank: coin.market_cap_rank,
                        fully_diluted_valuation: coin.fully_diluted_valuation,
                        total_volume: coin.total_volume,
                        high_24h: coin.high_24h,
                        low_24h: coin.low_24h,
                        price_change_24h: coin.price_change_24h,
                        price_change_percentage_24h:
                          coin.price_change_percentage_24h,
                        market_cap_change_24h: coin.market_cap_change_24h,
                        market_cap_change_percentage_24h:
                          coin.market_cap_change_percentage_24h,
                        circulating_supply: coin.circulating_supply,
                        total_supply: coin.total_supply,
                        max_supply: coin.imax_supplyd,
                        ath: coin.ath,
                        ath_change_percentage: coin.ath_change_percentage,
                        ath_date: coin.ath_date,
                        atl: coin.atl,
                        atl_change_percentage: coin.atl_change_percentage,
                        atl_date: coin.atl_date,
                        roi: coin.roi,
                        last_updated: coin.last_updated,
                      },
                    });
                });
                bulk.execute(function (err, updateResult) {
                  console.log(err, updateResult);
                });
              }
            } catch (err) {
              console.log(err);
            }
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
