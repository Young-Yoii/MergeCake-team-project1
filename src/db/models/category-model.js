import { model } from "mongoose";
import { CategorySchema } from "../schemas/category-schema";

const Category = model("categorys", CategorySchema);

export class UserModel {

  //카테고리 이름으로 검색
  async findByName(name) {
    const category = await Category.findOne({ name });
    return category;
  }


  //카테고리 value 로 검색 
  async findByValue(value) {
    const value = await User.findOne({ value: value });
    return value;
  }

  //카테고리 만들기
  async create(categoryInfo) {
    const createdNewCategory = await Category.create(categoryInfo);
    return createdNewCategory;
  }

  //전체 검색 
  async findAll() {
    const categorys = await Category.find({});
    return categorys;
  }

  //업데이트
  async update({ categoryId, update }) {
    const filter = { _id: categoryId };
    const option = { returnOriginal: false };

    const updatedCategory = await User.findOneAndUpdate(filter, update, option);
    return updatedCategory;
  }

  //삭제 
  async delete(categoryId) {
    const deletedCategory = await Product.deleteOne({ _id: categoryId });
    return deletedCategory;
  }
}

const categoryModel = new CategoryModel();

export { categoryModel };
