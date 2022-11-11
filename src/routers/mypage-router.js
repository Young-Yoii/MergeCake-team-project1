import { Router } from "express";
import {orderService, userService} from "../services";
import {userRouter} from "./user-router";

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

//2) useredit
// 정보 수정
mypageRouter.patch("/useredit/:userId", /* loginRequired, */ async function (req, res, next) {
    try {
      // content-type 을 application/json 로 프론트에서
      // 설정 안 하고 요청하면, body가 비어 있게 됨.
      // if (is.emptyObject(req.body)) {
      //   throw new Error(
      //     "headers의 Content-Type을 application/json으로 설정해주세요"
      //   );
      // }

      // params로부터 id를 가져옴
      const userId = req.params.userId;

      // body data 로부터 업데이트할 사용자 정보를 추출함.
      const { FULL_NAME , PASSWORD, ZIP_CODE, ADDRESS1 ,ADDRESS2 , PHONE_NUMBER ,ROLE }  = req.body;


      // body data로부터, 확인용으로 사용할 현재 비밀번호를 추출함.
      const currentPassword = req.body.currentPassword;

      // currentPassword 없을 시, 진행 불가
      if (!currentPassword) {
        throw new Error("정보를 변경하려면, 현재의 비밀번호가 필요합니다.");
      }

      const userInfoRequired = { userId, currentPassword };
      console.log(userInfoRequired)
      // 위 데이터가 undefined가 아니라면, 즉, 프론트에서 업데이트를 위해
      // 보내주었다면, 업데이트용 객체에 삽입함.
      const toUpdate = {
        ...(FULL_NAME && { FULL_NAME }),
        ...(PASSWORD && { PASSWORD }),
        ...(ZIP_CODE && { ZIP_CODE }),
        ...(ADDRESS1 && { ADDRESS1 }),
        ...(ADDRESS2 && { ADDRESS2 }),
        ...(PHONE_NUMBER && { PHONE_NUMBER }),
        ...(ROLE && { ROLE }),
      };

      // 사용자 정보를 업데이트함.
      const updatedUserInfo = await userService.setUser(
        userInfoRequired,
        toUpdate
      );

      // 업데이트 이후의 유저 데이터를 프론트에 보내 줌
      res.status(200).json(updatedUserInfo);
    } catch (error) {
      next(error);
    }
  });

// 회원 탈퇴
mypageRouter.delete("/useredit/:userId", /* loginRequired, */ async function (req, res, next) {
  try {
    // userId = email
    const userId = req.params.userId;

    const deleteUser = await userService.deleteUser(userId);

    res.status(200).json(deleteUser);
  } catch (error) {
    next(error);
  }
});

export { mypageRouter };
