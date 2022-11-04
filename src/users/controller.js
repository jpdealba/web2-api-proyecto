const UserModel = require("./model");

class UserController {
  postOne(req, res) {
    const User = new UserModel();
    User.createOne(req.body).then((resp) => {
      res.send(resp);
    });
  }

  getOne(req, res) {
    const User = new UserModel();
    const userId = req.params.id;
    User.findOne(userId).then((resp) => {
      res.send(resp);
    });
  }

  putOne(req, res) {
    const User = new UserModel();
    const data = req.body;
    const userId = req.params.id;
    User.updateOne(data, userId).then((resp) => {
      res.send(resp);
    });
  }

  deleteOne(req, res) {
    const User = new UserModel();
    const userId = req.params.id;
    User.suspendOne(userId).then((resp) => {
      res.send(resp);
    });
  }
}

module.exports = new UserController();
