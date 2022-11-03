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