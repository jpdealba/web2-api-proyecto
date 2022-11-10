const TransactionModel = require("./model");

class CoinsController {
  getUserTransactions(req, res) {
    const Transaction = new TransactionModel();
    const userId = req.params.user_id;
    Transaction.findUserTransactions(userId).then((resp) => {
      if (resp) {
        res.send(resp);
      } else {
        res.status(404).json({ error: "Not found" });
      }
    });
  }

  getCoinTransactions(req, res) {
    const Transaction = new TransactionModel();
    const symbol = req.params.coin_id;
    Transaction.findCoinTransactions(symbol).then((resp) => {
      if (resp.matchedCount == 1) {
        res.send(resp);
      } else {
        res.status(404).json({ error: "Not found" });
      }
    });
  }

  postTransaction(req, res) {
    const Transaction = new TransactionModel();
    const transactionData = req.body;
    Transaction.postTransaction(transactionData).then((resp) => {
      if (resp.insertedId) {
        res.send(resp.insertedId).status(201);
      } else {
        res.status(500).json({ error: "Server Error" });
      }
    });
  }
}

module.exports = new CoinsController();
