const LoginModel = require("./model");

class LoginController {
  postOne(req, res) {
    const Login = new LoginModel();
    Login.createOne(req.body).then((resp) => {
      if (resp) {
        res.send(resp);
      } else {
        res.status(401);
      }
    });
  }
  getOne(req, res) {
    const Login = new LoginModel();
    const token = req.params.token;
    Login.verifyOne(token).then((resp) => {
      if (resp) {
        res.send(resp);
      } else {
        res.status(401);
      }
    });
  }
}

module.exports = new LoginController();
