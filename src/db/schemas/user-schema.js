import { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    EMAIL: { // hyun - pk 처리
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
    PHONE_NUMBER: { // hyun - int로 받을건지, string으로 받을건지 (- 입력여부에 따라 변경)
      type: String,
      required: true,
    },
    ADDRESS: { // hyun - schema 형식으로 받을건지
      type: new Schema(
        {
          postalCode: String,
          address1: String,
          address2: String,
        },
        {
          _id: false,
        }
      ),
      required: false,
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
