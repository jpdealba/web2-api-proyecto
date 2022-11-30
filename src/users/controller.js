const path = require("path");
const UserModel = require("./model");
const BalanceModel = require("../balance/model");
class UserController {
  postOne(req, res) {
    const User = new UserModel();
    User.createOne(req.body).then(async (resp) => {
      if (resp.insertedId) {
        const balance = new BalanceModel();
        balance.updateCoinFromUser(resp.insertedId.str, "usdt", 10000);
        res.send(resp.insertedId).status(201);
      } else {
        res.status(500).json({ error: "Server Error" });
      }
    });
  }

  getOne(req, res) {
    const User = new UserModel();
    const userId = req.params.id;
    User.findOne(userId).then((resp) => {
      if (resp) {
        res.send(resp);
      } else {
        res.status(404).json({ error: "Not found" });
      }
    });
  }

  putOne(req, res) {
    const User = new UserModel();
    const data = req.body;
    const userId = req.params.id;
    User.updateOne(data, userId).then((resp) => {
      if (resp.matchedCount == 1) {
        res.send(resp);
      } else {
        res.status(404).json({ error: "Not found" });
      }
    });
  }

  deleteOne(req, res) {
    const User = new UserModel();
    const userId = req.params.id;
    User.suspendOne(userId).then((resp) => {
      if (resp.matchedCount == 1) {
        res.status(204).json({ response: "Successfully updated" });
      } else {
        res.status(404).json({ error: "Not found" });
      }
    });
  }

  saveOne(req, res) {
    res.send({ status: "uploaded" });
  }

  getImage(req, res) {
    const id = req.params.user_id;
    res.sendFile(path.join(__dirname, "../..", `public/uploads/${id}.png`));
  }
}

module.exports = new UserController();
