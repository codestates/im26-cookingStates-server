const dotenv = require("dotenv");
dotenv.config();

const config = {
  development: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME + "_development",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  test: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME + "_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME + "_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  deploy: {
    host: process.env.DATABASE_RDS_HOST,
    username: process.env.DATABASE_RDS_USER,
    password: process.env.DATABASE_RDS_PASSWORD,
    database: process.env.DATABASE_NAME + "_development",
    dialect: "mysql",
    logging: false,
    port: process.env.DATABASE_RDS_PORT,
  },
};

module.exports = config;
