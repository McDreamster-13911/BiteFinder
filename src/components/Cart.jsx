import { useSelector, useDispatch } from "react-redux";
import RestaurantMenuItemCard from "./RestaurantMenuItemCard";
import { clearCart } from "../utils/cartSlice";

const Cart = () => {
    const dispatch = useDispatch();

    // This is way of selecting / subscribing to the store is very inefficient
    const cartItems = useSelector((store) => store.cart.items);

    const handleClearCart = () => {
        dispatch(clearCart()); // Correctly dispatch the action
    };

    return (
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-orange-50 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4 border-b pb-2">
          Cart
        </h2>
        <div>
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <RestaurantMenuItemCard
                key={index}
                item_data={item}
                showAddButton={false} // Hide the "Add" button in the cart
              />
            ))
          ) : (
            <p className="text-lg text-gray-500 mt-6">Your cart is empty</p>
          )}
        </div>
        <div className="flex justify-center mt-4">
          <button
            className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-red-600 transition duration-300"
            onClick={handleClearCart} // Attach the event handler to the button
          >
            Clear Cart
          </button>
        </div>
      </div>
    );
};

export default Cart;
