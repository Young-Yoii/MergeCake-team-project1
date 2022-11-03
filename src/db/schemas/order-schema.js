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
    },
    CREATED_TIME: {
      type: Date,
      required: true,
      default: Date.now
    },
    UPDATED_TIME: {
      type: Date,
      required: false,
    }
  },
  {
    collection: "Order",
    timestamps: true,
  }
);

export { OrderSchema };
