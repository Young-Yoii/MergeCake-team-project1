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
    WAYBILL: {
      type: String,
      required: false
    },
    ORDER_NO: {
        type: String,
        required: true
    },
    TOTAL_PRICE: {
      type: Number,
      required: true,
    }
  },
  {
    collection: "Shipping",
    timestamps: true,
  }
);

export { ShippingSchema };
