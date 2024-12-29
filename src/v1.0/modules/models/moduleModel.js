const db_master = require("../../../connections/database");

const menuModel = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM master_menus";
    db_master.all(query, [], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

const serviceModel = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM master_service";
    db_master.all(query, [], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

module.exports = {
  menuModel,
  serviceModel,
};
