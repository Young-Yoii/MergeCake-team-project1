import { Schema } from "mongoose";

const OrderSchema = new Schema(
  {
    ORDER_NO: {
      type: Number,
      required: true,
    },
    SELECT_NO: {
      type: Number,
      required: true,
    }
  },
  {
    collection: "Order",
    timestamps: true,
  }
);

export { OrderSchema };
