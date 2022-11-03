import { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    EMAIL: {
      type: String,
      required: true,
    },
    FULL_NAME: {
      type: String,
      required: true,
    },
    PASSWORD: {
      type: String,
      required: true,
    },
    PHONE_NUMBER: {
      type: String,
      required: true,
    },
    ZIP_CODE: {
      type: Number,
      required: true,
    },
    ADDRESS1: {
      type: String,
      required: true,
    },
    ADDRESS2: {
      type: String,
      required: true,
    },
    ROLE: {
      type: String,
      required: true,
      default: "user", // "admin", "user", "non-user"
    },
  },
  {
    collection: "User",
    timestamps: true,
  }
);

export { UserSchema };
