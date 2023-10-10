const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor(database) {
    super({ table: "user" });
    this.database = database;
  }

  /*  findByEmail(email) {
    return this.database.query(`SELECT * FROM ${this.table} WHERE email = ?`, [
      email,
    ]);
  } */

  findByUsernameWithPassword(email) {
    return this.database.query(`select * from  ${this.table} where email = ?`, [
      email,
    ]);
  }

  insert(user) {
    return this.database.query(
      `INSERT INTO ${this.table} (pseudo, email, hashedpassword, country, mydevice, result) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        user.pseudo,
        user.email,
        user.password,
        user.country,
        user.mydevice,
        user.result,
      ]
    );
  }

  // Modify the update method to match the user table structure
  update(user) {
    return this.database.query(
      `UPDATE ${this.table} SET pseudo = ?, email = ?, hashedpassword = ?, country = ?, mydevice = ?, result = ? WHERE id = ?`,
      [
        user.pseudo,
        user.email,
        user.hashedpassword,
        user.country,
        user.mydevice,
        user.result,
        user.id,
      ]
    );
  }
}

module.exports = UserManager;
