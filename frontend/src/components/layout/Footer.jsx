
// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { 
//   Phone, 
//   Mail, 
//   MapPin, 
//   Clock, 
//   Flower2,
//   Leaf
// } from 'lucide-react';
// import { useAuth } from '../../context/AuthContext';
// import { toast } from 'react-hot-toast';

// const Footer = () => {
//   const navigate = useNavigate();
//   const { isAuthenticated } = useAuth();

//   const handleNavigate = (path) => {
//     // Check if path requires authentication
//     const protectedPaths = ['/profile', '/orders', '/wishlist', '/cart'];
    
//     if (protectedPaths.includes(path) && !isAuthenticated) {
//       navigate('/login', { state: { from: path } });
//       toast.error('Please login to access this feature');
//       return;
//     }
    
//     navigate(path);
//   };

//   const handleSubscribe = () => {
//     toast.success('Subscribed! Check your email for confirmation.');
//   };

//   return (
//     <footer className="bg-gray-900 text-white pt-12 md:pt-16 pb-8">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
//           {/* Company Info */}
//           <div>
//             <div className="flex items-center space-x-2 mb-6">
//               <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center">
//                 <Flower2 className="w-6 h-6 text-white" />
//               </div>
//               <span className="text-xl md:text-2xl font-bold">BloomBox</span>
//             </div>
//             <p className="text-gray-400 text-sm">
//               Bringing beauty and joy through nature's finest creations since 2010.
//             </p>
            
//             {/* Social Media Links */}
//             <div className="flex space-x-4 mt-6">
//               <a 
//                 href="https://facebook.com" 
//                 target="_blank" 
//                 rel="noopener noreferrer" 
//                 className="text-gray-400 hover:text-white transition-colors"
//                 aria-label="Facebook"
//               >
//                 <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.99h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.99C18.343 21.128 22 16.991 22 12z"/>
//                 </svg>
//               </a>
//               <a 
//                 href="https://instagram.com" 
//                 target="_blank" 
//                 rel="noopener noreferrer" 
//                 className="text-gray-400 hover:text-white transition-colors"
//                 aria-label="Instagram"
//               >
//                 <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.08 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"/>
//                 </svg>
//               </a>
//               <a 
//                 href="https://twitter.com" 
//                 target="_blank" 
//                 rel="noopener noreferrer" 
//                 className="text-gray-400 hover:text-white transition-colors"
//                 aria-label="Twitter"
//               >
//                 <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
//                 </svg>
//               </a>
//             </div>
//           </div>
          
//           {/* Quick Links */}
//           <div>
//             <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
//             <ul className="space-y-2 text-gray-400 text-sm">
//               <li>
//                 <button 
//                   onClick={() => handleNavigate('/products')} 
//                   className="hover:text-white transition-colors"
//                 >
//                   Shop All
//                 </button>
//               </li>
//               <li>
//                 <button 
//                   onClick={() => handleNavigate('/products?category=Seasonal')} 
//                   className="hover:text-white transition-colors"
//                 >
//                   Seasonal Collection
//                 </button>
//               </li>
//               <li>
//                 <button 
//                   onClick={() => handleNavigate('/products?delivery=same-day')} 
//                   className="hover:text-white transition-colors"
//                 >
//                   Same Day Delivery
//                 </button>
//               </li>
//               <li>
//                 <button 
//                   onClick={() => handleNavigate('/corporate')} 
//                   className="hover:text-white transition-colors"
//                 >
//                   Corporate Gifting
//                 </button>
//               </li>
//               <li>
//                 <button 
//                   onClick={() => handleNavigate('/wishlist')} 
//                   className="hover:text-white transition-colors"
//                 >
//                   Wishlist
//                 </button>
//               </li>
//             </ul>
//           </div>
          
//           {/* Support */}
//           <div>
//             <h3 className="font-semibold text-lg mb-4">Support</h3>
//             <ul className="space-y-2 text-gray-400 text-sm">
//               <li>
//                 <button 
//                   onClick={() => handleNavigate('/contact')} 
//                   className="hover:text-white transition-colors"
//                 >
//                   Contact Us
//                 </button>
//               </li>
//               <li>
//                 <button 
//                   onClick={() => handleNavigate('/faq')} 
//                   className="hover:text-white transition-colors"
//                 >
//                   FAQ
//                 </button>
//               </li>
//               <li>
//                 <button 
//                   onClick={() => handleNavigate('/shipping')} 
//                   className="hover:text-white transition-colors"
//                 >
//                   Shipping Info
//                 </button>
//               </li>
//               <li>
//                 <button 
//                   onClick={() => handleNavigate('/returns')} 
//                   className="hover:text-white transition-colors"
//                 >
//                   Returns
//                 </button>
//               </li>
//               <li>
//                 <button 
//                   onClick={() => handleNavigate('/privacy')} 
//                   className="hover:text-white transition-colors"
//                 >
//                   Privacy Policy
//                 </button>
//               </li>
//             </ul>
//           </div>
          
