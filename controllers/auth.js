const passport = require('passport');
const jwt = require('jsonwebtoken');

exports.login = (req, res, next)  => {
  passport.authenticate('login', async (err, user) => {
    try {
      if (err || !user) {
        res.status(401).json({ error: err || 'Wrong email or password' });
        return;
      }
      req.login(user, { session: false }, async (error) => {
        if (error) next(error);
        if (user.reset_token) user.update({ reset_token: null });
        const jwt_content = { uid: user.id, email: user.email };
        const token = jwt.sign(jwt_content, process.env.PROJECT_JWT_SECRET, { expiresIn: 86400 });
        res.json({ token });
      });
    } catch (e) {
      res.status(500).json({ error: e });
      // next(error);
    }
  })(req, res, next);
}

exports.register = (req, res, next) => {
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
