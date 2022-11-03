import { Schema } from "mongoose";

const ShippingSchema = new Schema(
  {
    EMAIL: {
      type:  String,
      required: true
    },
    STATE: {
      type: String,
      required: true
    },
    ORDER_NO: {
        type: String,
        required: true
    },
    TOTAL_PRICE: {
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
    collection: "Shipping",
    timestamps: true,
  }
);

export { ShippingSchema };
