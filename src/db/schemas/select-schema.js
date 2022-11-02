import { Schema } from "mongoose";

const SelectSchema = new Schema( // table 이름이 product는 아닌듯!!
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
      required: true,
    }
  },
  {
    collection: "Select",
    timestamps: true,
  }
);

export { SelectSchema };
