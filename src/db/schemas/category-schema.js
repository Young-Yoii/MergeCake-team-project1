import { Schema } from "mongoose";

const CategorySchema = new Schema(
  {
    CATEGORY_BIG: { // 대분류
      type: String,
      required: true,
    },
    CATEGORY_SMALL: { // 소분류
      type: String,
      required: true,
    },
    PRODUCT: {
      type: String,
      required: true,
    },
    DETAIL: {
      type: Object,
      required: true
    }
  },
  {
    collection: "Category",
    timestamps: true,
  }
);

export { CategorySchema };