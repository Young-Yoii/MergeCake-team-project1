import { orderModel } from "../db";

class OrderService {
  constructor(orderModel) {
    this.orderModel = orderModel;
  }

  // 0. ORDER_NO 생성
  async findMaxOrderNo() {
    const maxOrderNo = await this.orderModel.findMaxOrderNo();

    return maxOrderNo;
  }

  // 1-1. 주문 추가
  async addOrder(options, maxOrderNo) {
    const maxSelectNo = await this.orderModel.findMaxSelectNo();
    const selectInfo = {
      SELECT_NO: maxSelectNo,
      OPTIONS: options
    }
    const createdNewSelect = await this.orderModel.createSelect(selectInfo);

    const orderInfo = {
      ORDER_NO: maxOrderNo,
      SELECT_NO: createdNewSelect.SELECT_NO
    };
    const createdNewOrder = await this.orderModel.createOrder(orderInfo);

    const newOrder = { createdNewSelect, createdNewOrder }

    return newOrder;
  }

  // 1-2. 주문 추가
  async addShipping(maxOrderNo, sumprice) {
    // hyun - email 가져오기
    const shippingInfo = {
      EMAIL: "test@naver.com",
      ORDER_NO: maxOrderNo,
      TOTAL_PRICE: sumprice
    };
    const createdNewShipping = await this.orderModel.createShipping(shippingInfo);

    return createdNewShipping;
  }

  // 2-0. 주문 조회 (함수화)
  async findOrder(shippings) {
    let orderList = [];
    let selectList = [];

    for (const [key, value] of Object.entries(shippings)) {
      selectList = [];

      const orderNo = { ORDER_NO: value.ORDER_NO};
      const orders = await this.orderModel.findByOrderNo(orderNo);

      for (const [key2, value2] of Object.entries(orders)) {
        const selectNo = { SELECT_NO: value2.SELECT_NO };
        const selects = await this.orderModel.findBySelectNo(selectNo);

        const selectLists = {
          select_no: value2.SELECT_NO,
          selectData: selects
        };

        selectList.push(selectLists);
      }

      const orderData = {
        email: value.EMAIL,
        state: value.STATE,
        total_price: value.price,
        order_no: value.ORDER_NO,
        orderData: selectList
      };

      orderList.push(orderData);
      // shippings.orderList = orderData;
    }

    return orderList;
  }

  // 2-1. 주문 전체 조회 (admin)
  async findOrderAll() {
    const shippings = await this.orderModel.findShippingAll();

    const orderList = await this.findOrder(shippings);

    return orderList;
  }

  // 2-2. 주문 조회 (user)
  async findMyOrder(email) {
    const shippings = await this.orderModel.findByEmail(email);

    const orderList = await this.findOrder(shippings);

    return orderList;
  }

  // 3-1. 주문 수정
  async updateOrder(selectno, OPTIONS) {
    const updateInfo = {
      select_no: selectno,
      update: {
        OPTIONS: OPTIONS,
        updatedAt: Date.now
      }
    }

    const updatedOrder = await this.orderModel.updateOrder(updateInfo);

    return updatedOrder;
  }

  // 3-2. 주문 취소
  async cancelOrder(orderno) {
    const cancelInfo = {
      order_no: orderno,
      update: {
        STATE: "주문 취소",
        updatedAt: Date.now
      }
    }

    const cancelOrder = await this.orderModel.updateState(cancelInfo);

    return cancelOrder;
  }

  // 3-3. 배송상태 수정
  async changeState(orderno, STATE) {
    const updateInfo = {
      order_no: orderno,
      update: {
        STATE: STATE,
        updatedAt: Date.now
      }
    }

    const changedState = await this.orderModel.updateState(updateInfo);

    return changedState;
  }

  // 4. 주문 삭제
  async deleteOrder(orderno) {
    const orderNo = { ORDER_NO: orderno }
    const findOrders = await this.orderModel.findByOrderNo(orderNo);

    // select 삭제
    for (const [key, value] of Object.entries(findOrders)) {
      const selectno = value.SELECT_NO;
      const deletedSelect = await this.orderModel.deleteSelect(selectno);
    }

    // Shipping, Order 삭제
    const deletedOrder = await this.orderModel.deleteShippingAndOrder(orderno);

    return deletedOrder;
  }
}

const orderService = new OrderService(orderModel);

export { orderService };
