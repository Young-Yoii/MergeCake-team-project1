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
      enum: ['주문 완료', '배송 준비', '배송 시작', '배송 완료'],
      default: "주문 완료"
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
    },

  },
  {
    collection: "Shipping",
    timestamps: true,
  }
);

export { ShippingSchema };
