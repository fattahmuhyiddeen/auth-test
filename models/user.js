const { Model } = require('sequelize');
const name = require('path').basename(__filename, '.js');

module.exports = (sequelize, DataTypes) => {
  class M extends Model {}
  M.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.TEXT,
    },
    {
      indexes: [{ unique: true, fields: ['email'] }],
      sequelize,
      modelName: name[0].toUpperCase() + name.slice(1),
    }
  );
  return M;
};
