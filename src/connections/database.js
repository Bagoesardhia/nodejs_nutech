const sqlite3 = require("sqlite3").verbose();

// Database ALL Master
const db_master = new sqlite3.Database("./db/masterDatabase.db", (err) => {
  if (err) {
    console.error("Error connecting to masterDatabase:", err.message);
  } else {
    console.log("Connected to masterDatabase");
  }
});

// Table Master Users
db_master.run(
  `CREATE TABLE IF NOT EXISTS master_users (
            user_id NUMBER PRIMARY KEY,
            user_name VARCHAR(50),
            password VARCHAR(50),
            first_name VARCHAR(50),
            last_name VARCHAR(50),
            email VARCHAR(50),
            profile_image VARCHAR(255),
            isActive VARCHAR(1),
            token VARCHAR(255),
            created_by VARCHAR(50),
            created_date TIMESTAMP,
            updated_by VARCHAR(50),
            updated_date TIMESTAMP
          )`
);

// Table Master Sequence
db_master.run(
  `CREATE TABLE IF NOT EXISTS master_seqn (
              seqn_id NUMBER PRIMARY KEY,
              seqn_name VARCHAR(50),
              prefix VARCHAR(50),
              current_sequence NUMBER,
              created_by VARCHAR(50),
              created_date TIMESTAMP,
              updated_by VARCHAR(50),
              updated_date TIMESTAMP
            )`
);

// Table Master Transaction
db_master.run(
  `CREATE TABLE IF NOT EXISTS master_transactions (
              transaction_types_id NUMBER PRIMARY KEY,
              transaction_types VARCHAR(255),
              transaction_desc VARCHAR(255),
              service_code VARCHAR(255),
              service_name VARCHAR(255),
              service_icon VARCHAR(255),
              service_tariff NUMBER,
              created_by VARCHAR(50),
              created_date TIMESTAMP,
              updated_by VARCHAR(50),
              updated_date TIMESTAMP
            )`
);


// Table Master Modules
db_master.run(
  `CREATE TABLE IF NOT EXISTS master_modules (
              module_id NUMBER PRIMARY KEY,
              module_name VARCHAR(255),
              module_category VARCHAR(50),
              created_by VARCHAR(50),
              created_date TIMESTAMP,
              updated_by VARCHAR(50),
              updated_date TIMESTAMP
            )`
);

// Table Master Menus
db_master.run(
  `CREATE TABLE IF NOT EXISTS master_menus (
              menu_id NUMBER,
              menu_name VARCHAR(50),
              banner_name VARCHAR(255),
              banner_image VARCHAR(255),
              banner_desc VARCHAR(255),
              created_by VARCHAR(50),
              created_date TIMESTAMP,
              updated_by VARCHAR(50),
              updated_date TIMESTAMP
            )`
);

// Table Master Service
db_master.run(
  `CREATE TABLE IF NOT EXISTS master_service (
              service_id NUMBER,
              service_name VARCHAR(255),
              service_code VARCHAR(255),
              service_icon VARCHAR(255),
              service_tariff NUMBER,
              created_by VARCHAR(50),
              created_date TIMESTAMP,
              updated_by VARCHAR(50),
              updated_date TIMESTAMP
            )`
);


(module.exports = db_master)


//   master_sequence,
//   master_transaction,
//   balance_transaction,
//   tbl_transaction;
