import express from 'express';
import userService from '../services/userService';

let router = express.Router();

// User Registration Route
router.post('/userRegister', (req, res) => {
  console.log('Register user api called with request - ', req.body);
  userService.Register(req, res);
});

// User Login Route
router.post('/userLogin', (req, res) => {
  console.log('Login user api called with request - ', req.body);
  userService.Login(req, res);
});

// User Logout Route
router.post('/userLogout', (req, res) => {
  console.log('Logout user api called with request - ', req.body);
  userService.Logout(req, res);
});

module.exports = router;