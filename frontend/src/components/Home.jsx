
// import React, { useState, useEffect } from 'react';
// import { 
//   ShoppingCart, 
//   Heart, 
//   Search, 
//   Menu, 
//   X, 
//   ChevronRight,
//   Star,
//   Truck,
//   Shield,
//   Sprout,
//   Flower2,
//   Loader
// } from 'lucide-react';
// import FlowerCard from './FlowerCard';
// import CategoryCard from './CategoryCard';
// import TestimonialCard from './TestimonialCard';
// import { productService } from '../services/productService';
// import { orderService } from '../services/orderService'; // Add this import
// import { Link } from 'react-router-dom';
// import { toast } from 'react-hot-toast';
// import { useAuth } from '../context/AuthContext';

// const Homes = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [cartCount, setCartCount] = useState(0);
//   const [wishlistCount, setWishlistCount] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { user } = useAuth();
//   // Real data from API
//   const [featuredFlowers, setFeaturedFlowers] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [testimonials, setTestimonials] = useState([
//     {
//       name: "Sarah Johnson",
//       comment: "The flowers were absolutely stunning! Fresh and delivered right on time for my anniversary.",
//       rating: 5,
//       image: "👩"
//     },
//     {
//       name: "Michael Chen",
//       comment: "Perfect arrangement for my wife's birthday. She couldn't stop smiling!",
//       rating: 5,
//       image: "👨"
//     },
//     {
//       name: "Emily Rodriguez",
//       comment: "Professional service and breathtaking bouquets. My go-to flower shop!",
//       rating: 4,
//       image: "👩‍🦰"
//     }
//   ]);

//   const occasions = ["Birthday", "Anniversary", "Wedding", "Sympathy", "Congratulations", "Just Because"];

//   useEffect(() => {
//     fetchHomeData();
//     updateCartAndWishlistCount();
    
//     // Listen for cart updates
//     window.addEventListener('cartUpdated', updateCartAndWishlistCount);
//     return () => {
//       window.removeEventListener('cartUpdated', updateCartAndWishlistCount);
//     };
//   }, []);

//   const fetchHomeData = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       // Fetch featured products
//       const featuredResponse = await productService.getFeaturedProducts();
//       setFeaturedFlowers(featuredResponse.data || []);

//       // Fetch categories
//       const categoriesResponse = await productService.getCategories();
//       setCategories(categoriesResponse.data || []);

//     } catch (err) {
//       console.error('Error fetching home data:', err);
      
//       // Use mock data as fallback
//       setFeaturedFlowers(getMockProducts());
//       setCategories(getMockCategories());
      
//       // Only show error if we have no data at all
//       if (featuredFlowers.length === 0 && categories.length === 0) {
//         setError('Failed to load home data. Showing demo content.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateCartAndWishlistCount = () => {
//     try {
//       // Get cart count safely
//       const cartData = localStorage.getItem('cart');
//       if (cartData) {
//         const cart = JSON.parse(cartData);
//         // Check different possible cart structures
//         if (cart.items && Array.isArray(cart.items)) {
//           setCartCount(cart.items.length);
//         } else if (Array.isArray(cart)) {
//           setCartCount(cart.length);
//         } else {
//           setCartCount(0);
//         }
//       } else {
//         setCartCount(0);
//       }
      
//       // Get wishlist count safely
//       const wishlistData = localStorage.getItem('wishlist');
//       if (wishlistData) {
//         const wishlist = JSON.parse(wishlistData);
//         if (Array.isArray(wishlist)) {
//           setWishlistCount(wishlist.length);
//         } else {
//           setWishlistCount(0);
//         }
//       } else {
//         setWishlistCount(0);
//       }
//     } catch (err) {
//       console.error('Error updating cart/wishlist count:', err);
//       setCartCount(0);
//       setWishlistCount(0);
//     }
//   };

//   const getMockProducts = () => {
//     return [
//       {
//         _id: '1',
//         name: "Rose Symphony",
//         price: 45.99,
//         discountPrice: 59.99,
//         ratings: 4.8,
//         numOfReviews: 128,
//         images: [{ url: '' }],
//         occasion: ["Romance"],
//         isAvailable: true,
//         stock: 10
//       },
//       {
//         _id: '2',
//         name: "Lily Garden",
//         price: 38.50,
//         discountPrice: 48.50,
//         ratings: 4.6,
//         numOfReviews: 89,
//         images: [{ url: '' }],
//         occasion: ["Birthday"],
//         isAvailable: true,
//         stock: 15
//       },
//       {
//         _id: '3',
//         name: "Tulip Dreams",
//         price: 42.99,
//         ratings: 4.9,
//         numOfReviews: 156,
//         images: [{ url: '' }],
//         occasion: ["Anniversary"],
//         isAvailable: true,
//         stock: 8
//       },
//       {
//         _id: '4',
//         name: "Orchid Elegance",
//         price: 65.99,
//         discountPrice: 79.99,
//         ratings: 4.7,
//         numOfReviews: 76,
//         images: [{ url: '' }],
//         occasion: ["Luxury"],
//         isAvailable: true,
//         stock: 5
//       }
//     ];
//   };

//   const getMockCategories = () => {
//     return [
//       { name: "Roses", count: 42, icon: "🌹", color: "bg-red-100", slug: "roses" },
//       { name: "Tulips", count: 28, icon: "🌷", color: "bg-yellow-100", slug: "tulips" },
//       { name: "Lilies", count: 35, icon: "🌸", color: "bg-pink-100", slug: "lilies" },
//       { name: "Orchids", count: 24, icon: "🦋", color: "bg-purple-100", slug: "orchids" },
//       { name: "Sunflowers", count: 18, icon: "🌻", color: "bg-orange-100", slug: "sunflowers" },
//       { name: "Seasonal", count: 56, icon: "🍂", color: "bg-green-100", slug: "seasonal" }
//     ];
//   };

