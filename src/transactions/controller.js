const TransactionModel = require("./model");

class CoinsController {
  getUserTransactions(req, res) {
    const Transaction = new TransactionModel();
    const userId = req.params.id;
    Transaction.finUserTransactions(userId).then((resp) => {
      res.send(reresps);
    });
  }

  getCoinTransactions(req, res) {
    const Transaction = new TransactionModel();
    const coinId = req.params.id;
    Transaction.findCoinTransactions(coinId).then((resp) => {
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
