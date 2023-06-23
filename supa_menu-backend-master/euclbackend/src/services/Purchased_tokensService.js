const ClientRepo = require('../repositories/ClientRepo');

class ClientService {
    static async save(data) {
        return ClientRepo.save(data);
    }

    static async getClientById(id) {
        return ClientRepo.findById(id);
    }

    static async getAllClients() {
        return ClientRepo.findAll();
    }

    static updateClientById(id, data) {
        return ClientRepo.updateById(id, data);
    }

    static async deleteClientById(id) {
        return ClientRepo.deleteById(id);
    }
}

module.exports = ClientService;
