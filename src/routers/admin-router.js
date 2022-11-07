import { Router } from "express";
import { orderService } from "../services";
import { categoryService } from "../services";
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

// 3) category
// 1. 카테고리 및 상품 추가
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
    const { CATEGORY_BIG, CATEGORY_SMALL, VALUE, DETAIL } = req.body;
    const categoryInfo = { CATEGORY_BIG, CATEGORY_SMALL, VALUE, DETAIL };

    // db에 추가
    const newCategory = await categoryService.addCategory(categoryInfo);

    // 추가된 데이터를 프론트에 다시 보내줌
    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
});

// 2-3. 대카테고리, 소카테고리 조회
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

// 2-2. 대카테고리, 소카테고리 선택 시 상품 조회
adminRouter.get("/category/:bigCategory/:smallCategory", async (req, res, next) => {
  try {
    // Content-Type: application/json 설정을 안 한 경우, 에러를 만들도록 함.
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    /*
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    } */

    const bigCategory = req.params.bigCategory;
    const smallCategory = req.params.smallCategory;

    const products = await categoryService.findProduct(bigCategory, smallCategory);

    // 추가된 데이터를 프론트에 다시 보내줌
    res.status(201).json(products);
  } catch (error) {
    next(error);
  }
});

// 3-1. 대카테고리 수정
adminRouter.patch("/category/:bigCategory", async (req, res, next) => {
  try {
    // Content-Type: application/json 설정을 안 한 경우, 에러를 만들도록 함.
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    /*
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    } */

    const bigCategory = req.params.bigCategory;
    const categoryInfo = req.body.CATEGORY_BIG;

    const updatedCategory = await categoryService.updateBigCategory(bigCategory, categoryInfo);

    // 추가된 데이터를 프론트에 다시 보내줌
    res.status(201).json(updatedCategory);
  } catch (error) {
    next(error);
  }
});

// 3-2. 소카테고리 수정
adminRouter.patch("/category/:bigCategory/:smallCategory", async (req, res, next) => {
  try {
    // Content-Type: application/json 설정을 안 한 경우, 에러를 만들도록 함.
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    /*
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    } */

    const bigCategory = req.params.bigCategory;
    const smallCategory = req.params.smallCategory;
    const categoryInfo = req.body.CATEGORY_SMALL;

    const updatedCategory = await categoryService.updateSmallCategory(bigCategory, smallCategory, categoryInfo);

    // 추가된 데이터를 프론트에 다시 보내줌
    res.status(201).json(updatedCategory);
  } catch (error) {
    next(error);
  }
});

// 3-3. 상품 수정
adminRouter.patch("/category/:bigCategory/:smallCategory/:product", async (req, res, next) => {
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
    const bigCategory = req.params.bigCategory;
    const smallCategory = req.params.smallCategory;
    const product = req.params.product;
    const productInfo = { bigCategory, smallCategory, product };

    const { VALUE, DETAIL } = req.body;
    const categoryInfo = { VALUE, DETAIL };

    // db에 추가
    const updatedProduct = await categoryService.updateProduct(productInfo, categoryInfo);

    // 추가된 데이터를 프론트에 다시 보내줌
    res.status(201).json(updatedProduct);
  } catch (error) {
    next(error);
  }
});

// 4-1. 카테고리 삭제 (req.body로 요청해주세요)
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

    const categoryInfo = req.body;
    console.log(req.body)
    const { big, small, value} = categoryInfo;
    console.log(big, small)

    const deletedCategory = await categoryService.deleteCategory(categoryInfo);

    // 추가된 데이터를 프론트에 다시 보내줌
    res.status(201).json(deletedCategory);
  } catch (error) {
    next(error);
  }
});

// 4-2. 상품 삭제
adminRouter.delete("/category/:categoryName/:productName", async (req, res, next) => {
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
    const categoryName = req.params.categoryName;
    const productName = req.params.productName;
    const productInfo = { categoryName, productName };

    // db에 추가
    const deletedProduct = await categoryService.deleteProduct(productInfo);

    // 추가된 데이터를 프론트에 다시 보내줌
    res.status(201).json(deletedProduct);
  } catch (error) {
    next(error);
  }
});

export { adminRouter };
