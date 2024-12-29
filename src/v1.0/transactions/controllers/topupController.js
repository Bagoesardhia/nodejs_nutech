const queries = require("../../users/models/users_Models");

const queriesTransaction = require("../models/transactionModel");

const timestamp = new Date().toLocaleString();

const jwt = require("jsonwebtoken");
require("dotenv").config();

const topupController = async (p_token, p_body) => {
  try {
    jwt.verify(p_token, process.env.SECRET_KEY, (err) => {
      if (err) {
        return {
          status: 108,
          message: "Token tidak tidak valid atau kadaluwarsa",
          data: null,
        };
      }
    });

    const getProfile = await queries.getProfile(p_token);

    console.log(getProfile);

    const getTRXSeqn = await queriesTransaction.getTransactionSeqn(3);

    const getTRXMaster = await queriesTransaction.getMasterTransaction();

    const getBalance = await queriesTransaction.getBalanceModels(
      getProfile.user_id
    );

    const createTransaction = await queriesTransaction.transcationModels(
      getTRXSeqn.current_sequence,
      "TOPUP",
      timestamp,
      "",
      p_body.top_up_amount,
      1,
      "TOPUP",
      "TOPUP BALANCE",
      getProfile.user_id,
      timestamp
    );

    const createBalance = await queriesTransaction.updateBalance(
      getBalance.balance_amount,
      p_body.top_up_amount,
      getTRXSeqn.current_sequence,
      timestamp,
      getProfile.user_id
    );

    const updateTrxSeqn = await queriesTransaction.updateSeqn(getTRXSeqn.current_sequence, 3);

    const getFinalBalance = await queriesTransaction.getBalanceModels(
      getProfile.user_id
    );
    
    return (result = {
      status: 0,
      message: "Top Up Balance berhasil",
      data: {
        balance: getFinalBalance.balance_amount,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  topupController,
};
