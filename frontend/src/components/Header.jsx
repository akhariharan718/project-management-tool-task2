import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useContext } from 'react';
import CartContext from '../context/CartContext';
import AuthContext from '../context/AuthContext';

const Header = () => {
    const { cartItems } = useContext(CartContext);
    const { userInfo, logout } = useContext(AuthContext);

    return (
        <header className="bg-gray-800 text-white">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/" className="text-xl font-bold">ProShop</Link>

                <nav>
                    <ul className="flex space-x-4">
                        <li>
                            <Link to="/cart" className="flex items-center hover:text-gray-300">
                                <FaShoppingCart className="mr-1" /> Cart
                                {cartItems.length > 0 && (
                                    <span className="ml-1 bg-green-500 text-white rounded-full px-2 py-0.5 text-xs">
                                        {cartItems.reduce((a, c) => a + c.qty, 0)}
                                    </span>
                                )}
                            </Link>
                        </li>
                        {userInfo ? (
                            <li className="relative group">
                                <button className="flex items-center hover:text-gray-300">
                                    {userInfo.name}
                                </button>
                                <div className="absolute right-0 w-48 bg-white text-black rounded shadow-lg hidden group-hover:block z-10">
                                    <button onClick={logout} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                                        <FaSignOutAlt className="inline mr-2" /> Logout
                                    </button>
                                </div>
                            </li>
                        ) : (
                            <li>
                                <Link to="/login" className="flex items-center hover:text-gray-300">
                                    <FaUser className="mr-1" /> Sign In
                                </Link>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
