import { Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    CATEGORY_NO: {
      type: Number,
      required: true,
    },
    PRODUCT_NAME: {
      type: String,
      required: true,
    },
    DETAIL: {
      type: Object,
      required: true,
    }
  },
  {
    collection: "Product",
    timestamps: true,
  }
);

export { ProductSchema };