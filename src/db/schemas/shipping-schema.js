import { Schema } from "mongoose";

const shippingSchema = new Schema(
  {
    EMAIL: {
      type: String,
      required: true,
    },
    TASTE: {
      type: String,
      required: true,
    },
    ORDER_NO: {
      type: String,
      required: true,
    },
    TOTALPRICE: {
      type: Number,
      required: false,
    }
  },
  {
    collection: "shipping",
    timestamps: true,
  }
);

export { ShippingSchema };
