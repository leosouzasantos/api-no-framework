const http = require('http');
const user = require('./user');

const server = http.createServer(async (request, response) => {
  if (request.url.startsWith('/users')) {
    if (request.method === 'POST') {
      request.on('data', async (data) => {
        const body = JSON.parse(data);
        const result = await user.create(body);
        return response.end(JSON.stringify(result));
      });
    }

    if (request.method === 'GET') {
      const result = await user.findAll();
      return response.end(JSON.stringify(result));
    }

    if (request.method === 'PUT') {
      const paramsSplit = request.url.split('/');
      const id = paramsSplit[2];

      request.on('data', async (data) => {
        const body = JSON.parse(data);

        try {
          await user.update(body, id);
          return response.end(
            JSON.stringify({message: 'Usuario alterado com sucesso!'})
          );
        } catch (err) {
          return response.end(JSON.stringify({message: err.message}));
        }
      });
    }
  }
});

server.listen(3000, () => console.log('Server is running'));
