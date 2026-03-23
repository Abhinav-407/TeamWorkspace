const User = require("./auth.model");

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

const createUser = async (userData) => {
  return await User.create(userData);
};
const findById = async(userId) => {
  return await User.findById(userId)
}

module.exports = {
  findByEmail,
  createUser,
  findById
};