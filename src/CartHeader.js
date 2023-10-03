import React from 'react';
import { Link } from 'react-router-dom';
import './css/CartHeader.css'; // Import your CSS file for styling
import logo from './logo.jpg'; // Import your logo image

const CartHeader = ({ cartItemCount, onCartClick }) => {
  return (
    <div className="header">
      <div className="header-left">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="header-center">
        <Link to="/">Customize</Link>
        <Link to="/customize-5050">Customize 50-50</Link>
        <Link to="/sides-and-beverages">Sides and Beverages</Link>
      </div>
      <div className="header-right">
        <div className="cart-icon" onClick={onCartClick}>
          <Link to="/cart">
            <span className="cart-count">{cartItemCount}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#ff0000"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M10 19.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm1.336-5l1.977-7h-16.813l2.938 7h11.898zm4.969-10l-3.432 12h-12.597l.839 2h13.239l3.474-12h1.929l.743-2h-4.195z" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartHeader;
