// import React from 'react'

// export const Footer = () => {
//     return (
//         <div>
            
//         </div>
//     )
// }




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
