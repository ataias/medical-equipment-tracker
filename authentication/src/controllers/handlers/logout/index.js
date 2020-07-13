/* eslint no-unused-vars: 0 */
const models = require('../../../models');
const { REFRESH_TOKEN_COOKIE } = require('../../../constants/cookies');

const revokeAccess = async (req, res) => {
  const refreshToken = req.cookies[REFRESH_TOKEN_COOKIE];

  if (refreshToken) {
    const revokedToken = {
      revokedAt: new Date(),
      revokedByIp: req.ip,
    };

    try {
      await models.RefreshToken.update(revokedToken, {
        where: { token: refreshToken },
      });
    } catch (error) {
      console.log('logout error');
      console.log(error);
    }
  }

  res.cookie(REFRESH_TOKEN_COOKIE, '', {
    httpOnly: true,
    expires: new Date(0),
  });
};

module.exports = {
  revokeAccess,
  
  logout: async (req, res, next) => {
    await revokeAccess(req, res);
    
    res.json({ result: 'Logged out' });
  },
};