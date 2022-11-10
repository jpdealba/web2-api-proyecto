const BalanceModel = require("./model");

class BalanceController {
  getAll(req, res) {
    const Balance = new BalanceModel();
    const userId = req.params.id;
    Balance.findAll(userId).then((resp) => {
      if (resp) {
        res.send(resp);
      } else {
        res.status(404).json({ error: "Not found" });
      }
    });
  }
}

module.exports = new BalanceController();
