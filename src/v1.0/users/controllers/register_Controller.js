const timestamp = new Date().toLocaleString();

const queries = require("../models/users_Models");

const register = async (p_data) => {
  try {
    const getWIBTimestamp = () => {
      const date = new Date();
      // Create an Intl.DateTimeFormat for WIB
      return new Intl.DateTimeFormat("id-ID", {
        timeZone: "Asia/Jakarta",
        dateStyle: "short",
        timeStyle: "long",
      }).format(date);
    };

    //get sequence for user id
    const seqn = await queries.getSeqn();

    const registerUser = await queries.register(
      seqn,
      `${p_data.first_name}.${p_data.last_name}`,
      p_data.password,
      p_data.first_name,
      p_data.last_name,
      p_data.email,
      "Y",
      "System",
      timestamp
    );

    const createBalance = await queries.createBalanceModels(
      seqn,
      `${p_data.first_name}.${p_data.last_name}`,
      timestamp
    );

    const updateSeqn = await queries.updateSeqnModel(seqn);

    return 1;
  } catch (e) {
    console.log(e);
    return 0;
  }
};

module.exports = {
  register,
};
