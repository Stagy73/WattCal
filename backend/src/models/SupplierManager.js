const AbstractManager = require("./AbstractManager");

class SupplierManager extends AbstractManager {
  constructor() {
    super({ table: "supplier" });
  }

  insert(supplier) {
    return this.database.query(
      `INSERT INTO ${this.table} (title, country, price, year) VALUES (?, ?, ?, ?)`,
      [supplier.title, supplier.country, supplier.price, supplier.year]
    );
  }

  update(supplier) {
    return this.database.query(
      `UPDATE ${this.table} SET title = ?, country = ?, price = ?, year = ? WHERE id = ?`,
      [
        supplier.title,
        supplier.country,
        supplier.price,
        supplier.year,
        supplier.id,
      ]
    );
  }
}

module.exports = SupplierManager;
