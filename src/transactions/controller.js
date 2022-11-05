const TransactionModel = require("./model");

class CoinsController {
  getUserTransactions(req, res) {
    const Transaction = new TransactionModel();
    const userId = req.params.user_id;
    Transaction.findUserTransactions(userId).then((resp) => {
      res.send(resp);
    });
  }

  getCoinTransactions(req, res) {
    const Transaction = new TransactionModel();
    const symbol = req.params.coin_id;
    Transaction.findCoinTransactions(symbol).then((resp) => {
      res.send(resp);
    });
  }

  postTransaction(req, res) {
    const Transaction = new TransactionModel();
    const transactionData = req.body;
    Transaction.postTransaction(transactionData).then((resp) => {
      res.send(resp);
    });
  }
}

module.exports = new CoinsController();
