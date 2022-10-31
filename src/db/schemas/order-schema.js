import { Schema } from "mongoose";

const OrderSchema = new Schema(
  {
    taste: {
      type: String,
      required: true,
    },
    orderNo: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: false,
    },
    product_Name:{
      type: String,
      required: false, 
    },
    color1:{
      type: String,
      required: false, 
    },
    color2:{
      type: String,
      required: false, 
    },
    color3:{
      type: String,
      required: false, 
    },
    lettering:{
      type: String,
      required: false, 
    },
    taste:{
      type: String,
      required: false, 
    },
    imagetf:{
      type: Boolean,
      required: false, 
    },
    imglink:{
      type: String,
      required: false, 
    },
    size:{
      type: String,
      required: false, 
    },
    kcal:{
      type: Number,
      required: false, 
    },
  },
  {
    collection: "Users",
    timestamps: true,
  }
);

export { OrderSchema };
