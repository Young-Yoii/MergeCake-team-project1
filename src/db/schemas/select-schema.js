import { Schema } from "mongoose";

const SelectSchema = new Schema(
  {
    SELECT_NO: {
      type: Number,
      required: true,
    },
    OPTIONS: {
      type: Object,
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
    collection: "Select",
    timestamps: true,
  }
);

export { SelectSchema };
