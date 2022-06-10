const jwt = require('jsonwebtoken');
const { version } = require('../package.json');


exports.index = function (req, res) {

  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  // if (token == null) return res.sendStatus(401) // uncomment to block unauthenticated user

  jwt.verify(token, process.env.PROJECT_JWT_SECRET, (err, user) => {
    // if (err) return res.sendStatus(403) // uncomment to block unauthorized user

    req.user = user
    res.json({ version, date_time: new Date(), user });
  });

};
