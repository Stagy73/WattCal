const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  insert(user) {
    return this.database.query(
      `INSERT INTO ${this.table} (pseudo, email, hashedpassword, country) VALUES (?, ?, ?, ?)`,
      [user.pseudo, user.email, user.hashedpassword, user.country]
    );
  }

  update(user) {
    return this.database.query(
      `UPDATE ${this.table} SET pseudo = ?, email = ?, hashedpassword = ?, country = ? WHERE id = ?`,
      [user.pseudo, user.email, user.hashedpassword, user.country, user.id]
    );
  }
}

module.exports = UserManager;
