import { Schema } from "mongoose";

const OrderSchema = new Schema(
  {
    ORDER_NO: {
      type: Number,
      required: true,
    },
    PRODUCT_NO: {
      type: Number,
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
    collection: "Order",
    timestamps: true,
  }
);

export { OrderSchema };
