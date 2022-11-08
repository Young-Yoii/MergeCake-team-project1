import { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    EMAIL: {
      type: String,
      required: true,
    },
    FULL_NAME: {
      type: String,
      required: false,
    },
    PASSWORD: {
      type: String,
      required: true,
    },
    PHONE_NUMBER: {
      type: String,
      required: false,
    },
    ZIP_CODE: {
      type: Number,
      required: false,
    },
    ADDRESS1: {
      type: String,
      required: false,
    },
    ADDRESS2: {
      type: String,
      required: false,
    },
    ROLE: {
      type: String,
      required: true,
      enum: ['user', 'non-user', 'admin'],
      default: "user",
    },
  },
  {
    collection: "User",
    timestamps: true,
  }
);

export { UserSchema };
