const { MongoClient } = require("mongodb");

class Db {
  constructor() {
    this.url = process.env.MONGODB_URL;
    this.client = new MongoClient(this.url);
  }

  async test_connection() {
    try {
      await this.client
        .connect()
        .then(console.log("DB Connection established"));
    } catch (e) {
      console.error(e);
    } finally {
      await this.client.close();
    }
  }

  async connect() {
    try {
      await this.client.connect();
    } catch (e) {
      console.error(e);
    }
  }

  async get(collName, qry = {}) {
    try {
      await this.connect();
      const collection = this.client.db().collection(collName);
      let query = collection.find(qry);
      const result = await query.toArray();
      return result;
    } catch (e) {
      console.error(e);
    } finally {
      await this.client.close();
    }
  }

  async post(collName, data) {
    try {
      await this.connect();
      const collection = this.client.db().collection(collName);
      let result = await collection.insertOne(data);
      return result;
    } catch (e) {
      console.error(e);
    } finally {
      await this.client.close();
    }
  }

  async put(collName, qry, fields) {
    try {
      await this.connect();
      const collection = this.client.db().collection(collName);
      const result = await collection.updateOne(qry, fields);
      return result;
    } catch (e) {
      console.error(e);
    } finally {
      await this.client.close();
    }
  }

  async delete(collName, qry) {
    try {
      await this.connect();
      const collection = this.client.db().collection(collName);
      const result = await collection.deleteOne(qry);
      return result;
    } catch (e) {
      console.error(e);
    } finally {
      await this.client.close();
    }
  }

}

module.exports = Db;
