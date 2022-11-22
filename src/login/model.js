const database = require("../../database/database");
const jwt = require("jsonwebtoken");

class Login {
  async createOne(data) {
    const db = database();
    const collection = db.collection("users");
    const resp = await collection.findOne({
      email: data.email,
      password: data.password,
    });

    if (resp && !resp.suspended) {
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
  }

  async verifyOne(token) {
    if (!token) return false;
    const db = database();
    const collection = db.collection("users");
    try {
      const decoded = jwt.decode(token, process.env.TOKEN_SECRET);
      const resp = await collection.findOne({
        email: decoded.email,
        password: decoded.password,
      });
      return jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) {
          return false;
        } else if (!resp.suspeded) {
          return { ...resp, token: token };
        } else {
          return false;
        }
      });
    } catch (err) {
      return false;
    }
  }
}

module.exports = Login;