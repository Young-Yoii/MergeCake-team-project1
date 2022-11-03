import { model } from "mongoose";
import { ShippingSchema } from "../schemas/shipping-schema";

const Shipping = model("shippings", ShippingSchema);

export class ShippingModel {

  //배송정보 이메일로 검색
  async findByEmail(email) {
    const shipping = await Shipping.findOne({ email });
    return shipping;
  }

  //배송정보 order_no 로 검색 
  async findByOrderNo(order_no) {
    const value = await User.findOne({ order_no: order_no });
    return value;
  }

  //전체 가져오기 
  async findAll() {
    const shippings = await Shipping.find({});
    return shippings;
  }

  //업데이트  // role 확인 후 고객-> 배송취소 , admin -> 상태변경 
  async update({ shippingId, update }) {
    const filter = { _id: shippingId };
    const option = { returnOriginal: false };

    const updatedShipping = await User.findOneAndUpdate(filter, update, option);
    return updatedShipping;
  }


  //삭제  
  async delete(shippingId) {
    const deletedShipping = await Product.deleteOne({ _id: shippingId });
    return deletedShipping;
  }
}

const shippingModel = new ShippingModel();

export { shippingModel };
