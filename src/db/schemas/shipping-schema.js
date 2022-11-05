import { Schema } from "mongoose";

const ShippingSchema = new Schema(
  {
    EMAIL: {
      type:  String,
      required: true
    },
    STATE: {
      type: String,
      required: true,
      default: "주문완료"
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
    collection: "Shipping",
    timestamps: true,
  }
);

export { ShippingSchema };
