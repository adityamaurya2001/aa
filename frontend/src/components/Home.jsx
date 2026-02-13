
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
  Sun,
  Moon,
  Gift,
  Calendar,
  Clock,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import FlowerCard from './FlowerCard';
import CategoryCard from './CategoryCard';
import TestimonialCard from './TestimonialCard';
import { productService } from '../services/productService';
import { orderService } from '../services/orderService';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const Homes = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const { user } = useAuth();
  
  const [featuredFlowers, setFeaturedFlowers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [testimonials, setTestimonials] = useState([
    {
      name: "Sarah Johnson",
      comment: "The flowers were absolutely stunning! Fresh and delivered right on time for my anniversary.",
      rating: 5,
      image: "👩",
      date: "2 days ago"
    },
    {
      name: "Michael Chen",
      comment: "Perfect arrangement for my wife's birthday. She couldn't stop smiling! The quality is exceptional.",
      rating: 5,
      image: "👨",
      date: "1 week ago"
    },
    {
      name: "Emily Rodriguez",
      comment: "Professional service and breathtaking bouquets. My go-to flower shop for all occasions!",
      rating: 4,
      image: "👩‍🦰",
      date: "3 days ago"
    }
  ]);

  const occasions = [
    { name: "Birthday", icon: "🎂", color: "from-pink-400 to-rose-400" },
    { name: "Anniversary", icon: "💝", color: "from-red-400 to-pink-400" },
    { name: "Wedding", icon: "💒", color: "from-purple-400 to-pink-400" },
    { name: "Sympathy", icon: "🕊️", color: "from-blue-400 to-indigo-400" },
    { name: "Congratulations", icon: "🎉", color: "from-green-400 to-emerald-400" },
    { name: "Just Because", icon: "🎁", color: "from-yellow-400 to-orange-400" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    fetchHomeData();
    updateCartAndWishlistCount();
    
    window.addEventListener('cartUpdated', updateCartAndWishlistCount);
    window.addEventListener('storage', updateCartAndWishlistCount);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('cartUpdated', updateCartAndWishlistCount);
      window.removeEventListener('storage', updateCartAndWishlistCount);
    };
  }, []);

  const fetchHomeData = async () => {
    try {
      setLoading(true);
      setError(null);

      const featuredResponse = await productService.getFeaturedProducts();
      setFeaturedFlowers(featuredResponse.data || []);

      const categoriesResponse = await productService.getCategories();
      setCategories(categoriesResponse.data || []);

    } catch (err) {
      console.error('Error fetching home data:', err);
      
      setFeaturedFlowers(getMockProducts());
      setCategories(getMockCategories());
      
      if (featuredFlowers.length === 0 && categories.length === 0) {
        setError('Failed to load home data. Showing demo content.');
      }
    } finally {
      setLoading(false);
    }
  };

  const updateCartAndWishlistCount = () => {
    try {
      const cartData = localStorage.getItem('cart');
      if (cartData) {
        const cart = JSON.parse(cartData);
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
      
      const wishlistData = localStorage.getItem('wishlist');
      if (wishlistData) {
        const wishlist = JSON.parse(wishlistData);
        setWishlistCount(Array.isArray(wishlist) ? wishlist.length : 0);
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
        images: [{ url: 'https://images.unsplash.com/photo-1548586196-aa5803b77379?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }],
        occasion: ["Romance"],
        isAvailable: true,
        stock: 10,
        description: "A stunning arrangement of premium roses"
      },
      {
        _id: '2',
        name: "Lily Garden",
        price: 38.50,
        discountPrice: 48.50,
        ratings: 4.6,
        numOfReviews: 89,
        images: [{ url: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }],
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
        images: [{ url: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }],
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
        images: [{ url: 'https://images.unsplash.com/photo-1612422656768-d5e4ec31fac2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }],
        occasion: ["Luxury"],
        isAvailable: true,
        stock: 5
      }
    ];
  };

  const getMockCategories = () => {
    return [
      { name: "Roses", count: 42, icon: "🌹", color: "from-red-400 to-pink-400", slug: "roses" },
      { name: "Tulips", count: 28, icon: "🌷", color: "from-yellow-400 to-orange-400", slug: "tulips" },
      { name: "Lilies", count: 35, icon: "🌸", color: "from-pink-400 to-purple-400", slug: "lilies" },
      { name: "Orchids", count: 24, icon: "🦋", color: "from-purple-400 to-indigo-400", slug: "orchids" },
      { name: "Sunflowers", count: 18, icon: "🌻", color: "from-yellow-400 to-amber-400", slug: "sunflowers" },
      { name: "Seasonal", count: 56, icon: "🍂", color: "from-green-400 to-teal-400", slug: "seasonal" }
    ];
  };

  const handleAddToCart = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      
      if (token) {
        await orderService.addToCart({
          productId,
          quantity: 1
        });
      } else {
        let cart = JSON.parse(localStorage.getItem('cart') || '[]');
        
        const existingItemIndex = cart.findIndex(item => item.productId === productId);
        
        if (existingItemIndex > -1) {
          cart[existingItemIndex].quantity += 1;
        } else {
          cart.push({ productId, quantity: 1, addedAt: Date.now() });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
      }
      
      updateCartAndWishlistCount();
      window.dispatchEvent(new Event('cartUpdated'));
      
      toast.success('Added to cart!', {
        icon: '🛒',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
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
        setWishlistCount(prev => prev + 1);
        toast.success('Added to wishlist!', {
          icon: '❤️',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
      } else {
        toast('Already in wishlist', {
          icon: '💕',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
      }
    } catch (err) {
      toast.error('Failed to add to wishlist');
      console.error('Error adding to wishlist:', err);
    }
  };

  const animationStyles = `
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(2deg); }
    }
    
    @keyframes float-delayed {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-15px) rotate(-2deg); }
    }
    
    @keyframes pulse-glow {
      0%, 100% { opacity: 0.6; transform: scale(1); }
      50% { opacity: 1; transform: scale(1.05); }
    }
    
    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateX(-30px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .animate-float {
      animation: float 6s ease-in-out infinite;
    }
    
    .animate-float-delayed {
      animation: float-delayed 7s ease-in-out infinite;
    }
    
    .animate-pulse-glow {
      animation: pulse-glow 3s ease-in-out infinite;
    }
    
    .animate-slideIn {
      animation: slideIn 0.8s ease-out forwards;
    }
    
    .animate-fadeInUp {
      animation: fadeInUp 0.8s ease-out forwards;
    }
    
    .delay-200 {
      animation-delay: 0.2s;
      opacity: 0;
    }
    
    .delay-400 {
      animation-delay: 0.4s;
      opacity: 0;
    }
    
    .delay-600 {
      animation-delay: 0.6s;
      opacity: 0;
    }
    
    .hover-lift {
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .hover-lift:hover {
      transform: translateY(-5px);
      box-shadow: 0 20px 40px -15px rgba(0,0,0,0.2);
    }
    
    .gradient-border {
      position: relative;
      border: double 1px transparent;
      border-radius: 1rem;
      background-image: linear-gradient(white, white), 
                        linear-gradient(to right, #f472b6, #f43f5e);
      background-origin: border-box;
      background-clip: padding-box, border-box;
    }
  `;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-rose-50">
        <div className="text-center relative">
          {/* Animated flowers background */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-200 rounded-full blur-3xl opacity-20 animate-pulse"></div>
          </div>
          
          <div className="relative">
            <div className="flex justify-center space-x-2 mb-8">
              <Flower2 className="w-8 h-8 text-pink-500 animate-bounce" style={{ animationDelay: '0s' }} />
              <Flower2 className="w-8 h-8 text-rose-500 animate-bounce" style={{ animationDelay: '0.2s' }} />
              <Flower2 className="w-8 h-8 text-pink-400 animate-bounce" style={{ animationDelay: '0.4s' }} />
            </div>
            <Loader className="w-16 h-16 animate-spin text-pink-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-3">
              BloomBox
            </h2>
            <p className="text-gray-600 text-lg">Bringing nature's beauty to your doorstep...</p>
            
            {/* Progress bar */}
            <div className="w-64 h-2 bg-gray-200 rounded-full mt-8 mx-auto overflow-hidden">
              <div className="h-full bg-gradient-to-r from-pink-500 to-rose-500 rounded-full animate-loading"></div>
            </div>
          </div>
        </div>
        
        <style jsx>{`
          @keyframes loading {
            0% { width: 0%; }
            50% { width: 100%; }
            100% { width: 0%; }
          }
          .animate-loading {
            animation: loading 2s ease-in-out infinite;
          }
        `}</style>
      </div>
    );
  }

  return (
    <>
      <style>{animationStyles}</style>
      
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
        {/* Floating Background Elements */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-delayed"></div>
          <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        </div>

        {/* Header */}
        <header className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-xl shadow-lg' 
            : 'bg-white/80 backdrop-blur-md'
        }`}>
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link to="/" className="flex items-center space-x-2 group">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                  <Flower2 className="w-7 h-7 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                  BloomBox
                </span>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-1">
                {[
                  { to: "/", label: "Home", icon: "🏠" },
                  { to: "/products", label: "Shop", icon: "🌸" },
                  { to: "/products?occasion=Anniversary", label: "Occasions", icon: "🎉" },
                  { to: "/products?category=Featured", label: "Collections", icon: "✨" },
                  { to: "/about", label: "About", icon: "💫" }
                ].map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="px-4 py-2 text-gray-700 hover:text-pink-600 font-medium rounded-full hover:bg-pink-50 transition-all duration-300 flex items-center space-x-1 group"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>

              {/* Icons */}
              <div className="flex items-center space-x-4">
                <Link to="/products" className="relative p-2 hover:bg-pink-50 rounded-full transition-colors group">
                  <Search className="w-5 h-5 text-gray-700 group-hover:text-pink-600 transition-colors" />
                </Link>
                
                <Link to="/wishlist" className="relative p-2 hover:bg-pink-50 rounded-full transition-colors group">
                  <Heart className="w-5 h-5 text-gray-700 group-hover:text-pink-600 transition-colors" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                      {wishlistCount}
                    </span>
                  )}
                </Link>
                
                <Link to="/cart" className="relative p-2 hover:bg-pink-50 rounded-full transition-colors group">
                  <ShoppingCart className="w-5 h-5 text-gray-700 group-hover:text-pink-600 transition-colors" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                      {cartCount}
                    </span>
                  )}
                </Link>

                <Link to="/profile" className="hidden md:block ml-2">
                  <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full flex items-center justify-center text-white font-semibold shadow-md hover:shadow-xl transform hover:scale-110 transition-all duration-300">
                    {localStorage.getItem('token') && user?.name
                      ? user.name.charAt(0).toUpperCase()
                      : '👤'}
                  </div>
                </Link>

                {/* Mobile Menu Button */}
                <button 
                  className="md:hidden p-2 hover:bg-pink-50 rounded-full transition-colors"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? 
                    <X className="w-6 h-6 text-gray-700" /> : 
                    <Menu className="w-6 h-6 text-gray-700" />
                  }
                </button>
              </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
              <div className="md:hidden mt-4 pb-4 animate-slideIn">
                <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-pink-100">
                  <div className="flex flex-col space-y-2">
                    {[
                      { to: "/", label: "Home", icon: "🏠" },
                      { to: "/products", label: "Shop", icon: "🌸" },
                      { to: "/products?occasion=Anniversary", label: "Occasions", icon: "🎉" },
                      { to: "/products?category=Featured", label: "Collections", icon: "✨" },
                      { to: "/about", label: "About", icon: "💫" },
                      { to: "/profile", label: "My Account", icon: "👤" },
                      { to: "/orders", label: "My Orders", icon: "📦" }
                    ].map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-xl transition-all duration-300"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span className="text-xl">{item.icon}</span>
                        <span className="font-medium">{item.label}</span>
                        <ChevronRight className="w-4 h-4 ml-auto opacity-50" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </header>

        {error && (
          <div className="container mx-auto px-4 py-4 animate-slideIn">
            <div className="bg-amber-50 border-l-4 border-amber-500 rounded-lg p-4 shadow-md">
              <div className="flex items-center">
                <span className="text-amber-600 mr-3 text-xl">🌸</span>
                <p className="text-amber-800 font-medium">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* Animated background shapes */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-20 left-10 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
            <div className="absolute bottom-20 right-10 w-80 h-80 bg-rose-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-delayed"></div>
          </div>

          <div className="container mx-auto px-4 py-12 md:py-24">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="animate-fadeInUp">
                <div className="inline-block px-4 py-2 bg-pink-100 rounded-full text-pink-600 font-semibold text-sm mb-6">
                  ✨ Fresh Flowers Delivered Daily
                </div>
                <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
                  Let Flowers 
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500">
                    Speak
                  </span>
                  <span className="block text-4xl md:text-5xl text-gray-700 mt-2">
                    What Words Cannot
                  </span>
                </h1>
                <p className="text-gray-600 mt-6 text-lg max-w-lg">
                  Discover the perfect bouquet for every occasion. Handcrafted with love and delivered fresh to your doorstep with care.
                </p>
                
                {/* Stats */}
                <div className="flex flex-wrap gap-8 mt-8">
                  <div>
                    <div className="text-3xl font-bold text-pink-600">10k+</div>
                    <div className="text-sm text-gray-500">Happy Customers</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-pink-600">500+</div>
                    <div className="text-sm text-gray-500">Unique Designs</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-pink-600">24/7</div>
                    <div className="text-sm text-gray-500">Support</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 mt-8">
                  <Link 
                    to="/products"
                    className="group bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-4 rounded-full font-semibold hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2"
                  >
                    <span>Shop Collection</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link 
                    to="/products?category=Featured"
                    className="group border-2 border-pink-500 text-pink-600 px-8 py-4 rounded-full font-semibold hover:bg-pink-50 transition-all duration-300 flex items-center space-x-2"
                  >
                    <Sparkles className="w-5 h-5" />
                    <span>View Featured</span>
                  </Link>
                </div>
              </div>
              
              <div className="relative animate-float">
                <div className="relative w-full h-96 md:h-[500px]">
                  {/* Main flower image placeholder */}
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-400/30 to-rose-400/30 rounded-3xl transform rotate-3 backdrop-blur-sm"></div>
                  <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/20 to-rose-500/20 rounded-3xl transform -rotate-3 backdrop-blur-sm"></div>
                  
                  {/* Animated flower arrangement */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="grid grid-cols-3 gap-4 p-8">
                      <div className="text-7xl animate-bounce-slow">🌹</div>
                      <div className="text-7xl animate-bounce-slow-delayed">🌷</div>
                      <div className="text-7xl animate-bounce-slow">🌸</div>
                      <div className="text-7xl animate-bounce-slow-delayed">🌺</div>
                      <div className="text-7xl animate-bounce-slow">🌻</div>
                      <div className="text-7xl animate-bounce-slow-delayed">🌼</div>
                      <div className="text-7xl animate-bounce-slow">💐</div>
                      <div className="text-7xl animate-bounce-slow-delayed">🪷</div>
                      <div className="text-7xl animate-bounce-slow">🌿</div>
                    </div>
                  </div>
                </div>
                
                {/* Floating flowers */}
                <div className="absolute -top-8 -left-8 w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center text-4xl shadow-xl animate-bounce-slow">
                  🌻
                </div>
                <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center text-4xl shadow-xl animate-bounce-slow-delayed">
                  🌹
                </div>
                <div className="absolute top-1/2 -right-12 w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-3xl shadow-xl animate-float">
                  🦋
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-white/50 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: Truck, title: "Free Delivery", desc: "On orders over $50", color: "from-pink-400 to-rose-400" },
                { icon: Shield, title: "Fresh Guarantee", desc: "7-day freshness guarantee", color: "from-rose-400 to-pink-400" },
                { icon: Sprout, title: "Eco-Friendly", desc: "Sustainable packaging", color: "from-green-400 to-emerald-400" }
              ].map((feature, index) => (
                <div 
                  key={index}
                  className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-pink-50 p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  <div className="relative z-10 flex items-center space-x-4">
                    <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center transform group-hover:rotate-12 transition-all duration-500 shadow-lg`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-gray-900 group-hover:text-pink-600 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">{feature.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-12 animate-fadeInUp">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500">Bouquets</span>
                </h2>
                <p className="text-gray-600 text-lg">Handpicked arrangements for your special moments</p>
              </div>
              <Link 
                to="/products" 
                className="hidden md:flex items-center text-pink-600 font-semibold hover:text-pink-700 group"
              >
                <span>View All Products</span>
                <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {featuredFlowers.length === 0 ? (
              <div className="text-center py-16 bg-white/50 backdrop-blur-sm rounded-3xl animate-fadeInUp">
                <div className="text-8xl mb-6 animate-float">🌸</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">No Featured Products Yet</h3>
                <p className="text-gray-600 text-lg">Check back soon for our beautiful new arrivals!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {featuredFlowers.map((flower, index) => (
                  <div 
                    key={flower._id} 
                    className="animate-fadeInUp"
                    style={{ animationDelay: `${index * 0.1}s` }}
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

            {/* Mobile view all link */}
            <div className="text-center mt-8 md:hidden">
              <Link 
                to="/products" 
                className="inline-flex items-center text-pink-600 font-semibold hover:text-pink-700 group"
              >
                View All Products
                <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-20 bg-gradient-to-br from-pink-50 via-white to-rose-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4">
              Shop by <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500">Category</span>
            </h2>
            <p className="text-center text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
              Explore our wide range of beautiful flowers, carefully categorized for your convenience
            </p>
            
            {categories.length === 0 ? (
              <div className="text-center py-12 bg-white/50 backdrop-blur-sm rounded-3xl">
                <div className="text-6xl mb-4 animate-float">🌿</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Categories Coming Soon</h3>
                <p className="text-gray-600">We're working on organizing our beautiful collection</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {categories.map((category, index) => (
                  <div 
                    key={category.slug || index}
                    className="animate-fadeInUp"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <Link to={`/products?category=${category.slug || category.name}`}>
                      <CategoryCard category={category} />
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Occasions */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4">
              Perfect for Every <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500">Occasion</span>
            </h2>
            <p className="text-center text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
              Find the perfect flowers for life's special moments, big and small
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {occasions.map((occasion, index) => (
                <Link 
                  key={index}
                  to={`/products?occasion=${occasion.name}`}
                  className="group relative overflow-hidden rounded-2xl bg-white p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fadeInUp"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${occasion.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  <div className="relative">
                    <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl flex items-center justify-center text-4xl transform group-hover:rotate-12 transition-all duration-500">
                      {occasion.icon}
                    </div>
                    <h3 className="font-bold text-gray-900 group-hover:text-pink-600 transition-colors">
                      {occasion.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-2">Shop Now →</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-gradient-to-br from-pink-50 via-white to-rose-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4">
              What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500">Customers</span> Say
            </h2>
            <p className="text-center text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
              Don't just take our word for it - hear from our happy customers
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fadeInUp border border-pink-100"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-rose-400 rounded-2xl flex items-center justify-center text-3xl">
                      {testimonial.image}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{testimonial.name}</h3>
                      <p className="text-gray-500 text-sm">{testimonial.date}</p>
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
                  
                  <p className="text-gray-700 leading-relaxed">"{testimonial.comment}"</p>
                  
                  <div className="mt-6 flex items-center text-pink-600">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    <span className="text-sm font-medium">Verified Purchase</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl p-12 text-center relative overflow-hidden">
              {/* Animated background */}
              <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float"></div>
                <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-float-delayed"></div>
              </div>
              
              <div className="relative">
                <Sparkles className="w-16 h-16 text-white/50 mx-auto mb-6 animate-pulse" />
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Join Our Flower Club
                </h2>
                <p className="text-white/90 text-lg mb-8 max-w-lg mx-auto">
                  Get exclusive offers, flower care tips, and 15% off your first order
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="flex-1 px-6 py-4 rounded-full border-2 border-white/30 bg-white/20 backdrop-blur-sm text-white placeholder-white/70 focus:outline-none focus:border-white transition-colors"
                  />
                  <button 
                    onClick={() => toast.success('Welcome to BloomBox! Check your email for 15% off!', {
                      icon: '🎉',
                      style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                      },
                    })}
                    className="bg-white text-pink-600 px-8 py-4 rounded-full font-bold hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                  >
                    Subscribe
                  </button>
                </div>
                
                <p className="text-white/70 text-sm mt-4">
                  No spam, only flowers and love 💕
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-16 relative overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl animate-float-delayed"></div>
          </div>

          <div className="container mx-auto px-4 relative">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center">
                    <Flower2 className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-2xl font-bold">BloomBox</span>
                </div>
                <p className="text-gray-400 leading-relaxed">
                  Bringing beauty and joy through nature's finest creations since 2010. Each bouquet tells a story.
                </p>
                
                {/* Social links */}
                <div className="flex space-x-4 mt-6">
                  {['📘', '📷', '🐦', '📌'].map((icon, index) => (
                    <a
                      key={index}
                      href="#"
                      className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-xl hover:bg-pink-600 transition-colors"
                    >
                      {icon}
                    </a>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-bold text-lg mb-6 flex items-center">
                  <Leaf className="w-5 h-5 mr-2 text-pink-500" />
                  Quick Links
                </h3>
                <ul className="space-y-3 text-gray-400">
                  {[
                    { to: "/products", label: "Shop All" },
                    { to: "/products?category=Seasonal", label: "Seasonal Collection" },
                    { to: "/products?delivery=same-day", label: "Same Day Delivery" },
                    { to: "/corporate", label: "Corporate Gifting" }
                  ].map((item) => (
                    <li key={item.to}>
                      <Link to={item.to} className="hover:text-white hover:translate-x-2 inline-block transition-all">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold text-lg mb-6 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-pink-500" />
                  Support
                </h3>
                <ul className="space-y-3 text-gray-400">
                  {[
                    { to: "/contact", label: "Contact Us" },
                    { to: "/faq", label: "FAQ" },
                    { to: "/shipping", label: "Shipping Info" },
                    { to: "/returns", label: "Returns" }
                  ].map((item) => (
                    <li key={item.to}>
                      <Link to={item.to} className="hover:text-white hover:translate-x-2 inline-block transition-all">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold text-lg mb-6 flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-pink-500" />
                  Contact
                </h3>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-start space-x-2">
                    <span className="text-pink-500">📍</span>
                    <span>123 Flower Street, Garden City, GC 12345</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-pink-500">📧</span>
                    <a href="mailto:contact@bloombox.com" className="hover:text-white">
                      contact@bloombox.com
                    </a>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-pink-500">📞</span>
                    <a href="tel:+15551234567" className="hover:text-white">
                      (555) 123-4567
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400">
              <p>© {new Date().getFullYear()} BloomBox. All rights reserved.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <Link to="/privacy" className="hover:text-white text-sm">Privacy Policy</Link>
                <Link to="/terms" className="hover:text-white text-sm">Terms of Service</Link>
                <Link to="/sitemap" className="hover:text-white text-sm">Sitemap</Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Homes;
