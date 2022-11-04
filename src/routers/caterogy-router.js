import { Router } from "express";
import { categoryService } from "../services";

const categoryRouter = Router();

// 1. 카테고리 및 상품 추가
categoryRouter.post("/category", async (req, res, next) => {
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
    const { CATEGORY_NAME, VALUE, DETAIL } = req.body;
    const categoryInfo = { CATEGORY_NAME, VALUE, DETAIL };

    // db에 추가
    const newCategory = await categoryService.addCategory(categoryInfo);

    // 추가된 데이터를 프론트에 다시 보내줌
    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
});

// 2. 카테고리 및 상품 조회
categoryRouter.get("/category", async (req, res, next) => {
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
    const categorys = await categoryService.findCategoryAll();

    // 추가된 데이터를 프론트에 다시 보내줌
    res.status(201).json(categorys);
  } catch (error) {
    next(error);
  }
});

// 3-1. 카테고리 수정
categoryRouter.patch("/category/:categoryName", async (req, res, next) => {
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
    const { CATEGORY_NAME, VALUE, DETAIL } = req.body;
    const categoryInfo = { CATEGORY_NAME, VALUE, DETAIL };

    // db에 추가
    const updatedCategory = await categoryService.updateCategory(categoryName, categoryInfo);

    // 추가된 데이터를 프론트에 다시 보내줌
    res.status(201).json(updatedCategory);
  } catch (error) {
    next(error);
  }
});

// 3-2. 상품 수정
categoryRouter.patch("/category/:categoryName&&categoryInfo", async (req, res, next) => {
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
    const productName = req.params.categoryInfo;
    const productInfo = { categoryName, productName };
    const { CATEGORY_NAME, VALUE, DETAIL } = req.body;
    const categoryInfo = { CATEGORY_NAME, VALUE, DETAIL };

    // db에 추가
    const updatedCategory = await categoryService.updateProduct(productInfo, categoryInfo);

    // 추가된 데이터를 프론트에 다시 보내줌
    res.status(201).json(updatedCategory);
  } catch (error) {
    next(error);
  }
});

// 4. 카테고리 및 상품 삭제
categoryRouter.delete("/category/:categoryName", async (req, res, next) => {
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

    // db에 추가
    const deletedCategory = await categoryService.deleteCategory(categoryName);

    // 추가된 데이터를 프론트에 다시 보내줌
    res.status(201).json(deletedCategory);
  } catch (error) {
    next(error);
  }
});

export { categoryRouter };
