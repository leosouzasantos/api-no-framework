const dotenv = require('dotenv');
const http = require('http');
const {randomUUID} = require('crypto');
const {Client} = require('pg');

dotenv.config();
let users = [];

const client = new Client({
  user: process.env.ADMIN,
  host: process.env.HOST,
  database: process.env.DATA,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});

client.connect();
client.query('SELECT NOW()', (err, res) => {
  console.log('Sucess', res);
  client.end();
});

const server = http.createServer((request, response) => {
  if (request.url.startsWith('/users')) {
    if (request.method === 'POST') {
      request.on('data', (data) => {
        const body = JSON.parse(data);
        const user = {
          ...body,
          id: randomUUID(),
        };
        users.push(user);
        return response.end(JSON.stringify(user));
      });
    }

    if (request.method === 'GET') {
      return response.end(JSON.stringify(users));
    }

    if (request.method === 'PUT') {
      const paramsSplit = request.url.split('/');
      const id = paramsSplit[2];

      request.on('data', (data) => {
        const body = JSON.parse(data);
        const userIndex = users.findIndex((user) => user.id === id);

        if (userIndex < 0) {
          response.statusCode = 404;
          return response.end(
            JSON.stringify({message: 'Usuario não encontrado!'})
          );
        }

        users[userIndex] = {
          ...body,
          id,
        };

        return response.end(JSON.stringify('Usuario alterado com sucesso.'));
      });
    }
  }
});

server.listen(3000, () => console.log('Server is runner on port 3000'));
