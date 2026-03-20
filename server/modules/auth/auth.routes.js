const { body, validationResult } = require('express-validator');
const router = require('express').Router();
const { registerUser, loginUser } = require('./auth.controller');

// validate middleware
const validateRegister = [
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  body('name').notEmpty()
];

router.post('/register', validateRegister, registerUser);
router.post('/login', loginUser);

module.exports = router;