const express = require('express');
const { check, validationResult } = require('express-validator');
const ClientService = require('../../services/ClientService');
const JWTService = require('../../services/JWTService');

const router = express.Router();
const jwt = JWTService.verifyToken;

router.get(
  '/:id',
  jwt,
  [
    check('id', 'Client Id is Required').exists(),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;

    try {
        const client = await ClientService.getClientById(id);
        
        return res.status(200).json({ client });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
  }
);

module.exports = router;
