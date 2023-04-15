import CartContainer from "./components/CartContainer";
import Navbar from "./components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { calculateTotals, getCartItems } from "./features/cart/cartSlice";
import Modal from "./components/Modal";

function App() {
  const dispatch = useDispatch();
  const { cartItems, isLoading } = useSelector((store) => store.cart);
  const { isOpen } = useSelector((store) => store.modal);
  useEffect(() => {
    dispatch(calculateTotals());
  }, [dispatch, cartItems]);

  useEffect(() => {
    dispatch(getCartItems());
  }, []);

  if (isLoading) {
    return (
      <div className="loading">
        <h1>loading...</h1>
      </div>
    );
  }
  console.log(isOpen);
  return (
    <main>
      {isOpen && <Modal />}
      <Navbar />
      <CartContainer />
    </main>
  );
}
export default App;
