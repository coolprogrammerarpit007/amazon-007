`use script`;

import { products } from "../data/products.js";
import {
  cart,
  removeFromCart,
  updateItemQtyFromCart,
  shippingDelivery,
} from "../data/cart.js";
import { formatCurrency } from "./utils/money.js";
import { deliveryOptions } from "../data/deliveryOptions.js";
// importing external library dayjs
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
// the above syntax is called default import, when there is only one thing you want to import

function renderOrderSummary() {
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

    // Generating HTML FOR DEIVERY OPTIONS

    const deliveryId = cartItem.deliveryOptionId;
    let deliveryOption;

    deliveryOptions.forEach((option) => {
      if (deliveryId === option.id) {
        deliveryOption = option;
      }
    });

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
    const dateStr = deliveryDate.format(`dddd, MMMM, D`);

    cartSummaryHTML += `
  <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date delivery-date-${
        matchingProduct.id
      }">Delivery date: ${dateStr}</div>

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
            <span> Quantity: <span class="quantity-label quantity-label-${productId}">${
      cartItem.qty
    }</span> </span>
            <span class="update-quantity-link js-update-link link-primary" data-product-id="${
              matchingProduct.id
            }">
              Update
            </span>
            <input class="quantity-input quantity-input-${productId}">
            <span class="save-quantity-link link-primary save-quantity-link-${productId}">Save</span>
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
          ${deliveryOptionsHTML(matchingProduct, cartItem)}     
          </div>
        </div>
      </div>
 </div>
  `;
  });

  // Functuanility of order summary of products
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

      // Function to be called to update prodcts at payment cart
      totalPaymentProducts();

      // function to be called to update the total product cost
      totalItemCost();
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
    return total;
  };

  updatedCartItems();
  // ***********************************
  // ***********************************

  // selecting all update links from the cart

  const updateBtns = document.querySelectorAll(`.js-update-link`);

  // Adding loop to update buttons, then adding event to those btns and getting product-id

  updateBtns.forEach((updateBtn) => {
    updateBtn.addEventListener(`click`, function (e) {
      const productId = updateBtn.dataset.productId;
      console.log(productId);

      // when update btn got clicked, make it appear save btn and input btn

      // setting display of both input and save btn display default value.

      // getting acess to both save and input btn

      const qtyInput = document.querySelector(`.quantity-input-${productId}`);
      const qtySave = document.querySelector(
        `.save-quantity-link-${productId}`
      );
      qtyInput.style.display = `initial`;
      qtySave.style.display = `initial`;

      // getting acess to the label item qty

      const qtyLabel = document.querySelector(`.quantity-label-${productId}`);

      // **********************************
      // Adding event to the save btn
      qtySave.addEventListener(`click`, function () {
        let qtyInputValue = Number(qtyInput.value);
        console.log(qtyInputValue);

        // Now updating that value to cart

        updateItemQtyFromCart(productId, qtyInputValue);

        // Now calling total cart item function to update total cart item value
        updatedCartItems();

        // updating item qty on dom
        qtyLabel.textContent = qtyInputValue;

        // After save btn got clicked both save btn and input should get hidden
        qtyInput.style.display = `none`;
        qtySave.style.display = `none`;

        // Function to be called to update prodcts at payment cart
        totalPaymentProducts();

        // function to be called to update the total product cost
        totalItemCost();
      });
    });
  });

  // *********************************
  // *********************************

  // function to generate delivery options html

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = ``;
    deliveryOptions.forEach((option) => {
      const today = dayjs();
      const deliveryDate = today.add(option.deliveryDays, "days");
      const dateStr = deliveryDate.format(`dddd, MMMM, D`);
      const priceStr =
        option.priceCents === 0
          ? `FREE SHIPPING`
          : `$${option.priceCents / 100} - Shipping`;

      const isChecked = option.id === cartItem.deliveryOptionId;

      html += `
    <div class="delivery-option js-delivery-option"
    data-product-id="${matchingProduct.id}"
    data-delivery-option-id="${option.id}"
    >
            <input
              type="radio"
              ${isChecked ? `checked` : ``}
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}" id="${option.id}"

            />
            <div>
              <div class="delivery-option-date delivery-option-date-${
                option.id
              }">${dateStr}</div>
              <div class="delivery-option-price">${priceStr}</div>
            </div>
    </div>
    `;
    });
    return html;
  }

  // Adding Interactivity to the shipping options to the cart

  // selecting all shipping delivery options and  adding event listener to them

  const radioInput = document.querySelectorAll(`.js-delivery-option`);

  radioInput.forEach((choice) => {
    choice.addEventListener(`change`, function (e) {
      // storing deliveryOptionId
      // let deliveryOptionId = choice.id;

      // stooring the productId of the product
      // const productId = choice
      // .getAttribute(`name`)
      // .replace(`delivery-option-`, ``);

      // getting the productId and deliveryOptionId
      const { productId, deliveryOptionId } = choice.dataset;

      // Now, a function shippingDelivery() wil be called to update shipping option to cart

      shippingDelivery(productId, deliveryOptionId);

      // *******************************
      // *******************************

      // *******************************
      // *******************************

      // Now updating the delivery date of product

      // Updating delivery date
      renderOrderSummary();

      // **********************************
      // **********************************
      // **********************************
    });
  });
}

renderOrderSummary();

// *************************************
// *************************************
// *************************************
// *************************************

// Adding functuanility of product summary

// getting acess to the payment summary
const paymentSummary = document.querySelector(`.payment-summary`);

// updating total products at the payment summary

const totalPaymentProducts = () => {
  const totalItems = document.getElementById(`total-items`);
  totalItems.textContent = `Items (${updatedCartItems()})`;
};

// Function wil be caled when page loads
totalPaymentProducts();

// Calculating total money at product cart
let totalProductsCost = 0; // state variable to calculate totalProductCost

const totalItemCost = () => {
  // when function starts to implement make
  totalProductsCost = 0; // it to default value
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    // Normalizing the data, finding the price of the product which matches productId
    products.forEach((product) => {
      if (productId === product.id) {
        // if matches productID then calculate total product cost with multiple by product quantity
        totalProductsCost =
          totalProductsCost + (product.priceCents / 100) * cartItem.qty;
      }
    });

    // updating the dom for the total product cost
    document.getElementById(`total-product-money`).textContent =
      totalProductsCost.toFixed(2);
  });
};

totalItemCost();

// *****************************************
// *****************************************
// *****************************************
// *****************************************
