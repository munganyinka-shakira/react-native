const ClientModel = require('../models/Client');

class ClientRepo {
    static async save(data) {
        return ClientModel.create(data);
    }

    static async findById(id) {
        return ClientModel.findById(id);
    }

    static async findByEmail(email) {
        return ClientModel.findOne({ email }).exec();
    }

    static async findAll() {
        return ClientModel.find({}).exec();
    }

    static async updateById(id, data) {
        return ClientModel.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    static async deleteById(id) {
        return ClientModel.findByIdAndDelete(id);
    }
}

module.exports = ClientRepo;
