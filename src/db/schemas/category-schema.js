import { Schema } from "mongoose";

const CategorySchema = new Schema(
  {
    CATEGORY_NAME: { // "맛" "시트" ...
      type: String,
      required: true,
    },
    VALUE: {
      type: String,
      required: true,
    },
    CREATED_TIME: {
      type: String,
      required: true,
    },
    UPDATED_TIME: {
      type: String,
      required: false,
    }
  },
  {
    collection: "Category",
    timestamps: true,
  }
);

export { CategorySchema };