const jwt = require('jsonwebtoken');

// eslint-disable-next-line consistent-return
function checkAuthorization(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }

  const token = authorization.replace('Bearer ', '');

  // eslint-disable-next-line consistent-return
  jwt.verify(token, 'top-secret-key', (err, data) => {
    if (err) {
      return res
        .status(401)
        .send({ message: 'Необходима авторизация' });
    }
    req.user = data;
    next();
  });
}

module.exports = checkAuthorization;