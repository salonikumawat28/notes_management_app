const jwt = require('jsonwebtoken');
const config = require('../configs/config');
const { UnauthorizedError } = require('../errors/errors');

const authenticator = (req, res, next) => {
    // Check if request has authorization header.
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    return next(new UnauthorizedError('No token provided'));
  }

  // Check if non-empty bearer token is provided.
  const [bearer, token] = authorizationHeader.split(' ');
  if (bearer !== 'Bearer' || !token) {
    return next(new UnauthorizedError('Invalid token format'));
  }

  try {
    // Verify and decode the JWT token
    const decodedToken = jwt.verify(token, config.secretKey);

    // Attach the decoded token to the request for further use if needed
    req.authenticatedUserId = decodedToken.userId;

    // Continue with the next middleware or route handler
    next();
  } catch (error) {
    return next(new UnauthorizedError('Invalid token'));
  }
};

module.exports = authenticator;
