`use strict`;
import { products } from "./products.js";
export let cart = [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    qty: 2,
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    qty: 1,
  },
];

// ************************************
// ************************************
// Function for adding produts to the cart

export const addCartProducts = function (productId, i, itemQty) {
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

// Function for removing a product from the cart

export const removeFromCart = function (productId) {
  const newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
    cart = newCart;
  });
};
