const express = require('express');
const { check, validationResult } = require('express-validator');
const UserService = require('../../services/UserService');

const router = express.Router();

router.post(
  '/register',
  [
    check('name', 'Name is required').exists(),
    check('email', 'Email is required').exists().isEmail(),
    check('phone', 'Phone is  required').exists(),
    check('password', 'Password is required').isLength({ min: 6 }),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password, phone } = req.body;
    const mail = email.toLowerCase();
    
    try {
      const checkMail = await UserService.getUserByEmail(mail);
      if (checkMail) return res.status(400).json({ status: 'Email Already Exist' });

      const user = await UserService.create({
        name,
        email: mail,
        password,
        phone,
      });

      return res.status(200).json({ jwt_token: user.createToken() });
    } catch (e) {
      return res.status(500).json({ error: e });
    }
  }
);

module.exports = router;
