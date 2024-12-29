const queries = require("../models/users_Models");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const profile = async (p_data) => {
  try {
    jwt.verify(p_data, process.env.SECRET_KEY, (err) => {
      if (err) {
        return {
          status: 108,
          message: "Token tidak tidak valid atau kadaluwarsa",
          data: null,
        };
      }
    });

    const getProfile = await queries.getProfile(p_data);

    if (!getProfile) {
      return {
        status: 404,
        message: "User not found",
        data: null,
      };
    } else {
      return {
        status: 0,
        message: "Sukses",
        data: {
          email: getProfile.email,
          first_name: getProfile.first_name,
          last_name: getProfile.last_name,
          profile_image: getProfile.profile_image,
        },
      };
    }

    console.log(getProfile);
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  profile,
};
