import { Router } from "express";
import { orderService } from "../services";

const mainRouter = Router();

// 1. 주문 추가
mainRouter.post("/product", async (req, res, next) => {
  try {
    // Content-Type: application/json 설정을 안 한 경우, 에러를 만들도록 함.
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    /*
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    } */

    const maxOrderNo = await orderService.findMaxOrderNo();

    const options = req.body.OPTIONS;

    const newOrder = await orderService.addOrder(options, maxOrderNo);

    const price = newOrder.createdNewSelect.OPTIONS.price;

    const newShipping = await orderService.addShipping(maxOrderNo, price);

    // 추가된 데이터를 프론트에 다시 보내줌
    res.status(201).json(newShipping);
  } catch (error) {
    next(error);
  }
});

export { mainRouter };
