import { Router } from "express";
import { orderService } from "../services";

const cartRouter = Router();

// 1. 주문 추가
cartRouter.post("/:userEmail", async (req, res, next) => {
    try {
        // Content-Type: application/json 설정을 안 한 경우, 에러를 만들도록 함.
        // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
        /*
        if (is.emptyObject(req.body)) {
          throw new Error(
            "headers의 Content-Type을 application/json으로 설정해주세요"
          );
        } */

        const userEmail = req.params.userEmail;

        let sumprice = 0;
        const maxOrderNo = await orderService.findMaxOrderNo();

        for(let key in req.body) {
            const options = req.body[key].OPTIONS;
            const newOrder = await orderService.addOrder(options, maxOrderNo);

            const price = newOrder.createdNewSelect.OPTIONS.price;
            sumprice = sumprice + price;
        }

        const newShipping = await orderService.addShipping(userEmail, maxOrderNo, sumprice);

        // 추가된 데이터를 프론트에 다시 보내줌
        res.status(201).json(newShipping);
    } catch (error) {
        next(error);
    }
});

export { cartRouter };
