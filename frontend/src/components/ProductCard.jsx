// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { 
//   Heart, 
//   ShoppingCart, 
//   Star, 
//   Eye,
//   TrendingUp,
//   Zap,
//   Check,
//   AlertCircle
// } from 'lucide-react';
// import { toast } from 'react-hot-toast';

// const ProductCard = ({ 
//   product, 
//   viewMode = 'grid',
//   onAddToCart,
//   onAddToWishlist,
//   showQuickView = true,
//   showBadges = true,
//   showActions = true
// }) => {
//   const [isWishlisted, setIsWishlisted] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);

//   const {
//     _id,
//     name,
//     price,
//     discountPrice,
//     ratings,
//     numOfReviews,
//     images,
//     occasion = [],
//     tags = [],
//     isAvailable = true,
//     stock = 0,
//     isFeatured = false,
//     isNew = false,
//     category,
//     description
//   } = product;

//   // Calculate discount percentage
//   const discountPercentage = discountPrice 
//     ? Math.round(((price - discountPrice) / price) * 100)
//     : 0;

//   // Check if product is low stock
//   const isLowStock = stock > 0 && stock <= 5;
  
//   // Check if product is out of stock
//   const isOutOfStock = !isAvailable || stock === 0;

//   // Handle wishlist toggle
//   const handleWishlistToggle = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
    
//     if (isWishlisted) {
//       // Remove from wishlist
//       let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
//       wishlist = wishlist.filter(id => id !== _id);
//       localStorage.setItem('wishlist', JSON.stringify(wishlist));
//       setIsWishlisted(false);
//       toast.success('Removed from wishlist');
//     } else {
//       // Add to wishlist
//       let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
//       wishlist.push(_id);
//       localStorage.setItem('wishlist', JSON.stringify(wishlist));
//       setIsWishlisted(true);
//       toast.success('Added to wishlist!');
//     }

//     // Notify parent component
//     if (onAddToWishlist) {
//       onAddToWishlist(_id);
//     }

//     // Dispatch event for other components
//     window.dispatchEvent(new Event('wishlistUpdated'));
//   };

//   // Handle add to cart
//   const handleAddToCart = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
    
//     if (isOutOfStock) {
//       toast.error('This product is out of stock');
//       return;
//     }

//     if (onAddToCart) {
//       onAddToCart(_id);
//     } else {
//       // Default cart functionality
//       let cart = JSON.parse(localStorage.getItem('cart') || '[]');
//       const existingItem = cart.find(item => item.productId === _id);
      
//       if (existingItem) {
//         existingItem.quantity += 1;
//       } else {
//         cart.push({
//           productId: _id,
//           quantity: 1,
//           addedAt: Date.now(),
//           price: discountPrice || price
//         });
//       }
      
//       localStorage.setItem('cart', JSON.stringify(cart));
//       toast.success('Added to cart!');
      
//       // Notify other components
//       window.dispatchEvent(new Event('cartUpdated'));
//     }
//   };

//   // Handle quick view
//   const handleQuickView = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     // In a real app, this would open a modal or redirect
//     toast.success('Quick view feature coming soon!');
//   };

//   // Get primary image URL
//   const primaryImage = images?.[0]?.url || '';
  
//   // Get product color based on category or tags
//   const getCategoryColor = () => {
//     const categoryColors = {
//       'roses': 'bg-red-100 text-red-600',
//       'lilies': 'bg-pink-100 text-pink-600',
//       'tulips': 'bg-yellow-100 text-yellow-600',
//       'orchids': 'bg-purple-100 text-purple-600',
//       'sunflowers': 'bg-orange-100 text-orange-600',
//       'seasonal': 'bg-green-100 text-green-600',
//       'bouquets': 'bg-blue-100 text-blue-600',
//       'mixed': 'bg-indigo-100 text-indigo-600'
//     };
    
//     return categoryColors[category?.toLowerCase()] || 'bg-gray-100 text-gray-600';
//   };

//   // List View Layout
//   if (viewMode === 'list') {
//     return (
//       <Link 
//         to={`/product/${_id}`}
//         className="group block"
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//       >
//         <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
//           <div className="flex gap-6 p-6">
//             {/* Product Image */}
//             <div className="relative w-64 h-64 flex-shrink-0">
//               <div className="w-full h-full bg-gradient-to-br from-pink-50 to-rose-100 rounded-xl overflow-hidden">
//                 {primaryImage ? (
//                   <img
//                     src={primaryImage}
//                     alt={name}
//                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                   />
//                 ) : (
//                   <div className="w-full h-full flex items-center justify-center text-6xl">
//                     💐
//                   </div>
//                 )}
//               </div>