//   const handleAddToCart = async (productId) => {
//     try {
//       // Check if user is authenticated
//       const token = localStorage.getItem('token');
      
//       if (token) {
//         // Use API if authenticated
//         await orderService.addToCart({
//           productId,
//           quantity: 1
//         });
//       } else {
//         // Use localStorage for guest users
//         let cart = JSON.parse(localStorage.getItem('cart') || '[]');
        
//         // Check if product already exists in cart
//         const existingItemIndex = cart.findIndex(item => item.productId === productId);
        
//         if (existingItemIndex > -1) {
//           // Update quantity
//           cart[existingItemIndex].quantity += 1;
//         } else {
//           // Add new item
//           cart.push({ productId, quantity: 1, addedAt: Date.now() });
//         }
        
//         localStorage.setItem('cart', JSON.stringify(cart));
//       }
      
//       // Update count
//       updateCartAndWishlistCount();
      
//       // Notify other components
//       window.dispatchEvent(new Event('cartUpdated'));
      
//       toast.success('Added to cart!');
//     } catch (err) {
//       toast.error('Failed to add to cart');
//       console.error('Error adding to cart:', err);
//     }
//   };

//   const handleAddToWishlist = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
    
//     try {
//       const productId = e.currentTarget.dataset.productId;
//       if (!productId) return;
      
//       let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      
//       // Check if already in wishlist
//       if (!wishlist.includes(productId)) {
//         wishlist.push(productId);
//         localStorage.setItem('wishlist', JSON.stringify(wishlist));
//         setWishlistCount(prev => prev + 1);
//         toast.success('Added to wishlist!');
//       } else {
//         toast.info('Already in wishlist');
//       }
//     } catch (err) {
//       toast.error('Failed to add to wishlist');
//       console.error('Error adding to wishlist:', err);
//     }
//   };

//   // Animation styles for CSS
//   const animationStyles = `
//     @keyframes float {
//       0%, 100% { transform: translateY(0); }
//       50% { transform: translateY(-20px); }
//     }
    
//     @keyframes bounce-slow {
//       0%, 100% { transform: translateY(0); }
//       50% { transform: translateY(-10px); }
//     }
    
//     @keyframes bounce-slow-delayed {
//       0%, 100% { transform: translateY(0); }
//       50% { transform: translateY(-15px); }
//     }
    
//     .animate-float {
//       animation: float 6s ease-in-out infinite;
//     }
    
//     .animate-bounce-slow {
//       animation: bounce-slow 3s ease-in-out infinite;
//     }
    
//     .animate-bounce-slow-delayed {
//       animation: bounce-slow-delayed 4s ease-in-out infinite;
//       animation-delay: 1s;
//     }
//   `;

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-50 to-white">
//         <div className="text-center">
//           <Loader className="w-12 h-12 animate-spin text-pink-500 mx-auto mb-4" />
//           <h2 className="text-xl font-semibold text-gray-900">Loading BloomBox...</h2>
//           <p className="text-gray-600 mt-2">Preparing beautiful flowers for you</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <style>{animationStyles}</style>
//       <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
//         {/* Header */}
//         <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
//           <div className="container mx-auto px-4 py-4">
//             <div className="flex items-center justify-between">
//               {/* Logo */}
//               <Link to="/" className="flex items-center space-x-2">
//                 <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center">
//                   <Flower2 className="w-6 h-6 text-white" />
//                 </div>
//                 <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
//                   BloomBox
//                 </span>
//               </Link>

//               {/* Desktop Navigation */}
//               <nav className="hidden md:flex items-center space-x-8">
//                 <Link to="/" className="text-gray-700 hover:text-pink-600 font-medium transition-colors">
//                   Home
//                 </Link>
//                 <Link to="/products" className="text-gray-700 hover:text-pink-600 font-medium transition-colors">
//                   Shop
//                 </Link>
//                 <Link to="/products?occasion=Anniversary" className="text-gray-700 hover:text-pink-600 font-medium transition-colors">
//                   Occasions
//                 </Link>
//                 <Link to="/products?category=Featured" className="text-gray-700 hover:text-pink-600 font-medium transition-colors">
//                   Collections
//                 </Link>
//                 <Link to="/about" className="text-gray-700 hover:text-pink-600 font-medium transition-colors">
//                   About
//                 </Link>
//               </nav>

//               {/* Icons */}
//               <div className="flex items-center space-x-6">
//                 <Link to="/products" className="relative p-2">
//                   <Search className="w-5 h-5 text-gray-700" />
//                 </Link>
                
//                 <Link to="/wishlist" className="relative p-2">
//                   <Heart className="w-5 h-5 text-gray-700" />
//                   {wishlistCount > 0 && (
//                     <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                       {wishlistCount}
//                     </span>
//                   )}
//                 </Link>
                
//                 <Link to="/cart" className="relative p-2">
//                   <ShoppingCart className="w-5 h-5 text-gray-700" />
//                   {cartCount > 0 && (
//                     <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                       {cartCount}
//                     </span>
//                   )}
//                 </Link>

//                 {/* User Account */}
//                 {/* <Link to="/profile" className="hidden md:block ml-4">
//                   <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full flex items-center justify-center text-white font-semibold">
//                     {localStorage.getItem('token') ? user.name : '👤'}
//                   </div>
//                 </Link> */}

//                 <Link to="/profile" className="hidden md:block ml-4">
//   <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full flex items-center justify-center text-white font-semibold">
//     {localStorage.getItem('token') && user?.name
//       ? user.name.charAt(0).toUpperCase()
//       : '👤'}
//   </div>
// </Link>


//                 {/* Mobile Menu Button */}
//                 <button 
//                   className="md:hidden p-2"
//                   onClick={() => setIsMenuOpen(!isMenuOpen)}
//                 >
//                   {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//                 </button>
//               </div>
//             </div>

