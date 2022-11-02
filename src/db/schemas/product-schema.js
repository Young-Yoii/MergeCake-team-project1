import { Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    CATEGORY: {
      type: String,
      required: true,
    },
    PRODUCT_NAME: {
      type: String,
      required: true,
    },
    TASTE: {
      type: String,
      required: true,
    },
    SIZE: {
      type: String,
      required: false,
    },
    PRICE: {
      type: Number,
      required: false,
    }
  },
  {
    collection: "Product",
    timestamps: true,
  }
);

export { ProductSchema };
