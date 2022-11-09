import { model } from "mongoose";
import { CategorySchema } from "../schemas/category-schema";
import { ProductSchema } from "../schemas/product-schema";

const Category = model("Category", CategorySchema);
const Product = model("Product", ProductSchema);

export class CategoryModel {
  // 0. CATEGORY_NO 생성
  async findMaxCategoryNo() {
    const maxCategoryNo = await Category.findOne().sort('-CATEGORY_NO')

    return maxCategoryNo.CATEGORY_NO + 1;
  }

  // 1-1. 카테고리 추가
  async addCategory(categoryInfo) {
    const newCategory = await Category.create(categoryInfo);

    return newCategory;
  }

  // 1-2. 상품 추가
  async addProduct(productInfo) {
    const newProduct = await Product.create(productInfo);

    return newProduct;
  }

  // 2-1. 카테고리 조회 (전체)
  async findCategory() {
    const categorys = await Category.find({});

    return categorys;
  }

  // 2-2. 카테고리 조회
  async findCategoryName(categoryInfo) {
    const categoryName = await Category.findOne(categoryInfo);

    return categoryName;
  }

  // 2-3. 상품 조회
  async findProduct(productInfo) {
    const products = await Product.find(productInfo)

    return products;
  }

  // 3-1. 카테고리 수정
  async updateCategory(categoryInfo) {
    const filter = { CATEGORY_NO: categoryInfo.CATEGORY_NO };
    const option = { returnOriginal: false };
    const update = { CATEGORY_NAME: categoryInfo.CATEGORY_NAME }

    const updatedCategory = await Category.updateOne(filter, update, option);

    return updatedCategory;
  }

  // 3-2. 상품 수정
  async updateProduct(categoryNo, update) {
    const filter = {
      CATEGORY_NO: categoryNo
    };

    const option = { returnOriginal: false };

    const updatedCategory = await Product.updateOne(filter, update, option);

    return updatedCategory;
  }

  // 4-1. 카테고리 삭제
  async deleteCategory(categoryNo) {
    const deletedCategory = await Category.deleteOne(categoryNo);

    return deletedCategory;
  }

  // 4-2. 상품 삭제
  async deleteProduct(deleteInfo) {
    const deleteInfos = {
      CATEGORY_NO: parseInt(deleteInfo.categoryNo),
      PRODUCT_NAME: deleteInfo.productName.PRODUCT_NAME
    }

    const deletedCategory = await Product.deleteOne(deleteInfos);

    return deletedCategory;
  }
}

const categoryModel = new CategoryModel();

export { categoryModel };