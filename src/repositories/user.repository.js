import User from "../models/User.js";

export async function findUserByUsername(username) {
  return await User.findOne({ username });
}

export async function createUser(data) {
  return await User.create(data);
}
