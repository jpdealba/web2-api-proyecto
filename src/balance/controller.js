const BalanceModel = require("./model");

class BalanceController {
  getAll(req, res) {
    const Balance = new BalanceModel();
    const userId = req.params.id;
    Balance.findAll(userId).then((resp) => {
      res.send(resp);
    });
  }
}

module.exports = new BalanceController();
