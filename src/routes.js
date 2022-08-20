const {UserController} = require('./controllers/userController');

const userController = new UserController();

const router = [
  {
    url: '/users',
    method: 'get',
    controller: userController.get,
  },

  {
    url: '/users/:id',
    method: 'put',
    controller: userController.put,
  },

  {
    url: '/users',
    method: 'post',
    controller: userController.post,
  },
];

module.exports = router;
