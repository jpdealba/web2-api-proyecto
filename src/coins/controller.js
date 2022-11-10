const CoinModel = require("./model");

class CoinsController {
  getAll(req, res) {
    const Coin = new CoinModel();
    Coin.findAll().then((resp) => {
      if (resp) {
        res.send(resp);
      } else {
        res.status(404).json({ error: "Not found" });
      }
    });
  }

  getOne(req, res) {
    const Coin = new CoinModel();
    const coinId = req.params.id;
    Coin.findOne(coinId).then((resp) => {
      if (resp) {
        res.send(resp);
      } else {
        res.status(404).json({ error: "Not found" });
      }
    });
  }
}

module.exports = new CoinsController();
