const express = require('express');
const ClientService = require('../../services/ClientService');
const JWTService = require('../../services/JWTService');

const router = express.Router();
const jwt = JWTService.verifyToken;

router.get('/', jwt, async (req, res, next) => {
    try {
        const clients = await ClientService.getAllClients();

        return res.status(200).json({ clients });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
  }
);

module.exports = router;