//             {/* Mobile Navigation */}
//             {isMenuOpen && (
//               <div className="md:hidden mt-4 pb-4">
//                 <div className="flex flex-col space-y-4">
//                   <Link to="/" className="text-gray-700 hover:text-pink-600 font-medium py-2" onClick={() => setIsMenuOpen(false)}>
//                     Home
//                   </Link>
//                   <Link to="/products" className="text-gray-700 hover:text-pink-600 font-medium py-2" onClick={() => setIsMenuOpen(false)}>
//                     Shop
//                   </Link>
//                   <Link to="/products?occasion=Anniversary" className="text-gray-700 hover:text-pink-600 font-medium py-2" onClick={() => setIsMenuOpen(false)}>
//                     Occasions
//                   </Link>
//                   <Link to="/products?category=Featured" className="text-gray-700 hover:text-pink-600 font-medium py-2" onClick={() => setIsMenuOpen(false)}>
//                     Collections
//                   </Link>
//                   <Link to="/about" className="text-gray-700 hover:text-pink-600 font-medium py-2" onClick={() => setIsMenuOpen(false)}>
//                     About
//                   </Link>
//                   <div className="pt-4 border-t">
//                     <Link to="/profile" className="text-gray-700 hover:text-pink-600 font-medium py-2" onClick={() => setIsMenuOpen(false)}>
//                       My Account
//                     </Link>
//                     <Link to="/orders" className="text-gray-700 hover:text-pink-600 font-medium py-2" onClick={() => setIsMenuOpen(false)}>
//                       My Orders
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </header>

//         {error && (
//           <div className="container mx-auto px-4 py-4">
//             <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
//               <div className="flex items-center">
//                 <span className="text-yellow-600 mr-2">⚠️</span>
//                 <p className="text-yellow-800">{error}</p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Hero Section */}
//         <section className="relative overflow-hidden">
//           <div className="container mx-auto px-4 py-12 md:py-24">
//             <div className="grid md:grid-cols-2 gap-12 items-center">
//               <div>
//                 <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
//                   Let Flowers Speak 
//                   <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500">
//                     What Words Cannot
//                   </span>
//                 </h1>
//                 <p className="text-gray-600 mt-6 text-lg">
//                   Discover the perfect bouquet for every occasion. Handcrafted with love and delivered fresh to your doorstep.
//                 </p>
//                 <div className="flex flex-wrap gap-4 mt-8">
//                   <Link 
//                     to="/products"
//                     className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
//                   >
//                     Shop Collection
//                   </Link>
//                   <Link 
//                     to="/products?category=Featured"
//                     className="border-2 border-pink-500 text-pink-600 px-8 py-3 rounded-full font-semibold hover:bg-pink-50 transition-colors"
//                   >
//                     View Featured
//                   </Link>
//                 </div>
//               </div>
              
//               <div className="relative">
//                 <div className="relative w-full h-64 md:h-96">
//                   <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 to-rose-400/20 rounded-3xl transform rotate-3"></div>
//                   <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-rose-500/10 rounded-3xl transform -rotate-3"></div>
//                   <div className="absolute inset-0 bg-gradient-to-r from-pink-300/30 to-rose-300/30 rounded-3xl flex items-center justify-center">
//                     <div className="text-8xl animate-float">💐</div>
//                   </div>
//                 </div>
                
//                 {/* Floating elements */}
//                 <div className="absolute -top-4 -left-4 w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center text-4xl animate-bounce-slow">
//                   🌻
//                 </div>
//                 <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center text-3xl animate-bounce-slow-delayed">
//                   🌹
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Features */}
//         <section className="py-12 bg-white">
//           <div className="container mx-auto px-4">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//               <div className="flex items-center space-x-4 p-6 rounded-2xl bg-gradient-to-r from-pink-50 to-rose-50">
//                 <Truck className="w-10 h-10 text-pink-500" />
//                 <div>
//                   <h3 className="font-semibold text-gray-900">Free Delivery</h3>
//                   <p className="text-gray-600 text-sm">On orders over $50</p>
//                 </div>
//               </div>
              
//               <div className="flex items-center space-x-4 p-6 rounded-2xl bg-gradient-to-r from-pink-50 to-rose-50">
//                 <Shield className="w-10 h-10 text-pink-500" />
//                 <div>
//                   <h3 className="font-semibold text-gray-900">Fresh Guarantee</h3>
//                   <p className="text-gray-600 text-sm">7-day freshness guarantee</p>
//                 </div>
//               </div>
              
//               <div className="flex items-center space-x-4 p-6 rounded-2xl bg-gradient-to-r from-pink-50 to-rose-50">
//                 <Sprout className="w-10 h-10 text-pink-500" />
//                 <div>
//                   <h3 className="font-semibold text-gray-900">Eco-Friendly</h3>
//                   <p className="text-gray-600 text-sm">Sustainable packaging</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Featured Products */}
//         <section className="py-16">
//           <div className="container mx-auto px-4">
//             <div className="flex justify-between items-center mb-12">
//               <div>
//                 <h2 className="text-3xl font-bold text-gray-900">Featured Bouquets</h2>
//                 <p className="text-gray-600 mt-2">Handpicked arrangements for special moments</p>
//               </div>
//               <Link to="/products" className="flex items-center text-pink-600 font-semibold hover:text-pink-700">
//                 View All <ChevronRight className="w-5 h-5 ml-1" />
//               </Link>
//             </div>

//             {featuredFlowers.length === 0 ? (
//               <div className="text-center py-12">
//                 <div className="text-6xl mb-4">🌸</div>
//                 <h3 className="text-xl font-bold text-gray-900 mb-2">No Featured Products</h3>
//                 <p className="text-gray-600">Check back soon for new arrivals!</p>
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//                 {featuredFlowers.map((flower) => (
//                   <FlowerCard 
//                     key={flower._id} 
//                     flower={flower} 
//                     onAddToCart={() => handleAddToCart(flower._id)}
//                     onAddToWishlist={handleAddToWishlist}
//                   />
//                 ))}
//               </div>
//             )}
//           </div>
//         </section>

