/* eslint-disable consistent-return */
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const bcrypt = require('bcrypt');
const UserModel = require('./models').User;

passport.use('signup', new LocalStrategy({ usernameField: 'email', passwordField: 'password', passReqToCallback: true },
  async (req, uname, pass, done) => {
    const {
      name, email, password,
    } = req.body;
    UserModel.findOne({ where: { email } }).then((user) => {
      if (user) return done(null, false, { message: `"${email}" is already taken by other user` });
      const data = {
        name, email, password: bcrypt.hashSync(password, bcrypt.genSaltSync()),
      };
      UserModel.create(data).then((newUser) => {
        if (!newUser) return done(null, false);
        if (newUser) return done(null, true);
        return null;
      }).catch((error) => done(null, false, { error }));
    }).catch((error) => done(null, false, { error }));
  }));

// Login passport
passport.use('login', new LocalStrategy({ usernameField: 'email', passwordField: 'password' },
  async (email, password, done) => {
    try {
      const user = await UserModel.findOne({ where: { email } });
      if (!user) return done(null, false, { message: 'User not found' });
      const validate = await bcrypt.compare(password, user.password);
      if (!validate) return done(null, false, { message: 'Wrong Password' });
      return done(null, user, { message: 'Logged in Successfully' });
    } catch (error) {
      return done(error, false, { message: error });
    }
  }));
