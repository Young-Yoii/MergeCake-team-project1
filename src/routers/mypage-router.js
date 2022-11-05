import { Router } from "express";
import { orderService } from "../services";

const mypageRouter = Router();

// 1) orderlist
// 2. 주문 조회
mypageRouter.get("/orderlist/:email", async (req, res, next) => {
  try {
    // Content-Type: application/json 설정을 안 한 경우, 에러를 만들도록 함.
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    /*
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    } */

    const email = req.params.email;

    const orders = await orderService.findMyOrder(email);

    // 추가된 데이터를 프론트에 다시 보내줌
    res.status(201).json(orders);
  } catch (error) {
    next(error);
  }
});

// 3-1. 주문 수정
mypageRouter.patch("/orderlist/:orderno/:selectno", async (req, res, next) => {
  try {
    // Content-Type: application/json 설정을 안 한 경우, 에러를 만들도록 함.
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    /*
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    } */

    const orderno = req.params.orderno;
    const selectno = req.params.selectno;
    const { OPTIONS } = req.body;

    const updatedOrder = await orderService.updateOrder(selectno, OPTIONS);

    // 추가된 데이터를 프론트에 다시 보내줌
    res.status(201).json(updatedOrder);
  } catch (error) {
    next(error);
  }
});

// 3-2. 주문 취소
mypageRouter.patch("/orderlist/:orderno", async (req, res, next) => {
  try {
    // Content-Type: application/json 설정을 안 한 경우, 에러를 만들도록 함.
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    /*
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    } */

    const orderno = req.params.orderno;

    const orders = await orderService.cancelOrder(orderno);

    // 추가된 데이터를 프론트에 다시 보내줌
    res.status(201).json(orders);
  } catch (error) {
    next(error);
  }
});

export { mypageRouter };
