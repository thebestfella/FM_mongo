const User = require("./user");

const getUserById = (id) => {
  //return real promise from .exec()
  return User.findById(id).exec();
};

const getAllUsers = () => {
  return User.find({}).exec();
};

const createUser = (userDetails) => {
  return User.create(userDetails).exec();
};
const removeUserById = (id) => {
  return User.removeUserById(id).exec();
};

const updateUserById = (id, update) => {
  return User.updateUserById(id, update, { new: true }).exe();
};

module.exports = {
  getUserById,
  getAllUsers,
  createUser,
  removeUserById,
  updateUserById,
};
