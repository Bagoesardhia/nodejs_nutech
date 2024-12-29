const queries = require("../../models/users_Models");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const profileUpdate = async (p_head, p_body) => {
  try {
    jwt.verify(p_head, process.env.SECRET_KEY, (err) => {
      if (err) {
        return {
          status: 108,
          message: "Token tidak tidak valid atau kadaluwarsa",
          data: null,
        };
      }
    });

    const updateProfile = await queries.updateProfileModels(
      p_body.first_name,
      p_body.last_name,
      p_head
    );

    const getProfile = await queries.getProfile(p_head);

    return {
      status: 0,
      message: "Update Pofile berhasil",
      data: {
        email: getProfile.email,
        first_name: getProfile.first_name,
        last_name: getProfile.last_name,
        profile_image: getProfile.profile_image,
      },
    };
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  profileUpdate,
};
