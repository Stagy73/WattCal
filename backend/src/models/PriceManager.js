const AbstractManager = require("./AbstractManager");

class PriceManager extends AbstractManager {
  constructor() {
    super({ table: "price" });
  }

  insert(price) {
    return this.database.query(`insert into ${this.table} (price) value (?)`, [
      price.value,
    ]);
  }

  update(price) {
    return this.database.query(
      `update ${this.table} set price = ? where id = ?`,
      [price.price, price.id]
    );
  }
}

module.exports = PriceManager;
