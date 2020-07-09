const express = require('express');
const router = express.Router();

const authorize = require('../middlewares/authorize');
const { validateLogin, login } = require('./handlers/login');
const { inviteSignin } = require('./handlers/inviteSignin');
const roles = require('../constants/roles');

// router.get('/signin-invited/:token', );
// router.post('/signin', );
// router.post('/forgot-password', );
// router.post('/refresh-token', );
// router.post('/revoke-token', );

router.post('/login', validateLogin, login);
router.post('/invite-signin', authorize(roles.Admin), inviteSignin);

module.exports = router;
