const UserRepository = require('./repositories/userRepository');
const {createHmac, Hmac} = require('crypto');
class User {
  constructor() {
    this.users = [];
    this.userRepository = new UserRepository();
  }

  async create(body) {
    const {password} = body;
    const pwdEncrypt = createHmac('sha256', password).digest('hex');

    let user = {
      ...body,
      password: pwdEncrypt,
    };
    user = await this.userRepository.create(user);
    return user;
  }

  async findAll() {
    return this.userRepository.findAll();
  }

  async update(body, id) {
    // const userIndex = this.users.findIndex((user) => user.id === id);
    const userExists = await this.userRepository.findById(id);
    if (!userExists) {
      throw new Error('Usuario não encontrado!');
    }

    const {password} = body;
    const pwdEncrypt = createHmac('sha256', password).digest('hex');

    const user = {
      ...body,
      password: pwdEncrypt,
    };

    await this.userRepository.update(user, id);
  }
}

module.exports = new User();
