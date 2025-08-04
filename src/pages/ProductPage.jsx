import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductById } from '../store/slices/productSlice';
import { addToCart } from '../store/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '../store/slices/wishlistSlice';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { selectedProduct, productLoading, error } = useSelector(state => state.products);
  const { items: wishlistItems } = useSelector(state => state.wishlist);
  
  const isInWishlist = selectedProduct &&
   wishlistItems.some(item => item.id === selectedProduct.id);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [id, dispatch]);

  

  const handleAddToCart = () => {
    if (selectedProduct) {
      dispatch(addToCart({
        id: selectedProduct.id,
        name: selectedProduct.title,
        price: selectedProduct.price,
        image: selectedProduct.image,
      }));
    }
  };

  const handleWishlistToggle = () => {
    if (selectedProduct) {
      if (isInWishlist) {
        dispatch(removeFromWishlist(selectedProduct.id));
      } else {
        dispatch(addToWishlist(selectedProduct));
      }
    }
  };

  const formatPrice = (price) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  const StarRating = ({ rating }) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={`text-lg ${i < Math.floor(rating) ?
           'text-yellow-400' : 'text-gray-300'}`}>
            ★
          </span>
        ))}
        <span className="ml-2 text-lg text-gray-600">{rating}</span>
      </div>
    );
  };

  // Loading state
  if (productLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center
       justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 
          border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Loading Product...</h2>
          <p className="text-gray-500">Fetching product details</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Error Loading Product</h2>
          <p className="text-gray-500 mb-6">{error}</p>
          <div className="space-x-4">
            <button 
              onClick={() => dispatch(fetchProductById(id))}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Try Again
            </button>
            <button 
              onClick={() => navigate('/')}
              className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Product not found state
  if (!selectedProduct && !productLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center
       justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📦</div>
          <h2 className="text-2xl font-semibold text-gray-700">
            Product not found</h2>
          <button 
            onClick={() => navigate('/')}
            className="mt-4 bg-blue-600 text-white px-6 py-2 
            rounded hover:bg-blue-700"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Image */}
            <div className="relative">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.title}
                className="w-full h-96 object-cover rounded-lg"
              />
              <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded text-sm font-semibold">
                {selectedProduct.discount}
              </div>
              <button
                onClick={handleWishlistToggle}
                className={`absolute top-4 right-4 p-3 
                  rounded-full transition-colors ${
                  isInWishlist 
                    ? 'bg-red-500 text-white' 
                    : 'bg-white text-gray-400 hover:text-red-500'
                }`}
              >
                ❤️
              </button>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{selectedProduct.title}</h1>
                <p className="text-gray-600 text-lg">{selectedProduct.description}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-4">
                <StarRating rating={selectedProduct.rating.rate} />
                <span className="text-gray-500">({selectedProduct.rating.count} reviews)</span>
              </div>

              {/* Brand */}
              <div>
                <span className="text-sm text-gray-500">Brand: </span>
                <span className="font-semibold text-gray-700">{selectedProduct.brand}</span>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <div className="flex items-center space-x-4">
                  <span className="text-3xl font-bold text-gray-900">
                    {formatPrice(selectedProduct.price)}
                  </span>
                  <span className="text-xl text-gray-500 line-through">
                    {formatPrice(selectedProduct.originalPrice)}
                  </span>
                </div>
                <p className="text-green-600 font-semibold">You save {formatPrice(selectedProduct.originalPrice - selectedProduct.price)}</p>
              </div>

              {/* Stock Status */}
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${selectedProduct.inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className={`font-semibold ${selectedProduct.inStock ? 'text-green-600' : 'text-red-600'}`}>
                  {selectedProduct.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!selectedProduct.inStock}
                  className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  {selectedProduct.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
                
                <div className="grid grid-cols-2 gap-4">
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
                    Buy Now
                  </button>
                  <button
                    onClick={handleWishlistToggle}
                    className={`font-semibold py-3 px-6 rounded-lg transition-colors duration-200 ${
                      isInWishlist
                        ? 'bg-red-500 hover:bg-red-600 text-white'
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    }`}
                  >
                    {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  </button>
                </div>
              </div>

              {/* Features */}
              <div className="border-t pt-6">
                <h3 className="font-semibold text-gray-900 mb-3">Key Features:</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Free delivery available</li>
                  <li>• 7-day replacement policy</li>
                  <li>• 1-year manufacturer warranty</li>
                  <li>• Cash on delivery available</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