//               {/* Badges */}
//               {showBadges && (
//                 <div className="absolute top-4 left-4 flex flex-col gap-2">
//                   {discountPercentage > 0 && (
//                     <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
//                       -{discountPercentage}%
//                     </span>
//                   )}
//                   {isFeatured && (
//                     <span className="bg-pink-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
//                       <TrendingUp className="w-3 h-3 inline mr-1" />
//                       Featured
//                     </span>
//                   )}
//                   {isNew && (
//                     <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
//                       <Zap className="w-3 h-3 inline mr-1" />
//                       New
//                     </span>
//                   )}
//                   {isLowStock && (
//                     <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
//                       Low Stock
//                     </span>
//                   )}
//                   {isOutOfStock && (
//                     <span className="bg-gray-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
//                       Out of Stock
//                     </span>
//                   )}
//                 </div>
//               )}

//               {/* Quick Actions */}
//               {showActions && (
//                 <div className={`absolute top-4 right-4 flex flex-col gap-2 transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
//                   <button
//                     onClick={handleWishlistToggle}
//                     className={`p-3 rounded-full shadow-lg transition-all ${
//                       isWishlisted 
//                         ? 'bg-pink-500 text-white' 
//                         : 'bg-white text-gray-600 hover:bg-pink-500 hover:text-white'
//                     }`}
//                     title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
//                   >
//                     <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
//                   </button>
                  
//                   {showQuickView && (
//                     <button
//                       onClick={handleQuickView}
//                       className="p-3 bg-white rounded-full shadow-lg text-gray-600 hover:bg-blue-500 hover:text-white transition-colors"
//                       title="Quick view"
//                     >
//                       <Eye className="w-5 h-5" />
//                     </button>
//                   )}
//                 </div>
//               )}
//             </div>

//             {/* Product Info */}
//             <div className="flex-1">
//               <div className="flex justify-between items-start mb-4">
//                 <div className="flex-1">
//                   <div className="flex items-center gap-3 mb-3">
//                     <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor()}`}>
//                       {category || 'Flowers'}
//                     </span>
//                     <div className="flex items-center">
//                       <Star className="w-4 h-4 text-yellow-400 fill-current" />
//                       <span className="ml-1 font-semibold">{ratings || 0}</span>
//                       <span className="ml-1 text-gray-500">({numOfReviews || 0})</span>
//                     </div>
//                   </div>
                  
//                   <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-pink-600 transition-colors">
//                     {name}
//                   </h3>
                  
//                   <p className="text-gray-600 mb-6 line-clamp-3">
//                     {description || 'Beautifully arranged flowers perfect for any occasion.'}
//                   </p>
//                 </div>
                
//                 <div className="text-right ml-6">
//                   <div className="text-3xl font-bold text-gray-900 mb-2">
//                     ${discountPrice || price}
//                     {discountPrice && (
//                       <span className="ml-2 text-lg text-gray-500 line-through">
//                         ${price}
//                       </span>
//                     )}
//                   </div>
                  
//                   {discountPrice && (
//                     <div className="text-sm text-green-600 font-medium mb-4">
//                       Save ${(price - discountPrice).toFixed(2)}
//                     </div>
//                   )}
                  
//                   <div className="text-sm text-gray-600">
//                     {stock > 0 ? (
//                       <span className="text-green-600 font-medium">
//                         <Check className="w-4 h-4 inline mr-1" />
//                         In Stock ({stock} available)
//                       </span>
//                     ) : (
//                       <span className="text-red-600 font-medium">
//                         <AlertCircle className="w-4 h-4 inline mr-1" />
//                         Out of Stock
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {/* Occasion Tags */}
//               {occasion.length > 0 && (
//                 <div className="mb-6">
//                   <h4 className="text-sm font-medium text-gray-700 mb-2">Perfect For:</h4>
//                   <div className="flex flex-wrap gap-2">
//                     {occasion.slice(0, 3).map((occ, index) => (
//                       <span
//                         key={index}
//                         className="px-3 py-1.5 bg-pink-50 text-pink-600 rounded-lg text-sm font-medium"
//                       >
//                         {occ}
//                       </span>
//                     ))}
//                     {occasion.length > 3 && (
//                       <span className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-sm">
//                         +{occasion.length - 3} more
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               )}

