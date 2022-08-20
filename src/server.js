const http = require('http');
const {UserController} = require('./controllers/userController');
const user = require('./user');

const userController = new UserController();

const server = http.createServer(async (request, response) => {
  if (request.url.startsWith('/users')) {
    if (request.method === 'POST') {
      return userController.post(request, response);
    }

    if (request.method === 'GET') {
      return userController.get(request, response);
    }

    if (request.method === 'PUT') {
      return userController.put(request, response);
    }
  }
});

server.listen(3000, () => console.log('Server is running'));
