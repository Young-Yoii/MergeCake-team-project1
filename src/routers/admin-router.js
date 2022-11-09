import { Router } from "express";
import {orderService, userService} from "../services";
import { categoryService } from "../services";
import {userRouter} from "./user-router";
// 이거 왜 여깄지??
// import {mypageRouter} from "./mypage-router";

const adminRouter = Router();

// 1) ordercheck
// 1. 주문 조회
adminRouter.get("/ordercheck", async (req, res, next) => {
  try {
    // Content-Type: application/json 설정을 안 한 경우, 에러를 만들도록 함.
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    /*
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    } */

    const orders = await orderService.findOrderAll();

    // 추가된 데이터를 프론트에 다시 보내줌
    res.status(201).json(orders);
  } catch (error) {
    next(error);
  }
});

// 3. 배송상태 수정
adminRouter.patch("/ordercheck/:orderno", async (req, res, next) => {
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
    const { STATE } = req.body;

    const changedState = await orderService.changeState(orderno, STATE);

    // 추가된 데이터를 프론트에 다시 보내줌
    res.status(201).json(changedState);
  } catch (error) {
    next(error);
  }
});

//3-1 배송상태 , 운송장 번호
adminRouter.patch("/ordercheck/:orderno/:waybill", async (req, res, next) => {
  try {
    // Content-Type: application/json 설정을 안 한 경우, 에러를 만들도록 함.
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    /*
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    } */
    const {orderno, waybill} = req.params;
    const { STATE } = req.body;

    const changedState = await orderService.changeStateAndWaybill(orderno, waybill , STATE);

    // 추가된 데이터를 프론트에 다시 보내줌
    res.status(201).json(changedState);
  } catch (error) {
    next(error);
  }
});

// 4. 주문 삭제
adminRouter.delete("/ordercheck/:orderno", async (req, res, next) => {
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

    const deletedOrder = await orderService.deleteOrder(orderno);

    // 추가된 데이터를 프론트에 다시 보내줌
    res.status(201).json(deletedOrder);
  } catch (error) {
    next(error);
  }
});

// 2) userlist
adminRouter.get("/userlist", /*loginRequired,*/  async function (req, res, next) {
    try {
      // 전체 사용자 목록을 얻음
      const users = await userService.getUsers();

      // 사용자 목록(배열)을 JSON 형태로 프론트에 보냄
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  });

// 3) category
// 1-1. 카테고리 추가
adminRouter.post("/category", async (req, res, next) => {
  try {
    // Content-Type: application/json 설정을 안 한 경우, 에러를 만들도록 함.
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    /*
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    } */

    // req에서 데이터 가져오기
    const { CATEGORY_NAME } = req.body;
    const categoryInfo = { CATEGORY_NAME };

    // db에 추가
    const newCategory = await categoryService.addCategory(categoryInfo);

    // 추가된 데이터를 프론트에 다시 보내줌
    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
});

// 1-2. 상품 추가
adminRouter.post("/category/:categoryNo", async (req, res, next) => {
  try {
    // Content-Type: application/json 설정을 안 한 경우, 에러를 만들도록 함.
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    /*
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    } */

    // req에서 데이터 가져오기
    const categoryNo = req.params.categoryNo;
    const { PRODUCT_NAME, DETAIL } = req.body;
    const productInfo = { categoryNo, PRODUCT_NAME, DETAIL };

    // db에 추가
    const newProduct = await categoryService.addProduct(productInfo);

    // 추가된 데이터를 프론트에 다시 보내줌
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
});

// 2-1. 카테고리 조회
adminRouter.get("/category", async (req, res, next) => {
  try {
    // Content-Type: application/json 설정을 안 한 경우, 에러를 만들도록 함.
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    /*
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    } */

    // db에 추가
    const categorys = await categoryService.findCategory();

    // 추가된 데이터를 프론트에 다시 보내줌
    res.status(201).json(categorys);
  } catch (error) {
    next(error);
  }
});

// 2-2. 카테고리 선택 시 상품 조회
adminRouter.get("/category/:categoryNo", async (req, res, next) => {
  try {
    // Content-Type: application/json 설정을 안 한 경우, 에러를 만들도록 함.
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    /*
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    } */

    const categoryNo = req.params.categoryNo;

    const products = await categoryService.findProduct(categoryNo);

    // 추가된 데이터를 프론트에 다시 보내줌
    res.status(201).json(products);
  } catch (error) {
    next(error);
  }
});

// 3-1. 카테고리 수정
adminRouter.patch("/category", async (req, res, next) => {
  try {
    // Content-Type: application/json 설정을 안 한 경우, 에러를 만들도록 함.
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    /*
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    } */

    const categoryInfo = req.body;

    const updatedCategory = await categoryService.updateCategory(categoryInfo);

    // 추가된 데이터를 프론트에 다시 보내줌
    res.status(201).json(updatedCategory);
  } catch (error) {
    next(error);
  }
});

// 3-2. 상품 수정
adminRouter.patch("/category/:categoryNo/:productName", async (req, res, next) => {
  try {
    // Content-Type: application/json 설정을 안 한 경우, 에러를 만들도록 함.
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    /*
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    } */

    // req에서 데이터 가져오기
    const categoryNo = req.params.categoryNo;
    const productName = req.params.productName;
    const update = req.body;

    // db에 추가
    const updatedProduct = await categoryService.updateProduct(categoryNo, productName, update);

    // 추가된 데이터를 프론트에 다시 보내줌
    res.status(201).json(updatedProduct);
  } catch (error) {
    next(error);
  }
});

// 4-1. 카테고리 삭제
adminRouter.delete("/category", async (req, res, next) => {
  try {
    // Content-Type: application/json 설정을 안 한 경우, 에러를 만들도록 함.
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    /*
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    } */

    const categoryNo = req.body;

    const deletedCategory = await categoryService.deleteCategory(categoryNo);

    if(deletedCategory === false) {
      res.status(201).json("상품이 존재합니다. 확인 후 다시 시도해주세요.");
    } else {
      // 추가된 데이터를 프론트에 다시 보내줌
      res.status(201).json(deletedCategory);
    }
  } catch (error) {
    next(error);
  }
});

// 4-2. 상품 삭제
adminRouter.delete("/category/:categoryNo", async (req, res, next) => {
  try {
    // Content-Type: application/json 설정을 안 한 경우, 에러를 만들도록 함.
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    /*
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    } */

    const categoryNo = req.params.categoryNo;
    const productName = req.body;
    const deleteInfo = { categoryNo, productName }

    const deletedProduct = await categoryService.deleteProduct(deleteInfo);

    // 추가된 데이터를 프론트에 다시 보내줌
    res.status(201).json(deletedProduct);
  } catch (error) {
    next(error);
  }
});

export { adminRouter };
