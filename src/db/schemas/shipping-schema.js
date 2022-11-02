import { Schema } from "mongoose";

const ShippingSchema = new Schema(
  {
    EMAIL: { // hyun - pk 처리
      type:  String,
      required: true
    },
    STATE: { // hyun - pk 아닌데 dbdiagram 수정 필요
      type: String,
      required: true
    },
    ORDER_NO: { // hyun - pk 처리
        type: String,
        required: true
    },
    TOTAL_PRICE: {
      type: Number,
      required: true,
    },
    CREATED_TIME: { // hyun - 우리 형식에 맞게 변경
      type: String,
      required: true,
    },
    UPDATED_TIME: {
      type: String,
      required: true,
    }
  },
  {
    collection: "Shipping",
    timestamps: true,
  }
);

export { ShippingSchema };
