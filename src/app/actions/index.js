"use server";

import connectDB from "@/database";
import Joi from "joi";
import User from "@/models/userModel";
import { revalidatePath } from "next/cache";

const userSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().required(),
  address: Joi.string().required(),
});

export const addNewUser = async (
  userData,
  pathToRevalidate
) => {
  try {
    await connectDB();
    const { error } = userSchema.validate(userData);
    if (error) {
      return {
        success: false,
        message: error.details[0].message,
      };
    }

    // Save the new user
    const saveUser = await User.create(userData);

    // Trigger revalidation of the cache
    revalidatePath(pathToRevalidate); // Ensure this is triggered on the server side

    return {
      success: true,
      message: "User added successfully",
      data: saveUser,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getUsers = async () => {
  try {
    await connectDB();
    const getUsers = await User.find({});
    return {
      success: true,
      message: "here is the users data",
      data: getUsers,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};
export const deleteUser = async (userId) => {
  try {
    await connectDB();
    const findUserAndDelete = await User.findByIdAndDelete(
      userId
    );
    if (findUserAndDelete) {
      return {
        success: true,
        message: "user deleted successfully",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};
