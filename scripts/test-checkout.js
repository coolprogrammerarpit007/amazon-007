`use strict`;

import { products } from "../data/products.js";
import { cart } from "./../data/cart.js";

let productHtml = ``;
cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  // finding other product details using the unique product id
  let matchingItem;
  products.forEach((product) => {
    if (product.id === productId) {
      matchingItem = product;
    }
  });

  //dynamically generating product in the shopping cart.
  productHtml += `
  <div class="cart-item-container">
      <div class="delivery-date">Delivery date: Tuesday, June 21</div>

      <div class="cart-item-details-grid">
        <img
          class="product-image"
          src="${matchingItem.image}"
        />

        <div lclass="cart-item-details">
          <div class="product-name">
            ${matchingItem.name}
          </div>
          <div class="product-price">$${(matchingItem.priceCents / 100).toFixed(
            2
          )}</div>
          <div class="product-quantity">
            <span> Quantity: <span class="quantity-label">${
              cartItem.qty
            }</span> </span>
            <span class="update-quantity-link link-primary">
              Update
            </span>
            <span class="delete-quantity-link link-primary">
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
              name="delivery-option-1"
              value = "0.00"
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
              name="delivery-option-1"
              value = "4.99"
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
              name="delivery-option-1"
              value = "9.99"
            />
            <div>
              <div class="delivery-option-date">Monday, June 13</div>
              <div class="delivery-option-price">$9.99 - Shipping</div>
            </div>
          </div>
        </div>
      </div>
  </div>`;
});

const orderSummary = document.querySelector(`.order-summary`);
orderSummary.innerHTML = productHtml;

// **********************************
// **********************************
// **********************************

// Getting acess to the delivary Input radio buttons

// storing the payment summary

const paymentSummary = document.querySelector(`.payment-summary`);

// to store order summary html
let paymentHtml = ``;
let shippingValue = 0.0;
let totalCartPrice = 0.0;

// Storing total cart product Items
const totalCartItems = cart.reduce((sum, cartItem) => {
  return cartItem.qty + sum;
}, 0);

// ********************************
// ********************************

// ***********************************
// getting total price of all the cart items.
// Getting acess to the total price of all the items in the cart

const prices = document.querySelectorAll(`.product-price`);

const priceArr = [];
prices.forEach((price) => priceArr.push(price.textContent));

totalCartPrice = priceArr.reduce((sum, price) => {
  return sum + Number(price.replace(`$`, ``));
}, 0);

let tax = totalCartPrice * 0.1;
let totalMoney = (totalCartPrice + tax).toFixed(2);

// Getting total price of cart items

paymentHtml += `

      <div class="payment-summary-title">
      Order Summary
      </div>

      <div class="payment-summary-row">
        <div>Items (${totalCartItems}):</div>
        <div class="payment-summary-money">$${totalCartPrice}</div>
      </div>

      <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money shipping-cost">$${shippingValue}</div>
      </div>

      <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money total-price">$${totalCartPrice}</div>
      </div>

      <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money  tax-price">$${tax.toFixed(2)}</div>
      </div>

      <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money total-money">$${totalMoney}</div>
      </div>

      <button class="place-order-button button-primary">
        Place your order
      </button>

`;

// Injecting dynamically generated payment into payment summary
paymentSummary.innerHTML = paymentHtml;

// *************************************
// *************************************

// getting acess to the Radio Input buttons

const inputRadioBtns = document.querySelectorAll(`.delivery-option-input`);

// Adding event listeners to the input radio buttons

inputRadioBtns.forEach((inputRadio) => {
  inputRadio.addEventListener(`change`, function () {
    shippingValue = inputRadio.value;
    document.querySelector(`.shipping-cost`).textContent = `$${shippingValue}`;
    totalCartPrice = (Number(shippingValue) + Number(totalCartPrice)).toFixed(
      2
    );
    document.querySelector(`.total-price`).textContent = `$${totalCartPrice}`;
    tax = ((Number(totalCartPrice) + Number(shippingValue)) * 0.1).toFixed(2);
    document.querySelector(`.tax-price`).textContent = `${tax}`;

    totalMoney = (Number(totalCartPrice) + Number(tax)).toFixed(2);
    document.querySelector(`.total-money`).textContent = totalMoney;
  });
});
