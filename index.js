require('dotenv').config();
require('./helper/check_env');
const express = require('express');
const middleware = require('./middleware');

const app = express();
const PORT = process.env.PORT || 3001;
app.set('port', PORT);
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

app.use(cors());
const routes = require('./routes');

// for parsing application/json
app.use(bodyParser.json());
// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: false }));
// for parsing multipart/form-data

app.use(middleware.modifyResponseBody);
app.use(express.static('public'));

require('./passport-loader');

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

app.use(require('morgan')('combined'));

app.use('/', routes);

app.listen(PORT, () => console.log(`Listening at ${PORT}`));

module.exports = app;
