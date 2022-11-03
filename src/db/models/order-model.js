import { model } from "mongoose";
import { OrderSchema } from "../schemas/order-schema";

const Order = model("Order", OrderSchema);

export class OrderModel {
    // 1. 주문 추가
    async createOrder(product_no) {
        const createdNewOrder = await Order.create(product_no);
        return createdNewOrder;
    }

    // 2-1. order_no로 검색
    async findOrderAll(order_no) {
        const orders = await Order.find({ order_no });
        return orders;
    }

    // 2-2. product_no로 검색
    async findOrder(product_no) {
        const order = await Order.find({ product_no });
        return order;
    }

    // 3-1. 주문 수정 - updated_time 수정
    async updateOrder({ order_no, update }) {
        const filter = {ORDER_NO: order_no};
        const option = {returnOriginal: false};

        const updatedOrder = await Order.findOneAndUpdate(filter, update, option);
        return updatedOrder;
    }

    // 4. 주문 삭제 (Admin)
    async deleteOrder(order_no) {
        const deletedOrder = await Order.deleteOne({ ORDER_NO: order_no });

        return deletedOrder
    }
}

const orderModel = new OrderModel();

export { orderModel };
