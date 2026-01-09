import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const HomeScreen = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await axios.get('/api/products');
            setProducts(data);
        };

        fetchProducts();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Latest Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <div key={product._id} className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                        <Link to={`/product/${product._id}`}>
                            <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                        </Link>
                        <div className="p-4">
                            <Link to={`/product/${product._id}`}>
                                <h2 className="text-lg font-semibold mb-2 truncate">{product.name}</h2>
                            </Link>
                            <div className="flex items-center mb-2">
                                <span className="text-yellow-500 mr-1">★</span>
                                <span>{product.rating} ({product.numReviews} reviews)</span>
                            </div>
                            <h3 className="text-xl font-bold">${product.price}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomeScreen;
