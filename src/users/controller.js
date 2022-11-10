const UserModel = require("./model");

class UserController {
  postOne(req, res) {
    const User = new UserModel();
    User.createOne(req.body).then((resp) => {
      if (resp.insertedId) {
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
        res.send(resp);
      } else {
        res.status(404).json({ error: "Not found" });
      }
    });
  }
}

module.exports = new UserController();
