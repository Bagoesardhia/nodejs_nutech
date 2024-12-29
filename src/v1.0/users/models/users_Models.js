const db_master = require("../../../connections/database");
const db_transaction = require("../../../connections/transactionDatabase");

// const master_user = require("../../../connections/database");

const getSeqn = () => {
  return new Promise((resolve, reject) => {
    const query =
      "SELECT current_sequence FROM master_seqn where seqn_name = 'USERS'";
    db_master.get(query, [], (err, row) => {
      if (err) reject(err);
      else resolve(row.current_sequence);
    });
  });
};

const updateSeqnModel = (p_currseqn) => {
  return new Promise((resolve, reject) => {
    const queries =
      "UPDATE master_seqn set current_sequence = ?  where seqn_name = 'USERS'";
    db_master.get(queries, [p_currseqn + 1], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

const register = (
  p_seqn,
  p_username,
  p_password,
  p_firstname,
  p_lastname,
  p_email,
  p_active,
  p_created_by,
  p_created_date
) => {
  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO master_users (user_id, user_name, password, first_name, last_name, email, isActive, created_by, created_date) VALUES (?, ?,?, ?, ?, ?, ?, ?, ?)";
    db_master.get(
      query,
      [
        p_seqn,
        p_username,
        p_password,
        p_firstname,
        p_lastname,
        p_email,
        p_active,
        p_created_by,
        p_created_date,
      ],
      (err, row) => {
        if (err) reject(err);
        else resolve(row);
      }
    );
  });
};

const loginModels = (p_email, p_password) => {
  return new Promise((resolve, reject) => {
    const query =
      "SELECT * FROM master_users where email = ? and password = ? and isActive = 'Y' ";

    db_master.get(query, [p_email, p_password], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

const updateTokenModels = (p_email, p_token) => {
  return new Promise((resolve, reject) => {
    const queries = "UPDATE master_users set token = ?  where email = ?";
    db_master.get(queries, [p_token, p_email], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

const getProfile = (p_token) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM master_users where token = ?";
    db_master.get(query, [p_token], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

const updateProfileModels = (p_firstname, p_lastname, p_token) => {
  return new Promise((resolve, reject) => {
    const queries =
      "UPDATE master_users set first_name = ?, last_name = ? where token = ?";
    db_master.get(queries, [p_firstname, p_lastname, p_token], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

const updatePhotoModels = (p_path, p_token) => {
  return new Promise((resolve, reject) => {
    const queries = "UPDATE master_users set profile_image = ? where token = ?";
    db_master.get(queries, [p_path, p_token], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

const createBalanceModels = (p_userid, p_username, p_date) => {
  return new Promise((resolve, reject) => {
    const queries =
      "INSERT INTO balance_transaction (user_id, user_name, balance_amount, created_by, created_date) values (?, ?, ?, ?, ?)";
    db_transaction.get(
      queries,
      [p_userid, p_username, 0, p_userid, p_date],
      (err, row) => {
        if (err) reject(err);
        else resolve(row);
      }
    );
  });
};

module.exports = {
  getSeqn,
  updateSeqnModel,
  register,
  loginModels,
  updateTokenModels,
  getProfile,
  updateProfileModels,
  updatePhotoModels,
  createBalanceModels
};
