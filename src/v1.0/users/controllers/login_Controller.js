const jwt = require("jsonwebtoken");
const timestamp = new Date().toLocaleString();
const queries = require("../models/users_Models");
require("dotenv").config();

const login = async (p_data) => {
  try {
    const { email, password } = p_data;

    // Generate JWT token
    const payload = { email };
    const genToken = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "12h",
    });

    // Check email and password
    const getUser = await queries.loginModels(email, password);

    if (!getUser) {
      return { status: 103, message: "Wrong Username or Password", data: null };
    } else {
      const updateToken = await queries.updateTokenModels(email, genToken);
      return { status: 0, message: "Login Success", data: { token: genToken } };
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  login,
};
