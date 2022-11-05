const database = require("../../database/database");
const BalanceModel = require("../balance/model");
const CoinModel = require("../coins/model");

class Transaction {
  async findUserTransactions(user_id) {
    const db = database();
    const collection = db.collection("transactions");
    const result = await collection.findOne({ user_id: user_id }).toArray();
    return result;
  }

  async getCoinTransactions(coind_id) {
    const db = database();
    const collection = db.collection("transactions");
    // const result = await collection.findOne({ _id: id });
    return {};
  }

  async postTransaction(data) {
    const Balance = new BalanceModel();
    const Coin = new CoinModel();
    const db = database();
    const collection = db.collection("transactions");
    const symbolFrom = data.symbol_from.toUpperCase();
    const symbolTo = data.symbol_to.toUpperCase();
    // Get balance de usuario de la moneda inicial
    const userBalanceCoinFrom = await Balance.findOneFromUser(
      data.user_id,
      symbolFrom
    );
    if (userBalanceCoinFrom.qty >= data.qty) {
      const coin1 = await Coin.findOne(symbolFrom);
      const coin2 = await Coin.findOne(symbolTo);
      const usdCoin1 = coin1.price * data.qty;
      const coin2Transaction = usdCoin1 / coin2.price;
      await Balance.updateCoinFromUser(data.user_id, symbolFrom, -data.qty);
      await Balance.updateCoinFromUser(
        data.user_id,
        symbolTo,
        coin2Transaction
      );
      await collection.insertOne({
        user_id: data.userId,
        timestamp: new Date().toISOString(),
        symbol_from: symbolFrom,
        symbol_to: symbolTo,
        qty_from: data.qty,
        qty_to: coin2Transaction,
        price_from: coin1.price,
        price_to: coin2.price,
      });
      return { transaction: "succesfull" };
    } else {
      return { transaction: "insufficient balance" };
    }
  }
}

module.exports = Transaction;
