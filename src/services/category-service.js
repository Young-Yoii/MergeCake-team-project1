import {categoryModel } from "../db";

class CategoryService {
  constructor(categoryModel) {
    this.categoryModel = categoryModel;
  }

  // 0. CATEGORY_NO 생성
  async findMaxCategoryNo() {
    const maxCategoryNo = await this.categoryModel.findMaxCategoryNo();

    return maxCategoryNo;
  }

  // 1-1. 카테고리 추가
  async addCategory(categoryInfo) {
    const maxCategoryNo = await this.categoryModel.findMaxCategoryNo();

    const categoryInfos = {
      CATEGORY_NO: maxCategoryNo,
      CATEGORY_NAME: categoryInfo.CATEGORY_NAME
    }

    const createdNewCategory = await this.categoryModel.addCategory(categoryInfos);

    return createdNewCategory;
  }

  // 1-2. 상품 추가
  async addProduct(productInfo) {
    const productInfos = {
      CATEGORY_NO: productInfo.categoryNo,
      PRODUCT_NAME: productInfo.PRODUCT_NAME,
      DETAIL: productInfo.DETAIL
    }

    const createdNewProduct = await this.categoryModel.addProduct(productInfos);

    return createdNewProduct;
  }

  // 2-1. 카테고리 조회
  async findCategory() {
    const categorys = await this.categoryModel.findCategory();

    return categorys;
  }

  // 2-2. 상품 조회
  async findProduct(category) {
    const categoryInfo = {
      CATEGORY_NO: category
    }

    const categoryName = await this.categoryModel.findCategoryName(categoryInfo);
    const products = await this.categoryModel.findProduct(categoryInfo);

    /*
    for(let i in products) {
      products[i]['CATEGORY_NAME'] = categoryName.CATEGORY_NAME;
      console.log(products[i])
    } */

    const product = {
      CATEGORY_NAME: categoryName.CATEGORY_NAME,
      products
    }

    return product;
  }

  // 3-1. 카테고리 수정
  async updateCategory(categoryInfo) {
    const updatedCategory = await this.categoryModel.updateCategory(categoryInfo);

    return updatedCategory;
  }

  // 3-2. 상품 수정
  async updateProduct(categoryNo, update) {
    const updatedCategory = await this.categoryModel.updateProduct(categoryNo, update);

    return updatedCategory;
  }

  // 4-1. 카테고리 삭제
  async deleteCategory(categoryNo) {
    const productExist = await this.categoryModel.findProduct(categoryNo);

    if(productExist.length === 0) {
      const deletedCategory = await this.categoryModel.deleteCategory(categoryNo);

      return deletedCategory;
    } else {
      return false;
    }
  }

  // 4-2. 상품 삭제
  async deleteProduct(deleteInfo) {
    const deletedProduct = await this.categoryModel.deleteProduct(deleteInfo);

    return deletedProduct;
  }
}

const categoryService = new CategoryService(categoryModel);

export { categoryService };
