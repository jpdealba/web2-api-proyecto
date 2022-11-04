const database = require("../../database/database");

class User {
  async findOne(user_id) {
    const db = database();
    const collection = db.collection("users");
    const result = await collection.findOne({ _id: user_id });
    return result;
  }

  async createOne(data) {
    const db = database();
    const collection = db.collection("users");
    await collection.insertOne(data);
    return data;
  }

  async updateOne(data, userId) {
    const db = database();
    const collection = db.collection("users");
    await collection.updateOne({ _id: userId }, { $set: data });
    const newUser = await this.findOne(userId);
    return newUser;
  }

  async suspendOne(user_id) {
    const db = database();
    const collection = db.collection("users");
    await collection.updateOne({ _id: user_id }, { $set: { suspended: true } });
    return {};
  }
}

module.exports = User;
