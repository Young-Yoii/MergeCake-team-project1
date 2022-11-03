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
  async udtCategory(name, update) {
    const afterName = name;
    const { beforeName } = update;

    const updatedCategory = await this.categoryModel.update(name, update);

    return updatedCategory;
  }

  // 3-2. 상품 수정

  // 4. 카테고리 삭제
}

const categoryService = new CategoryService(categoryModel);

export { categoryService };
