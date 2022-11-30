const database = require("../../database/database");
var ObjectId = require("mongodb").ObjectId;
const BalanceModel = require("../balance/model");
class User {
  async findOne(user_id) {
    try {
      const db = database();
      const collection = db.collection("users");
      const result = await collection.findOne({ _id: user_id });
      if (result && result.suspended) {
        return { message: "account suspended" };
      } else return result;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async createOne(data) {
    try {
      const db = database();
      const collection = db.collection("users");

      if (data.id) {
        const user = await this.findOne(data.id);
        if (user) {
          console.log(user);
        } else {
          await collection.insertOne({
            roles: ["user"],
            _id: data.id,
            name: data.name,
            username: data.name,
            photo_url: data.photoUrl,
            email: data.email,
            password: null,
            method: "google",
          });
          const balance = new BalanceModel();
          balance.updateCoinFromUser(data.id, "usdt", 10000);
        }
        return await this.findOne(data.id);
      } else {
        return await collection.insertOne({ ...data, roles: ["user"] });
      }
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async updateOne(data, userId) {
    try {
      const db = database();
      const collection = db.collection("users");
      const id = new ObjectId(userId);
      return await collection.updateOne({ _id: id }, { $set: data });
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async suspendOne(user_id) {
    try {
      const db = database();
      const collection = db.collection("users");
      const id = new ObjectId(user_id);
      return await collection.updateOne(
        { _id: id },
        { $set: { suspended: true } }
      );
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async findImage(user_id) {}
}

module.exports = User;
