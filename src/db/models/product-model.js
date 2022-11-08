import { model } from "mongoose";
import { ProductSchema } from "../schemas/product-schema";

const Product = model("Product", ProductSchema);

export class ProductModel {
  // 1. 상품 추가
  async addProduct(productInfo) {
    const newProduct = await Product.create(productInfo);

    return newProduct;
  }
}

const productModel = new ProductModel();

export { productModel };