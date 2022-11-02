import { Schema } from "mongoose";

const CategorySchema = new Schema(
  {
    CATEGORY_NAME: { // "맛" "시트" ...
      type: String,
      required: true,
    },
    PRODUCT_NO: { // 여기는 참조가 아닌가???
      type: Number,
      required: true,
    },
    CREATED_TIME: {
      type: String,
      required: true,
    },
    UPDATED_TIME: {
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