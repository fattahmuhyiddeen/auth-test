const passport = require('passport');
const jwt = require('jsonwebtoken');
const randtoken = require('rand-token');
// const m = require('../models');

const refreshTokens = {};

function login(req, res, next) {
  passport.authenticate('login', async (err, user) => {
    try {
      if (err || !user) {
        res.status(401).json({ error: err || 'Wrong email or password' });
        return;
      }
      req.login(user, { session: false }, async (error) => {
        if (error) next(error);
        if (user.reset_token) user.update({ reset_token: null });
        const jwt_content = { uid: user.id, email: user.email, role: 'admin' };
        // Sign the JWT token and populate the payload with the user email and id
        // Send back the token to the user
        const token = jwt.sign(jwt_content, process.env.PROJECT_JWT_SECRET, { expiresIn: 86400 });
        const refreshToken = randtoken.uid(256);
        refreshTokens[refreshToken] = user.email;
        res.json({ token, refreshToken });
      });
    } catch (e) {
      res.status(500).json({ error: e });
      // next(error);
    }
  })(req, res, next);
}

function signup(req, res, next) {
  passport.authenticate('signup', { session: false }, async (err, user, info) => {
    try {
      if (err || !user) {
        console.log('err', { err });
        res.status(401).json({ error: info.message });
      } else {
        console.log({ user });
        res.status(201).json({ user });
      }
    } catch (error) {
      console.log('error', { error });
      res.status(500).json({ error });
    }
  })(req, res, next);
}

module.exports = {
  signup, login,
};