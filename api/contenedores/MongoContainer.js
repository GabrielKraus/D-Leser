import mongoose from "mongoose";

class MongoContainer {
  constructor({ collection, schema }) {
    this.collection = mongoose.model(collection, schema);
  }

  async getAll() {
    try {
      const response = await this.collection.find({});
      return response;
    } catch (error) {
      return error;
    }
  }

  async getById(id) {
    try {
      const response = await this.collection.findById(id);
      return response;
    } catch (error) {
      return error;
    }
  }

  async save(element) {
    try {
      const response = await this.collection.create(element);

      return response;
    } catch (error) {
      return error;
    }
  }

  async updateById(id, newData) {
    try {
      const response = await this.collection.findByIdAndUpdate(id, newData, {
        new: true,
      });
      return response;
    } catch (error) {
      return error;
    }
  }

  async deleteById(id) {
    try {
      const response = await this.collection.findByIdAndDelete(id);
      return response;
    } catch (error) {
      return error;
    }
  }
}

export { MongoContainer };
