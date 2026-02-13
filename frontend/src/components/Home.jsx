
import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, 
  Heart, 
  Search, 
  Menu, 
  X, 
  ChevronRight,
  Star,
  Truck,
  Shield,
  Sprout,
  Flower2,
  Loader
} from 'lucide-react';
import FlowerCard from './FlowerCard';
import CategoryCard from './CategoryCard';
import TestimonialCard from './TestimonialCard';
import { productService } from '../services/productService';
import { orderService } from '../services/orderService'; // Add this import
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const Homes = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  // Real data from API
  const [featuredFlowers, setFeaturedFlowers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [testimonials, setTestimonials] = useState([
    {
      name: "Sarah Johnson",
      comment: "The flowers were absolutely stunning! Fresh and delivered right on time for my anniversary.",
      rating: 5,
      image: "👩"
    },
    {
      name: "Michael Chen",
      comment: "Perfect arrangement for my wife's birthday. She couldn't stop smiling!",
      rating: 5,
      image: "👨"
    },
    {
      name: "Emily Rodriguez",
      comment: "Professional service and breathtaking bouquets. My go-to flower shop!",
      rating: 4,
      image: "👩‍🦰"
    }
  ]);

  const occasions = ["Birthday", "Anniversary", "Wedding", "Sympathy", "Congratulations", "Just Because"];

  useEffect(() => {
    fetchHomeData();
    updateCartAndWishlistCount();
    
    // Listen for cart updates
    window.addEventListener('cartUpdated', updateCartAndWishlistCount);
    return () => {
      window.removeEventListener('cartUpdated', updateCartAndWishlistCount);
    };
  }, []);

  const fetchHomeData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch featured products
      const featuredResponse = await productService.getFeaturedProducts();
      setFeaturedFlowers(featuredResponse.data || []);

      // Fetch categories
      const categoriesResponse = await productService.getCategories();
      setCategories(categoriesResponse.data || []);

    } catch (err) {
      console.error('Error fetching home data:', err);
      
      // Use mock data as fallback
      setFeaturedFlowers(getMockProducts());
      setCategories(getMockCategories());
      
      // Only show error if we have no data at all
      if (featuredFlowers.length === 0 && categories.length === 0) {
        setError('Failed to load home data. Showing demo content.');
      }
    } finally {
      setLoading(false);
    }
  };

  const updateCartAndWishlistCount = () => {
    try {
      // Get cart count safely
      const cartData = localStorage.getItem('cart');
      if (cartData) {
        const cart = JSON.parse(cartData);
        // Check different possible cart structures
        if (cart.items && Array.isArray(cart.items)) {
          setCartCount(cart.items.length);
        } else if (Array.isArray(cart)) {
          setCartCount(cart.length);
        } else {
          setCartCount(0);
        }
      } else {
        setCartCount(0);
      }
      
      // Get wishlist count safely
      const wishlistData = localStorage.getItem('wishlist');
      if (wishlistData) {
        const wishlist = JSON.parse(wishlistData);
        if (Array.isArray(wishlist)) {
          setWishlistCount(wishlist.length);
        } else {
          setWishlistCount(0);
        }
      } else {
        setWishlistCount(0);
      }
    } catch (err) {
      console.error('Error updating cart/wishlist count:', err);
      setCartCount(0);
      setWishlistCount(0);
    }
  };

  const getMockProducts = () => {
    return [
      {
        _id: '1',
        name: "Rose Symphony",
        price: 45.99,
        discountPrice: 59.99,
        ratings: 4.8,
        numOfReviews: 128,
        images: [{ url: '' }],
        occasion: ["Romance"],
        isAvailable: true,
        stock: 10
      },
      {
        _id: '2',
        name: "Lily Garden",
        price: 38.50,
        discountPrice: 48.50,
        ratings: 4.6,
        numOfReviews: 89,
        images: [{ url: '' }],
        occasion: ["Birthday"],
        isAvailable: true,
        stock: 15
      },
      {
        _id: '3',
        name: "Tulip Dreams",
        price: 42.99,
        ratings: 4.9,
        numOfReviews: 156,
        images: [{ url: '' }],
        occasion: ["Anniversary"],
        isAvailable: true,
        stock: 8
      },
      {
        _id: '4',
        name: "Orchid Elegance",
        price: 65.99,
        discountPrice: 79.99,
        ratings: 4.7,
        numOfReviews: 76,
        images: [{ url: '' }],
        occasion: ["Luxury"],
        isAvailable: true,
        stock: 5
      }
    ];
  };

  const getMockCategories = () => {
    return [
      { name: "Roses", count: 42, icon: "🌹", color: "bg-red-100", slug: "roses" },
      { name: "Tulips", count: 28, icon: "🌷", color: "bg-yellow-100", slug: "tulips" },
      { name: "Lilies", count: 35, icon: "🌸", color: "bg-pink-100", slug: "lilies" },
      { name: "Orchids", count: 24, icon: "🦋", color: "bg-purple-100", slug: "orchids" },
      { name: "Sunflowers", count: 18, icon: "🌻", color: "bg-orange-100", slug: "sunflowers" },
      { name: "Seasonal", count: 56, icon: "🍂", color: "bg-green-100", slug: "seasonal" }
    ];
  };

  const handleAddToCart = async (productId) => {
    try {
      // Check if user is authenticated
      const token = localStorage.getItem('token');
      
      if (token) {
        // Use API if authenticated
        await orderService.addToCart({
          productId,
          quantity: 1
        });
      } else {
        // Use localStorage for guest users
        let cart = JSON.parse(localStorage.getItem('cart') || '[]');
        
        // Check if product already exists in cart
        const existingItemIndex = cart.findIndex(item => item.productId === productId);
        
        if (existingItemIndex > -1) {
          // Update quantity
          cart[existingItemIndex].quantity += 1;
        } else {
          // Add new item
          cart.push({ productId, quantity: 1, addedAt: Date.now() });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
      }
      
      // Update count
      updateCartAndWishlistCount();
      
      // Notify other components
      window.dispatchEvent(new Event('cartUpdated'));
      
      toast.success('Added to cart!');
    } catch (err) {
      toast.error('Failed to add to cart');
      console.error('Error adding to cart:', err);
    }
  };

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      const productId = e.currentTarget.dataset.productId;
      if (!productId) return;
      
      let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      
      // Check if already in wishlist
      if (!wishlist.includes(productId)) {
        wishlist.push(productId);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        setWishlistCount(prev => prev + 1);
        toast.success('Added to wishlist!');
      } else {
        toast.info('Already in wishlist');
      }
    } catch (err) {
      toast.error('Failed to add to wishlist');
      console.error('Error adding to wishlist:', err);
    }
  };

  // Animation styles for CSS
  const animationStyles = `
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-20px); }
    }
    
    @keyframes bounce-slow {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    
    @keyframes bounce-slow-delayed {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-15px); }
    }
    
    .animate-float {
      animation: float 6s ease-in-out infinite;
    }
    
    .animate-bounce-slow {
      animation: bounce-slow 3s ease-in-out infinite;
    }
    
    .animate-bounce-slow-delayed {
      animation: bounce-slow-delayed 4s ease-in-out infinite;
      animation-delay: 1s;
    }
  `;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-50 to-white">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin text-pink-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900">Loading BloomBox...</h2>
          <p className="text-gray-600 mt-2">Preparing beautiful flowers for you</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{animationStyles}</style>
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center">
                  <Flower2 className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                  BloomBox
                </span>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-8">
                <Link to="/" className="text-gray-700 hover:text-pink-600 font-medium transition-colors">
                  Home
                </Link>
                <Link to="/products" className="text-gray-700 hover:text-pink-600 font-medium transition-colors">
                  Shop
                </Link>
                <Link to="/products?occasion=Anniversary" className="text-gray-700 hover:text-pink-600 font-medium transition-colors">
                  Occasions
                </Link>
                <Link to="/products?category=Featured" className="text-gray-700 hover:text-pink-600 font-medium transition-colors">
                  Collections
                </Link>
                <Link to="/about" className="text-gray-700 hover:text-pink-600 font-medium transition-colors">
                  About
                </Link>
              </nav>

              {/* Icons */}
              <div className="flex items-center space-x-6">
                <Link to="/products" className="relative p-2">
                  <Search className="w-5 h-5 text-gray-700" />
                </Link>
                
                <Link to="/wishlist" className="relative p-2">
                  <Heart className="w-5 h-5 text-gray-700" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </Link>
                
                <Link to="/cart" className="relative p-2">
                  <ShoppingCart className="w-5 h-5 text-gray-700" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>

                {/* User Account */}
                {/* <Link to="/profile" className="hidden md:block ml-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full flex items-center justify-center text-white font-semibold">
                    {localStorage.getItem('token') ? user.name : '👤'}
                  </div>
                </Link> */}

                <Link to="/profile" className="hidden md:block ml-4">
  <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full flex items-center justify-center text-white font-semibold">
    {localStorage.getItem('token') && user?.name
      ? user.name.charAt(0).toUpperCase()
      : '👤'}
  </div>
