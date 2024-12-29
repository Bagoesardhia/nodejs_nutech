const userQueries = require("../../users/models/users_Models");
const moduleQueries = require("../models/moduleModel");

const jwt = require("jsonwebtoken");

const menus = async (p_data) => {
  try {
    const data = await moduleQueries.menuModel();

    return {
      status: 0,
      message: "Sukses",
      data,
    };
  } catch (e) {
    console.log(e);
  }
};

const service = async (p_token) => {
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
      const data = await moduleQueries.serviceModel();

      return {
        status: 0,
        message: "Sukses",
        data,
      };
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  menus,
  service,
};
