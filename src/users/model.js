const database = require("../../database/database");
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
      return null;
    }
  }

  async createOne(data) {
    try {
      const db = database();
      const collection = db.collection("users");

      return await collection.insertOne({ ...data, roles: ["user"] });
    } catch (err) {
      return null;
    }
  }

  async updateOne(data, userId) {
    try {
      const db = database();
      const collection = db.collection("users");
      return await collection.updateOne({ _id: userId }, { $set: data });
    } catch (err) {
      return null;
    }
  }

  async suspendOne(user_id) {
    try {
      const db = database();
      const collection = db.collection("users");
      return await collection.updateOne(
        { _id: user_id },
        { $set: { suspended: true } }
      );
    } catch (err) {
      return null;
    }
  }

  async findImage(user_id) {}
}

module.exports = User;
