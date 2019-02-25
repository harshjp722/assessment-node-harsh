
import users from '../models/user.model';

// Authenticate requests
const authenticate = (req, res, next) => {
  let token = req.header('Authorization').split(" ")[1];

  users.find({ token: token, isActive: true}).then(user => {
    if (user == null || user.length === 0) {
      return res.status(401).send('Unauthorized access');
    }
    // Add user to request
    req.user = user[0];
    req.token = token;
    console.log('Logged in user ', req.user);
    next();
  }).catch((e) => {
    return res.status(401).send('Unauthorized access');
  });
};

module.exports = { authenticate };
