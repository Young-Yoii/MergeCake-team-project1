import { model } from "mongoose";
import { CategorySchema } from "../schemas/category-schema";

const Category = model("Category", CategorySchema);

export class CategoryModel {
  // 1. 카테고리 및 상품 추가
  async create(categoryInfo) {
    const newCategory = await Category.create(categoryInfo);

    return newCategory;
  }

  // 2-1. 카테고리 및 상춤 전체 조회
  async findAll() {
    const categorys = await Category.find({});
    return categorys;
  }

  // 2-2. 카테고리 이름으로 조회
  async findByName(categoryName) {
    const category = await Category.findOne({ categoryName });
    return category;
  }

  // 3-1. 카테고리 수정
  async update({ categoryName, update }) {
    const filter = { CATEGORY_NAME: categoryName };
    const option = { returnOriginal: false };

    const updatedCategory = await Category.update(filter, update, option);
    return updatedCategory;
  }

  // 4. 카테고리 및 상품 삭제
  async delete(categoryName) {
    const deletedCategory = await Category.deleteMany({ CATEGORY_NAME: categoryName });
    return deletedCategory;
  }
}

const categoryModel = new CategoryModel();

export { categoryModel };