`use strict`;
import { products } from "./products.js";
import { itemQty } from "../scripts/test-amazon.js";
export const cart = [];

// ************************************
// ************************************
// Function for adding produts to the cart

export const addCartProducts = function (productId, i) {
  // ****************************
  let matchingItem;
  // when a same product added to cart
  // *****************************

  // Now checking if product already in cart, if it is then increasing the quantity.
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.qty = matchingItem.qty + Number(itemQty);
  } else {
    cart.push({
      productId: productId,
      productName: products[i].name,
      qty: Number(itemQty),
    });
  }
};

// ************************************
// ************************************
