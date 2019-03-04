import users from '../models/user.model';
import jwt from 'jsonwebtoken';
import config from '../config';

// Register User
const userRegister = (req, res) => {
  if (req.body == null) {
    return res.status(403).send('Bad Request');
  }
  // Map request
  let data = new users({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password
  });

  // Register User
  data.save().then(doc => {
    if (!doc || doc.length === 0) {
      return res.status(500).send('Internal server error');
    }
    return res.status(200).json(doc);
  }).catch(err => {
    res.status(500).json(err);
  });
}

// Login user
const userLogin = (req, res) => {
  if (req.body == null) {
    return res.status(403).send('Bad Request');
  }

  // Map request
  let loginData = {
    email: req.body.email,
    password: req.body.password,
    isActive: true
  };

  // Login user
  users.find(loginData).then(doc => {
    if (!doc || doc.length === 0) {
      return res.status(401).send('Internal server error');
    }

    // Generate auth-token
    let token = jwt.sign({
      userId: doc[0]._id,
      email: doc[0].email
    }, config.secret, {
        expiresIn: config.tokenLife.toString()
      }).toString();

    // Add token to user collection
    doc[0].token = token;
    console.log(doc[0]);
    users.findByIdAndUpdate(doc[0]._id, doc[0]).then(doc => {
      console.log(doc);
    });    
    // doc.token = users.generateAuthToken();
    return res.status(200).json(doc[0]);
  }).catch(err => {
    res.status(401).json(err);
  });

}

// Logout user
const userLogout = (req, res) => {
  let token = req.header('Authorization');
  let tokenArray = token.split(" ");

  users.findOneAndUpdate({ token: tokenArray[1] }, { token: null }).then(doc => {
    if (!doc || doc.length === 0) {
      return res.status(500).send('Internal server error');
    }
    return res.status(200).json('User logged out successfully');
  }).catch(err => {
    res.status(500).json(err);
  });
}

export {
  userLogin,
  userRegister,
  userLogout
}
