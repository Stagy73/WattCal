const AbstractManager = require("./AbstractManager");

class ItemManager extends AbstractManager {
  constructor() {
    super({ table: "currency" });
  }

  insert(currency) {
    return this.database.query(`insert into ${this.table} (code) values (?)`, [
      currency.code,
    ]);
  }

  update(currency) {
    return this.database.query(
      `update ${this.table} set code = ? where id = ?`,
      [currency.code, currency.id]
    );
  }
}

module.exports = ItemManager;
