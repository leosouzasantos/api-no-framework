const {v4: uuidv4} = require('uuid');

class User {
  constructor() {
    this.users = [];
  }

  create(body) {
    const user = {
      ...body,
      id: uuidv4(),
    };
    this.users.push(user);
    return user;
  }

  findAll() {
    return this.users;
  }

  update(body, id) {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex < 0) {
      throw new Error('Usuario não encontrado!');
    }

    this.users[userIndex] = {
      ...body,
      id,
    };
  }
}

module.exports = new User();
