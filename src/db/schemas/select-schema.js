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
      type: String,
      required: true,
    },
    UPDATED_TIME: {
      type: String,
      required: false,
    }
  },
  {
    collection: "Select",
    timestamps: true,
  }
);

export { SelectSchema };
