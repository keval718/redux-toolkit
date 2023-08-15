import Navbar from "./components/Navbar";
import CartConatiner from "./components/CartConatiner";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCartItems, calculateTotal } from "./feature/cart/cartSlice";
import Modal from "./components/Modal";
function App() {
  const dispatch = useDispatch()
  const { isLoading, cartItems } = useSelector((state) => state.cart)
  const { isOpen } = useSelector((state) => state.modal)

  useEffect(() => {
    dispatch(getCartItems())
  }, [dispatch])

  useEffect(() => {
    dispatch(calculateTotal())
  }, [cartItems, dispatch])

  if (isLoading) {
    return <div className="loading">
      Loading...
    </div>
  }

  return (
    <>
      {isOpen && <Modal />}
      <Navbar />
      <CartConatiner />
    </>
  );
}
export default App;
