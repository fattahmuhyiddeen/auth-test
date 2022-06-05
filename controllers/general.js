const { version } = require('../package.json');

exports.index = function (req, res) {
  res.json({ version, date_time: new Date() });
};