//           {/* Contact */}
//           <div>
//             <h3 className="font-semibold text-lg mb-4">Contact</h3>
//             <ul className="space-y-3 text-gray-400 text-sm">
//               <li className="flex items-start space-x-3">
//                 <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
//                 <span>123 Flower Street, Garden City, GC 12345</span>
//               </li>
//               <li className="flex items-center space-x-3">
//                 <Phone className="w-5 h-5 flex-shrink-0" />
//                 <a href="tel:+5551234567" className="hover:text-white transition-colors">
//                   (555) 123-4567
//                 </a>
//               </li>
//               <li className="flex items-center space-x-3">
//                 <Mail className="w-5 h-5 flex-shrink-0" />
//                 <a href="mailto:contact@bloombox.com" className="hover:text-white transition-colors">
//                   contact@bloombox.com
//                 </a>
//               </li>
//               <li className="flex items-center space-x-3">
//                 <Clock className="w-5 h-5 flex-shrink-0" />
//                 <span>Mon-Sat: 9AM - 8PM</span>
//               </li>
//             </ul>
//           </div>
//         </div>
        
//         {/* Bottom Bar */}
//         <div className="border-t border-gray-800 mt-8 md:mt-12 pt-8">
//           <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
//             <p>©️ {new Date().getFullYear()} BloomBox. All rights reserved.</p>
//             <div className="flex space-x-6 mt-4 md:mt-0">
//               <button 
//                 onClick={() => handleNavigate('/privacy')} 
//                 className="hover:text-white transition-colors"
//               >
//                 Privacy Policy
//               </button>
//               <button 
//                 onClick={() => handleNavigate('/terms')} 
//                 className="hover:text-white transition-colors"
//               >
//                 Terms of Service
//               </button>
//               <button 
//                 onClick={() => handleNavigate('/cookies')} 
//                 className="hover:text-white transition-colors"
//               >
//                 Cookie Policy
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;



import React from 'react';

