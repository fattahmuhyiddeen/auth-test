const fs = require('fs');
const path = require('path');

const basename = path.basename(__filename);
const controllers = {};
fs.readdirSync(__dirname)
  .filter(file => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
  .forEach(file => {
    const this_module = path.parse(file).name;
    // slint-disable-next-line import/no-dynamic-require, global-require
    controllers[this_module] = require(`./${this_module}`);
  });
module.exports = controllers;
