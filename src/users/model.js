const database = require("../../database/database");
var ObjectId = require("mongodb").ObjectId;
class User {
  async findOne(user_id) {
    try {
      const db = database();
      const collection = db.collection("users");
      const id = new ObjectId(user_id);
      const result = await collection.findOne({ _id: id });
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

      return await collection.insertOne({ ...data, roles: ["user"] });
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
