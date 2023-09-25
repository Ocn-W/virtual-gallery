import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
// import CheckoutForm from './form';
import { PayPalButtons } from '@paypal/react-paypal-js';

export default function CheckoutPage() {
  const itemTotal = sumOfProducts();
  const taxes = taxCalc(itemTotal);
  const total = itemTotal + taxes;

  function sumOfProducts() {
    // const productSum = cartProductList
    //   .map((product) => product.price * product.quantity)
    //   .reduce((acc, currVal) => acc + currVal, 0);
    // return productSum;
    return 300
  }
  //NYC SALES TAX RATE IS 8.875% 
  //ADDITIONAL LOCAL TAX IS 4% 
  function taxCalc(itemTotal) {
    const taxRate = .08875;
    return Math.floor(taxRate * itemTotal);
  };

  // function removeProduct(id, size) {
  //   return updateCartProductList(cartProductList.filter((product) => product.id !== id || product.size !== size));
  // }

  return (
    <section className="checkout">

      <section className="checkoutForm">
        <h1>CHECKOUT</h1>
        <div className="products">
          <img src={""} />
          <p>artwork name</p>
          <p>$price</p>
          <p>Sz</p>
          <button style={{ color: "rgba(206, 29, 29, 0.5)" }}>Remove</button>
        </div>
        {/* <CheckoutForm/> */}
      </section>

      <section className="checkoutProducts">
        <div className="checkoutTotal">
          <div>
            <FontAwesomeIcon icon={faShoppingCart} />
            <p>Your Order</p>
          </div>
          <ul className="checkoutTotalInfo">
            <li>
              <p>Items</p>
              <p>${itemTotal}</p>
            </li>
            <li>
              <p>Taxes</p>
              <p>(8.875%) ${taxes}</p>
            </li>
            <li>
              <p>Total</p>
              <p>(USD) ${total}</p>
            </li>
          </ul>
        </div>
        <div>
          <PayPalButtons />
        </div>
      </section>

    </section>
  );
}
