import express from 'express';
import * as userService from '../services/userService';

let router = express.Router();

// User Registration Route
router.post('/userRegister', (req, res) => {
  console.log('Register user api called with request - ', req.body);
  userService.userRegister(req, res);
});

// User Login Route
router.post('/userLogin', (req, res) => {
  console.log('Login user api called with request - ', req.body);
  userService.userLogin(req, res);
});

// User Logout Route
router.get('/userLogout', (req, res) => {
  console.log('Logout user api called with request - ', req.body);
  userService.userLogout(req, res);
});

module.exports = router;