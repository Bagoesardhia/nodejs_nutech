const sqlite3 = require("sqlite3").verbose();

// Database Transaction
const db_transaction = new sqlite3.Database(
  "./db/transactionDatabase.db",
  (err) => {
    if (err) {
      console.error("Error connecting to transactionDatabase:", err.message);
    } else {
      console.log("Connected to transactionDatabase");
    }
  }
);

// Table All Transaction
db_transaction.run(
  `CREATE TABLE IF NOT EXISTS transactions (
          transaction_id NUMBER PRIMARY KEY,
          transaction_types VARCHAR(255),
          transaction_date NUMBER,
          invoice_number VARCHAR(255),
          amount NUMBER,
          quantity NUMBER,
          service_code VARCHAR(255),
          service_name VARCHAR(255),
          user_id NUMBER,
          created_by VARCHAR(50),
          created_date TIMESTAMP,
          updated_by VARCHAR(50),
          updated_date TIMESTAMP
        )`
);

module.exports = db_transaction;