//               {/* Actions */}
//               <div className="flex items-center gap-4">
//                 <button
//                   onClick={handleAddToCart}
//                   disabled={isOutOfStock}
//                   className={`flex-1 py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 ${
//                     isOutOfStock 
//                       ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
//                       : 'bg-pink-500 hover:bg-pink-600 text-white'
//                   }`}
//                 >
//                   <ShoppingCart className="w-6 h-6" />
//                   {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
//                 </button>
                
//                 <Link
//                   to={`/product/${_id}`}
//                   className="px-8 py-4 border-2 border-pink-500 text-pink-600 rounded-xl font-semibold hover:bg-pink-50 transition-colors"
//                 >
//                   View Details
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </Link>
//     );
//   }

//   // Grid View Layout (Default)
//   return (
//     <Link 
//       to={`/product/${_id}`}
//       className="group block"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col">
//         {/* Product Image */}
//         <div className="relative aspect-square">
//           <div className="w-full h-full bg-gradient-to-br from-pink-50 to-rose-100 overflow-hidden">
//             {primaryImage ? (
//               <img
//                 src={primaryImage}
//                 alt={name}
//                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//               />
//             ) : (
//               <div className="w-full h-full flex items-center justify-center text-7xl">
//                 💐
//               </div>
//             )}
//           </div>

//           {/* Badges */}
//           {showBadges && (
//             <div className="absolute top-4 left-4 flex flex-col gap-2">
//               {discountPercentage > 0 && (
//                 <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
//                   -{discountPercentage}%
//                 </span>
//               )}
//               {isFeatured && (
//                 <span className="bg-pink-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
//                   <TrendingUp className="w-3 h-3 inline mr-1" />
//                   Featured
//                 </span>
//               )}
//               {isNew && (
//                 <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
//                   <Zap className="w-3 h-3 inline mr-1" />
//                   New
//                 </span>
//               )}
//               {isLowStock && (
//                 <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
//                   Low Stock
//                 </span>
//               )}
//               {isOutOfStock && (
//                 <span className="bg-gray-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
//                   Out of Stock
//                 </span>
//               )}
//             </div>
//           )}

//           {/* Quick Actions */}
//           {showActions && (
//             <div className={`absolute top-4 right-4 flex flex-col gap-2 transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
//               <button
//                 onClick={handleWishlistToggle}
//                 className={`p-3 rounded-full shadow-lg transition-all ${
//                   isWishlisted 
//                     ? 'bg-pink-500 text-white' 
//                     : 'bg-white text-gray-600 hover:bg-pink-500 hover:text-white'
//                 }`}
//                 title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
//               >
//                 <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
//               </button>
              
//               {showQuickView && (
//                 <button
//                   onClick={handleQuickView}
//                   className="p-3 bg-white rounded-full shadow-lg text-gray-600 hover:bg-blue-500 hover:text-white transition-colors"
//                   title="Quick view"
//                 >
//                   <Eye className="w-5 h-5" />
//                 </button>
//               )}
//             </div>
//           )}

//           {/* Add to Cart Button (Hover) */}
//           {showActions && (
//             <button
//               onClick={handleAddToCart}
//               disabled={isOutOfStock}
//               className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 transition-all duration-300 ${
//                 isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
//               } ${
//                 isOutOfStock 
//                   ? 'bg-gray-500 text-white cursor-not-allowed' 
//                   : 'bg-pink-500 hover:bg-pink-600 text-white'
//               } px-8 py-3 rounded-full font-semibold shadow-lg`}
//             >
//               {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
//             </button>
//           )}
//         </div>

//         {/* Product Info */}
//         <div className="p-6 flex-1 flex flex-col">
//           {/* Category and Rating */}
//           <div className="flex justify-between items-center mb-3">
//             <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor()}`}>
//               {category || 'Flowers'}
//             </span>
//             <div className="flex items-center">
//               <Star className="w-4 h-4 text-yellow-400 fill-current" />
//               <span className="ml-1 text-sm font-semibold">{ratings || 0}</span>
//               <span className="ml-1 text-xs text-gray-500">({numOfReviews || 0})</span>
//             </div>
//           </div>

//           {/* Product Name */}
//           <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-pink-600 transition-colors">
//             {name}
//           </h3>

//           {/* Occasion Tags */}
//           {occasion.length > 0 && (
//             <div className="mb-3">
//               <div className="flex flex-wrap gap-1">
//                 {occasion.slice(0, 2).map((occ, index) => (
//                   <span
//                     key={index}
//                     className="px-2 py-1 bg-pink-50 text-pink-600 rounded text-xs"
//                   >
//                     {occ}
//                   </span>
//                 ))}
//                 {occasion.length > 2 && (
//                   <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
//                     +{occasion.length - 2}
//                   </span>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Price and Stock */}
//           <div className="mt-auto">
//             <div className="flex items-center justify-between mb-3">
//               <div>
//                 <span className="text-2xl font-bold text-gray-900">
//                   ${discountPrice || price}
//                 </span>
//                 {discountPrice && (
//                   <span className="ml-2 text-sm text-gray-500 line-through">
//                     ${price}
//                   </span>
//                 )}
//               </div>
              