</Link>


                {/* Mobile Menu Button */}
                <button 
                  className="md:hidden p-2"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
              <div className="md:hidden mt-4 pb-4">
                <div className="flex flex-col space-y-4">
                  <Link to="/" className="text-gray-700 hover:text-pink-600 font-medium py-2" onClick={() => setIsMenuOpen(false)}>
                    Home
                  </Link>
                  <Link to="/products" className="text-gray-700 hover:text-pink-600 font-medium py-2" onClick={() => setIsMenuOpen(false)}>
                    Shop
                  </Link>
                  <Link to="/products?occasion=Anniversary" className="text-gray-700 hover:text-pink-600 font-medium py-2" onClick={() => setIsMenuOpen(false)}>
                    Occasions
                  </Link>
                  <Link to="/products?category=Featured" className="text-gray-700 hover:text-pink-600 font-medium py-2" onClick={() => setIsMenuOpen(false)}>
                    Collections
                  </Link>
                  <Link to="/about" className="text-gray-700 hover:text-pink-600 font-medium py-2" onClick={() => setIsMenuOpen(false)}>
                    About
                  </Link>
                  <div className="pt-4 border-t">
                    <Link to="/profile" className="text-gray-700 hover:text-pink-600 font-medium py-2" onClick={() => setIsMenuOpen(false)}>
                      My Account
                    </Link>
                    <Link to="/orders" className="text-gray-700 hover:text-pink-600 font-medium py-2" onClick={() => setIsMenuOpen(false)}>
                      My Orders
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </header>

        {error && (
          <div className="container mx-auto px-4 py-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center">
                <span className="text-yellow-600 mr-2">⚠️</span>
                <p className="text-yellow-800">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="container mx-auto px-4 py-12 md:py-24">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                  Let Flowers Speak 
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500">
                    What Words Cannot
                  </span>
                </h1>
                <p className="text-gray-600 mt-6 text-lg">
                  Discover the perfect bouquet for every occasion. Handcrafted with love and delivered fresh to your doorstep.
                </p>
                <div className="flex flex-wrap gap-4 mt-8">
                  <Link 
                    to="/products"
                    className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                  >
                    Shop Collection
                  </Link>
                  <Link 
                    to="/products?category=Featured"
                    className="border-2 border-pink-500 text-pink-600 px-8 py-3 rounded-full font-semibold hover:bg-pink-50 transition-colors"
                  >
                    View Featured
                  </Link>
                </div>
              </div>
              
              <div className="relative">
                <div className="relative w-full h-64 md:h-96">
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 to-rose-400/20 rounded-3xl transform rotate-3"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-rose-500/10 rounded-3xl transform -rotate-3"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-300/30 to-rose-300/30 rounded-3xl flex items-center justify-center">
                    <div className="text-8xl animate-float">💐</div>
                  </div>
                </div>
                
                {/* Floating elements */}
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center text-4xl animate-bounce-slow">
                  🌻
                </div>
                <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center text-3xl animate-bounce-slow-delayed">
                  🌹
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex items-center space-x-4 p-6 rounded-2xl bg-gradient-to-r from-pink-50 to-rose-50">
                <Truck className="w-10 h-10 text-pink-500" />
                <div>
                  <h3 className="font-semibold text-gray-900">Free Delivery</h3>
                  <p className="text-gray-600 text-sm">On orders over $50</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-6 rounded-2xl bg-gradient-to-r from-pink-50 to-rose-50">
                <Shield className="w-10 h-10 text-pink-500" />
                <div>
                  <h3 className="font-semibold text-gray-900">Fresh Guarantee</h3>
                  <p className="text-gray-600 text-sm">7-day freshness guarantee</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-6 rounded-2xl bg-gradient-to-r from-pink-50 to-rose-50">
                <Sprout className="w-10 h-10 text-pink-500" />
                <div>
                  <h3 className="font-semibold text-gray-900">Eco-Friendly</h3>
                  <p className="text-gray-600 text-sm">Sustainable packaging</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Featured Bouquets</h2>
                <p className="text-gray-600 mt-2">Handpicked arrangements for special moments</p>
              </div>
              <Link to="/products" className="flex items-center text-pink-600 font-semibold hover:text-pink-700">
                View All <ChevronRight className="w-5 h-5 ml-1" />
              </Link>
            </div>

            {featuredFlowers.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🌸</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No Featured Products</h3>
                <p className="text-gray-600">Check back soon for new arrivals!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {featuredFlowers.map((flower) => (
                  <FlowerCard 
                    key={flower._id} 
                    flower={flower} 
                    onAddToCart={() => handleAddToCart(flower._id)}
                    onAddToWishlist={handleAddToWishlist}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Categories */}
        <section className="py-16 bg-gradient-to-b from-white to-pink-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Shop by Category</h2>
            
            {categories.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🌿</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No Categories Found</h3>
                <p className="text-gray-600">Categories will be available soon</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {categories.map((category, index) => (
                  <Link 
                    key={category.slug || index} 
                    to={`/products?category=${category.slug || category.name}`}
                  >
                    <CategoryCard category={category} />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Occasions */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Perfect for Every Occasion</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {occasions.map((occasion, index) => (
                <Link 
                  key={index}
                  to={`/products?occasion=${occasion}`}
                  className="bg-white p-6 rounded-2xl text-center shadow-sm hover:shadow-xl transition-shadow duration-300 cursor-pointer border border-pink-100 hover:border-pink-300 block"
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-pink-100 to-rose-100 rounded-full flex items-center justify-center text-2xl">
                    {["🎂", "💝", "💒", "🕊️", "🎉", "🎁"][index]}
                  </div>
                  <h3 className="font-semibold text-gray-900">{occasion}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-gradient-to-r from-pink-50 to-rose-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">What Our Customers Say</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={index} testimonial={testimonial} />
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Join Our Flower Club
              </h2>
              <p className="text-gray-600 mb-8">
                Get exclusive offers, flower care tips, and 15% off your first order
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-6 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
                <button 
                  onClick={() => toast.success('Subscribed! Check your email for confirmation.')}
                  className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-shadow"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center">
                    <Flower2 className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold">BloomBox</span>
                </div>
                <p className="text-gray-400">
                  Bringing beauty and joy through nature's finest creations since 2010.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><Link to="/products" className="hover:text-white">Shop All</Link></li>
                  <li><Link to="/products?category=Seasonal" className="hover:text-white">Seasonal Collection</Link></li>
                  <li><Link to="/products?delivery=same-day" className="hover:text-white">Same Day Delivery</Link></li>
                  <li><Link to="/corporate" className="hover:text-white">Corporate Gifting</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-4">Support</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
                  <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
                  <li><Link to="/shipping" className="hover:text-white">Shipping Info</Link></li>
                  <li><Link to="/returns" className="hover:text-white">Returns</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-4">Contact</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>123 Flower Street</li>
                  <li>Garden City, GC 12345</li>
                  <li>contact@bloombox.com</li>
                  <li>(555) 123-4567</li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>© {new Date().getFullYear()} BloomBox. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Homes;
