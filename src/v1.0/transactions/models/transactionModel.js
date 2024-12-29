const db_master = require("../../../connections/database");

const db_transaction = require("../../../connections/transactionDatabase");

const getTransactionSeqn = (p_seqnid) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM master_seqn where seqn_id = ?";
    db_master.get(query, [p_seqnid], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

const getMasterTransaction = (p_serviceCode) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM master_transactions where service_code = ?";
    db_master.get(query, [p_serviceCode], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

const transcationModels = (
  p_trxid,
  p_trxType,
  p_trxDate,
  p_invNum,
  p_amount,
  p_quantity,
  p_serviceCode,
  p_serviceName,
  p_userid,
  p_createdDate
) => {
  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO transactions (transaction_id, transaction_types, transaction_date, invoice_number, amount, quantity, service_code, service_name, user_id, created_by, created_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db_transaction.get(
      query,
      [
        p_trxid,
        p_trxType,
        p_trxDate,
        p_invNum,
        p_amount,
        p_quantity,
        p_serviceCode,
        p_serviceName,
        p_userid,
        p_createdDate,
      ],
      (err, row) => {
        if (err) reject(err);
        else resolve(row);
      }
    );
  });
};

const getBalanceModels = (p_userid) => {
  try {
    return new Promise((resolve, reject) => {
      const query =
        "SELECT balance_amount FROM balance_transaction where user_id = ?";
      db_transaction.get(query, [p_userid], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  } catch (err) {
    console.log(err);
  }
};

const updateBalance = (p_last_amt, p_amount, p_trxid, p_trxdate, p_userid) => {
  return new Promise((resolve, reject) => {
    const query =
      "UPDATE balance_transaction set balance_amount = ?, last_transaction_id = ?, last_transaction_date = ?, updated_by = ?, updated_date = ? where user_id = ?";
    db_transaction.get(
      query,
      [
        p_last_amt + p_amount,
        p_trxid,
        p_trxdate,
        p_userid,
        p_trxdate,
        p_userid,
      ],
      (err, row) => {
        if (err) reject(err);
        else resolve(row);
      }
    );
  });
};

const updateTransactionBalance = (
  p_last_amt,
  p_amount,
  p_trxid,
  p_trxdate,
  p_userid
) => {
  return new Promise((resolve, reject) => {
    const query =
      "UPDATE balance_transaction set balance_amount = ?, last_transaction_id = ?, last_transaction_date = ?, updated_by = ?, updated_date = ? where user_id = ?";
    db_transaction.get(
      query,
      [
        p_last_amt - p_amount,
        p_trxid,
        p_trxdate,
        p_userid,
        p_trxdate,
        p_userid,
      ],
      (err, row) => {
        if (err) reject(err);
        else resolve(row);
      }
    );
  });
};

const transactionHistoryLimitModel = (p_userid, p_limit, p_offset) => {
  return new Promise((resolve, reject) => {
    const query =
      "SELECT * FROM transactions where user_id = ? order by transaction_date desc LIMIT ? OFFSET ?";
    db_transaction.all(query, [p_userid, p_limit, p_offset], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

const transactionHistoryModel = (p_userid) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM transactions where user_id = ?";
    db_transaction.all(query, [p_userid], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

const updateSeqn = (p_currseqn, p_seqnid) => {
  return new Promise((resolve, reject) => {
    const query =
      "UPDATE master_seqn set current_sequence = ?  where seqn_id = ?";
    db_master.get(query, [p_currseqn + 1, p_seqnid], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

module.exports = {
  getTransactionSeqn,
  transcationModels,
  getMasterTransaction,
  updateBalance,
  getBalanceModels,
  transactionHistoryLimitModel,
  transactionHistoryModel,
  updateTransactionBalance,
  updateSeqn,
};
