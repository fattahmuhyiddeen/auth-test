const { Model } = require('sequelize');
const name = require('path').basename(__filename, '.js');

module.exports = (sequelize, DataTypes) => {
  class M extends Model {}
  M.init(
    {
      salutation: DataTypes.STRING,
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      pincode: DataTypes.STRING,
      level: DataTypes.INTEGER,
      language: DataTypes.STRING,
      image: DataTypes.STRING,
      isCompany: DataTypes.INTEGER,
      bankAccountNumber: DataTypes.STRING,
      bankAccountName: DataTypes.STRING,
      bankName: DataTypes.STRING,
      address: DataTypes.STRING,
      lat: DataTypes.FLOAT,
      lng: DataTypes.FLOAT,
    },
    {
      indexes: [{ unique: true, fields: ['email'] }],
      sequelize,
      paranoid: true,
      modelName: name[0].toUpperCase() + name.slice(1),
    }
  );
  return M;
};
