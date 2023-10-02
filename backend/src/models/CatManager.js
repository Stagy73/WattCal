const AbstractManager = require("./AbstractManager");

class CatManager extends AbstractManager {
  constructor() {
    super({ table: "cat" });
  }

  insert(cat) {
    return this.database.query(`insert into ${this.table} (title) values (?)`, [
      cat.title,
    ]);
  }

  update(cat) {
    return this.database.query(
      `update ${this.table} set title = ? where id = ?`,
      [cat.title, cat.id]
    );
  }
}

module.exports = CatManager;
