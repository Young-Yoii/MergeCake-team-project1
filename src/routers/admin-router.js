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

    const { PRODUCT, DETAIL } = req.body;
    const categoryInfo = { PRODUCT, DETAIL };

    // db에 추가
    const updatedProduct = await categoryService.updateProduct(productInfo, categoryInfo);

    // 추가된 데이터를 프론트에 다시 보내줌
    res.status(201).json(updatedProduct);
  } catch (error) {
    next(error);
  }
});

// 4. 대카테고리 삭제 (req.body로 요청해주세요)
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
    //const categoryInfo = req.params.categorybig; 
    //const categoryInfo = req.body.CATEGORY_BIG;
    const { CATEGORY_BIG , CATEGORY_SMALL , PRODUCT } = req.body;
    if(CATEGORY_BIG){
      console.log("deleteBigCategory")
    const categoryInfo = req.body.CATEGORY_BIG;
    const deletedCategory = await categoryService.deleteBigCategory(categoryInfo);
    res.status(201).json(deletedCategory);
    }else if(CATEGORY_SMALL){
      console.log("deleteSmallCategory")
      const categoryInfo = req.body.CATEGORY_SMALL;
      const deletedCategory = await categoryService.deleteSmallCategory(categoryInfo);
      res.status(201).json(deletedCategory);
    }else if(PRODUCT){
      console.log("deleteProduct")
      const categoryInfo = req.body.PRODUCT;
      const deletedCategory = await categoryService.deleteProduct(categoryInfo);
      res.status(201).json(deletedCategory);
    }
    // 추가된 데이터를 프론트에 다시 보내줌
   // res.status(201).json(deletedCategory);
  } catch (error) {
    next(error);
  }
});


export { adminRouter };
