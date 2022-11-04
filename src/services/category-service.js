import { categoryModel } from "../db";

class CategoryService {
  constructor(categoryModel) {
    this.categoryModel = categoryModel;
  }

  // 1. 카테고리 및 상품 추가
  async addCategory(categoryInfo) {
    const { CATEGORY_NAME, VALUE, DETAIL } = categoryInfo;

    // db에 저장
    const createdNewCategory = await this.categoryModel.create(categoryInfo);

    return createdNewCategory;
  }

  // 2. 카테고리 조회
  async findCategoryAll() {
    const categorys = await this.categoryModel.findAll();
    return categorys;
  }

  // 3-1. 카테고리 수정
  async updateCategory(categoryName, categoryInfo) {
    const { CATEGORY_NAME, VALUE, DETAIL } = categoryInfo;
    const updateCategory = { CATEGORY_NAME, VALUE, DETAIL };

    const updatedCategory = await this.categoryModel.update({ categoryName, update: updateCategory });

    return updatedCategory;
  }

  // 3-2. 상품 수정 // hyun - const 없이 바로 되는 지 확인
  async updateProduct(productInfo, categoryInfo) {
    const productId = await this.categoryModel.findByInfo(productInfo);

    const updatedCategory = await this.categoryModel.updateProduct({ productId, update: categoryInfo });

    return updatedCategory;
  }

  // 4-1. 카테고리 및 상품 삭제
  async deleteCategory(categoryName) {
    const deletedCategory = await this.categoryModel.delete(categoryName);

    return deletedCategory;
  }

  // 4-2. 상품 삭제
  async deleteProduct(productInfo) {
    const deletedProduct = await this.categoryModel.deleteProduct(productInfo);

    return deletedProduct;
  }
}

const categoryService = new CategoryService(categoryModel);

export { categoryService };