//               {isLowStock && !isOutOfStock && (
//                 <span className="text-xs text-amber-600 font-medium">
//                   Only {stock} left
//                 </span>
//               )}
//             </div>

//             {/* Stock Status */}
//             {isOutOfStock ? (
//               <div className="text-sm text-red-600 font-medium">
//                 <AlertCircle className="w-4 h-4 inline mr-1" />
//                 Out of Stock
//               </div>
//             ) : (
//               <div className="text-sm text-green-600 font-medium">
//                 <Check className="w-4 h-4 inline mr-1" />
//                 In Stock
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// };

// // Default props
// ProductCard.defaultProps = {
//   viewMode: 'grid',
//   showQuickView: true,
//   showBadges: true,
//   showActions: true
// };

// export default ProductCard;




// import React from 'react';

// const ProductWithLink = () => {
//   const categories = [
//     {
//       title: "Delicious Cakes",
//       image: "https://imgcdn.floweraura.com/Cake (3).jpg",
//       links: ["Birthday Cakes", "Anniversary Cakes", "Designer Cakes", "Photo Cakes", "Chocolate Cakes"]
//     },
//     {
//       title: "Gifting Gallery",
//       image: "https://imgcdn.floweraura.com/Gifting Gallery.jpg",
//       links: ["Photo Gifts", "Mugs", "Cushions", "Name Gifts", "Caricatures"]
//     },
//     {
//       title: "Floral Delights",
//       image: "https://imgcdn.floweraura.com/Floral Delights.jpg",
//       links: ["Red Roses", "Birthday Flowers", "Anniversary Flowers", "Exotic Flowers", "Flower Boxes"]
//     },
//     {
//       title: "Plant Paradise",
//       image: "https://imgcdn.floweraura.com/Plant Paradise.jpg",
//       links: ["Bonsai", "Indoor", "Air Purifying", "Lucky Bamboo", "Flowering"]
//     },
//   ];

//   return (
//     <section className="bg-white py-10">
//       <div className="container-custom">
//         <div className="bg-teal-50 rounded-2xl p-10">
//           <ul className="flex flex-wrap gap-5">
//             {categories.map((category) => (
//               <li key={category.title} className="flex-1 min-w-[calc(50%-10px)] flex bg-white rounded-lg overflow-hidden">
//                 <div className="w-1/2">
//                   <img 
//                     src={category.image} 
//                     alt={category.title}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//                 <div className="w-1/2 p-5">
//                   <h3 className="text-xl font-semibold mb-4">{category.title}</h3>
//                   <div className="space-y-2">
//                     {category.links.map((link) => (
//                       <a 
//                         key={link}
//                         href="#"
//                         className="block text-gray-600 text-sm hover:text-primary"
//                       >
//                         {link}
//                       </a>
//                     ))}
//                   </div>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ProductWithLink;


import React, { useState } from 'react';

