import { Schema } from "mongoose";

const ShippingSchema = new Schema(
  {
    EMAIL: {
      type:  Schema.Types.ObjectId,
      ref: 'User'
    },
    STATE: {
      type: String,
      required: true,
    },
    ORDER_NO: {
        type:  Schema.Types.ObjectId,
        ref: 'Order'
    },
    TOTALPRICE: {
      type: Number,
      required: false,
    }
  },
  {
    collection: "Shipping",
    timestamps: true,
  }
);

export { ShippingSchema };
