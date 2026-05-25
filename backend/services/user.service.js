import userModel from "../models/user.model.js";

export const createUser = async ({ firstname, lastname, email, hashedPassword }) => {
  if (!firstname || !email || !hashedPassword) {
    throw new Error("All fields are required");
  }
  const user = await userModel.create({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password: hashedPassword,
  });
  return user;
};