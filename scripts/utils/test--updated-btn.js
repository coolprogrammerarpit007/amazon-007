// `use strict`;

// **************************
// **************************

// Not correctly implemented code
// updateBtns.forEach((updateBtn) => {
//   updateBtn.addEventListener(`click`, function (e) {
//     // getting product Id of the update button
//     const productId = updateBtn.dataset.productId;
//     console.log(productId);

//     // getting acess to the product container
//     const productContainer = document.querySelector(
//       `.js-cart-item-container-${productId}`
//     );

//     // this got created everytime update button got clicked!
//     let html = `
//     <div class="product-quantity-updated-${productId}">
//       <input class="quantity-input quantity-input-${productId}">
//       <span class="save-quantity-link link-primary save-quantity-link-${productId}">Save</span>
//     </div>
//     `;

//     // // Adding input and save element to dom of product-quantity

//     // getting acess to the product quantity container
//     const productQty = document.querySelector(`.product-quantity-${productId}`);

//     // Adding html to the dom
//     productQty.innerHTML += html;

//     // Gettiing acess to the save btn

//     const saveQty = document.querySelector(`.save-quantity-link-${productId}`);

//     // getting acess to the input element
//     const inputQty = document.querySelector(`.quantity-input-${productId}`);

//     // getting acess to the quantity label

//     const labelQty = document.querySelector(`.quantity-label-${productId}`);

//     // Adding event listener to the save btn so that when it got clicked it save the value from input by user, update the cart qty and update the dom as well.

//     saveQty.addEventListener(`click`, function () {
//       let qtyItemValue = Number(inputQty.value);

//       // updating cart
//       updateItemQtyFromCart(productId, qtyItemValue);

//       // updating quantity of product at cart
//       labelQty.textContent = qtyItemValue;

//       // calling function to calculate total Items at cart and showing it to the DOM.
//       updatedCartItems();

//       // ***************************
//       // ***************************
//       console.log(cart);

//       // checking if product contains is-editable class

//       const productQtyUpdated = document.querySelector(
//         `.product-quantity-updated-${productId}`
//       );
//       productQtyUpdated.remove();
//     });
//   });
// });
