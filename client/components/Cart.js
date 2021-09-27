/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, deleteProduct } from "../store/cartReducer";

const Cart = () => {
  const user = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.thisCart);
    //dispatch
    const dispatch = useDispatch();

  useEffect(() => {
    if (user !== null) {
      dispatch(fetchCart(user.id));
    }
  }, [user]);

  const products = cart.products || [];

  //Delete Button
  const deleteItemHandler = (event) => {
    console.log('The delete button was clicked!');
    console.log(event.target.name)
    dispatch(deleteProduct(user.id, event.target.name))
  }




  return (
    <>
      <h1 id="cart-title">Shopping Cart</h1>
      <div className="cart-container">
        <div className="cart-container-items">
          {products.map((product) => {
            const cartProduct = product.Cart_Product || [];
            return (
              <div id="cart-item" key={product.id}>
                <span>
                  <img
                    src={product.imageUrl}
                    alt="product-photo"
                    id="product-photo"
                  />
                </span>

                <span>{product.name}</span>

                <span> | {product.Cart_Product ? product.Cart_Product.quantity : 0} bag(s) |</span>

                <span> ${product.price} </span>

                <span>
                  <button onClick = {deleteItemHandler} name = {product.id}>Remove Item</button>
                </span>
              </div>
            );
          })}
        </div>
        <div className="cart-totals">
          <span id="cart-total-items">
            You have {products.length} items in your cart.{" "}
          </span>
          <br />
          <span id="cart-subtotal">Subtotal:</span>
          <br />
          <button>Checkout</button>
          <button>Empty Cart - NA</button>
        </div>
      </div>
    </>
  );
};

/**
 * CONTAINER
 */

export default Cart;
