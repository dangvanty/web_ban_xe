import React from "react";
import "./CartItemCard.scss";
import { Link } from "react-router-dom";
import {formatNumber} from"../helper/formatPrice"
import {to_slug} from"../helper/formatToSlug"
const CartItemCard = ({ item, deleteCartItems }) => {
  return (
    <div className="CartItemCard">
      <img src={item.image} alt="ssa" />
      <div>
        <Link to={`/Shop/product/${to_slug(item.name)}.${item.product}.html`}>{item.name}</Link>
        <span>{`Giá: ${formatNumber(item.price)} đ`}</span>
        <p onClick={() => deleteCartItems(item.product)}>Xóa </p>
      </div>
    </div>
  );
};

export default CartItemCard;
