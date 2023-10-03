const AbstractManager = require("./AbstractManager");

class DeviceManager extends AbstractManager {
  constructor() {
    super({ table: "device" });
  }

  insert(device) {
    return this.database.query(
      `insert into ${this.table} (title,brand,watt,category,ean) values (?,?,?,?,?)`,
      [device.title, device.brand, device.watt, device.category, device.ean]
    );
  }

  find(ean) {
    return this.database.query(`SELECT * FROM ${this.table} WHERE ean = ?`, [
      ean,
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