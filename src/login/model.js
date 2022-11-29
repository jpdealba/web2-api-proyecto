const database = require("../../database/database");
const jwt = require("jsonwebtoken");

class Login {
  async createOne(data) {
    try {
      const db = database();
      const collection = db.collection("users");
      const resp = await collection.findOne({
        email: data.email,
        password: data.password,
      });
      if (resp) {
        return {
          ...resp,
          token: jwt.sign(
            { email: data.email, password: data.password },
            process.env.TOKEN_SECRET
          ),
        };
      } else {
        return null;
      }
    } catch (err) {
      return null;
    }
  }

  async verifyOne(token) {
    if (!token) return false;

    try {
      const db = database();
      const collection = db.collection("users");
      const decoded = jwt.decode(token, process.env.TOKEN_SECRET);
      const resp = await collection.findOne({
        email: decoded.email,
        password: decoded.password,
      });
      return jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) {
          return false;
        } else {
          return { ...resp, token: token };
        }
      });
    } catch (err) {
      return false;
    }
  }
}

module.exports = Login;