const ProductWithLink = () => {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const categories = [
    {
      id: 1,
      title: "Delicious Cakes",
      image: "https://imgcdn.floweraura.com/Cake (3).jpg",
      icon: "🎂",
      bgColor: "from-pink-100 to-pink-50",
      links: [
        { name: "Birthday Cakes", icon: "🎈", popular: true },
        { name: "Anniversary Cakes", icon: "💑", popular: true },
        { name: "Designer Cakes", icon: "🎨" },
        { name: "Photo Cakes", icon: "📸", popular: true },
        { name: "Chocolate Cakes", icon: "🍫" }
      ]
    },
    {
      id: 2,
      title: "Gifting Gallery",
      image: "https://imgcdn.floweraura.com/Gifting Gallery.jpg",
      icon: "🎁",
      bgColor: "from-purple-100 to-purple-50",
      links: [
        { name: "Photo Gifts", icon: "🖼️", popular: true },
        { name: "Mugs", icon: "☕", popular: true },
        { name: "Cushions", icon: "🛋️" },
        { name: "Name Gifts", icon: "✍️" },
        { name: "Caricatures", icon: "🎭" }
      ]
    },
    {
      id: 3,
      title: "Floral Delights",
      image: "https://imgcdn.floweraura.com/Floral Delights.jpg",
      icon: "🌸",
      bgColor: "from-green-100 to-green-50",
      links: [
        { name: "Red Roses", icon: "🌹", popular: true },
        { name: "Birthday Flowers", icon: "🎂", popular: true },
        { name: "Anniversary Flowers", icon: "💐" },
        { name: "Exotic Flowers", icon: "🌺" },
        { name: "Flower Boxes", icon: "📦", popular: true }
      ]
    },
    {
      id: 4,
      title: "Plant Paradise",
      image: "https://imgcdn.floweraura.com/Plant Paradise.jpg",
      icon: "🌿",
      bgColor: "from-emerald-100 to-emerald-50",
      links: [
        { name: "Bonsai", icon: "🎋", popular: true },
        { name: "Indoor", icon: "🏠" },
        { name: "Air Purifying", icon: "🌬️", popular: true },
        { name: "Lucky Bamboo", icon: "🎍" },
        { name: "Flowering", icon: "🌷" }
      ]
    },
  ];

  return (
    <section className="bg-gradient-to-b from-white to-pink-50/30 py-12 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="text-pink-600 font-semibold text-sm tracking-wider uppercase">
            Shop by Category
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mt-2 mb-3">
            Explore Our Collections
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find the perfect gift for every occasion from our wide range of categories
          </p>
        </div>

        {/* Categories Grid */}
        <div className="bg-gradient-to-r from-teal-50 via-pink-50 to-purple-50 rounded-3xl p-6 md:p-8 shadow-inner">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((category) => (
              <div
                key={category.id}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                onMouseEnter={() => setHoveredCategory(category.id)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                <div className="relative flex flex-col md:flex-row">
                  {/* Image Section */}
                  <div className="md:w-2/5 h-48 md:h-auto relative overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Category Icon - Mobile */}
                    <div className="absolute top-3 left-3 md:hidden w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl shadow-lg">
                      {category.icon}
                    </div>
                    
                    {/* View All Button on Image */}
                    <div className="absolute bottom-3 left-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      <button className="bg-white text-pink-600 text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg hover:bg-pink-600 hover:text-white transition-colors">
                        View All
                      </button>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="md:w-3/5 p-5">
                    {/* Category Title */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="hidden md:block w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                        {category.icon}
                      </span>
                      <h3 className="text-lg md:text-xl font-bold text-gray-800 group-hover:text-pink-600 transition-colors">
                        {category.title}
                      </h3>
                      <span className="bg-pink-100 text-pink-600 text-xs px-2 py-1 rounded-full ml-auto">
                        10+ items
                      </span>
                    </div>

                    {/* Links Grid */}
                    <div className="space-y-2.5">
                      {category.links.map((link, idx) => (
                        <a
                          key={link.name}
                          href="#"
                          className="flex items-center justify-between group/link text-sm text-gray-600 hover:text-pink-600 transition-all duration-300 hover:translate-x-1"
                          style={{ animationDelay: `${idx * 100}ms` }}
                        >
                          <span className="flex items-center gap-2">
                            <span className="text-base">{link.icon}</span>
                            <span>{link.name}</span>
                            {link.popular && (
                              <span className="bg-orange-100 text-orange-600 text-[10px] px-1.5 py-0.5 rounded-full">
                                Popular
                              </span>
                            )}
                          </span>
                          <svg
                            className="w-4 h-4 opacity-0 group-hover/link:opacity-100 transform -translate-x-2 group-hover/link:translate-x-0 transition-all"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </a>
                      ))}
                    </div>

                    {/* Quick Shop Section */}
                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-xs text-gray-400">Starting from ₹499</span>
                      <button className="text-xs font-semibold text-pink-600 hover:text-pink-700 flex items-center gap-1">
                        Quick Shop
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-pink-500 rounded-2xl transition-all duration-500 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-10">
          <a
            href="#"
            className="inline-flex items-center gap-3 bg-pink-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group"
          >
            <span>Explore All Categories</span>
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
          {[
            { icon: "🚚", text: "Free Shipping", subtext: "On orders above ₹499" },
            { icon: "💳", text: "Secure Payment", subtext: "100% secure transactions" },
            { icon: "🎁", text: "Gift Wrapping", subtext: "Free gift wrap available" },
            { icon: "⏰", text: "Same Day Delivery", subtext: "In select cities" }
          ].map((feature, idx) => (
            <div key={idx} className="text-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <span className="text-3xl mb-2 block">{feature.icon}</span>
              <h4 className="font-semibold text-gray-800 text-sm">{feature.text}</h4>
              <p className="text-xs text-gray-500">{feature.subtext}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductWithLink;
