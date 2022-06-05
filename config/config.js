require('dotenv').config();

const config = {
  dialect: process.env.DATABASE_ENGINE,
};

if (config.dialect === 'postgres') {
  config.url = process.env.DATABASE_URL;
  config.dialectOptions = {
    ssl: { require: true, rejectUnauthorized: false },
  };
  config.ssl = true;
} else if (config.dialect === 'mysql') {
  config.host = process.env.DATABASE_HOST;
  config.username = process.env.DATABASE_USERNAME;
  config.password = process.env.DATABASE_PASSWORD;
  config.database = process.env.DATABASE_NAME;
  config.logging = process.env.APPLICATION_DEBUG === 'true';
  config.dialectOptions = {
    decimalNumbers: true,
  };
}

module.exports = config;
