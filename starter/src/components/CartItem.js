import { ChevronDown, ChevronUp } from "../icons";
import { useDispatch } from "react-redux";
import { toggle } from "../features/cart/cartSlice";

const CartItem = ({ id, img, title, price, amount }) => {
  const dispatch = useDispatch();
  return (
    <article className="cart-item">
      <img src={img} alt={title} />
      <div>
        <h4>{title}</h4>
        <h4 className="item-price">${price}</h4>
        <button className="remove-btn">remove</button>
      </div>
      <div>
        <button
          onClick={() => dispatch(toggle({ id, type: "increase" }))}
          className="amount-btn"
        >
          <ChevronUp />
        </button>
        <p className="amount">{amount}</p>
        <button
          onClick={() => dispatch(toggle({ id, type: "decrease" }))}
          className="amount-btn"
        >
          <ChevronDown />
        </button>
      </div>
    </article>
  );
};
export default CartItem;
