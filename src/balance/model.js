const database = require("../../database/database");

class Balance {
  async findAll(id) {
    const db = database();
    const collection = db.collection("balance");
    const result = await collection.find({ user_id: id }).toArray();
    return result;
  }
  async findOneFromUser(userId, symbol) {
    const db = database();
    const collection = db.collection("balance");
    const result = await collection.findOne({
      user_id: userId,
      symbol: symbol,
    });
    return result;
  }
  async updateCoinFromUser(userId, symbol, qty) {
    const db = database();
    const collection = db.collection("balance");
    const result = await collection.findOne({
      user_id: userId,
      symbol: symbol,
    });

    if (result) {
      return await collection.updateOne(
        { user_id: userId, symbol: symbol },
        { $set: { qty: result.qty + qty } }
      );
    } else {
      return await collection.insertOne({
        user_id: userId,
        qty: qty,
        symbol: symbol,
      });
    }
  }
}

module.exports = Balance;
