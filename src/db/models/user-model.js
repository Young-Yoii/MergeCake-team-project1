import { model } from "mongoose";
import { UserSchema } from "../schemas/user-schema";

const User = model("users", UserSchema);

export class UserModel {
  async findByEmail(email) {
    const user = await User.findOne({  EMAIL : email });
    return user;
  }

  async findById(userId) {
    const user = await User.findOne({ _id: userId });
    return user;
  }

  async create(userInfo) {
    const createdNewUser = await User.create(userInfo);
    return createdNewUser;
  }

  async findAll() {
    const users = await User.find({});
    return users;
  }

  async update({ userId, update }) {
    const filter = { _id: userId };
    const option = { returnOriginal: false };

    const updatedUser = await User.findOneAndUpdate(filter, update, option);
    return updatedUser;
  }

  async passwordUpdate({ EMAIL, update }) {
    console.log("passwordUpdate", EMAIL, update )
    const filter = { EMAIL : EMAIL };
    const option = { returnOriginal: false };
    const upd = { PASSWORD : update }

    const updatedUser = await User.findOneAndUpdate(filter, upd , option);
    return updatedUser;
  }

  async update({ userId, update }) {
    const filter = { _id: userId };
    const option = { returnOriginal: false };

    const updatedUser = await User.findOneAndUpdate(filter, update, option);
    return updatedUser;
  }

  async deleteUser(userInfo) {
    const deleteInfos = {
      EMAIL: userInfo
    }

    const deletedUser = await User.deleteOne(deleteInfos);

    return deletedUser;
  }
}

const userModel = new UserModel();

export { userModel };