const Footer = () => {
  const socialLinks = [
    { 
      name: 'Facebook', 
      icon: 'M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z', 
      color: '#1877f2',
      bgColor: 'hover:bg-[#1877f2]'
    },
    { 
      name: 'Twitter', 
      icon: 'M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z', 
      color: '#1DA1F2',
      bgColor: 'hover:bg-[#1DA1F2]'
    },
    { 
      name: 'YouTube', 
      icon: 'M21.543 6.498C22 8.28 22 12 22 12s0 3.72-.457 5.502c-.254.985-.997 1.76-1.938 2.022C17.896 20 12 20 12 20s-5.893 0-7.605-.476c-.945-.266-1.687-1.04-1.938-2.022C2 15.72 2 12 2 12s0-3.72.457-5.502c.254-.985.997-1.76 1.938-2.022C6.107 4 12 4 12 4s5.896 0 7.605.476c.945.266 1.687 1.04 1.938 2.022zM10 15.5l6-3.5-6-3.5v7z', 
      color: '#FF0000',
      bgColor: 'hover:bg-[#FF0000]'
    },
    { 
      name: 'Pinterest', 
      icon: 'M12 2C6.48 2 2 6.48 2 12c0 4.84 3.44 8.87 8 9.8v-6.8H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8 0-5.52-4.48-10-10-10z', 
      color: '#E60023',
      bgColor: 'hover:bg-[#E60023]'
    },
    { 
      name: 'Instagram', 
      icon: 'M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4c0 3.2-2.6 5.8-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8C2 4.6 4.6 2 7.8 2zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6zm9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z', 
      color: '#E4405F',
      bgColor: 'hover:bg-gradient-to-r hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#FCAF45]'
    },
  ];

  const footerColumns = [
    {
      title: "Company",
      links: ["About Us", "Sell With Us", "Coupons & Deals", "Cancellation & Refund", "Terms and Conditions"]
    },
    {
      title: "Information",
      links: ["Media", "Privacy Policy", "Reviews", "Blog", "Sitemap"]
    },
    {
      title: "Support",
      links: ["Corporate Gifts", "Franchise", "FAQ", "Contact Us", "Download App"]
    }
  ];

  const paymentMethods = [
    { name: 'Visa', icon: '💳' },
    { name: 'Mastercard', icon: '💳' },
    { name: 'PayPal', icon: '📱' },
    { name: 'UPI', icon: '📲' },
    { name: 'Rupay', icon: '💳' }
  ];

  return (
    <footer className="bg-gradient-to-b from-white to-pink-50/30 border-t border-gray-200">
      {/* Newsletter Section */}
      <div className="bg-pink-600 py-10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-white">
              <h3 className="text-xl font-bold mb-2">Subscribe to Our Newsletter</h3>
              <p className="text-white/80 text-sm">Get latest updates and exclusive offers</p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-80 px-4 py-3 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
              />
              <button className="bg-pink-800 text-white px-6 py-3 rounded-r-lg hover:bg-pink-900 transition-colors font-semibold">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 py-12">
          {/* Logo and Description */}
          <div className="lg:col-span-1">
            <img 
              src="https://imgcdn.floweraura.com/fa-logo/final-23-mob.svg" 
              alt="FlowerAura"
              className="h-10 mb-4"
            />
            <p className="text-sm text-gray-600 mb-4">
              India's most trusted gifting platform. Delivering happiness since 2010.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-800">4.8★</span>
              <span className="text-xs text-gray-500">(10k+ reviews)</span>
            </div>
          </div>

          {/* Footer Columns */}
          {footerColumns.map((column, idx) => (
            <div key={idx} className="lg:col-span-1">
              <h3 className="text-base font-bold text-gray-800 mb-4 relative inline-block">
                {column.title}
                <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-pink-500"></span>
              </h3>
              <ul className="space-y-3">
                {column.links.map((item) => (
                  <li key={item}>
                    <a 
                      href="#" 
                      className="text-sm text-gray-600 hover:text-pink-600 transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* App Download Section */}
          <div className="lg:col-span-1">
            <h3 className="text-base font-bold text-gray-800 mb-4 relative inline-block">
              Download App
              <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-pink-500"></span>
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Simplify your gifting experience with our app.
            </p>
            <div className="flex items-center gap-4 mb-6">
              <img 
                src="https://imgcdn.floweraura.com/home-page/app-footer-qr.svg" 
                alt="QR Code"
                className="w-20 h-20 border-2 border-gray-200 rounded-lg p-1"
              />
              <div className="space-y-2">
                <a href="#" className="block">
                  <img 
                    src="https://imgcdn.floweraura.com/fa-media/play_store.svg" 
                    alt="Play Store" 
                    className="w-[120px] hover:opacity-80 transition-opacity"
                  />
                </a>
                <a href="#" className="block">
                  <img 
                    src="https://imgcdn.floweraura.com/fa-media/app_store.svg" 
                    alt="App Store" 
                    className="w-[120px] hover:opacity-80 transition-opacity"
                  />
                </a>
              </div>
            </div>

            {/* Social Media */}
            <h3 className="text-base font-bold text-gray-800 mb-4 relative inline-block">
              Spread The Love
              <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-pink-500"></span>
            </h3>
            <ul className="flex gap-3">
              {socialLinks.map((social) => (
                <li key={social.name}>
                  <a 
                    href="#" 
                    className={`block w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg ${social.bgColor} group`}
                    aria-label={social.name}
                  >
                    <svg 
                      className="w-5 h-5 transition-colors duration-300 group-hover:text-white"
                      viewBox="0 0 24 24" 
                      fill="currentColor"
                      style={{ color: social.color }}
                    >
                      <path d={social.icon} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Payment Methods and Trust Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-t border-gray-200">
          <div>
            <h4 className="text-sm font-semibold text-gray-800 mb-3">We Accept</h4>
            <div className="flex flex-wrap items-center gap-3">
              {paymentMethods.map((method) => (
                <span key={method.name} className="text-2xl" title={method.name}>
                  {method.icon}
                </span>
              ))}
              <img 
                src="https://imgcdn.floweraura.com/alloccasion/footer/desktop-payment-option.png" 
                alt="Payment Methods"
                className="h-8 object-contain"
              />
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-800 mb-3">Trust Badges</h4>
            <div className="flex gap-4">
              <span className="text-xs bg-green-100 text-green-600 px-3 py-1.5 rounded-full">
                ✅ Secure Payments
              </span>
              <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1.5 rounded-full">
                🔒 SSL Certified
              </span>
              <span className="text-xs bg-purple-100 text-purple-600 px-3 py-1.5 rounded-full">
                ⭐ Trusted Seller
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-800 mb-3">Customer Support</h4>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-sm text-gray-600">1800-123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-sm text-gray-600">support@floweraura.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center py-6 border-t border-gray-200">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <img 
              src="https://imgcdn.floweraura.com/fa-logo/final-23-mob.svg" 
              alt="FlowerAura"
              className="h-6"
            />
            <span className="text-xs text-gray-500">
              Copyright © 2026. FA GIFTS PVT. LTD. All rights reserved.
            </span>
          </div>
          
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <a href="#" className="hover:text-pink-600 transition-colors">Privacy Policy</a>
            <span>|</span>
            <a href="#" className="hover:text-pink-600 transition-colors">Terms of Use</a>
            <span>|</span>
            <a href="#" className="hover:text-pink-600 transition-colors">Cookie Policy</a>
          </div>
        </div>

        {/* Location and Language */}
        <div className="flex justify-end gap-4 pb-6">
          <select className="text-xs border rounded-md px-2 py-1 text-gray-600 focus:outline-none focus:ring-1 focus:ring-pink-500">
            <option>India (English)</option>
            <option>USA (English)</option>
            <option>UAE (Arabic)</option>
          </select>
          <select className="text-xs border rounded-md px-2 py-1 text-gray-600 focus:outline-none focus:ring-1 focus:ring-pink-500">
            <option>INR (₹)</option>
            <option>USD ($)</option>
            <option>AED (د.إ)</option>
          </select>
        </div>
      </div>

      {/* Back to Top Button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 bg-pink-600 text-white w-12 h-12 rounded-full shadow-lg hover:bg-pink-700 transition-all duration-300 flex items-center justify-center group hover:scale-110"
      >
        <svg className="w-6 h-6 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </footer>
  );
};

export default Footer;
