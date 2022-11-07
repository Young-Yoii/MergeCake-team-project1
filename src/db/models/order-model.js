import { model } from "mongoose";
import { CartSchema } from "../schemas/cart-schema";
import { OrderSchema } from "../schemas/order-schema";
import { ShippingSchema } from "../schemas/shipping-schema";

const Cart = model("Cart", CartSchema);
const Order = model("Order", OrderSchema);
const Shipping = model("Shipping", ShippingSchema);


export class OrderModel {
    // 0-1. SELECT_NO 생성
    async findMaxSelectNo() {
        const maxSelectNo = await Cart.findOne().sort('-SELECT_NO')

        return maxSelectNo.SELECT_NO + 1;
    }

    // 0-2. ORDER_NO 생성
    async findMaxOrderNo() {
        const maxOrderNo = await Order.findOne().sort('-ORDER_NO')

        return maxOrderNo.ORDER_NO + 1;
    }

    // 1-1. 주문 추가 (select)
    async createSelect(selectInfo) {
        const createdNewSelect = await Cart.create(selectInfo);
        return createdNewSelect;
    }

    // 1-2. 주문 추가 (order)
    async createOrder(orderInfo) {
        const createdNewOrder = await Order.create(orderInfo);
        return createdNewOrder;
    }

    // 1-3. 주문 추가 (shipping)
    async createShipping(shippingInfo) {
        const createdNewShipping = await Shipping.create(shippingInfo);
        return createdNewShipping;
    }

    // 2-1. 주문 전체 조회
    async findShippingAll() {
        const shippings = await Shipping.find({});

        return shippings;
    }

    // 2-2. EMAIL로 주문 조회
    async findByEmail(email) {
        const shippings = await Shipping.find({ EMAIL: email });

        return shippings;
    }

    // 2-3. ORDER_NO로 주문 조회
    async findByOrderNo(orderNo) {
        const orders = await Order.find(orderNo);

        return orders;
    }

    // 2-4. SELECT_NO로 주문 조회
    async findBySelectNo(selectNo) {
        const selects = await Cart.find(selectNo);

        return selects;
    }

    // 3-1. 주문 수정
    async updateOrder({ select_no, update }) {
        const filter = {SELECT_NO: select_no};
        const option = {returnOriginal: false};

        const updatedOrder = await Cart.findOneAndUpdate(filter, update, option);
        return updatedOrder;
    }

    // 3-2. 배송상태 수정 (주문 취소 및 배송상태 수정)
    async updateState({ order_no, update }) {
        const filter = { ORDER_NO: order_no };
        const option = { returnOriginal: false };

        const canceledOrder = await Shipping.findOneAndUpdate(filter, update, option);

        return canceledOrder;
    }

    // 4-1. 주문 삭제 (Select)
    async deleteSelect(selectno) {
        const deletedSelect = await Cart.deleteOne({ SELECT_NO: selectno });

        return deletedSelect;
    }

    // 4-2. 주문 삭제 (Shipping&Order)
    async deleteShippingAndOrder(orderno) {
        const deletedShipping = await Shipping.deleteOne({ ORDER_NO: orderno });
        const deletedOrder = await Order.deleteMany({ ORDER_NO: orderno });

        return deletedShipping, deletedOrder;
    }
}

const orderModel = new OrderModel();

export { orderModel };