//         {/* Categories */}
//         <section className="py-16 bg-gradient-to-b from-white to-pink-50">
//           <div className="container mx-auto px-4">
//             <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Shop by Category</h2>
            
//             {categories.length === 0 ? (
//               <div className="text-center py-12">
//                 <div className="text-6xl mb-4">🌿</div>
//                 <h3 className="text-xl font-bold text-gray-900 mb-2">No Categories Found</h3>
//                 <p className="text-gray-600">Categories will be available soon</p>
//               </div>
//             ) : (
//               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
//                 {categories.map((category, index) => (
//                   <Link 
//                     key={category.slug || index} 
//                     to={`/products?category=${category.slug || category.name}`}
//                   >
//                     <CategoryCard category={category} />
//                   </Link>
//                 ))}
//               </div>
//             )}
//           </div>
//         </section>

//         {/* Occasions */}
//         <section className="py-16">
//           <div className="container mx-auto px-4">
//             <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Perfect for Every Occasion</h2>
            
//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
//               {occasions.map((occasion, index) => (
//                 <Link 
//                   key={index}
//                   to={`/products?occasion=${occasion}`}
//                   className="bg-white p-6 rounded-2xl text-center shadow-sm hover:shadow-xl transition-shadow duration-300 cursor-pointer border border-pink-100 hover:border-pink-300 block"
//                 >
//                   <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-pink-100 to-rose-100 rounded-full flex items-center justify-center text-2xl">
//                     {["🎂", "💝", "💒", "🕊️", "🎉", "🎁"][index]}
//                   </div>
//                   <h3 className="font-semibold text-gray-900">{occasion}</h3>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Testimonials */}
//         <section className="py-16 bg-gradient-to-r from-pink-50 to-rose-50">
//           <div className="container mx-auto px-4">
//             <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">What Our Customers Say</h2>
            
//             <div className="grid md:grid-cols-3 gap-8">
//               {testimonials.map((testimonial, index) => (
//                 <TestimonialCard key={index} testimonial={testimonial} />
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Newsletter */}
//         <section className="py-16">
//           <div className="container mx-auto px-4">
//             <div className="max-w-2xl mx-auto text-center">
//               <h2 className="text-3xl font-bold text-gray-900 mb-4">
//                 Join Our Flower Club
//               </h2>
//               <p className="text-gray-600 mb-8">
//                 Get exclusive offers, flower care tips, and 15% off your first order
//               </p>
              
//               <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
//                 <input
//                   type="email"
//                   placeholder="Your email address"
//                   className="flex-1 px-6 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
//                 />
//                 <button 
//                   onClick={() => toast.success('Subscribed! Check your email for confirmation.')}
//                   className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-shadow"
//                 >
//                   Subscribe
//                 </button>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Footer */}
//         <footer className="bg-gray-900 text-white py-12">
//           <div className="container mx-auto px-4">
//             <div className="grid md:grid-cols-4 gap-8">
//               <div>
//                 <div className="flex items-center space-x-2 mb-6">
//                   <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center">
//                     <Flower2 className="w-6 h-6 text-white" />
//                   </div>
//                   <span className="text-2xl font-bold">BloomBox</span>
//                 </div>
//                 <p className="text-gray-400">
//                   Bringing beauty and joy through nature's finest creations since 2010.
//                 </p>
//               </div>
              
//               <div>
//                 <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
//                 <ul className="space-y-2 text-gray-400">
//                   <li><Link to="/products" className="hover:text-white">Shop All</Link></li>
//                   <li><Link to="/products?category=Seasonal" className="hover:text-white">Seasonal Collection</Link></li>
//                   <li><Link to="/products?delivery=same-day" className="hover:text-white">Same Day Delivery</Link></li>
//                   <li><Link to="/corporate" className="hover:text-white">Corporate Gifting</Link></li>
//                 </ul>
//               </div>
              
//               <div>
//                 <h3 className="font-semibold text-lg mb-4">Support</h3>
//                 <ul className="space-y-2 text-gray-400">
//                   <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
//                   <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
//                   <li><Link to="/shipping" className="hover:text-white">Shipping Info</Link></li>
//                   <li><Link to="/returns" className="hover:text-white">Returns</Link></li>
//                 </ul>
//               </div>
              
//               <div>
//                 <h3 className="font-semibold text-lg mb-4">Contact</h3>
//                 <ul className="space-y-2 text-gray-400">
//                   <li>123 Flower Street</li>
//                   <li>Garden City, GC 12345</li>
//                   <li>contact@bloombox.com</li>
//                   <li>(555) 123-4567</li>
//                 </ul>
//               </div>
//             </div>
            
//             <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
//               <p>© {new Date().getFullYear()} BloomBox. All rights reserved.</p>
//             </div>
//           </div>
//         </footer>
//       </div>
//     </>
//   );
// };

