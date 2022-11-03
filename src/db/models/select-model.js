import { model } from "mongoose";
import { SelectSchema } from "../schemas/select-schema";

const Select = model("selects", SelectSchema);

export class SelectModel {

  async findBySelectNo(selectNo) {
    const select = await Select.findOne({ selectNo : selectNo });
    return select;
  }

  async create(selectInfo) {
    const createdNewSelect = await Select.create(selectInfo);
    return createdNewSelect;
  }

  async findAll() {
    const selects = await Select.find({});
    return selects;
  }

  async update({ selectId, update }) {
    const filter = { _id: selectId };
    const option = { returnOriginal: false };

    const updatedSelect = await Select.findOneAndUpdate(filter, update, option);
    return updatedSelect;
  }

  async delete(selectId) {
    const deletedSelect = await Product.deleteOne({ _id: selectId });
    return deletedSelect;
  }

}

const selectModel = new SelectModel();

export { selectModel };
