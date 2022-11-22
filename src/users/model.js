const database = require("../../database/database");

class User {
  async findOne(user_id) {
    const db = database();
    const collection = db.collection("users");
    const result = await collection.findOne({ _id: user_id });
    if (result && result.suspended) {
      return { message: "account suspended" };
    } else return result;
  }

  async createOne(data) {
    const db = database();
    const collection = db.collection("users");
    return await collection.insertOne({ ...data, roles: ["user"] });
  }

  async updateOne(data, userId) {
    const db = database();
    const collection = db.collection("users");
    return await collection.updateOne({ _id: userId }, { $set: data });
  }

  async suspendOne(user_id) {
    const db = database();
    const collection = db.collection("users");
    return await collection.updateOne(
      { _id: user_id },
      { $set: { suspended: true } }
    );
  }
}

module.exports = User;
