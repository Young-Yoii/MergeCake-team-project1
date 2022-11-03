import { model } from "mongoose";
import { ShippinngSchema } from "../schemas/shippinng-schema";

const Shippinng = model("shippinngs", ShippinngSchema);

export class UserModel {

  //배송정보 이메일로 검색
  async findByEmail(email) {
    const shippinng = await Shippinng.findOne({ email });
    return shippinng;
  }


  //배송정보 order_no 로 검색 
  async findByOrderNo(order_no) {
    const value = await User.findOne({ order_no: order_no });
    return value;
  }

  //전체 가져오기 
  async findAll() {
    const shippinngs = await Shippinng.find({});
    return shippinngs;
  }

  //업데이트  // role 확인 후 고객-> 배송취소 , admin -> 상태변경 
  async update({ shippinngId, update }) {
    const filter = { _id: shippinngId };
    const option = { returnOriginal: false };

    const updatedShippinng = await User.findOneAndUpdate(filter, update, option);
    return updatedShippinng;
  }


  //삭제  
  async delete(shippinngId) {
    const deletedShippinng = await Product.deleteOne({ _id: shippinngId });
    return deletedShippinng;
  }
}

const shippinngModel = new ShippinngModel();

export { shippinngModel };
