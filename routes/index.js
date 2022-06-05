const express = require('express');

const router = express.Router();
const c = require('../controllers');
router.get('/', c.general.index);
router.post('/login', c.auth.login);
router.post('/register', c.auth.register);

module.exports = router;
