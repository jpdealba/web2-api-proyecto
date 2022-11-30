const database = require("../../database/database");
const BalanceModel = require("../balance/model");
const CoinModel = require("../coins/model");

class Transaction {
  async findUserTransactions(user_id) {
    try {
      const db = database();
      const collection = db.collection("transactions");
      const result = await collection.find({ user_id: user_id }).toArray();
      return result;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async findCoinTransactions(symbol) {
    try {
      const db = database();
      const collection = db.collection("transactions");
      const result = await collection
        .find({ $or: [{ symbol_from: symbol }, { symbol_to: symbol }] })
        .toArray();
      return result;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async postTransaction(data) {
    try {
      const Balance = new BalanceModel();
      const Coin = new CoinModel();
      const db = database();
      const collection = db.collection("transactions");
      const symbolFrom = data.symbol_from;
      const symbolTo = data.symbol_to;
      // Get balance de usuario de la moneda inicial
      const userBalanceCoinFrom = await Balance.findOneFromUser(
        data.user_id,
        symbolFrom
      );
      if (userBalanceCoinFrom && userBalanceCoinFrom.qty >= data.qty) {
        const coin1 = await Coin.findOne(symbolFrom);
        const coin2 = await Coin.findOne(symbolTo);
        const usdCoin1 = coin1.current_price * data.qty;
        const coin2Transaction = usdCoin1 / coin2.current_price;
        await Balance.updateCoinFromUser(data.user_id, symbolFrom, -data.qty);
        await Balance.updateCoinFromUser(
          data.user_id,
          symbolTo,
          coin2Transaction
        );
        return await collection.insertOne({
          user_id: data.user_id,
          timestamp: new Date().toISOString(),
          symbol_from: symbolFrom,
          symbol_to: symbolTo,
          qty_from: data.qty,
          qty_to: coin2Transaction,
          price_from: coin1.current_price,
          price_to: coin2.current_price,
        });
      } else {
        return null;
      }
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

module.exports = Transaction;
