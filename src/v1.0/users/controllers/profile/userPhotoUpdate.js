const queries = require("../../models/users_Models");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const updatePhoto = async (p_token, p_path) => {
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

    const updatePhoto = await queries.updatePhotoModels(p_path, p_token);

    const getProfile = await queries.getProfile(p_token);

    return {
      status: 0,
      message: "Update Profile Image berhasil",
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
  updatePhoto,
};
