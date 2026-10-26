
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Convert a price such as "$15" into the number 15.
  const getUnitPrice = (cost) => {
    return Number(String(cost).replace(/[^0-9.-]/g, '')) || 0;
  };

  // Calculate total cost of all plants in the cart.
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      return total + getUnitPrice(item.cost) * item.quantity;
    }, 0).toFixed(2);
  };

  // Calculate total number of plants, including quantities.
  const totalNumberOfItems = cart.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  // Return to the plant listing page.
  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping();
  };

  // Increase the selected plant quantity.
  const handleIncrement = (item) => {
    dispatch(updateQuantity({
      name: item.name,
      quantity: item.quantity + 1
    }));
  };

  // Decrease quantity but never below 1.
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({
        name: item.name,
        quantity: item.quantity - 1
      }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  // Remove a plant from the cart.
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Calculate the subtotal for one plant.
  const calculateTotalCost = (item) => {
    return (getUnitPrice(item.cost) * item.quantity).toFixed(2);
  };

  // Checkout is not implemented in this project.
  const handleCheckout = () => {
    alert('Coming Soon');
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>
        Total Cart Amount: ${calculateTotalAmount()}
      </h2>

      <h3 style={{ color: 'black' }}>
        Total Number of Items: {totalNumberOfItems}
      </h3>

      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img
              className="cart-item-image"
              src={item.image}
              alt={item.name}
            />

            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>

              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>

                <span className="cart-item-quantity-value">
                  {item.quantity}
                </span>

                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>

              <div className="cart-item-total">
                Total: ${calculateTotalCost(item)}
              </div>

              <button
                className="cart-item-delete"
                onClick={() => handleRemove(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{ marginTop: '20px', color: 'black' }}
        className="total_cart_amount"
      />

      <div className="continue_shopping_btn">
        <button
          className="get-started-button"
          onClick={handleContinueShopping}
        >
          Continue Shopping
        </button>

        <br />

        <button
          className="get-started-button1"
          onClick={handleCheckout}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
