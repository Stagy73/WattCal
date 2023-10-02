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

  findEan(ean) {
    return this.database.query(`select * from  ${this.table} where ean = ?`, [
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
