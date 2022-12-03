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
  async getRequest() {
    const url =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&sparkline=false";
    const res = await axios.get(url);
    return res;
  }
}

module.exports = Coin;
