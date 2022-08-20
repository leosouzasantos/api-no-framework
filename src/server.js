const http = require('http');
const user = require('./user');

const server = http.createServer((request, response) => {
  if (request.url.startsWith('/users')) {
    if (request.method === 'POST') {
      request.on('data', (data) => {
        const body = JSON.parse(data);
        const result = user.create(body);
        return response.end(JSON.stringify(result));
      });
    }

    if (request.method === 'GET') {
      const result = user.findAll();
      return response.end(JSON.stringify(result));
    }

    if (request.method === 'PUT') {
      const paramsSplit = request.url.split('/');
      const id = paramsSplit[2];

      request.on('data', (data) => {
        const body = JSON.parse(data);
        try {
          user.update(body, id);
        } catch (err) {
          return response.end(JSON.stringify({message: err.message}));
        }

        return response.end(JSON.stringify('Usuario alterado com sucesso.'));
      });
    }
  }
});

server.listen(3000, () => console.log('Server is running'));
