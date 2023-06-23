const express = require('express');
const { check, validationResult } = require('express-validator');
const ClientService = require('../../services/ClientService');
const JWTService = require('../../services/JWTService');

const router = express.Router();
const jwt = JWTService.verifyToken;

router.post(
  '/add-new',
  jwt,
  [
    check('name', 'Name is Required').exists(),
    check('category', 'category is Required').exists(),
    check('representative', 'representative is Required').exists(),
    check('address', 'address is Required').exists(),
    check('email', 'email is Required').exists(),
    check('phone', 'phone is Required').exists(),
    check('bankAccount', 'bankAccount is Required').exists(),
],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
        const client = await ClientService.save(req.body);
        return res.status(200).json({ client });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
  }
);

module.exports = router;
