import { model } from "mongoose";
import { CategorySchema } from "../schemas/category-schema";

const Category = model("Category", CategorySchema);

export class CategoryModel {
  // 1. 카테고리 및 상품 추가
  async create(categoryInfo) {
    const newCategory = await Category.create(categoryInfo);

    return newCategory;
  }

  // 2. 카테고리 및 상춤 전체 조회
  async findAll() {
    const categorys = await Category.find({});
    return categorys;
  }

  // 2-1. 대카테고리 중복 제거 조회
  async findBigCategory() {
    const bigCategorys = await Category.distinct('CATEGORY_BIG');

    return bigCategorys;
  }

  // 2-2. 소카테고리 중복 제거 조회
  async findSmallCategory(smallCategoryInfo) {
    const smallCategorys = await Category.find(smallCategoryInfo).distinct('CATEGORY_SMALL');

    return smallCategorys;
  }

  // 2-3. 소카테고리 및 상품 조회
  async findCategoryInfo(bigCategoryInfo) {
    const smallCategorys = await Category.find(bigCategoryInfo);

    return smallCategorys;
  }

  // 2-4. 상품 조회
  async findValue(valueInfo) {
    const values = await Category.find(valueInfo)

    return values;
  }

  // 3-1. 대카테고리 수정
  async updateBigCategory({ bigCategory, update }) {
    const filter = { CATEGORY_BIG: bigCategory };
    const option = { returnOriginal: false };

    const updatedCategory = await Category.update(filter, update, option);
    return updatedCategory;
  }

  // 3-2. 소카테고리 수정
  async updateSmallCategory({ bigCategory, smallCategory, update }) {
    const filter = {
      CATEGORY_BIG: bigCategory,
      CATEGORY_SMALL: smallCategory
    };
    const option = { returnOriginal: false };

    const updatedCategory = await Category.update(filter, update, option);
    return updatedCategory;
  }

  // 3-3. 상품 수정
  async updateProduct({ productInfo, update }) {
    const filter = {
      CATEGORY_BIG: productInfo.bigCategory,
      CATEGORY_SMALL: productInfo.smallCategory,
      VALUE: productInfo.product
    };

    const option = { returnOriginal: false };

    const updatedCategory = await Category.update(filter, update, option);
    return updatedCategory;
  }

  // 4. 카테고리 삭제
  async delete(categoryInfo) {
    const deletedCategory = await Category.deleteMany(categoryInfo);

    return deletedCategory;
  }
}

const categoryModel = new CategoryModel();

export { categoryModel };