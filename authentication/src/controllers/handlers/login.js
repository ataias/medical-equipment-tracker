const path = require('path');
const Boom = require('@hapi/boom');
const bcrypt = require('bcryptjs');
const validator = require('@medical-equipment-tracker/validator');

const envFile =
  process.env.NODE_ENV === 'development'
    ? '.env.development.local'
    : '.env.production.local';
require('dotenv').config({
  path: path.join(__dirname, '../../../..', envFile),
});

const validate = require('../../middlewares/validate');
const generateJwtToken = require('../../services/generateJwtToken');
const generateRefreshToken = require('../../services/generateRefreshToken');
const models = require('../../models');

module.exports = {
  validateLogin: async (req, res, next) => {
    await validate(req, next, validator.loginSchema);
  },

  login: async (req, res, next) => {
    const { email, password } = req.body;

    const user = await models.User.findOne({ where: { email } });

    if (!user) {
      return next(Boom.unauthorized('Invalid email or password'));
    }

    const match = await bcrypt.compare(password, user.passwordHash);

    if (!match) {
      return next(Boom.unauthorized('Invalid email or password'));
    }

    const jwtToken = generateJwtToken(user);
    const jwtTokenExpiry = new Date(
      new Date().getTime() +
        process.env.AUTHENTICATION_JWT_TOKEN_EXPIRES * 60 * 1000
    );

    const refreshToken = await generateRefreshToken(user, req.ip);

    if (!refreshToken) {
      return next(Boom.badImplementation());
    }

    res.json({
      jwtToken,
      jwtTokenExpiry,
      refreshToken,
    });
  },
};
