
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
//               <p>©️ {new Date().getFullYear()} BloomBox. All rights reserved.</p>
//             </div>
//           </div>
//         </footer>
//       </div>
//     </>
//   );
// };

// export default Homes;



import React, { useState, useEffect, useCallback } from 'react';
import { 
  ChevronRight,
  Truck,
  Shield,
  Sprout,
  Award,
  Flower2,
  Loader,
  ChevronDown,
  Leaf,
  Sparkles,
  Heart,
  Gift,
  Calendar,
  Clock,
  ArrowRight
} from 'lucide-react';
import FlowerCard from '../components/FlowerCard';
import CategoryCard from '../components/CategoryCard';
import TestimonialCard from '../components/TestimonialCard';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { productService } from '../services/productService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

import { 
  indianTestimonials, 
  indianOccasions,
  indianCategories
} from '../utils/mockData';

const Homes = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // Real data from API
  const [featuredFlowers, setFeaturedFlowers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [testimonials, setTestimonials] = useState(indianTestimonials);
  const [occasions] = useState(indianOccasions);

  // Enhanced hero slides with background images
  const heroSlides = [
    {
      id: 1,
      title: "Let Flowers Speak",
      subtitle: "What Words Cannot",
      description: "Discover the perfect bouquet for every occasion. Handcrafted with love and delivered fresh to your doorstep.",
      image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=800&q=80",
      bgImage: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=800&q=80",
      bgColor: "from-pink-400 to-rose-400",
      pattern: "floral",
      accent: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
    },
    {
      id: 2,
      title: "Fresh Flowers",
      subtitle: "Delivered Daily",
      description: "Experience the beauty of freshly cut flowers, sourced directly from local farms and delivered within 24 hours.",
      bgImage: "https://images.unsplash.com/photo-1471899236350-e3016bf1e69e?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=800&q=80",
      bgColor: "from-purple-400 to-pink-400",
      pattern: "geometric",
      accent: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
    },
    {
      id: 3,
      title: "Special Moments",
      subtitle: "Deserve Special Flowers",
      description: "Create lasting memories with our handcrafted arrangements designed for life's most precious moments.",
      bgImage: "https://images.unsplash.com/photo-1644501862474-0e5c89fed1e2?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0",
      image: "https://images.unsplash.com/photo-1519378056375-4b6c5c5e5b7f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=800&q=80",
      bgColor: "from-blue-400 to-purple-400",
      pattern: "dots",
      accent: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
    },
    {
      id: 4,
      title: "Wedding Collection",
      subtitle: "Your Dream Day",
      description: "Elegant floral arrangements for your special day. Custom designs to match your wedding theme.",
      image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=800&q=80",
      bgImage: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=800&q=80",
      bgColor: "from-amber-400 to-orange-400",
      pattern: "wedding",
      accent: "https://images.unsplash.com/photo-1591886960571-74d43a9d4166?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
    },
    {
      id: 5,
      title: "Corporate Gifts",
      subtitle: "Impress & Delight",
      description: "Sophisticated floral gifts for your business partners and employees. Make a lasting impression.",
      bgImage: "https://images.unsplash.com/photo-1567696153798-9111f9cd3d0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=800&q=80",
      image: "https://images.unsplash.com/photo-1526045612212-70caf35c14df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=800&q=80",
      bgColor: "from-emerald-400 to-teal-400",
      pattern: "corporate",
      accent: "https://images.unsplash.com/photo-1591886960571-74d43a9d4166?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
    }
  ];

  useEffect(() => {
    fetchHomeData();
    
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Track mouse position for parallax effect
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Auto-rotate slides
    let slideInterval;
    if (isAutoPlaying) {
      slideInterval = setInterval(() => {
        setActiveSlide((prev) => (prev + 1) % heroSlides.length);
      }, 5000);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(slideInterval);
    };
  }, [isAutoPlaying]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const fetchHomeData = async () => {
    try {
      setLoading(true);
      setError(null);

      const featuredResponse = await productService.getFeaturedProducts();
      setFeaturedFlowers(featuredResponse.data || []);

      try {
        const categoriesResponse = await productService.getCategories();
        setCategories(categoriesResponse.data || []);
      } catch (err) {
        console.log('Using Indian categories mock data');
        setCategories(indianCategories);
      }

    } catch (err) {
      console.error('Error fetching home data:', err);
      setFeaturedFlowers(getMockProducts());
      
      if (featuredFlowers.length === 0) {
        setError('Failed to load home data. Showing demo content.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      let cart = JSON.parse(localStorage.getItem('cart') || '[]');
      
      const existingItemIndex = cart.findIndex(item => item.productId === productId);
      
      if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += 1;
      } else {
        cart.push({ productId, quantity: 1, addedAt: Date.now() });
      }
      
      localStorage.setItem('cart', JSON.stringify(cart));
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
      
      if (!wishlist.includes(productId)) {
        wishlist.push(productId);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        window.dispatchEvent(new Event('cartUpdated'));
        toast.success('Added to wishlist!');
      } else {
        toast.info('Already in wishlist');
      }
    } catch (err) {
      toast.error('Failed to add to wishlist');
      console.error('Error adding to wishlist:', err);
    }
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleShopNow = () => {
    navigate('/products');
  };

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  // Animation styles
  const animationStyles = `
    @keyframes float {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(2deg); }
    }
    
    @keyframes float-delayed {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-15px) rotate(-2deg); }
    }
    
    @keyframes pulse-glow {
      0%, 100% { opacity: 0.6; transform: scale(1); }
      50% { opacity: 1; transform: scale(1.1); }
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
    
    @keyframes slideInUp {
      from {
        opacity: 0;
        transform: translateY(50px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes slideInDown {
      from {
        opacity: 0;
        transform: translateY(-50px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes scaleIn {
      from {
        opacity: 0;
        transform: scale(0.8);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }
    
    @keyframes rotateIn {
      from {
        opacity: 0;
        transform: rotate(-10deg) scale(0.9);
      }
      to {
        opacity: 1;
        transform: rotate(0) scale(1);
      }
    }
    
    @keyframes shimmer {
      0% {
        background-position: -1000px 0;
      }
      100% {
        background-position: 1000px 0;
      }
    }
    
    @keyframes blob {
      0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
      25% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
      50% { border-radius: 50% 50% 30% 70% / 40% 60% 70% 30%; }
      75% { border-radius: 70% 30% 50% 50% / 30% 50% 70% 60%; }
    }
    
    @keyframes zoomIn {
      from {
        opacity: 0;
        transform: scale(1.1);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }
    
    .animate-float {
      animation: float 6s ease-in-out infinite;
    }
    
    .animate-float-delayed {
      animation: float-delayed 7s ease-in-out infinite;
    }
    
    .animate-pulse-glow {
      animation: pulse-glow 2s ease-in-out infinite;
    }
    
    .animate-slideInLeft {
      animation: slideInLeft 0.8s ease-out forwards;
    }
    
    .animate-slideInRight {
      animation: slideInRight 0.8s ease-out forwards;
    }
    
    .animate-slideInUp {
      animation: slideInUp 0.8s ease-out forwards;
    }
    
    .animate-slideInDown {
      animation: slideInDown 0.8s ease-out forwards;
    }
    
    .animate-scaleIn {
      animation: scaleIn 0.6s ease-out forwards;
    }
    
    .animate-rotateIn {
      animation: rotateIn 0.8s ease-out forwards;
    }
    
    .animate-blob {
      animation: blob 7s ease-in-out infinite;
    }
    
    .animate-zoomIn {
      animation: zoomIn 8s ease-out forwards;
    }
    
    .shimmer {
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
      background-size: 1000px 100%;
      animation: shimmer 3s infinite;
    }
    
    .glass-effect {
      backdrop-filter: blur(10px);
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    .text-gradient {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    
    .hero-transition {
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }
  `;

  // Get slide background pattern
  const getPatternStyle = (pattern) => {
    switch(pattern) {
      case 'floral':
        return 'radial-gradient(circle at 10% 20%, rgba(255,255,255,0.1) 0%, transparent 20%), radial-gradient(circle at 90% 80%, rgba(255,255,255,0.1) 0%, transparent 20%)';
      case 'geometric':
        return 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 20%, transparent 80%, rgba(255,255,255,0.1) 100%)';
      case 'dots':
        return 'radial-gradient(circle at 30% 40%, rgba(255,255,255,0.1) 2px, transparent 2px), radial-gradient(circle at 70% 60%, rgba(255,255,255,0.1) 2px, transparent 2px)';
      case 'wedding':
        return 'repeating-linear-gradient(45deg, rgba(255,255,255,0.1) 0px, rgba(255,255,255,0.1) 2px, transparent 2px, transparent 6px)';
      case 'corporate':
        return 'linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(0deg, rgba(255,255,255,0.05) 1px, transparent 1px)';
      default:
        return 'none';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-rose-50">
        <div className="text-center relative">
          {/* Animated flower loader */}
          <div className="relative w-32 h-32 mx-auto mb-8">
            <div className="absolute inset-0 animate-blob bg-gradient-to-r from-pink-400 to-rose-400 rounded-full opacity-70 blur-xl"></div>
            <div className="absolute inset-2 animate-blob bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-70 blur-lg animation-delay-2000"></div>
            <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
              <Flower2 className="w-12 h-12 text-pink-500 animate-pulse" />
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-3 animate-pulse">
            BloomBox
          </h2>
          
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
          
          <p className="text-gray-600 mt-4">Preparing something beautiful for you...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{animationStyles}</style>
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white overflow-x-hidden">
        {/* Header */}
        <Header />
        
        {/* Scroll to Top Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-pink-500 to-rose-500 text-white p-3 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group"
            aria-label="Scroll to top"
          >
            <ChevronDown className="w-6 h-6 transform rotate-180 group-hover:scale-110 transition-transform" />
          </button>
        )}

        {/* Hero Section with Modern Slider and Background Images */}
        <section className="relative min-h-screen flex items-center overflow-hidden">
          {/* Background Image with Overlay */}
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                activeSlide === index ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-zoomIn"
                style={{ 
                  backgroundImage: `url(${slide.bgImage})`,
                }}
              />
              
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${slide.bgColor} opacity-70 mix-blend-multiply`} />
              
              {/* Pattern Overlay */}
             
            </div>
          ))}
          
          {/* Animated Blobs */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/20 rounded-full filter blur-3xl animate-blob"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/20 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
          
          {/* Floating Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white/30 rounded-full"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `float ${5 + Math.random() * 5}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 5}s`
                }}
              />
            ))}
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
              {/* Left Content */}
              <div className="order-2 lg:order-1">
                <div className="space-y-8">
                
                  
                  {/* Main Title */}
                  <div className="space-y-2">
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">
                      <span className="animate-slideInLeft block">
                        {heroSlides[activeSlide].title}
                      </span>
                      <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-white animate-slideInRight">
                        {heroSlides[activeSlide].subtitle}
                      </span>
                    </h1>
                    
                    <p className="text-white/90 text-lg sm:text-xl max-w-xl animate-slideInUp" style={{ animationDelay: '0.2s' }}>
                      {heroSlides[activeSlide].description}
                    </p>
                  </div>
                  
                  {/* CTA Buttons */}
                  <div className="flex flex-wrap gap-4 animate-slideInUp" style={{ animationDelay: '0.4s' }}>
                    <button
                      onClick={handleShopNow}
                      className="group relative overflow-hidden bg-white text-gray-900 px-8 py-4 rounded-full font-semibold hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
                    >
                      <span className="relative z-10 flex items-center">
                        Shop Collection
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-200 to-pink-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                    
                    <button
                      onClick={() => handleNavigate('/products?category=Featured')}
                      className="group glass-effect text-white px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <span className="flex items-center">
                        View Featured
                        <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </button>
                  </div>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 pt-8 animate-slideInUp" style={{ animationDelay: '0.6s' }}>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">500+</div>
                      <div className="text-white/80 text-sm">Fresh Arrangements</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">1000+</div>
                      <div className="text-white/80 text-sm">Happy Customers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">30min</div>
                      <div className="text-white/80 text-sm">Fast Delivery</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right Content - Image with Parallax */}
              <div className="order-1 lg:order-2 relative">
                <div className="relative perspective-1000">
                  {/* Main Image Container */}
                  <div 
                    className="relative w-full aspect-square max-w-lg mx-auto transform transition-transform duration-300"
                    style={{
                      transform: `rotateY(${mousePosition.x}deg) rotateX(${-mousePosition.y}deg)`
                    }}
                  >
                    {/* Decorative Rings */}
                    <div className="absolute -inset-8 border-2 border-white/20 rounded-full animate-pulse-glow"></div>
                    <div className="absolute -inset-16 border border-white/10 rounded-full animate-pulse-glow" style={{ animationDelay: '0.5s' }}></div>
                    
                    {/* Product Image */}
                  
                    
                    {/* Floating Accent Image */}
                    <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl animate-float-delayed">
                      <img
                        src={heroSlides[activeSlide].accent}
                        alt="Accent"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Slide Indicators */}
                <div className="flex justify-center items-center space-x-4 mt-8">
                  {/* Prev Button */}
                  <button
                    onClick={handlePrevSlide}
                    className="group w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 flex items-center justify-center"
                    aria-label="Previous slide"
                  >
                    <ChevronRight className="w-5 h-5 text-white transform rotate-180 group-hover:-translate-x-1 transition-transform" />
                  </button>
                  
                  {/* Dots */}
                  <div className="flex space-x-2">
                    {heroSlides.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setActiveSlide(index);
                          setIsAutoPlaying(false);
                          setTimeout(() => setIsAutoPlaying(true), 5000);
                        }}
                        className={`group relative transition-all duration-500 ${
                          activeSlide === index ? 'w-12' : 'w-2'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      >
                        <div className={`h-2 rounded-full transition-all duration-300 ${
                          activeSlide === index 
                            ? 'bg-white w-12' 
                            : 'bg-white/50 w-2 group-hover:bg-white/80'
                        }`}>
                          {activeSlide === index && (
                            <div className="absolute inset-0 bg-white rounded-full animate-pulse"></div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                  
                  {/* Next Button */}
                  <button
                    onClick={handleNextSlide}
                    className="group w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 flex items-center justify-center"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Bouquets</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Handpicked arrangements for special moments, crafted with love and delivered with care
              </p>
            </div>

            {featuredFlowers.length === 0 ? (
              <div className="text-center py-12">
                <Flower2 className="w-16 h-16 text-pink-300 mx-auto mb-4 animate-pulse" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">No Featured Products</h3>
                <p className="text-gray-600">Check back soon for new arrivals!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {featuredFlowers.map((flower, index) => (
                  <div 
                    key={flower._id} 
                    className="animate-slideInUp" 
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <FlowerCard 
                      flower={flower} 
                      onAddToCart={() => handleAddToCart(flower._id)}
                      onAddToWishlist={handleAddToWishlist}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-20 bg-gradient-to-b from-white to-pink-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
              Shop by Category
            </h2>
            
            {categories.length === 0 ? (
              <div className="text-center py-12">
                <Leaf className="w-16 h-16 text-pink-300 mx-auto mb-4 animate-pulse" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">No Categories Found</h3>
                <p className="text-gray-600">Categories will be available soon</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {categories.map((category, index) => (
                  <button
                    key={category.slug || index}
                    onClick={() => handleNavigate(`/products?category=${category.slug || category.name}`)}
                    className="transform hover:scale-105 transition-all duration-300 group animate-scaleIn"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <CategoryCard category={category} />
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Occasions Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
              Perfect for Every Occasion
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {occasions.map((occasion, index) => (
                <button
                  key={index}
                  onClick={() => handleNavigate(`/products?occasion=${occasion.name}`)}
                  className="group relative overflow-hidden rounded-2xl bg-white p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-pink-100 hover:border-pink-300 animate-scaleIn"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${occasion.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  <div className="relative">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden transform group-hover:scale-110 transition-transform duration-300">
                      <img 
                        src={occasion.image} 
                        alt={occasion.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-semibold text-gray-900">{occasion.name}</h3>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gradient-to-r from-pink-50 to-rose-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
              What Our Customers Say
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index} 
                  className="animate-slideInUp" 
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center relative">
              {/* Decorative Elements */}
              <div className="absolute -top-16 -left-16 w-32 h-32 animate-float">
                <img 
                  src="https://images.unsplash.com/photo-1597848212624-a19eb35e2651?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80" 
                  alt="Decorative"
                  className="w-full h-full object-cover rounded-full opacity-30"
                />
              </div>
              <div className="absolute -bottom-16 -right-16 w-32 h-32 animate-float-delayed">
                <img 
                  src="https://images.unsplash.com/photo-1561181286-d3fee7d55364?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80" 
                  alt="Decorative"
                  className="w-full h-full object-cover rounded-full opacity-30"
                />
              </div>
              
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Join Our Flower Club
              </h2>
              <p className="text-gray-600 mb-8 text-lg">
                Get exclusive offers, flower care tips, and 15% off your first order
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-6 py-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                />
                <button 
                  onClick={() => toast.success('Subscribed! Check your email for confirmation.')}
                  className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Homes;



