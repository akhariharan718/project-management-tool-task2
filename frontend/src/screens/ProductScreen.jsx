import { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CartContext from '../context/CartContext';

const ProductScreen = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({});
    const { addToCart } = useContext(CartContext);
    const [qty, setQty] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            const { data } = await axios.get(`/api/products/${id}`);
            setProduct(data);
        };

        fetchProduct();
    }, [id]);

    const addToCartHandler = () => {
        addToCart(product, qty);
        navigate('/cart');
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <Link to="/" className="inline-block bg-gray-200 hover:bg-gray-300 rounded px-4 py-2 mb-4 text-black">
                Go Back
            </Link>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="md:col-span-1">
                    <img src={product.image} alt={product.name} className="w-full h-auto rounded-lg shadow-md" />
                </div>
                <div className="md:col-span-1">
                    <h3 className="text-2xl font-bold mb-4">{product.name}</h3>
                    <div className="flex items-center mb-4">
                        <span className="text-yellow-500 mr-1">★</span>
                        <span>{product.rating} ({product.numReviews} reviews)</span>
                    </div>

                    <div className="text-3xl font-bold mb-4">${product.price}</div>
                    <p className="text-gray-600 mb-6">{product.description}</p>

                    <div className="border border-gray-200 p-6 rounded-lg shadow-sm">
                        <div className="flex justify-between items-center mb-4 border-b pb-2">
                            <span className="text-gray-600">Price:</span>
                            <span className="font-bold text-xl">${product.price}</span>
                        </div>
                        <div className="flex justify-between items-center mb-6 border-b pb-2">
                            <span className="text-gray-600">Status:</span>
                            <span className={`font-semibold ${product.countInStock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                            </span>
                        </div>

                        {product.countInStock > 0 && (
                            <div className="flex justify-between items-center mb-4">
                                <span>Qty</span>
                                <select
                                    className="border rounded p-1"
                                    value={qty}
                                    onChange={(e) => setQty(Number(e.target.value))}
                                >
                                    {[...Array(product.countInStock).keys()].map((x) => (
                                        <option key={x + 1} value={x + 1}>
                                            {x + 1}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <button
                            className={`w-full py-3 rounded text-white font-bold transition-colors ${product.countInStock === 0
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-black hover:bg-gray-800'
                                }`}
                            disabled={product.countInStock === 0}
                            onClick={addToCartHandler}
                        >
                            Add To Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductScreen;
