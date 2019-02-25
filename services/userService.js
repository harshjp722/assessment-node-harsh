import users from '../models/user.model';

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
  let loginData = new users({
    email: req.body.email,
    password: req.body.password
  });

  // Login user
  users.find(loginData).then(doc => {
    if (!doc || doc.length === 0) {
      return res.status(401).send('Internal server error');
    }
    
    doc.token = users.generateAuthToken();
    return res.status(200).json(doc);
  }).catch(err => {
    res.status(401).json(err);
  });
  
}

// Logout user
const userLogout = (req, res) => {
  let token = req.header('x-auth');

  users.findOneAndUpdate({ token: token}, { token: null }).then(doc => {
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
