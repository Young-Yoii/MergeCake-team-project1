import { Schema } from "mongoose";

const CategorySchema = new Schema(
  {
    CATEGORY_NO: {
      type: Number,
      required: true,
    },
    CATEGORY_NAME: {
      type: String,
      required: true,
    }
  },
  {
    collection: "Category",
    timestamps: true,
  }
);

export { CategorySchema };