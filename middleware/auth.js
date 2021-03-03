const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  //  Pegar o token do header
  const token = req.header('x-auth-token');

  // Verificar se not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verificar token ( Decodifica, armazena em uma variavel e manda pro request )
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
