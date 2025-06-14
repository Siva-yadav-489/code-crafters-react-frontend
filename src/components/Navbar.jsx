import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 w-full py-3 bg-transparent z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-xl sm:text-2xl font-bold text-white font-['Montserrat_Alternates']">
          Code Crafters
        </Link>
        
        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-white p-2 focus:outline-none"
          type="button"
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          <div className="w-6 h-5 relative flex flex-col justify-between">
            <span className={`w-full h-0.5 bg-white transform transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-full h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-full h-0.5 bg-white transform transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </div>
        </button>

        {/* Desktop Menu */}
        <div className="hidden lg:block">
          <ul className="flex space-x-4">
            <li>
              <Link
                to="/"
                className="text-white hover:bg-opacity-20 hover:bg-white rounded px-2 py-1 font-['Source_Sans_3'] transition-colors"
              >
                Get Proposal
              </Link>
            </li>
            <li>
              <Link
                to="/chatbot"
                className="text-white hover:bg-opacity-20 hover:bg-white rounded px-2 py-1 font-['Source_Sans_3'] transition-colors"
              >
                Chat
              </Link>
            </li>
          </ul>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`lg:hidden fixed top-0 right-0 w-52 h-screen bg-gray-900 bg-opacity-95 transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col items-start justify-start h-full space-y-3 p-10">
            <button
              className="absolute top-4 right-4 text-white p-2 focus:outline-none"
              onClick={toggleMenu}
              aria-label="Close menu"
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span className="w-full h-0.5 bg-white transform rotate-45 translate-y-2"></span>
                <span className="w-full h-0.5 bg-white transform -rotate-45 -translate-y-2"></span>
              </div>
            </button>
            <Link
              to="/"
              onClick={toggleMenu}
              className="text-white text-lg max-sm:text-base hover:text-purple-400 font-['Source_Sans_3'] transition-colors"
            >
              Get Proposal
            </Link>
            <Link
              to="/chatbot"
              onClick={toggleMenu}
              className="text-white text-lg max-sm:text-base hover:text-purple-400 font-['Source_Sans_3'] transition-colors"
            >
              Chat
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 