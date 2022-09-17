import User from "../models/User.js";
import { createError } from "../utils/error.js";

const editUser = async (req, res) => {
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateUser);
  } catch (err) {
    res.status(500).json(err);
  }
};
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User Has Been Delete");
  } catch (err) {
    res.status(500).json(err);
  }
};
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};
const getUser = async (req, res, next) => {
  try {
    const user = await User.find();

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export { editUser, deleteUser, getUserById, getUser };
