const queriesUsers = require("../../users/models/users_Models");

const jwt = require("jsonwebtoken");

const queries = require("../models/transactionModel");

const historyTransaction = async (p_token, p_limit, p_offset) => {
  try {
    const jwt_validation = jwt.verify(
      p_token,
      process.env.SECRET_KEY,
      (err) => {
        if (err) {
          return {
            status: 108,
            message: "Token tidak tidak valid atau kadaluwarsa",
            data: null,
          };
        }
      }
    );

    if (jwt_validation) {
      return {
        status: 108,
        message: "Token tidak tidak valid atau kadaluwarsa",
        data: null,
      };
    } else {
      const getProfile = await queriesUsers.getProfile(p_token);
      if (!p_limit) {
        const records = await queries.transactionHistoryModel(
          getProfile.user_id
        );
        return {
          status: 0,
          message: "Get History Berhasil",
          data: { offset: p_offset, limit: p_limit, records },
        };
      } else {
        const records = await queries.transactionHistoryLimitModel(
          getProfile.user_id,
          p_limit,
          p_offset
        );
        return {
          status: 0,
          message: "Get History Berhasil",
          data: { offset: p_offset, limit: p_limit, records },
        };
      }
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  historyTransaction,
};
