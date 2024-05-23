`use script`;

import { products } from "../data/products.js";
import { cart, removeFromCart } from "../data/cart.js";
import { formatCurrency } from "./utils/money.js";

// state variables
let cartSummaryHTML = ``;

// Looping over cart Array to generate checkout page.

cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  let matchingProduct;
  // Now, looping over products array and find the product id of the cart item in that array, and when find it get all the product details, this is called the de-duplicating the data.

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  cartSummaryHTML += `
  <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">Delivery date: Tuesday, June 21</div>

      <div class="cart-item-details-grid">
        <img
          class="product-image"
          src="${matchingProduct.image}"
        />

        <div lclass="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">$${formatCurrency(
            matchingProduct.priceCents
          )}</div>
          <div class="product-quantity product-quantity-${productId}">
            <span> Quantity: <span class="quantity-label">${
              cartItem.qty
            }</span> </span>
            <span class="update-quantity-link js-update-link link-primary" data-product-id="${
              matchingProduct.id
            }">
              Update
            </span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id = "${
              matchingProduct.id
            }">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          <div class="delivery-option">
            <input
              type="radio"
              checked
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}"
            />
            <div>
              <div class="delivery-option-date">Tuesday, June 21</div>
              <div class="delivery-option-price">FREE Shipping</div>
            </div>
          </div>
          <div class="delivery-option">
            <input
              type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}"
            />
            <div>
              <div class="delivery-option-date">Wednesday, June 15</div>
              <div class="delivery-option-price">$4.99 - Shipping</div>
            </div>
          </div>
          <div class="delivery-option">
            <input
              type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}"
            />
            <div>
              <div class="delivery-option-date">Monday, June 13</div>
              <div class="delivery-option-price">$9.99 - Shipping</div>
            </div>
          </div>
        </div>
      </div>
 </div>
  `;
});

// Storing the order Summary of products

const orderSummary = document.querySelector(`.js-order-summary`);
orderSummary.innerHTML = cartSummaryHTML;

// Selecting all delete links and adding event listener to them to remove products from cart.

const deleteBtns = document.querySelectorAll(`.js-delete-link`);

deleteBtns.forEach((deleteBtn) => {
  deleteBtn.addEventListener(`click`, function (e) {
    const productId = deleteBtn.dataset.productId;
    removeFromCart(productId);
    // updating HTML by removing product from cart

    // Calling function to update dom and display updated cart quantity
    updatedCartItems();

    // *************************
    // *************************
    document.querySelector(`.js-cart-item-container-${productId}`).remove();
  });
});

// ***********************************
// ***********************************

// ************************************
// ************************************

// calculating thee total Items at cart and showing it on the checkout page the updated cart quantit

// getting acess to the dom of totalCartItems at the checkout page.
const totalCartItems = document.querySelector(`.js-total-cart-items`);

// calaculating total Cart Items

// function will calculate total Items at cart and the update it to dom as well.
const updatedCartItems = function () {
  let total = 0;
  cart.forEach((cartItem) => {
    total += cartItem.qty;
  });
  totalCartItems.textContent = `Item Quantity: ${total}`;
};

updatedCartItems();
// ***********************************
// ***********************************

// selecting all update links from the cart

const updateBtns = document.querySelectorAll(`.js-update-link`);

updateBtns.forEach((updateBtn) => {
  updateBtn.addEventListener(`click`, function (e) {
    // getting product Id of the update button
    const productId = updateBtn.dataset.productId;

    // this got created everytime update button got clicked!
    let html = `
    <div class="updated-product-quantity">
      <input class="quantity-input">
      <span class="save-quantity-link">Save</span>
    </div>
    `;

    // Adding input and save element to dom of product-quantity
    document.querySelector(`.product-quantity-${productId}`).innerHTML += html;

    // Now when user put value in input and click on save button cart-quantity should also be updated in carts array and dom should also be updated.
    document.querySelector(`.updated-product-quantity`).style.display = `block`;
  });
});
