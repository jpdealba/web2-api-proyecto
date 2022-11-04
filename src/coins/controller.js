const CoinModel = require("./model");

class CoinsController {
  getAll(req, res) {
    const Coin = new CoinModel();
    Coin.findAll().then((resp) => {
      res.send(resp);
    });
  }

  getOne(req, res) {
    const Coin = new CoinModel();
    const coinId = req.params.id;
    Coin.findOne(coinId).then((resp) => {
      res.send(resp);
    });
  }
}

module.exports = new CoinsController();
