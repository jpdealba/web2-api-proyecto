const database = require("../../database/database");
const dbd = require("../../database");
const axios = require("axios");
const https = require("https");

class Coin {
  async findAll() {
    try {
      const db = database();
      const collection = db.collection("coins");
      const result = await collection.find({}).toArray();
      return result;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async findOne(id) {
    try {
      const db = database();
      const collection = db.collection("coins");
      const result = await collection.findOne({ symbol: id });
      return result;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async updateDB() {
    try {
      const result = await getRequest();
      console.log("result is: 👉️", result);
      console.log(typeof result);
      console.log(result.length);
      //   dbd
      //     .connect()
      //     .then((client) => {
      //       const db = client.db("CoinCap");
      //       database(db);
      //       // axios
      //       //   .get(

      //       //   )
      //         .then((res) => {
      //           try {
      //             const collection = db.collection("coins");
      //             if (res.data && res.data.length > 0) {
      //               const bulk = collection.initializeUnorderedBulkOp();
      //               console.log(typeof JSON.stringify(res.data));
      //               JSON.stringify(res.data).map((coin) => {
      //                 bulk
      //                   .find({ id: coin.id })
      //                   .upsert()
      //                   .updateOne({
      //                     $set: {
      //                       id: coin.id,
      //                       symbol: coin.symbol,
      //                       name: coin.name,
      //                       image: coin.image,
      //                       current_price: coin.current_price,
      //                       market_cap: coin.market_cap,
      //                       market_cap_rank: coin.market_cap_rank,
      //                       fully_diluted_valuation: coin.fully_diluted_valuation,
      //                       total_volume: coin.total_volume,
      //                       high_24h: coin.high_24h,
      //                       low_24h: coin.low_24h,
      //                       price_change_24h: coin.price_change_24h,
      //                       price_change_percentage_24h:
      //                         coin.price_change_percentage_24h,
      //                       market_cap_change_24h: coin.market_cap_change_24h,
      //                       market_cap_change_percentage_24h:
      //                         coin.market_cap_change_percentage_24h,
      //                       circulating_supply: coin.circulating_supply,
      //                       total_supply: coin.total_supply,
      //                       max_supply: coin.imax_supplyd,
      //                       ath: coin.ath,
      //                       ath_change_percentage: coin.ath_change_percentage,
      //                       ath_date: coin.ath_date,
      //                       atl: coin.atl,
      //                       atl_change_percentage: coin.atl_change_percentage,
      //                       atl_date: coin.atl_date,
      //                       roi: coin.roi,
      //                       last_updated: coin.last_updated,
      //                     },
      //                   });
      //               });
      //               bulk.execute(function (err, updateResult) {
      //                 console.log(err, updateResult);
      //               });
      //             }
      //           } catch (err) {
      //             console.log(err);
      //           }
      //         });
      //     })
      //     .catch((err) => console.log(err))
      //     .catch((err) => {
      //       console.log(err);
      //       console.log("Failed to connect to database");
      //     });
    } catch (err) {
      console.log("Error is: 👉️", err);
    }
  }

  getRequest() {
    const url =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&sparkline=false";

    return new Promise((resolve, reject) => {
      const req = https.get(url, (res) => {
        let rawData = "";

        res.on("data", (chunk) => {
          rawData += chunk;
        });

        res.on("end", () => {
          try {
            resolve(JSON.parse(rawData));
          } catch (err) {
            reject(new Error(err));
          }
        });
      });

      req.on("error", (err) => {
        reject(new Error(err));
      });
    });
  }
}

module.exports = Coin;
