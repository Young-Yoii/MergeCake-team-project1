import {categoryModel, orderModel} from "../db";

class CategoryService {
  constructor(categoryModel) {
    this.categoryModel = categoryModel;
  }

  // 1. 카테고리 추가
  async addCategory(categoryInfo) {
    const createdNewCategory = await this.categoryModel.addCategory(categoryInfo);

    return createdNewCategory;
  }

  // 2-0. 카테고리 조회 (3중 객체로 대카테고리, 소카테고리, 상품 반환)
  async findCategoryAll() {
    let bigCategoryObj = {};
    let smallCategoryObj = {};
    let valueObj = {};

    const bigCategorys = await this.categoryModel.findBigCategory();

    for(let index in bigCategorys) {
      smallCategoryObj = {};

      const smallCategoryInfo = { CATEGORY_BIG: bigCategorys[index]};
      const smallCategorys = await this.categoryModel.findSmallCategory(smallCategoryInfo);

      for(let index2 in smallCategorys) {
        valueObj = {};

        const valueInfo = { CATEGORY_SMALL: smallCategorys[index2]};
        const values = await this.categoryModel.findProduct(valueInfo);

        for(let index3 in values) {
          valueObj[values[index3].VALUE] = values[index3].DETAIL;
        }
        smallCategoryObj[smallCategorys[index2]] = valueObj;
      }
      bigCategoryObj[bigCategorys[index]] = smallCategoryObj;
    }

    return bigCategoryObj;
  }

  // 2-1. 대카테고리 조회
  async findBigCategory() {
    const bigCategorys = await this.categoryModel.findBigCategory();

    return bigCategorys;
  }

  // 2-2. 소카테고리 및 상품 조회
  async findCategoryInfo(bigCategory) {
    const bigCategoryInfo = { CATEGORY_BIG: bigCategory }
    const categorys = await this.categoryModel.findCategoryInfo(bigCategoryInfo);

    return categorys;
  }

  // 2-3. 대카테고리, 소카테고리 조회
  async findCategory() {
    let bigCategoryObj = {};
    let smallCategoryObj = [];

    const bigCategorys = await this.categoryModel.findBigCategory();

    for(let index in bigCategorys) {
      smallCategoryObj = [];

      const smallCategoryInfo = { CATEGORY_BIG: bigCategorys[index]};
      const smallCategorys = await this.categoryModel.findSmallCategory(smallCategoryInfo);

      for(let index2 in smallCategorys) {
        smallCategoryObj.push(smallCategorys[index2]);
      }
      bigCategoryObj[bigCategorys[index]] = smallCategoryObj;
    }
    return bigCategoryObj;
  }

  // 2-4. 상품 조회
  async findProduct(bigCategory, smallCategory) {
    const categoryInfo = {
      CATEGORY_BIG: bigCategory,
      CATEGORY_SMALL: smallCategory
    }

    const products = await this.categoryModel.findCategoryInfo(categoryInfo);

    return products;
  }

  // 3-1. 대카테고리 수정
  async updateBigCategory(bigCategory, categoryInfo) {
    const updateInfo = {
      CATEGORY_BIG: categoryInfo
    }

    const updatedCategory = await this.categoryModel.updateBigCategory({ bigCategory, update: updateInfo });

    return updatedCategory;
  }

  // 3-2. 소카테고리 수정
  async updateSmallCategory(bigCategory, smallCategory, categoryInfo) {
    const updateInfo = {
      CATEGORY_SMALL: categoryInfo
    }

    const updatedCategory = await this.categoryModel.updateSmallCategory({ bigCategory, smallCategory, update: updateInfo });

    return updatedCategory;
  }

  // 3-3. 상품 수정
  async updateProduct(productInfo, categoryInfo) {
    const updatedCategory = await this.categoryModel.updateProduct({ productInfo, update: categoryInfo });

    return updatedCategory;
  }

  // 4. 카테고리 및 상품 삭제
  async deleteCategory(categoryInfo) {
    const deletedCategory = await this.categoryModel.delete(categoryInfo);

    return deletedCategory;
  }
}

const categoryService = new CategoryService(categoryModel);

export { categoryService };
