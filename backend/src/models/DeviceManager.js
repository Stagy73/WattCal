const AbstractManager = require("./AbstractManager");

class DeviceManager extends AbstractManager {
  constructor() {
    super({ table: "device" });
  }

  async insert(device) {
    try {
      const result = await this.database.query(
        `INSERT INTO ${this.table} (title, brand, watt, ean, category_name, supplier, price, price_id, description ,picture_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?,?)`,
        [
          device.title,
          device.brand,
          device.watt,
          device.ean,
          device.category,
          device.supplier,
          device.price,
          device.price_id,
          device.description,
          device.picture_url,
        ]
      );

      // Assuming your query library returns a result object with an `insertId` property
      const insertId = result.insertId;

      // Fetch the inserted device using the insertId
      const insertedDevice = await this.find(insertId);

      return insertedDevice;
    } catch (error) {
      // Handle the error (log it, return an error response, etc.)
      console.error("Error inserting device:", error);
      throw error;
    }
  }

  find(ean) {
    return this.database.query(`SELECT * FROM ${this.table} WHERE ean = ?`, [
      ean,
    ]);
  }

  findByBrand(brand) {
    return this.database.query(`SELECT * FROM ${this.table} WHERE brand = ?`, [
      brand,
    ]);
  }

  update(device) {
    return this.database.query(
      `update ${this.table} set title = ?, brand = ?, watt = ?, category = ?, ean = ? where id = ?`,
      [
        device.title,
        device.brand,
        device.watt,
        device.category,
        device.ean,
        device.id,
      ]
    );
  }
}

module.exports = DeviceManager;
