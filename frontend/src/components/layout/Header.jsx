
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingCart, 
  Heart, 
  Search, 
  Menu, 
  X, 
  ChevronDown,
  User,
  LogOut,
  Settings,
  Package,
  Flower2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  // Navigation items
  const navItems = ['Home', 'Shop', 'Occasions', 'Collections', 'About'];

  useEffect(() => {
    // Check if mobile on mount and resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Scroll event listener
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Close user menu when clicking outside
    const handleClickOutside = (event) => {
      if (!event.target.closest('.user-menu-container')) {
        setShowUserMenu(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);

    // Update cart and wishlist counts
    updateCartAndWishlistCount();
    
    // Listen for cart updates
    window.addEventListener('cartUpdated', updateCartAndWishlistCount);
    window.addEventListener('storage', updateCartAndWishlistCount);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('cartUpdated', updateCartAndWishlistCount);
      window.removeEventListener('storage', updateCartAndWishlistCount);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const updateCartAndWishlistCount = () => {
    try {
      // Get cart count
      const cartData = localStorage.getItem('cart');
      if (cartData) {
        const cart = JSON.parse(cartData);
        if (Array.isArray(cart)) {
          setCartCount(cart.length);
        } else if (cart.items && Array.isArray(cart.items)) {
          setCartCount(cart.items.length);
        } else {
          setCartCount(0);
        }
      } else {
        setCartCount(0);
      }
      
      // Get wishlist count
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

  const handleNavigate = (path) => {
    // Check if path requires authentication
    const protectedPaths = ['/cart', '/wishlist', '/profile', '/orders', '/settings'];
    
    if (protectedPaths.includes(path) && !isAuthenticated) {
      navigate('/login', { state: { from: path } });
      toast.error('Please login to access this feature');
      return;
    }
    
    navigate(path);
    setIsMenuOpen(false);
    setShowUserMenu(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/');
      setShowUserMenu(false);
      setIsMenuOpen(false);
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  const getNavLink = (item) => {
    switch(item) {
      case 'Home':
        return '/';
      case 'Shop':
        return '/products';
      case 'Occasions':
        return '/products?category=Occasions';
      case 'Collections':
        return '/products?category=Collections';
      case 'About':
        return '/about';
      default:
        return '/';
    }
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [navigate]);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg' 
        : 'bg-white/90 backdrop-blur-md'
    }`}>
      <div className="container mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
          {/* Logo - Responsive sizing */}
          <Link 
            to="/" 
            className="flex items-center space-x-1.5 sm:space-x-2 group flex-shrink-0"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
              <Flower2 className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
            </div>
            <span className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
              BloomBox
            </span>
          </Link>

          {/* Desktop Navigation - Hidden on mobile */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item}
                to={getNavLink(item)}
                className="px-2 lg:px-3 py-2 text-sm lg:text-base text-gray-700 hover:text-pink-600 font-medium transition-colors relative group whitespace-nowrap"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Icons - Responsive spacing */}
          <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-4">
            {/* Search Icon */}
            <button
              onClick={() => handleNavigate('/products')}
              className="p-1.5 sm:p-2 hover:bg-pink-50 rounded-full transition-colors relative group"
              aria-label="Search"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
            </button>
            
            {/* Wishlist */}
            <button
              onClick={() => handleNavigate('/wishlist')}
              className="p-1.5 sm:p-2 hover:bg-pink-50 rounded-full transition-colors relative group"
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-[10px] sm:text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center animate-pulse">
                  {wishlistCount > 9 ? '9+' : wishlistCount}
                </span>
              )}
            </button>
            
            {/* Cart */}
            <button
              onClick={() => handleNavigate('/cart')}
              className="p-1.5 sm:p-2 hover:bg-pink-50 rounded-full transition-colors relative group"
              aria-label="Cart"
            >
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] sm:text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center animate-pulse">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </button>

            {/* Profile Icon - Always visible for all users */}
            <div className="relative user-menu-container">
              <button
                onClick={() => {
                  if (!isAuthenticated) {
                    handleNavigate('/login');
                  } else {
                    setShowUserMenu(!showUserMenu);
                  }
                }}
                className="p-1.5 sm:p-2 hover:bg-pink-50 rounded-full transition-colors group focus:outline-none"
                aria-label="Profile"
              >
                {isAuthenticated ? (
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full flex items-center justify-center text-white font-semibold">
                    {user?.name ? user.name.charAt(0).toUpperCase() : <User className="w-3 h-3 sm:w-4 sm:h-4" />}
                  </div>
                ) : (
                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                )}
              </button>

              {/* User Dropdown Menu - Only show when authenticated */}
              {isAuthenticated && showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 sm:w-56 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-100 animate-fadeIn">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-900 truncate">{user?.name || 'User'}</p>
                    <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                  </div>
                  
                  <button
                    onClick={() => handleNavigate('/profile')}
                    className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 flex items-center space-x-2 transition-colors"
                  >
                    <User className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">My Profile</span>
                  </button>
                  
                  <button
                    onClick={() => handleNavigate('/orders')}
                    className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 flex items-center space-x-2 transition-colors"
                  >
                    <Package className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">My Orders</span>
                  </button>
                  
                  <button
                    onClick={() => handleNavigate('/settings')}
                    className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 flex items-center space-x-2 transition-colors"
                  >
                    <Settings className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">Settings</span>
                  </button>
                  
                  <div className="border-t border-gray-100 my-1"></div>
                  
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2 transition-colors"
                  >
                    <LogOut className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu - Only shown when authenticated and menu is open */}
        {isAuthenticated && isMenuOpen && (
          <div className="md:hidden fixed inset-x-0 top-14 sm:top-16 bg-white border-t border-gray-100 shadow-lg overflow-y-auto max-h-[calc(100vh-3.5rem)] sm:max-h-[calc(100vh-4rem)] animate-slideDown">
            <div className="container mx-auto px-4 py-3 sm:py-4">
              <div className="flex flex-col space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item}
                    to={getNavLink(item)}
                    className="px-4 py-3 sm:py-4 text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-lg font-medium transition-colors text-base sm:text-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </Link>
                ))}
                
                {/* Mobile Profile Section */}
                <div className="pt-4 sm:pt-6 mt-2 sm:mt-4 border-t border-gray-100">
                  <div className="px-4 py-3 mb-2 bg-gray-50 rounded-lg">
                    <p className="text-sm font-semibold text-gray-900">{user?.name || 'User'}</p>
                    <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                  </div>
                  
                  <button
                    onClick={() => handleNavigate('/profile')}
                    className="w-full px-4 py-3 sm:py-4 text-left text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-lg font-medium transition-colors flex items-center space-x-3 text-base sm:text-lg"
                  >
                    <User className="w-5 h-5 sm:w-6 sm:h-6" />
                    <span>My Profile</span>
                  </button>
                  
                  <button
                    onClick={() => handleNavigate('/orders')}
                    className="w-full px-4 py-3 sm:py-4 text-left text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-lg font-medium transition-colors flex items-center space-x-3 text-base sm:text-lg"
                  >
                    <Package className="w-5 h-5 sm:w-6 sm:h-6" />
                    <span>My Orders</span>
                  </button>
                  
                  <button
                    onClick={() => handleNavigate('/settings')}
                    className="w-full px-4 py-3 sm:py-4 text-left text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-lg font-medium transition-colors flex items-center space-x-3 text-base sm:text-lg"
                  >
                    <Settings className="w-5 h-5 sm:w-6 sm:h-6" />
                    <span>Settings</span>
                  </button>
                  
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-3 sm:py-4 text-left text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors flex items-center space-x-3 text-base sm:text-lg mt-2"
                  >
                    <LogOut className="w-5 h-5 sm:w-6 sm:h-6" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
