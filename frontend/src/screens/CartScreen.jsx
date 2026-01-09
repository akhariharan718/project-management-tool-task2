import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import CartContext from '../context/CartContext';

const CartScreen = () => {
    const { cartItems, removeFromCart, addToCart } = useContext(CartContext);
    const navigate = useNavigate();

    const checkoutHandler = () => {
        navigate('/login?redirect=shipping');
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4" role="alert">
                    Your cart is empty <Link to="/" className="font-bold underline">Go Back</Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                        {cartItems.map((item) => (
                            <div key={item._id} className="flex flex-col sm:flex-row items-center justify-between border-b py-4">
                                <div className="flex items-center w-full sm:w-1/2">
                                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded mr-4" />
                                    <Link to={`/product/${item._id}`} className="text-lg font-semibold hover:underline text-black">
                                        {item.name}
                                    </Link>
                                </div>
                                <div className="flex items-center justify-between w-full sm:w-1/2 mt-4 sm:mt-0">
                                    <span className="text-lg font-bold">${item.price}</span>
                                    <select
                                        className="border rounded p-1 mx-2"
                                        value={item.qty}
                                        onChange={(e) => addToCart(item, Number(e.target.value) - item.qty)}
                                    >
                                        {[...Array(item.countInStock).keys()].map((x) => (
                                            <option key={x + 1} value={x + 1}>
                                                {x + 1}
                                            </option>
                                        ))}
                                    </select>
                                    <button
                                        className="text-red-500 hover:text-red-700"
                                        onClick={() => removeFromCart(item._id)}
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="md:col-span-1">
                        <div className="border p-4 rounded shadow-sm">
                            <h2 className="text-xl font-bold mb-4">
                                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
                            </h2>
                            <div className="text-2xl font-bold mb-6">
                                ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                            </div>
                            <button
                                className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition-colors disabled:opacity-50"
                                disabled={cartItems.length === 0}
                                onClick={checkoutHandler}
                            >
                                Proceed To Checkout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartScreen;
