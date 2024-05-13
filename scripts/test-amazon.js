`use strict`;

const productGrid = document.querySelector(`.products-grid`);

// state variable
let option = 1;

// Saving the data

// Generating HTML
let productsHTML = ``;
products.forEach((product) => {
  productsHTML += `<div class="product-container">
          <div class="product-image-container">
            <img
              class="product-image"
              src="${product.image}"
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
            <select class="qty-selector">
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

          <button class="add-to-cart-button button-primary add-product-cart" data-product-id="${
            product.id
          }">Add to Cart</button >
        </div>`;
});

productGrid.innerHTML = productsHTML;

// Event Listener to the addCart Button
const addCart = document.querySelectorAll(`.add-product-cart`);
const cartQty = document.querySelector(`.cart-quantity`);
cartQty.textContent = 0;

addCart.forEach((cartBtn, i) => {
  cartBtn.addEventListener(`click`, (e) => {
    const productId = cartBtn.dataset.productId;

    // check if product already exists in cart
    let matchingItem;
    cart.forEach((item) => {
      if (productId === item.productId) {
        matchingItem = item;
      }
    });
    if (matchingItem) {
      matchingItem.quantity += option;
    } else {
      cart.push({
        productId: productId,
        quantity: option,
      });
    }

    console.log(cart);
  });
});

// Selecting product quantity to be added to the shopping cart.

const selectBtn = document.querySelectorAll(`.qty-selector`);

// Adding event listener to the select button.

selectBtn.forEach((select) => {
  select.addEventListener(`click`, (e) => {
    option = Number(select.value);
  });
});
