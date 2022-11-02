import { model } from "mongoose";
import { OrderSchema } from "../schemas/order-schema";
import { ShippingSchema } from "../schemas/shipping-schema";

const Order = model("Order", OrderSchema);
const Shipping = model("Shipping", ShippingSchema);

export class OrderModel {
    // 1-1. 주문 추가 (User)
    async createOrder(orderInfo) {
        const createdNewOrder = await Order.create(orderInfo);
        return createdNewOrder;
    }

    // 1-2. 주문 완료 (?)
    // parameter는 뭘로 들어오게 되지?
    async createShipping(shippingInfo) {
        const createdNewShipping = await Shipping.create(shippingInfo);
        return createdNewShipping;
    }

    // 2-1. 주문 조회 - ALL (Admin)
    async findOrderAll() {
        const orders = await Order.find({});
        return orders;
    }

    // 2-2. 주문 조회 - One
    // pk를 뭘로 잡을 지 필요. order table에는 user 정보가 하나도 없음.
    async findByPhNo(phNo) {
        const order = await Order.findOne({ phNo });
        return order;
    }
    /*
    async findById(userId) {
        const shipping = await Shipping.findOne({ _id: userId });
        return shipping;
    } */

    // 3-1. 주문 수정 - 주문 세부 정보 (User)
    async updateOrder({ userId, update }) {
        const filter = { _id: userId };
        const option = { returnOriginal: false };

        const updatedOrder = await Order.findOneAndUpdate(filter, update, option);
        return updatedOrder;
    }

    // 3-2. 주문 수정 - 주문 취소 (User)
    async cancleState({ userId, update }) {
        const filter = { _id: userId };
        const option = { returnOriginal: false };

        const cancledState = await Order.findOneAndUpdate(filter, update, option);
        return cancledState;
    }

    // 3-3. 주문 수정 - 배송 상태 (Admin)
    async updateState({ userId, update }) {
        const filter = { _id: userId };
        const option = { returnOriginal: false };

        const updatedState = await Order.findOneAndUpdate(filter, update, option);
        return updatedState;
    }

    // 4. 주문 삭제 (Admin)
    // order 하나를 지우는 건지, order 전체(shipping)까지 다 지우는 건지
    // 저체 삭제
    async deleteOrder(userId) {
        const deletedOrder = await Order.deleteOne({ _id: userId });

        return deletedOrder
    }
}

const orderModel = new OrderModel();

export { orderModel };
