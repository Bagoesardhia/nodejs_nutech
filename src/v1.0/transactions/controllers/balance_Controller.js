const jwt = require("jsonwebtoken");
const timestamp = new Date().toLocaleString();
const queries = require("../../users/models/users_Models");

const queriesTransaction = require("../models/transactionModel");

const mainBalance = async (p_token) => {
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
      const getProfile = await queries.getProfile(p_token);

      const getBalance = await queriesTransaction.getBalanceModels(
        getProfile.user_id
      );

      return {
        status: 0,
        message: "Get Balance Berhasil",
        data: {
          balance: getBalance.balance_amount,
        },
      };
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  mainBalance,
};
