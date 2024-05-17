`use strict`;

// importing data from file
import { cart } from "./../data/cart.js";
import { products } from "../data/products.js";

// ***************************************
const productGrid = document.querySelector(`.products-grid`);

// Generating products/html
let productHTML = ``;

products.forEach((product) => {
  productHTML += `<div class="product-container">
          <div class="product-image-container">
            <img
              class="product-image"
              src="./../${product.image}"
            />
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img
              class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png"
            />
            <div class="product-rating-count link-primary">${
              product.rating.count
            }</div>
          </div>

          <div class="product-price">$${(product.priceCents / 100).toFixed(
            2
          )}</div>

          <div class="product-quantity-container">
            <select class="qty-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png" />
            Added
          </div>

          <button class="add-to-cart-button button-primary" data-product-id="${
            product.id
          }">Add to Cart</button>
        </div>`;
});

// State variables
// **********************************
// this is for select element for selecting the item quantity to be added to the cart.
let itemQty = 0;

// ***********************************

productGrid.innerHTML = productHTML;

// storing the cart quantity
const cartQty = document.querySelector(`.cart-quantity`);

cartQty.textContent = 0;

// storing the addedToCart checkmark
const checkMark = document.querySelectorAll(`.added-to-cart`);

// storing the add to cart buttons

const addCartBtn = document.querySelectorAll(`.add-to-cart-button`);

// Adding the event listener to the add to cart button

addCartBtn.forEach((addBtn, i) => {
  addBtn.addEventListener(`click`, function (e) {
    // Adding products to the cart

    // unique id for the every product
    const productId = addBtn.dataset.productId;

    // Now checking if product already in cart, if it is then increasing the quantity.
    // Showing the checkmark
    checkMark[i].style.opacity = "1";

    // removing after 2 seconds
    const myTimeOut = setTimeout(() => {
      checkMark[i].style.opacity = "0";
    }, "2000");

    // ****************************
    let matchingItem;
    // when a same product added to cart
    // *****************************
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

    // calculating the total quantity of cart

    // this is for total quantity at the cart.
    let totalCartQuantity = 0;
    // *****************************

    cart.forEach((cartItem) => {
      totalCartQuantity += cartItem.qty;
    });

    cartQty.textContent = totalCartQuantity;

    console.log(cart);
  });
});

// Selecting the select btn to selectively select the quantity and updating the quantity of element in the cart.

const selectBtns = document.querySelectorAll(`select`);

selectBtns.forEach((selectBtn) => {
  itemQty = 0;
  selectBtn.addEventListener(`click`, function (e) {
    itemQty = selectBtn.value;
  });
});
