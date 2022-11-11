import { model } from "mongoose";
import { CartSchema } from "../schemas/cart-schema";

const Cart = model("carts", CartSchema);

export class CartModel {

  async findBySelectNo(selectNo) {
    const cart = await Cart.findOne({ selectNo : selectNo });
    return cart;
  }

  async create(selectInfo) {
    const createdNewCart = await Cart.create(selectInfo);
    return createdNewCart;
  }

  async findAll() {
    const carts = await Cart.find({});
    return carts;
  }

  async update({ selectId, update }) {
    const filter = { _id: selectId };
    const option = { returnOriginal: false };

    const updatedCart = await Cart.findOneAndUpdate(filter, update, option);
    return updatedCart;
  }

  async delete(selectId) {
    const deletedCart = await Cart.deleteOne({ _id: selectId });
    return deletedCart;
  }

}

const cartModel = new CartModel();

export { cartModel };
