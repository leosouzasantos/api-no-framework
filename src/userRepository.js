const {client} = require('./database');
const {v4: uuidv4} = require('uuid');

class UserRepository {
  constructor() {
    this.client = client;
  }

  async create({name, username, email}) {
    const id = uuidv4();
    await this.client.query(
      'INSERT INTO USERS(ID, NAME, USERNAME, EMAIL) VALUES($1, $2, $3, $4)',
      [id, name, username, email]
    );
    const user = Object.assign({
      name,
      username,
      email,
      id,
    });
    return user;
  }

  async findAll() {
    const {rows} = await this.client.query('SELECT * FROM USERS');
    return rows;
  }

  async update({username, name, email}, id) {
    const query =
      'UPDATE USERS SET NAME = $1, USERNAME = $2, EMAIL = $3 WHERE ID = $4 ';
    await this.client.query(query, [name, username, email, id]);
  }

  async findById(id) {
    const {rows} = await this.client.query(
      'SELECT * FROM USERS WHERE ID = $1 LIMIT 1',
      [id]
    );

    if (rows.length > 0) {
      return rows[0];
    }

    return null;
  }
}

module.exports = UserRepository;