// export default Homes;








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
  Loader,
  Leaf,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Clock,
  Award,
  Gift,
  Sun,
  Droplets,
  Instagram,
  Facebook,
  Twitter,
  Youtube
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const Homes = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHero, setActiveHero] = useState(0);
  const { user } = useAuth();

  // HD Flower Images from Unsplash
  const heroImages = [
    {
      url: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      title: "Eternal Elegance",
      subtitle: "Handcrafted Premium Roses"
    },
    {
      url: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      title: "Tulip Symphony",
      subtitle: "Fresh from Dutch Gardens"
    },
    {
      url: "https://images.unsplash.com/photo-1591287084180-97911e276ab2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      title: "Luxury Orchids",
      subtitle: "Exotic Beauty Delivered"
    }
  ];

  const featuredFlowers = [
    {
      id: 1,
      name: "Royal Rose Bouquet",
      price: 89.99,
      originalPrice: 129.99,
      rating: 4.9,
      reviews: 245,
      image: "https://images.unsplash.com/photo-1548586196-aa5803b77379?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badge: "Best Seller",
      description: "24 premium roses arranged elegantly"
    },
    {
      id: 2,
      name: "Dutch Tulip Garden",
      price: 79.99,
      originalPrice: 99.99,
      rating: 4.8,
      reviews: 178,
      image: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badge: "Fresh Import",
      description: "Colorful tulips from Netherlands"
    },
    {
      id: 3,
      name: "Orchid Paradise",
      price: 129.99,
      rating: 5.0,
      reviews: 96,
      image: "https://images.unsplash.com/photo-1612422656768-d5e4ec31fac2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badge: "Premium",
      description: "Exotic phalaenopsis orchids"
    },
    {
      id: 4,
      name: "Sunflower Happiness",
      price: 59.99,
      originalPrice: 79.99,
      rating: 4.7,
      reviews: 312,
      image: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badge: "Sale",
      description: "Bright sunflowers with seasonal greens"
    },
    {
      id: 5,
      name: "Lily White Elegance",
      price: 69.99,
      rating: 4.8,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badge: "New",
      description: "Casa Blanca lilies arrangement"
    },
    {
      id: 6,
      name: "Romantic Red Roses",
      price: 99.99,
      originalPrice: 149.99,
      rating: 4.9,
      reviews: 423,
      image: "https://images.unsplash.com/photo-1548586196-aa5803b77379?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badge: "Popular",
      description: "36 long-stemmed red roses"
    }
  ];

  const categories = [
    {
      name: "Roses",
      image: "https://images.unsplash.com/photo-1548586196-aa5803b77379?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      count: 48,
      color: "from-red-500 to-pink-500"
    },
    {
      name: "Tulips",
      image: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      count: 32,
      color: "from-yellow-500 to-orange-500"
    },
    {
      name: "Orchids",
      image: "https://images.unsplash.com/photo-1612422656768-d5e4ec31fac2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      count: 24,
      color: "from-purple-500 to-pink-500"
    },
    {
      name: "Lilies",
      image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      count: 28,
      color: "from-green-500 to-teal-500"
    },
    {
      name: "Sunflowers",
      image: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      count: 19,
      color: "from-yellow-500 to-amber-500"
    },
    {
      name: "Mixed Bouquets",
      image: "https://images.unsplash.com/photo-1591886960571-74d43a9d4166?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      count: 56,
      color: "from-pink-500 to-rose-500"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Interior Designer",
      comment: "The quality of flowers is exceptional. They lasted over two weeks! The arrangement was even more beautiful than the picture.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108777-466d853b23d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      date: "2 weeks ago"
    },
    {
      name: "Michael Chen",
      role: "Event Planner",
      comment: "BloomBox is my go-to for all corporate events. Professional service, stunning arrangements, and always on time.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      date: "1 week ago"
    },
    {
      name: "Emily Rodriguez",
      role: "Bride",
      comment: "My wedding flowers were absolutely perfect! The team understood my vision and delivered beyond expectations.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      date: "3 weeks ago"
    }
  ];

  const occasions = [
    { name: "Birthday", icon: "🎂", image: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { name: "Anniversary", icon: "💝", image: "https://images.unsplash.com/photo-1519378056371-4c6c5a9a1e2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { name: "Wedding", icon: "💒", image: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { name: "Sympathy", icon: "🕊️", image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { name: "Get Well", icon: "🏥", image: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { name: "Just Because", icon: "🎁", image: "https://images.unsplash.com/photo-1591886960571-74d43a9d4166?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Auto-rotate hero images
    const interval = setInterval(() => {
      setActiveHero((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    
    updateCartCount();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  const updateCartCount = () => {
    try {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartCount(cart.reduce((sum, item) => sum + (item.quantity || 1), 0));
      
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      setWishlistCount(wishlist.length);
    } catch (err) {
      console.error('Error updating counts:', err);
    }
  };

  const handleAddToCart = (product) => {
    try {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const existingItem = cart.find(item => item.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }
      
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartCount();
      
      toast.success('Added to cart!', {
        icon: '🛒',
        style: {
          borderRadius: '12px',
          background: '#1a1a1a',
          color: '#fff',
          border: '1px solid #f472b6'
        },
      });
    } catch (err) {
      toast.error('Failed to add to cart');
    }
  };

  const handleAddToWishlist = (productId) => {
    try {
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      
      if (!wishlist.includes(productId)) {
        wishlist.push(productId);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        setWishlistCount(prev => prev + 1);
        
        toast.success('Added to wishlist!', {
          icon: '❤️',
          style: {
            borderRadius: '12px',
            background: '#1a1a1a',
            color: '#fff',
            border: '1px solid #f472b6'
          },
        });
      } else {
        toast('Already in wishlist', {
          icon: '💕',
        });
      }
    } catch (err) {
      toast.error('Failed to add to wishlist');
    }
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Animation styles
  const styles = `
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(2deg); }
    }
    
    @keyframes float-slow {
      0%, 100% { transform: translateY(0px) scale(1); }
      50% { transform: translateY(-15px) scale(1.05); }
    }
    
    @keyframes pulse-glow {
      0%, 100% { opacity: 0.5; transform: scale(1); }
      50% { opacity: 0.8; transform: scale(1.1); }
    }
    
    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(50px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes slideInLeft {
      from {
        opacity: 0;
        transform: translateX(-50px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    @keyframes slideInRight {
      from {
        opacity: 0;
        transform: translateX(50px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    @keyframes fadeScale {
      from {
        opacity: 0;
        transform: scale(0.9);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }
    
    .animate-float {
      animation: float 6s ease-in-out infinite;
    }
    
    .animate-float-slow {
      animation: float-slow 8s ease-in-out infinite;
    }
    
    .animate-pulse-glow {
      animation: pulse-glow 3s ease-in-out infinite;
    }
    
    .animate-slideUp {
      animation: slideUp 0.8s ease-out forwards;
    }
    
    .animate-slideInLeft {
      animation: slideInLeft 0.8s ease-out forwards;
    }
    
    .animate-slideInRight {
      animation: slideInRight 0.8s ease-out forwards;
    }
    
    .animate-fadeScale {
      animation: fadeScale 0.6s ease-out forwards;
    }
    
    .delay-200 { animation-delay: 0.2s; opacity: 0; animation-fill-mode: forwards; }
    .delay-400 { animation-delay: 0.4s; opacity: 0; animation-fill-mode: forwards; }
    .delay-600 { animation-delay: 0.6s; opacity: 0; animation-fill-mode: forwards; }
    .delay-800 { animation-delay: 0.8s; opacity: 0; animation-fill-mode: forwards; }
    
    .hover-lift {
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .hover-lift:hover {
      transform: translateY(-8px);
      box-shadow: 0 30px 50px -20px rgba(0,0,0,0.3);
    }
    
    .glass-morphism {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    .text-gradient {
      background: linear-gradient(135deg, #f43f5e 0%, #ec4899 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  `;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 flex items-center justify-center">
        <div className="text-center relative">
          {/* Animated flowers */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-200 rounded-full blur-3xl opacity-20 animate-pulse"></div>
          </div>
          
          <div className="relative">
            {/* Flower animation */}
            <div className="flex justify-center space-x-4 mb-8">
              <Flower2 className="w-10 h-10 text-rose-500 animate-bounce" style={{ animationDelay: '0s' }} />
              <Flower2 className="w-10 h-10 text-pink-500 animate-bounce" style={{ animationDelay: '0.2s' }} />
              <Flower2 className="w-10 h-10 text-rose-400 animate-bounce" style={{ animationDelay: '0.4s' }} />
            </div>
            
            <Loader className="w-20 h-20 animate-spin text-rose-500 mx-auto mb-6" />
            
            <h2 className="text-4xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-3">
              BloomBox
            </h2>
            
            <p className="text-gray-600 text-lg">Bringing nature's beauty to your doorstep...</p>
            
            {/* Progress bar */}
            <div className="w-72 h-2 bg-gray-200 rounded-full mt-8 mx-auto overflow-hidden">
              <div className="h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-full animate-progress"></div>
            </div>
          </div>
        </div>
        
        <style>{`
          @keyframes progress {
            0% { width: 0%; }
            50% { width: 100%; }
            100% { width: 0%; }
          }
          .animate-progress {
            animation: progress 2s ease-in-out infinite;
          }
        `}</style>
      </div>
    );
  }

  return (
    <>
      <style>{styles}</style>
      
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-xl shadow-lg py-3' 
            : 'bg-transparent py-5'
        }`}>
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link to="/" className="flex items-center space-x-3 group">
                <div className={`w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-500 rounded-2xl flex items-center justify-center transform group-hover:rotate-12 transition-all duration-500 shadow-xl ${
                  !scrolled && 'shadow-rose-200/50'
                }`}>
                  <Flower2 className="w-7 h-7 text-white" />
                </div>
                <span className={`text-2xl font-bold transition-colors duration-300 ${
                  scrolled ? 'text-gray-900' : 'text-white'
                }`}>
                  BloomBox
                </span>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-1">
                {[
                  { name: "Home", href: "/" },
                  { name: "Shop", href: "/products" },
                  { name: "Occasions", href: "/products?occasion=All" },
                  { name: "Collections", href: "/collections" },
                  { name: "About", href: "/about" },
                  { name: "Contact", href: "/contact" }
                ].map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                      scrolled 
                        ? 'text-gray-700 hover:text-rose-600 hover:bg-rose-50' 
                        : 'text-white/90 hover:text-white hover:bg-white/20'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              {/* Icons */}
              <div className="flex items-center space-x-2">
                <button className={`p-2 rounded-full transition-all duration-300 ${
                  scrolled 
                    ? 'text-gray-700 hover:text-rose-600 hover:bg-rose-50' 
                    : 'text-white/90 hover:text-white hover:bg-white/20'
                }`}>
                  <Search className="w-5 h-5" />
                </button>
                
                <Link to="/wishlist" className={`relative p-2 rounded-full transition-all duration-300 ${
                  scrolled 
                    ? 'text-gray-700 hover:text-rose-600 hover:bg-rose-50' 
                    : 'text-white/90 hover:text-white hover:bg-white/20'
                }`}>
                  <Heart className="w-5 h-5" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                      {wishlistCount}
                    </span>
                  )}
                </Link>
                
                <Link to="/cart" className={`relative p-2 rounded-full transition-all duration-300 ${
                  scrolled 
                    ? 'text-gray-700 hover:text-rose-600 hover:bg-rose-50' 
                    : 'text-white/90 hover:text-white hover:bg-white/20'
                }`}>
                  <ShoppingCart className="w-5 h-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                      {cartCount}
                    </span>
                  )}
                </Link>

                <Link to="/profile" className={`ml-2 w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                  scrolled
                    ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md hover:shadow-xl'
                    : 'bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30'
                }`}>
                  {user?.name ? user.name.charAt(0).toUpperCase() : '👤'}
                </Link>

                {/* Mobile Menu Button */}
                <button 
                  className={`md:hidden p-2 rounded-full transition-all duration-300 ${
                    scrolled 
                      ? 'text-gray-700 hover:text-rose-600 hover:bg-rose-50' 
                      : 'text-white/90 hover:text-white hover:bg-white/20'
                  }`}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
              <div className="md:hidden mt-4 animate-slideUp">
                <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 shadow-xl border border-rose-100">
                  <div className="flex flex-col space-y-2">
                    {[
                      { name: "Home", href: "/", icon: "🏠" },
                      { name: "Shop", href: "/products", icon: "🌸" },
                      { name: "Occasions", href: "/products?occasion=All", icon: "🎉" },
                      { name: "Collections", href: "/collections", icon: "✨" },
                      { name: "About", href: "/about", icon: "💫" },
                      { name: "Contact", href: "/contact", icon: "📞" }
                    ].map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all duration-300"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span className="text-xl">{item.icon}</span>
                        <span className="font-medium">{item.name}</span>
                        <ChevronRight className="w-4 h-4 ml-auto opacity-50" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Hero Section with HD Images */}
        <section className="relative h-screen overflow-hidden">
          {/* Background Images */}
          {heroImages.map((hero, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === activeHero ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={hero.url}
                alt={hero.title}
                className="w-full h-full object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
            </div>
          ))}

          {/* Hero Content */}
          <div className="relative h-full flex items-center">
            <div className="container mx-auto px-4 md:px-6">
              <div className="max-w-3xl">
                {heroImages.map((hero, index) => (
                  <div
                    key={index}
                    className={`transition-all duration-1000 transform ${
                      index === activeHero 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-10 absolute'
                    }`}
                  >
                    <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold mb-6 border border-white/30">
                      ✨ Premium Flowers
                    </span>
                    
                    <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 leading-tight">
                      {hero.title}
                    </h1>
                    
                    <p className="text-2xl md:text-3xl text-white/90 mb-8">
                      {hero.subtitle}
                    </p>
                    
                    <p className="text-lg text-white/80 mb-8 max-w-lg">
                      Handcrafted bouquets made with love and delivered fresh to your doorstep.
                    </p>
                    
                    <div className="flex flex-wrap gap-4">
                      <Link
                        to="/products"
                        className="group bg-white text-rose-600 px-8 py-4 rounded-full font-semibold hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2"
                      >
                        <span>Shop Collection</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                      
                      <button
                        onClick={() => scrollToSection('featured')}
                        className="group border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-all duration-300"
                      >
                        Explore
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Hero Indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveHero(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeHero 
                    ? 'w-12 bg-white' 
                    : 'w-4 bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 right-8 animate-bounce">
            <div className="w-10 h-16 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2 animate-scroll"></div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gradient-to-b from-white to-rose-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Truck, title: "Free Delivery", desc: "On orders over $50", color: "from-rose-500 to-pink-500" },
                { icon: Shield, title: "Fresh Guarantee", desc: "7-day freshness", color: "from-blue-500 to-cyan-500" },
                { icon: Award, title: "Premium Quality", desc: "Hand-picked flowers", color: "from-amber-500 to-orange-500" },
                { icon: Sprout, title: "Eco-Friendly", desc: "Sustainable packaging", color: "from-green-500 to-emerald-500" }
              ].map((feature, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-slideUp"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-12 transition-all duration-500 shadow-lg`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-rose-600 transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section id="featured" className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-12">
              <div className="text-center md:text-left mb-6 md:mb-0">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Featured <span className="text-gradient">Bouquets</span>
                </h2>
                <p className="text-gray-600 text-lg max-w-2xl">
                  Discover our most popular arrangements, handpicked by our master florists
                </p>
              </div>
              
              <Link
                to="/products"
                className="group flex items-center space-x-2 text-rose-600 font-semibold hover:text-rose-700"
              >
                <span>View All Products</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {featuredFlowers.map((product, index) => (
                <div
                  key={product.id}
                  className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fadeScale"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-4 left-4 z-10">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white shadow-lg ${
                        product.badge === 'Best Seller' ? 'bg-amber-500' :
                        product.badge === 'Premium' ? 'bg-purple-500' :
                        product.badge === 'Sale' ? 'bg-rose-500' :
                        product.badge === 'New' ? 'bg-emerald-500' :
                        'bg-pink-500'
                      }`}>
                        {product.badge}
                      </span>
                    </div>
                  )}

                  {/* Wishlist Button */}
                  <button
                    onClick={() => handleAddToWishlist(product.id)}
                    className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-rose-50 transition-colors shadow-lg"
                  >
                    <Heart className="w-5 h-5 text-gray-600 hover:text-rose-500 transition-colors" />
                  </button>

                  {/* Product Image */}
                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Quick Actions */}
                    <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-4 font-semibold hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
                      >
                        <ShoppingCart className="w-5 h-5" />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-rose-600 transition-colors">
                      {product.name}
                    </h3>
                    
                    <p className="text-sm text-gray-600 mb-3">
                      {product.description}
                    </p>
                    
                    {/* Rating */}
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating)
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">({product.reviews})</span>
                    </div>
                    
                    {/* Price */}
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-gray-900">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-20 bg-gradient-to-b from-rose-50 to-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Shop by <span className="text-gradient">Category</span>
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Explore our wide range of beautiful flowers, carefully categorized for your convenience
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
              {categories.map((category, index) => (
                <Link
                  key={category.name}
                  to={`/products?category=${category.name}`}
                  className="group relative overflow-hidden rounded-2xl aspect-square animate-fadeScale"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Background Image */}
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-75 group-hover:opacity-90 transition-opacity duration-300`}></div>
                  
                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                    <p className="text-sm opacity-90">{category.count} items</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Premium Collection Banner */}
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-600 to-pink-600">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
              </div>
              
              <div className="relative grid md:grid-cols-2 gap-8 items-center p-8 md:p-12">
                {/* Content */}
                <div className="text-white">
                  <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-6">
                    🌟 Premium Collection
                  </span>
                  
                  <h2 className="text-4xl md:text-5xl font-bold mb-4">
                    Luxury Flowers for Special Moments
                  </h2>
                  
                  <p className="text-white/90 text-lg mb-6 max-w-md">
                    Hand-selected premium blooms, arranged by master florists and delivered with care.
                  </p>
                  
                  <div className="flex flex-wrap gap-4 mb-8">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5" />
                      <span>Fresh from farms</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5" />
                      <span>Expertly arranged</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5" />
                      <span>Premium packaging</span>
                    </div>
                  </div>
                  
                  <Link
                    to="/products?category=Premium"
                    className="inline-flex items-center space-x-2 bg-white text-rose-600 px-8 py-4 rounded-full font-semibold hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
                  >
                    <span>Explore Premium</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
                
                {/* Image Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <img
                    src="https://images.unsplash.com/photo-1548586196-aa5803b77379?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Luxury roses"
                    className="rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Premium tulips"
                    className="rounded-2xl shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-500 mt-8"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Occasions Section */}
        <section className="py-20 bg-gradient-to-b from-white to-rose-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Perfect for Every <span className="text-gradient">Occasion</span>
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Find the perfect flowers for life's special moments
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {occasions.map((occasion, index) => (
                <Link
                  key={occasion.name}
                  to={`/products?occasion=${occasion.name}`}
                  className="group relative overflow-hidden rounded-2xl aspect-square animate-fadeScale"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <img
                    src={occasion.image}
                    alt={occasion.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col items-center justify-end p-6">
                    <span className="text-4xl mb-2">{occasion.icon}</span>
                    <h3 className="text-white font-bold text-lg">{occasion.name}</h3>
                    <p className="text-white/80 text-sm">Shop Now →</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                What Our <span className="text-gradient">Customers</span> Say
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Real reviews from happy customers who trusted us with their special moments
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-slideUp border border-rose-100"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center space-x-4 mb-6">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-2xl object-cover"
                    />
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{testimonial.name}</h3>
                      <p className="text-gray-500 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < testimonial.rating
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed mb-4">"{testimonial.comment}"</p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">{testimonial.date}</span>
                    <span className="text-rose-600 font-medium">Verified Purchase</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-20 bg-gradient-to-br from-rose-600 to-pink-600 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          </div>
          
          {/* Floating Flowers */}
          <div className="absolute inset-0 pointer-events-none">
            <Flower2 className="absolute top-10 left-10 w-16 h-16 text-white/20 animate-float" />
            <Flower2 className="absolute bottom-10 right-10 w-24 h-24 text-white/20 animate-float-slow" />
            <Flower2 className="absolute top-1/2 left-1/4 w-12 h-12 text-white/10 animate-float" />
          </div>
          
          <div className="container mx-auto px-4 md:px-6 relative">
            <div className="max-w-3xl mx-auto text-center text-white">
              <Sparkles className="w-16 h-16 mx-auto mb-6 animate-pulse" />
              
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Join Our Flower Club
              </h2>
              
              <p className="text-xl text-white/90 mb-8">
                Get 15% off your first order and receive exclusive offers, flower care tips, and early access to new collections.
              </p>
              
              <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 rounded-full border-2 border-white/30 bg-white/20 backdrop-blur-sm text-white placeholder-white/70 focus:outline-none focus:border-white transition-colors"
                />
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    toast.success('Welcome to BloomBox! Check your email for 15% off!');
                  }}
                  className="bg-white text-rose-600 px-8 py-4 rounded-full font-bold hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  Subscribe
                </button>
              </form>
              
              <p className="text-white/70 text-sm mt-4">
                No spam, only flowers and love 💕
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-16 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-96 h-96 bg-rose-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500 rounded-full blur-3xl"></div>
          </div>
          
          <div className="container mx-auto px-4 md:px-6 relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {/* About */}
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-rose-500 to-pink-500 rounded-2xl flex items-center justify-center">
                    <Flower2 className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-2xl font-bold">BloomBox</span>
                </div>
                
                <p className="text-gray-400 leading-relaxed mb-6">
                  Bringing beauty and joy through nature's finest creations since 2010. Each bouquet tells a story.
                </p>
                
                {/* Social Links */}
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-rose-600 transition-colors">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-rose-600 transition-colors">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-rose-600 transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-rose-600 transition-colors">
                    <Youtube className="w-5 h-5" />
                  </a>
                </div>
              </div>
              
              {/* Quick Links */}
              <div>
                <h3 className="font-bold text-lg mb-6">Quick Links</h3>
                <ul className="space-y-3">
                  {['About Us', 'Shop', 'Collections', 'Occasions', 'Blog'].map((item) => (
                    <li key={item}>
                      <Link to={`/${item.toLowerCase().replace(' ', '-')}`} className="text-gray-400 hover:text-white hover:translate-x-2 inline-block transition-all">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Customer Service */}
              <div>
                <h3 className="font-bold text-lg mb-6">Customer Service</h3>
                <ul className="space-y-3">
                  {['Contact Us', 'FAQ', 'Shipping Info', 'Returns', 'Track Order'].map((item) => (
                    <li key={item}>
                      <Link to={`/${item.toLowerCase().replace(' ', '-')}`} className="text-gray-400 hover:text-white hover:translate-x-2 inline-block transition-all">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Contact */}
              <div>
                <h3 className="font-bold text-lg mb-6">Contact Info</h3>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-start space-x-3">
                    <span className="text-rose-500">📍</span>
                    <span>123 Flower Street, Garden City, GC 12345</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-rose-500">📧</span>
                    <a href="mailto:contact@bloombox.com" className="hover:text-white">
                      contact@bloombox.com
                    </a>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-rose-500">📞</span>
                    <a href="tel:+15551234567" className="hover:text-white">
                      (555) 123-4567
                    </a>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-rose-500">⏰</span>
                    <span>Mon-Sat: 9AM - 8PM</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Bottom Bar */}
            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400">
              <p>© {new Date().getFullYear()} BloomBox. All rights reserved.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <Link to="/privacy" className="hover:text-white text-sm">Privacy Policy</Link>
                <Link to="/terms" className="hover:text-white text-sm">Terms of Service</Link>
                <Link to="/sitemap" className="hover:text-white text-sm">Sitemap</Link>
              </div>
            </div>
          </div>
        </footer>

        <style>{`
          @keyframes scroll {
            0% { transform: translateY(0); opacity: 1; }
            100% { transform: translateY(20px); opacity: 0; }
          }
          .animate-scroll {
            animation: scroll 2s ease-in-out infinite;
          }
        `}</style>
      </div>
    </>
  );
};

export default Homes;
