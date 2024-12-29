const queriesUsers = require("../../users/models/users_Models");

const queries = require("../models/transactionModel");
const timestamp = new Date().toLocaleString();

const date = new Date().getDate();
const month = new Date().getMonth();
const year = new Date().getFullYear();

const jwt = require("jsonwebtoken");
require("dotenv").config();

const mainTransaction = async (p_token, p_body) => {
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
      const getTRXSeqn = await queries.getTransactionSeqn(3);
      const getTRXMaster = await queries.getMasterTransaction(
        p_body.service_code
      );

      console.log(getTRXMaster);

      const getBalance = await queries.getBalanceModels(getProfile.user_id);

      const getInvoiceSeqn = await queries.getTransactionSeqn(2);

      const genInvoice = `${getInvoiceSeqn.prefix}/${date}${month}${year}-${getInvoiceSeqn.current_sequence}`;

      if (!getTRXMaster) {
        return {
          status: 102,
          message: "Service ataus Layanan tidak ditemukan",
          data: null,
        };
      }

      console.log(getTRXMaster);

      //   const createTransaction = await queries.transcationModels(
      //     getTRXSeqn.current_sequence,
      //     getTRXMaster.transaction_types,
      //     timestamp,
      //     genInvoice,
      //     getTRXMaster.service_tariff,
      //     1,
      //     getTRXMaster.service_code,
      //     getTRXMaster.service_name,
      //     getProfile.user_id,
      //     timestamp
      //   );

      //   const createBalance = await queries.updateTransactionBalance(
      //     getBalance.balance_amount,
      //     getTRXMaster.service_tariff,
      //     getTRXSeqn.current_sequence,
      //     timestamp,
      //     getProfile.user_id
      //   );
      //   const updateTrxSeqn = await queries.updateSeqn(getTRXSeqn.current_sequence, 3);
      //   const updateInvSeqn = await queries.updateSeqn(getInvoiceSeqn.current_sequence, 2);
      return (result = {
        status: 0,
        message: "Transaksi berhasil",
        data: {
          invoice_number: genInvoice,
          service_code: getTRXMaster.service_code,
          service_name: getTRXMaster.service_name,
          transaction_type: getTRXMaster.transaction_types,
          total_amount: getTRXMaster.service_tariff,
          created_on: timestamp,
        },
      });
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  mainTransaction,
};
