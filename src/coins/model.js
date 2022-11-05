const database = require("../../database/database");

class Coin {
  async findAll() {
    const db = database();
    const collection = db.collection("coins");
    const result = await collection.find({}).toArray();
    return result;
  }

  async findOne(id) {
    const db = database();
    const collection = db.collection("coins");
    const result = await collection.findOne({ symbol: id });
    return result;
  }
}

module.exports = Coin;
