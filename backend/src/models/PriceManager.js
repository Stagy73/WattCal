const AbstractManager = require("./AbstractManager");

class PriceManager extends AbstractManager {
  constructor() {
    super({ table: "price" });
  }

  insert(price) {
    return this.database.query(`insert into ${this.table} (price) values (?)`, [
      price.price,
    ]);
  }

  update(price) {
    return this.database.query(
      `update ${this.table} set code = ? where id = ?`,
      [price.price, price.id]
    );
  }
}

module.exports = PriceManager;
