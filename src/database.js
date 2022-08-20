const dotenv = require('dotenv');
const {Client} = require('pg');
dotenv.config();

const client = new Client({
  user: process.env.ADMIN,
  host: process.env.HOST,
  database: process.env.DATA,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});

client.connect();

module.exports = {
  client,
};
