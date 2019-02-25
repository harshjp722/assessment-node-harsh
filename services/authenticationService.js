
import { users } from '../models/user.model';

// Authenticate requests
const authenticate = (req, res, next) => {
  let token = req.header('x-auth');
  console.log('Token ', token);

  users.findByToken(token).then(user => {
    if (!user) {
      return res.status(401).send('Unauthorized access');
    }
    // Add user to request
    req.user = user;
    req.token = token;
    console.log('Logged in user ', req.user);
    next();
  }).catch((e) => {
    return res.status(401).send('Unauthorized access');
  });
};

module.exports = { authenticate };
