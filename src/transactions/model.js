const database = require("../../database/database");

class Transaction {
  async finUserTransactions(user_id) {
    const db = database();
    const collection = db.collection("transactions");
    // const result = await collection.find({}).toArray();
    return {};
  }

  async getCoinTransactions(coind_id) {
    const db = database();
    const collection = db.collection("transactions");
    // const result = await collection.findOne({ _id: id });
    return {};
  }

  async postTransaction(data) {
    const db = database();
    const collection = db.collection("transactions");
    // const result = await collection.findOne({ _id: id });
    return {};
  }
}

module.exports = Transaction;
